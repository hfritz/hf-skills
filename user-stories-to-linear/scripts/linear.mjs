#!/usr/bin/env node
// Self-contained Linear client for the user-stories-to-linear skill.
// No dependencies — uses Node 18+ global fetch. Auth via LINEAR_API_KEY.
//
// Commands:
//   node linear.mjs teams                  List teams (id, key, name)
//   node linear.mjs projects [teamId]      List projects (optionally for one team)
//   node linear.mjs push <input.json>      Create issues from a JSON payload
//
// Push input JSON shape (hierarchy: epic -> milestones -> stories):
//   {
//     "team":    "ENG" | "Engineering" | "<team_id>",    // key, name, or id (required)
//     "theme":   "B2B Expansion"                          // optional: a workspace project label
//                                                          //   applied to the epic's project, to
//                                                          //   group related epics (a stand-in for
//                                                          //   Initiatives). Best-effort/non-fatal.
//     "epic":    "Group Ordering"                         // optional: a Linear Project.
//                | { "name": "...", "description": "..." } //   string or object. Resolved by
//                                                          //   name; CREATED if it doesn't exist.
//     "project": "Q3 Backlog" | "<project_id>",           // legacy alias: resolves EXISTING only.
//     "milestones": [                                      // optional: each is a Project Milestone.
//       {
//         "name": "Onboarding",
//         "targetDate": "2026-07-01",                      // optional (YYYY-MM-DD)
//         "description": "...",                            // optional
//         "issues": [
//           { "title": "...", "body": "...", "labels": ["User Story"],
//             "children": [ { "title": "sub-task", "body": "..." } ] } // optional sub-issues
//         ]
//       }
//     ],
//     "issues": [ { "title": "...", "body": "..." } ]      // optional: stories with no milestone.
//   }
//
// Milestones require an epic/project (Linear attaches milestones to projects).
// Output JSON: { ok, epic: {name,url,created}, milestones: [{name}],
//                pushed: [{title,url,id}], failed: [{title,error}] }

const TOKEN = process.env.LINEAR_API_KEY;
const ENDPOINT = "https://api.linear.app/graphql";

// Linear personal API keys are passed raw in Authorization; OAuth tokens use "Bearer ".
// Personal keys start with "lin_api_". Handle both.
function authHeader(token) {
  return token.startsWith("lin_api_") ? token : `Bearer ${token}`;
}

async function gql(query, variables = {}) {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { Authorization: authHeader(TOKEN), "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json();
  if (json.errors) {
    const msg = json.errors.map((e) => e.message).join("; ");
    throw new Error(`Linear API error: ${msg}`);
  }
  return json.data;
}

function die(msg) {
  console.error(`\n✗ ${msg}\n`);
  process.exit(1);
}

if (!TOKEN) {
  die(
    "LINEAR_API_KEY is not set.\n" +
      "  Create a personal API key at https://linear.app/settings/api\n" +
      "  Then: export LINEAR_API_KEY=lin_api_xxxxx"
  );
}

const LABEL_COLORS = {
  "User Story": "#4CB782",
  "Implementation Decision": "#F2994A",
};
const FALLBACK_COLORS = ["#5E6AD2", "#26B5CE", "#4CB782", "#F2994A", "#EB5757", "#9B51E0"];

// ---- commands ---------------------------------------------------------------

async function cmdTeams() {
  const data = await gql(`query { teams { nodes { id key name } } }`);
  const teams = data.teams.nodes;
  if (teams.length === 0) return console.log("No teams found.");
  console.log("\nTeams:");
  for (const t of teams) console.log(`  ${t.key.padEnd(8)} ${t.name.padEnd(28)} ${t.id}`);
  console.log("");
}

async function cmdProjects(teamId) {
  let projects;
  if (teamId) {
    const data = await gql(
      `query ($id: String!) { team(id: $id) { projects { nodes { id name state } } } }`,
      { id: teamId }
    );
    projects = data.team?.projects?.nodes ?? [];
  } else {
    const data = await gql(`query { projects { nodes { id name state } } }`);
    projects = data.projects.nodes;
  }
  if (projects.length === 0) return console.log("No projects found.");
  console.log("\nProjects:");
  for (const p of projects) console.log(`  ${p.name.padEnd(32)} ${p.state.padEnd(12)} ${p.id}`);
  console.log("");
}

// Resolve a team reference (id, key, or name) to a team id.
async function resolveTeam(ref) {
  const data = await gql(`query { teams { nodes { id key name } } }`);
  const teams = data.teams.nodes;
  const hit =
    teams.find((t) => t.id === ref) ||
    teams.find((t) => t.key.toLowerCase() === ref.toLowerCase()) ||
    teams.find((t) => t.name.toLowerCase() === ref.toLowerCase());
  if (!hit) {
    die(
      `Team "${ref}" not found. Available: ${teams.map((t) => `${t.key} (${t.name})`).join(", ")}`
    );
  }
  return hit.id;
}

// Resolve a project reference (id or name) within a team to a project id.
async function resolveProject(teamId, ref) {
  if (!ref) return null;
  const data = await gql(
    `query ($id: String!) { team(id: $id) { projects { nodes { id name } } } }`,
    { id: teamId }
  );
  const projects = data.team?.projects?.nodes ?? [];
  const hit =
    projects.find((p) => p.id === ref) ||
    projects.find((p) => p.name.toLowerCase() === ref.toLowerCase());
  if (!hit) {
    die(
      `Project "${ref}" not found in team. Available: ${
        projects.map((p) => p.name).join(", ") || "(none)"
      }`
    );
  }
  return hit.id;
}

// Resolve an epic to a Linear Project id, creating the project if it doesn't exist.
// epicRef is a name string or { name, description }. Returns { id, name, url, created }.
async function resolveOrCreateProject(teamId, epicRef) {
  const epic = typeof epicRef === "string" ? { name: epicRef } : epicRef || {};
  if (!epic.name) die("Epic is missing a name.");
  const data = await gql(
    `query ($id: String!) { team(id: $id) { projects { nodes { id name url } } } }`,
    { id: teamId }
  );
  const projects = data.team?.projects?.nodes ?? [];
  const hit =
    projects.find((p) => p.id === epic.name) ||
    projects.find((p) => p.name.toLowerCase() === epic.name.toLowerCase());
  if (hit) return { id: hit.id, name: hit.name, url: hit.url, created: false };

  // Linear caps a project's `description` at 255 chars; long-form text belongs in
  // `content` (the project overview). Split so an epic of any length is accepted.
  const full = epic.description ?? "";
  const input = { name: epic.name, teamIds: [teamId] };
  if (full) {
    input.description = full.length > 255 ? full.slice(0, 254).trimEnd() + "…" : full;
    if (full.length > 255) input.content = full;
  }
  const res = await gql(
    `mutation ($input: ProjectCreateInput!) {
       projectCreate(input: $input) { success project { id name url } }
     }`,
    { input }
  );
  const p = res.projectCreate?.project;
  if (!res.projectCreate?.success || !p) die(`Could not create project (epic) "${epic.name}".`);
  return { id: p.id, name: p.name, url: p.url, created: true };
}

// Create a Project Milestone under a project. Returns the milestone id.
async function createMilestone(projectId, name, targetDate, description) {
  if (!name) throw new Error("Milestone is missing a name.");
  const data = await gql(
    `mutation ($input: ProjectMilestoneCreateInput!) {
       projectMilestoneCreate(input: $input) { success projectMilestone { id name } }
     }`,
    { input: { name, projectId, targetDate: targetDate ?? undefined, description: description ?? undefined } }
  );
  const ms = data.projectMilestoneCreate?.projectMilestone;
  if (!data.projectMilestoneCreate?.success || !ms) throw new Error(`milestone "${name}" not created`);
  return ms.id;
}

// Resolve or create a workspace-level project label (the "theme" grouping).
// Project labels are workspace-scoped (unlike issue labels, which are team-scoped).
async function getOrCreateProjectLabel(name) {
  const existing = await gql(`query { projectLabels { nodes { id name } } }`);
  const hit = (existing.projectLabels?.nodes ?? []).find(
    (l) => l.id === name || l.name.toLowerCase() === name.toLowerCase()
  );
  if (hit) return hit.id;
  const created = await gql(
    `mutation ($input: ProjectLabelCreateInput!) {
       projectLabelCreate(input: $input) { success projectLabel { id name } }
     }`,
    { input: { name, color: "#5E6AD2" } }
  );
  const id = created.projectLabelCreate?.projectLabel?.id;
  if (!id) throw new Error(`project label "${name}" not created`);
  return id;
}

// Attach a theme label to a project. Merges with existing labels on reuse so we
// never clobber labels already on the project. Best-effort — callers treat
// failure as a non-fatal warning, never blocking issue creation.
async function attachProjectLabel(projectId, labelId, isNewProject) {
  let labelIds = [labelId];
  if (!isNewProject) {
    const data = await gql(
      `query ($id: String!) { project(id: $id) { labels { nodes { id } } } }`,
      { id: projectId }
    );
    const existing = (data.project?.labels?.nodes ?? []).map((l) => l.id);
    labelIds = Array.from(new Set([...existing, labelId]));
  }
  await gql(
    `mutation ($id: String!, $input: ProjectUpdateInput!) {
       projectUpdate(id: $id, input: $input) { success }
     }`,
    { id: projectId, input: { labelIds } }
  );
}

async function getOrCreateLabel(teamId, name, color, cache) {
  if (cache.has(name)) return cache.get(name);
  const data = await gql(
    `mutation ($input: IssueLabelCreateInput!) {
       issueLabelCreate(input: $input) { success issueLabel { id name } }
     }`,
    { input: { name, color, teamId } }
  );
  const id = data.issueLabelCreate?.issueLabel?.id ?? null;
  if (id) cache.set(name, id);
  return id;
}

// Create one issue and, recursively, any `children` as sub-issues (parentId).
async function createOneIssue(issue, ctx, results) {
  const { teamId, projectId, projectMilestoneId, parentId, labelCache } = ctx;
  const labelIds = [];
  for (const name of issue.labels ?? []) {
    const color = LABEL_COLORS[name] ?? FALLBACK_COLORS[labelIds.length % FALLBACK_COLORS.length];
    const id = await getOrCreateLabel(teamId, name, color, labelCache);
    if (id) labelIds.push(id);
  }

  try {
    const data = await gql(
      `mutation ($input: IssueCreateInput!) {
         issueCreate(input: $input) { success issue { id identifier url title } }
       }`,
      {
        input: {
          title: issue.title,
          description: issue.body ?? "",
          teamId,
          projectId: projectId ?? undefined,
          projectMilestoneId: projectMilestoneId ?? undefined,
          parentId: parentId ?? undefined,
          labelIds: labelIds.length ? labelIds : undefined,
        },
      }
    );
    const created = data.issueCreate;
    if (created?.success && created.issue) {
      results.pushed.push({ title: created.issue.title, url: created.issue.url, id: created.issue.identifier });
      for (const child of issue.children ?? []) {
        await createOneIssue(child, { ...ctx, parentId: created.issue.id }, results);
      }
    } else {
      results.failed.push({ title: issue.title, error: "issueCreate returned success=false" });
    }
  } catch (e) {
    results.failed.push({ title: issue.title, error: e.message });
  }
}

async function cmdPush(inputPath) {
  if (!inputPath) die("Usage: node linear.mjs push <input.json>");
  const fs = await import("node:fs");
  let payload;
  try {
    payload = JSON.parse(fs.readFileSync(inputPath, "utf8"));
  } catch (e) {
    die(`Could not read/parse ${inputPath}: ${e.message}`);
  }
  if (!payload.team) die('Input is missing a "team" field.');
  const hasMilestones = Array.isArray(payload.milestones) && payload.milestones.length > 0;
  const hasIssues = Array.isArray(payload.issues) && payload.issues.length > 0;
  if (!hasMilestones && !hasIssues) {
    die('Input has no "issues" or "milestones" to push.');
  }

  const teamId = await resolveTeam(payload.team);

  const results = { pushed: [], failed: [], milestones: [], warnings: [] };

  // Resolve the theme as a workspace project label (best-effort, non-fatal).
  let themeLabelId = null;
  if (payload.theme) {
    try {
      themeLabelId = await getOrCreateProjectLabel(payload.theme);
    } catch (e) {
      results.warnings.push(`Theme label "${payload.theme}" could not be created: ${e.message}`);
    }
  }

  // Resolve or create the epic (Linear Project). `epic` creates if missing;
  // legacy `project` resolves an existing one only.
  let projectId = null;
  let epicInfo = null;
  if (payload.epic) {
    const r = await resolveOrCreateProject(teamId, payload.epic);
    projectId = r.id;
    epicInfo = { name: r.name, url: r.url, created: r.created };
    if (themeLabelId) {
      try {
        await attachProjectLabel(projectId, themeLabelId, r.created);
        epicInfo.theme = payload.theme;
      } catch (e) {
        results.warnings.push(`Theme label not attached to "${r.name}": ${e.message}`);
      }
    }
  } else if (payload.project) {
    projectId = await resolveProject(teamId, payload.project);
    if (themeLabelId) {
      try {
        await attachProjectLabel(projectId, themeLabelId, false);
      } catch (e) {
        results.warnings.push(`Theme label not attached to existing project: ${e.message}`);
      }
    }
  } else if (payload.theme) {
    results.warnings.push('Theme provided but no "epic"/"project" to attach it to — theme ignored.');
  }

  // Preload existing labels for the team.
  const labelData = await gql(
    `query ($id: ID!) {
       issueLabels(filter: { team: { id: { eq: $id } } }) { nodes { id name } }
     }`,
    { id: teamId }
  );
  const labelCache = new Map(labelData.issueLabels.nodes.map((l) => [l.name, l.id]));

  // Milestoned stories.
  for (const m of payload.milestones ?? []) {
    let milestoneId = null;
    if (projectId) {
      try {
        milestoneId = await createMilestone(projectId, m.name, m.targetDate, m.description);
        results.milestones.push({ name: m.name });
      } catch (e) {
        results.failed.push({ title: `Milestone: ${m.name}`, error: e.message });
      }
    } else {
      results.failed.push({
        title: `Milestone: ${m.name}`,
        error: "milestones require an epic/project — add an \"epic\" to the payload",
      });
    }
    for (const issue of m.issues ?? []) {
      await createOneIssue(issue, { teamId, projectId, projectMilestoneId: milestoneId, labelCache }, results);
    }
  }

  // Stories with no milestone (attached to the epic if present, else the team).
  for (const issue of payload.issues ?? []) {
    await createOneIssue(issue, { teamId, projectId, labelCache }, results);
  }

  console.log(
    JSON.stringify(
      {
        ok: results.failed.length === 0,
        epic: epicInfo,
        milestones: results.milestones,
        pushed: results.pushed,
        failed: results.failed,
        warnings: results.warnings,
      },
      null,
      2
    )
  );
}

// ---- dispatch ---------------------------------------------------------------

const [cmd, arg] = process.argv.slice(2);
try {
  if (cmd === "teams") await cmdTeams();
  else if (cmd === "projects") await cmdProjects(arg);
  else if (cmd === "push") await cmdPush(arg);
  else
    die(
      "Unknown command. Use one of:\n" +
        "  node linear.mjs teams\n" +
        "  node linear.mjs projects [teamId]\n" +
        "  node linear.mjs push <input.json>"
    );
} catch (e) {
  die(e.message);
}

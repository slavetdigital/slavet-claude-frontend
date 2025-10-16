# Slavet Marketplace — slavet-claude-frontend

A minimal, ready-to-use Claude Code plugin marketplace that ships with the `slavet-claude-frontend` plugin pre-included for immediate install.

- **Marketplace name**: Slavet Marketplace
- **Included plugin**: `slavet-claude-frontend`
- **Purpose**: Provide a lightweight enterprise frontend assistant with DSL, MCP hooks, auto-checks, and design-token/contrast enforcement guidance.

## What’s inside

```
slavet-claude-frontend/
├─ .claude-plugin/
│  └─ marketplace.json     # Marketplace definition pointing to the included plugin
├─ plugins/
│  └─ slavet-claude-frontend/
│     └─ README.md         # Placeholder for the plugin (drop in actual plugin files)
├─ guides/
│  └─ tokens-and-contrast.md # Notes on tokens & contrast enforcement
├─ LICENSE
├─ VERSION
└─ README.md               # You are here
```

## Features at a glance

- **Batteries-included marketplace**: Add locally or host on GitHub and install directly in Claude Code.
- **Included plugin scaffold**: `slavet-claude-frontend` folder ready for your plugin files.
- **Design tokens & contrast guidance**: See `guides/tokens-and-contrast.md` for enforcement strategy and checks.
- **MCP-friendly**: Structure is compatible with Claude Code’s marketplace and plugin install flow.
 - **Resource-efficient by design**: Guidance and configs to avoid excessive CPU/memory usage.
 - **Context & credits budget control**: Recommend caps and policies to manage API usage wisely.
 - **Claude ecosystem compatible**: Marketplace + plugin manifest align with Claude Code plugin requirements.
 - **No hallucinations policy**: Evidence-based answers only; abstain when data is insufficient.
 - **Multi-stack coverage**: Works with HTML/CSS, Tailwind CSS, WordPress/PHP, JS frameworks, React, Next.js, Astro, and more.
 - **Sub-agents support**: Designed to orchestrate sub-agents per Claude Code guidance for scoped tasks.
 - **Interop with Slavet plugins**: Detects and cooperates with other Slavet plugins/agents when present.
 - **Autonomous background audits**: Can run low-cost, non-blocking checks and notify you periodically.

## Install and use

You can use this marketplace locally (no hosting required) or host it on GitHub for easier distribution.

### Option A — Local development (recommended to start)

1) Add the marketplace in Claude Code:

```
/plugin marketplace add /absolute/path/to/slavet-claude-frontend
```

2) Install the included plugin from this marketplace locally:

```
/plugin install slavet-claude-frontend@local
```

3) Verify installation:
- Run `/plugin list` and ensure `slavet-claude-frontend` appears.
- Check any commands or hooks you implement once you add real plugin files.

If you add a `.claude-plugin/plugin.json` inside `plugins/slavet-claude-frontend`, Claude Code will recognize it as a valid plugin. This repo now includes a minimal manifest to ensure marketplace compatibility out of the box.

### Option B — GitHub hosted

1) Push this repository to GitHub and ensure it’s publicly accessible (or accessible to your organization).

2) Add the marketplace in Claude Code using the repo URL:

```
/plugin marketplace add https://github.com/slavetdigital/slavet-claude-frontend
```

3) Install the plugin by name:

```
/plugin install slavet-claude-frontend
```

4) Verify with `/plugin list`.

## Resource efficiency and context/credits policies

To align with Untitled-1 requirements, the included plugin scaffold is documented with these default policies:

- Keep operations lightweight and avoid expensive loops or full-repo indexing unless explicitly invoked.
- Use conservative defaults for AI calls: small max tokens, streaming where possible, and short timeouts.
- Respect a context/credits budget per session and per request; fail fast with a helpful message when limits are reached.
- Batch requests where safe, cache deterministic results locally, and deduplicate identical prompts.

Suggested baseline caps (tune per project):
- Max prompt tokens per request: 4,000
- Max completion tokens per request: 1,000
- Max parallel AI requests: 2
- Session credit budget: 100k tokens

See `plugins/slavet-claude-frontend/README.md` for configuration examples.

## No hallucinations policy

The plugin is designed to avoid speculative or fabricated content. Commands should:

- Rely only on available files, structured data, or configured knowledge sources.
- Cite the exact files/lines or data keys used to produce answers when applicable.
- Respond with a clear refusal (and guidance to gather missing info) when inputs are insufficient.

Default config enables strict evidence requirements; see the plugin manifest and README for toggles.

## Sub-agents and collaboration

This marketplace and the `slavet-claude-frontend` plugin are structured to support sub-agents per Claude Code’s best practices:

- Sub-agents are created for focused scopes (e.g., theme audit, plugin audit, contrast sweep) while the main agent maintains the primary workflow.
- Sub-agents must operate within strict resource budgets and run in the background without blocking.
- When a compatible Slavet plugin is detected, the system exchanges capabilities and coordinates tasks to avoid duplicated work and excess API calls.
- Results are summarized and surfaced via periodic non-intrusive notifications; full reports are stored in project docs or logs.

Recommended triggers:
- On install or update: run a lightweight scan to detect frameworks, tokens, and available Slavet plugins.
- On demand: `/agent audit theme` or `/agent audit plugin` to spawn a scoped sub-agent.
- Scheduled (optional): background daily checks with token caps.

## How the marketplace works

- The marketplace entry is defined at `.claude-plugin/marketplace.json` and includes the `slavet-claude-frontend` plugin using a local `source` path:

```
{
  "name": "Slavet Marketplace",
  "owner": { "name": "Slavēt Digital", "url": "https://www.slavetdigital.com" },
  "plugins": [
    {
      "name": "slavet-claude-frontend",
      "description": "Lightweight enterprise frontend assistant with DSL, MCP, auto-checks, tokens & contrast enforcement.",
      "source": "./plugins/slavet-claude-frontend"
    }
  ]
}
```

- To distribute from GitHub without local sources, replace `source` with a Git URL to your plugin repository following Claude Code’s plugin spec.

## Developing the plugin

The included `plugins/slavet-claude-frontend` is a placeholder directory. Replace it with your actual plugin implementation (e.g., commands, hooks, agents, MCP setup, etc.). At minimum, include:

- `.claude-plugin/plugin.json` — Plugin manifest
- `commands/` — Command handlers
- `hooks/` — Editor or file lifecycle hooks
- `agents/` — Optional agents

Suggested capabilities for a frontend-focused assistant:
- Project-aware scaffolding (components, pages, routes)
- Design tokens validation and enforcement
- Contrast checking with WCAG formula for defined `contrastPairs`
- Linting or style checks aligned with your framework (React/Next, Vue, Svelte, etc.)
- Accessibility nudges for form controls, ARIA, and focus management
 - Resource-aware execution with request caps and context budgets

### Minimal config example

Add a `.claude-plugin/plugin.json` under `plugins/slavet-claude-frontend` with conservative defaults:

```
{
  "name": "slavet-claude-frontend",
  "version": "0.1.0",
  "description": "Enterprise frontend assistant with tokens & contrast checks",
  "config": {
    "tokenCaps": {
      "prompt": 4000,
      "completion": 1000,
      "parallel": 2,
      "session": 100000
    },
    "strictEvidence": true,
    "backgroundAudits": {
      "enabled": true,
      "maxDailyTokens": 15000
    },
    "interop": {
      "detectSlavetPlugins": true,
      "coordinateSubAgents": true
    }
  }
}
```

## Tokens & contrast best practices

See `guides/tokens-and-contrast.md` for details. In short:
- Define colors in `dsl/tokens.json` with `hex` and optionally OKLCH values.
- Analyzer should flag any raw hex in CSS not sourced from your tokens.
- Contrast checks should validate pairs listed under `contrastPairs` using the WCAG formula.
- If only OKLCH is provided, include a `hex` field per color for accurate contrast checks.

## Recommended workflow

- Start locally: add the marketplace from your filesystem and iterate on the plugin files.
- Validate the plugin via `/plugin list` and trial commands.
- When ready to share, host on GitHub and switch the marketplace entry to the Git URL.
- Version your releases via the `VERSION` file and semantic Git tags.

## Troubleshooting

- If `/plugin marketplace add ...` fails, confirm the path or URL is correct and accessible.
- If `/plugin install ...` fails, check the plugin folder contains a valid `.claude-plugin/plugin.json`.
- After changes, reinstall or reload the plugin to pick up updates.

## License

See `LICENSE` for licensing details.

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

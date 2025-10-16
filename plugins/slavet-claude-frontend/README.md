# slavet-claude-frontend

This is the frontend assistant plugin scaffold included in the Slavet Marketplace. It is aligned with Untitled-1 requirements:

- Minimize resource usage and avoid slowing down theme or app development.
- Manage context and credits budgets wisely for AI API calls.
- Be compatible with the Claude ecosystem and plugin marketplace.
 - Enforce a strict no-hallucinations policy (evidence required, abstain if insufficient data).

## Supported stacks

This plugin is designed to work across multiple frontend stacks:

- HTML/CSS (including PostCSS)
- Tailwind CSS (config-aware, reads `tailwind.config.js` or `tailwind.config.ts`)
- WordPress/PHP themes and plugins (reads `style.css`, PHP templates, block JSON)
- JavaScript frameworks (general)
- React (CRA, Vite, Next.js apps)
- Next.js (App Router and Pages Router)
- Astro (content collections, integrations)
- Others with similar file structures

### Detection heuristics (non-exhaustive)

- Tailwind: presence of `tailwind.config.*`, `@tailwind` directives, or class-like utilities.
- WordPress: presence of `style.css` theme header, `functions.php`, `theme.json`, `block.json`.
- React/JS: `package.json` with React deps, `.jsx`/`.tsx` usage.
- Next.js: `next.config.*`, `app/` or `pages/` directories, middleware files.
- Astro: `.astro` files, `astro.config.*`.

Commands should use these heuristics to scope analysis and suggestions to the detected stack.

## Structure

```
.claude-plugin/
  plugin.json        # Minimal manifest for Claude Code recognition
commands/            # Add your command handlers here
hooks/               # Add lifecycle or file hooks here
```

## Resource efficiency

- Default small token limits; stream responses when possible.
- Cache deterministic calculations and deduplicate identical prompts.
- Avoid full-repo scans by default; scope to open files or explicit paths.
- Cap parallel requests; use backoff on rate limits.

## Context and credits policies

Environment variables (suggested):

```
SLAVET_MAX_PROMPT_TOKENS=4000
SLAVET_MAX_COMPLETION_TOKENS=1000
SLAVET_MAX_PARALLEL_REQUESTS=2
SLAVET_SESSION_TOKEN_BUDGET=100000
```

These budgets should be enforced by your command implementations; fail fast with a helpful message when limits are reached.

## No hallucinations policy

- Commands must be evidence-based only — operate strictly on repo files, explicit inputs, or configured data sources.
- When answering, include references to the specific sources used (e.g., file paths and line ranges) when applicable.
- If required inputs or sources are missing, return a refusal with next-step guidance rather than fabricating content.

## Compatibility

- Ships with a minimal `.claude-plugin/plugin.json` to be recognized by Claude Code.
- Follow Claude Code plugin spec for commands and hooks.

## Getting started

1. Add or customize `.claude-plugin/plugin.json`.
2. Implement a simple command in `commands/` (e.g., `tokens:check`).
3. Add policies in your command utilities to enforce the limits above.
4. Install from the local marketplace and test with `/plugin list`.

## License

See repository `LICENSE`.

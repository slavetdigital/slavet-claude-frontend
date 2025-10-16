# Tokens & Contrast in Slavet Frontend Genius

- Define colors (hex + optional OKLCH) in `dsl/tokens.json`.
- Analyzer flags any raw hex in CSS that isn't in your tokens.
- Contrast is checked for pairs listed under `contrastPairs` (WCAG formula).
- If you only specify OKLCH, also add a `hex` field per color for contrast checks.

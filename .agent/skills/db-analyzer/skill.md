DB Analyzer — summary

- Purpose: Inspect schema and suggest minimal-safe migrations or RLS policies.
- Signature: Input: {table:string, issue:string} Output: short SQL or policy snippet.
- Always prefer non-destructive suggestions first (policies, triggers).

Example: { "table": "profiles", "issue": "auto-create on signup" }

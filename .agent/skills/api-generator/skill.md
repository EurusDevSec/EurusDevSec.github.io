API Generator — summary

- Purpose: Generate small, idiomatic API route code or client wrappers.
- Signature: Input: {entity:string, actions:string[]} Output: code snippet file(s).
- Use when asked to scaffold endpoint handlers or fetch wrappers.
- Keep responses to the changed file paths and minimal code only.

Example input (JSON):
{ "entity": "posts", "actions": ["list","get","create"] }

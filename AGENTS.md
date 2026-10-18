# Project instructions

- Keep the project name and all existing Jenny Moscol and institutional logos unchanged unless the user requests otherwise.
- Work on `main`, the user-requested default branch. Do not recreate `master`.
- After each coherent implementation phase, run the relevant checks, stage the project changes, commit, and push to `origin/main`. The user explicitly requested this workflow. Report the commit hash and push result in Spanish.
- Preserve unrelated changes that existed before the task; do not include local Obsidian workspace changes in implementation commits.
- Never commit server credentials, `.env` files, or raw generated image outputs. `.env.example` is safe to track.
- Keep informational routes static. Hydrate React only where interaction requires it; load Three.js and GSAP on demand and respect reduced motion and visibility.
- Preserve the verified-email flow: a fabricated address must not deliver a consultation without the code received at that address.

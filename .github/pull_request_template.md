## What and why


## Checklist
- [ ] Follows the conventions in `CLAUDE.md` (SCSS tokens, no new Tailwind, TSDoc/Javadoc, no inline comments)
- [ ] Changes are limited to the scope of this PR
- [ ] Commit messages are clear and brief
- [ ] No console logs, debugging code, or commented-out code left in
- [ ] No secrets, API keys, or `.env` files included (this repo is public)
- [ ] `npm run lint` and `npm run build` pass
- [ ] `./gradlew build` passes (if `backend/` changed)
- [ ] New backend services have tests
- [ ] Reviewed for security issues (input validation, escaping, auth on write endpoints)
- [ ] New dependencies are necessary and have no known vulnerabilities
- [ ] Checked on desktop and mobile widths (if UI changed)
- [ ] Follows accessibility best practices (if UI changed)

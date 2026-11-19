# Portfolio Website: Claude Code Guide

Personal portfolio site (jordanthesoftwaredeveloper.com). This repo is **public**:
never commit secrets, `.env` files, credentials, or anything under `.claude/`
beyond what is already tracked.

## Primary directive

Ship working, reviewable code that matches the conventions already in this repo.
Do not introduce a new pattern, library, or architectural approach when an
existing one already does the job. Extend or reuse instead.

## Environment

- **Terminal**: WSL (Ubuntu). Every command must be WSL/bash. No PowerShell,
  cmd.exe, or macOS-style commands (no `brew`, no backslash paths, no `dir`).
- **Editor**: VSCode. Never suggest `nano`, `vim`, or other terminal editors.
- **Package managers**: `npm` for the frontend (matches `package-lock.json`; do
  not switch to pnpm/yarn). The Gradle wrapper (`./gradlew`) for the backend.

## Architecture

### Frontend (repo root)
- Next.js 15 (App Router) + React + TypeScript
- Routes in `src/app/<route>/`; route handlers in `src/app/api/<name>/route.ts`
- Styling: SCSS (`sass`). See **Styling conventions**.
- Backend API client: `src/lib/api.ts`
- Hosted on Railway as a Node service

### Backend (`backend/`)
- Spring Boot 3, Java 21, Gradle
- Source dirs are top-level packages: `controllers/`, `services/`, `core/`
  (`entities/`, `repositories/`), `config/`. A new package must be added to both
  `sourceSets.main.java.srcDirs` in `build.gradle` and `@ComponentScan` in
  `PortfolioBackendApplication`.
- Persistence: Spring Data JPA on PostgreSQL with `ddl-auto=update`. There is no
  migration tool; schema changes happen through entity changes.
- Hosted on Railway as a Docker container (`backend/Dockerfile`,
  `backend/railway.json`), with Railway Postgres on the private network.

## Styling conventions (frontend)

**Always use the SCSS system in `src/styles/`. Never hardcode a color, font,
spacing value, or breakpoint in a component or SCSS file unless the developer
explicitly overrides this for that specific case.**

- Shared tokens live in `src/styles/_variables.scss`. Use those variables, not
  literal hex codes, `px` magic numbers, or inline `style={{}}`.
- `src/styles/globals.scss` imports `variables`, then `base/*`, `components/*`,
  `pages/*`, `utilities/*`, in that order. A new partial is added to this import
  list; it is never pulled in ad hoc from a component.
- Structure: `base/` (resets, typography, layout), `components/` (one partial per
  shared component), `pages/` (one partial per page), `utilities/`.
- Partial filenames are camelCase (`_cardCarousel.scss`); class names are
  kebab-case and scoped by feature/component. Follow the neighboring partial.
- **No new Tailwind usage.** Tailwind is installed but new styling goes in SCSS.
- Every new SCSS file starts by importing variables and includes responsive
  rules using the existing breakpoint tokens, only the ones it actually needs:

  ```scss
  @import "../variables";

  @media (max-width: $breakpoint-sm) {
  }

  @media (max-width: $breakpoint-md) {
  }

  @media (max-width: $breakpoint-lg) {
  }
  ```

- If a needed token doesn't exist in `_variables.scss`, stop and say so. Adding
  to `_variables.scss` is a separate, explicit decision.

## Component conventions (frontend)

### Reuse before creation
Before creating a component, hook, or utility, search for an existing one. In order:
1. Use an existing shared component in `src/components/` (`SiteButton`,
   `TextField`, `Card`, `Section`, `Container`, `Title`, `Paragraph`, etc.) as-is
2. Extend it (add a prop/variant)
3. Create a new shared component in `src/components/`, or a feature component in
   `src/components/<feature>/`
4. Inline a one-off only if it is genuinely single-use and trivial

Do not emit a raw `<button>`, `<input>`, or similar in feature code when a shared
component exists or should exist.

### Folder map
- `src/app/<route>/`: pages; keep them thin (layout and composition)
- `src/components/`: shared components; `src/components/<feature>/` for
  feature-specific ones (`contact/`, `resume/`, `howTo/`, `skills/`)
- `src/hooks/`: shared hooks (exported via `src/hooks/index.ts`)
- `src/lib/`: API clients and non-UI helpers
- `src/types/`: shared types

### Decomposition
Split a component when it exceeds ~250 lines, holds more than ~3 distinct
responsibilities, contains JSX that is (or plausibly will be) reused, or has an
effect/memo doing work unrelated to its main purpose.

If a file written or substantially rewritten in one pass exceeds ~400 lines, say
so explicitly: filename, line count, and a suggested split.

## Comment and documentation conventions

- **TSDoc** (`.ts`/`.tsx`): every exported function, component, hook, route
  handler, and non-obvious type gets a `/** ... */` comment, with `@param`/
  `@returns` where not obvious from the signature.
- **Javadoc** (`.java`): every public class, method, and non-obvious field gets a
  `/** ... */` comment with `@param`, `@return`, `@throws` where relevant.
- **No inline comments** inside function bodies or JSX (no `{/* Header */}`,
  no section dividers, no comments restating the next line). If a block needs
  explaining, extract it into a named, documented function.

## Backend conventions

- Layering is `controller → service → repository`. Controllers stay thin; no
  repository calls or business logic in a controller.
- Use SLF4J (`LoggerFactory.getLogger`) for logging, not `System.out`/`System.err`.
- Use constructor injection, not field injection (`@Autowired` on a field).
- New code should not return JPA entities directly from a new controller; use a
  response type. Existing endpoints are left as-is unless the task covers them.
- New services should come with JUnit 5 + Mockito tests under `src/test/java/`.

## Quality gates (run before every commit)

Frontend:
```bash
npm run lint
npm run build
```

Backend (point `DB_*` at a local Postgres first; see **Do not**):
```bash
cd backend && ./gradlew build
```

## Git

- Do not run `git` commands (`add`, `commit`, `push`, branching, etc.) unless
  explicitly asked, either directly or in the task instructions.
- Commit messages are extremely brief: two sentences max.
- No `Co-Authored-By` or other Claude Code attribution lines in commits or PRs.
- PRs follow `.github/pull_request_template.md`.

## Do not

- Do not hardcode colors, fonts, spacing, or breakpoints; use `_variables.scss`.
- Do not add new Tailwind usage, a new CSS approach, or a new library without
  flagging it first.
- Do not duplicate logic across call sites without extracting it.
- Do not add inline comments; extract to a named, documented function.
- Do not use field injection in Spring beans.
- Do not commit secrets. Use `.env.example` files with placeholder values.
- Do not run commands that touch a real database. `backend/.env` is loaded by
  `spring-dotenv`, so `./gradlew build`/`bootRun` and `@SpringBootTest` connect to
  whatever it points at; override `DB_*` with a local Docker Postgres.
- Do not change résumé/job-history text (e.g. `FullTimeJobsTab.tsx`, job
  descriptions in `HomePage.tsx`) unless asked; it describes past work.
- Do not give PowerShell/cmd/macOS commands or suggest terminal editors.

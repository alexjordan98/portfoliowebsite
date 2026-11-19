# jordanthesoftwaredeveloper.com

Personal portfolio site.

- **Frontend**: Next.js 15 (App Router), TypeScript, SCSS. Repo root.
- **Backend**: Spring Boot 3, Java 21, Gradle, PostgreSQL. `backend/`.
- **Contact form**: `src/app/api/contact/route.ts`, sends through Amazon SES.

## Local development

Requirements: Node 20+, Java 21, Docker.

### Database

```bash
docker run -d --name portfolio-pg -e POSTGRES_PASSWORD=pw -p 5432:5432 postgres:16
```

### Backend

```bash
cd backend
cp .env.example .env    # set DB_PASSWORD=pw and an ADMIN_API_KEY
./gradlew bootRun
```

The API runs on `http://localhost:8080`. On first start, an empty `skills` table
is seeded from `src/main/resources/skills-data.json`. Writes to `/skills`
require an `X-Admin-Key` header matching `ADMIN_API_KEY`.

`./gradlew build` runs a `@SpringBootTest`, so it needs the database above to be
reachable through the `DB_*` values in `backend/.env`.

### Frontend

```bash
cp .env.example .env.local    # fill in the values
npm install
npm run dev
```

The site runs on `http://localhost:3000`.

## Deployment (Railway)

Both services and the database run in one Railway project:

| Service  | Root directory | Build                                     |
|----------|----------------|-------------------------------------------|
| Postgres | n/a            | Railway Postgres plugin                   |
| Backend  | `/backend`     | `backend/Dockerfile` via `backend/railway.json` |
| Frontend | `/`            | Railpack Node build (`npm run build`, `npm start`) |

- Backend variables: see `backend/.env.example`. Point `DB_*` at the Postgres
  service's private-network variables (`${{Postgres.PGHOST}}`, etc.) and include
  every frontend domain in `ALLOWED_ORIGINS`.
- Frontend variables: see `.env.example`. Set
  `NEXT_PUBLIC_API_URL=https://${{backend.RAILWAY_PUBLIC_DOMAIN}}`.
  `NEXT_PUBLIC_*` values are baked in at build time, so redeploy after changing them.
- Set Watch Paths so frontend deploys ignore `/backend/**` and backend deploys
  only watch `/backend/**`.
- The SES IAM user only needs `ses:SendEmail` on the verified sender identity.

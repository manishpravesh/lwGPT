# LawGPT (lwLand)

LawGPT is a full-stack legal assistant application with:

- React + Vite frontend
- Node.js + Express backend
- Prisma + PostgreSQL persistence
- JWT authentication
- Stripe checkout integration
- Role-aware usage limits (FREE / PREMIUM / ENTERPRISE)

## Monorepo Structure

```text
lwLand/
	frontend/   # React client
	backend/    # Express API + Prisma
```

## Prerequisites

- Node.js 18+
- npm 9+
- PostgreSQL database

## 1) Backend Setup

From `backend/`:

```bash
npm install
```

Create a `.env` file in `backend/`:

```env
PORT=5000
CLIENT_URL=http://localhost:5173
JWT_SECRET=replace_with_a_long_random_secret
DATABASE_URL=postgresql://user:password@host:5432/dbname

GEMINI_API_KEY=replace_if_you_use_chat_features
STRIPE_SECRET_KEY=replace_if_you_use_payments
STRIPE_WEBHOOK_SECRET=replace_if_you_use_webhooks
REDIS_URL=replace_if_you_use_rate_limits
REDIS_TOKEN=replace_if_you_use_rate_limits

# Optional: override demo credentials
DEMO_USER_EMAIL=demo@lawgpt.local
DEMO_USER_PASSWORD=Demo@123456
```

Run Prisma migration and generate client:

```bash
npx prisma migrate deploy
npx prisma generate
```

Start backend:

```bash
npm run dev
```

## 2) Frontend Setup

From `frontend/`:

```bash
npm install
```

Create a `.env` file in `frontend/`:

```env
VITE_BACKEND_URL=http://localhost:5000
```

Start frontend:

```bash
npm run dev
```

Frontend default URL: `http://localhost:5173`

## Demo Login (Prefilled + Seeded)

The login page has demo credentials prefilled by default:

- Email: `demo@lawgpt.local`
- Password: `Demo@123456`

When backend starts, it automatically upserts this demo user into the database. This guarantees login succeeds as long as:

- backend is connected to the configured PostgreSQL database
- backend started successfully

If you set `DEMO_USER_EMAIL` and `DEMO_USER_PASSWORD` in backend `.env`, those values are used instead.

## Main Scripts

Backend (`backend/package.json`):

- `npm run dev` - start backend with nodemon
- `npm start` - start backend with node
- `npm run build` - generate Prisma client

Frontend (`frontend/package.json`):

- `npm run dev` - start Vite dev server
- `npm run build` - production build
- `npm run preview` - preview production build
- `npm run lint` - run ESLint

## Auth Endpoints

- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/me` (requires `Authorization: Bearer <token>`)

## Troubleshooting

- Login fails with invalid credentials:
  - ensure backend started after database became reachable
  - check backend logs for `Demo user ready:` message
- CORS errors:
  - ensure `CLIENT_URL` in backend `.env` matches frontend origin
- Prisma connection errors:
  - verify `DATABASE_URL`
  - run migrations before starting backend

## Security Notes

- Do not commit real API keys or DB credentials.
- Use different secrets for local, staging, and production.
- Rotate any secrets that were exposed by mistake.

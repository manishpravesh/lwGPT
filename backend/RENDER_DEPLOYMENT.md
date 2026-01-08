# Deploying Backend to Render

## Prerequisites

- Render account (https://render.com)
- GitHub repository connected (recommended)

## Deployment Steps

### 1. Push Code to GitHub

Make sure your backend code is pushed to GitHub.

### 2. Create New Web Service on Render

1. Go to [render.com](https://render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Select the repository containing your code

### 3. Configure Web Service

- **Name**: lwland-backend (or your preferred name)
- **Environment**: Node
- **Region**: Choose closest to your users
- **Branch**: main (or your default branch)
- **Build Command**: `npm install && npx prisma generate`
- **Start Command**: `node paymentGate.js`

### 4. Add Environment Variables

Go to Environment section and add:

```
NODE_ENV=production
DATABASE_URL=<your_postgres_connection_string>
STRIPE_SECRET_KEY=<your_stripe_secret_key>
STRIPE_WEBHOOK_SECRET=<your_stripe_webhook_secret>
JWT_SECRET=<your_jwt_secret>
CLIENT_URL=<your_frontend_url>
UPSTASH_REDIS_REST_URL=<your_redis_url>
UPSTASH_REDIS_REST_TOKEN=<your_redis_token>
```

### 5. Deploy

- Click "Create Web Service"
- Render will automatically build and deploy your app
- You'll get a live URL (e.g., https://lwland-backend.onrender.com)

## Database Setup

- Make sure your PostgreSQL database is accessible from Render
- If using Supabase/Neon, ensure network access is allowed
- Update `DATABASE_URL` in environment variables

## Important Notes

- **Cold starts**: Free tier has cold starts (slower initial response)
- **Prisma**: Ensure `prisma generate` runs during build
- **Webhooks**: Update Stripe webhook URL to your Render URL
- **CORS**: Update `CLIENT_URL` environment variable to your frontend domain

## Troubleshooting

- Check logs in Render dashboard for errors
- Verify all environment variables are set correctly
- Ensure database credentials are valid
- Check that your database allows connections from Render IP

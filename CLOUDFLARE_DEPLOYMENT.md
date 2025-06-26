# Cloudflare Deployment Guide

This project can be deployed to Cloudflare using multiple approaches. Here are your options:

## Option 1: Cloudflare Pages + External Database (Recommended)

### What You'll Need:
- Cloudflare Pages account (free)
- External PostgreSQL database (Neon, Supabase, or similar)
- External hosting for API server (Railway, Render, etc.)

### Steps:
1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Deploy frontend to Cloudflare Pages:**
   - Upload the `dist/public` folder to Cloudflare Pages
   - Configure environment variables in Cloudflare dashboard
   - Set build command: `npm run build`
   - Set output directory: `dist/public`

3. **Deploy API server separately:**
   - Deploy the Express server to Railway, Render, or similar
   - Update API endpoints in frontend to point to your API server

4. **Environment Variables to set in Cloudflare:**
   - `VITE_API_URL` (URL of your deployed API server)
   - All other environment variables should be set on your API server

## Option 2: Full Cloudflare Workers (Advanced)

### What You'll Need:
- Cloudflare Workers account
- Cloudflare D1 database (or external PostgreSQL)
- Wrangler CLI

### Steps:
1. **Install Wrangler:**
   ```bash
   npm install -g wrangler
   ```

2. **Login to Cloudflare:**
   ```bash
   wrangler login
   ```

3. **Deploy:**
   ```bash
   wrangler pages deploy dist/public
   ```

## Option 3: GitHub Integration (Easiest)

### What You'll Need:
- GitHub account
- Cloudflare Pages account

### Steps:
1. **Push code to GitHub:**
   - Create a new GitHub repository
   - Push your code to the repository

2. **Connect to Cloudflare Pages:**
   - Go to Cloudflare Pages dashboard
   - Connect your GitHub repository
   - Set build command: `npm run build`
   - Set output directory: `dist/public`

3. **Configure environment variables:**
   - Add your environment variables in Cloudflare Pages settings
   - Deploy your API server separately (see Option 1)

## Environment Variables Needed:

### For API Server (deployed separately):
- `DATABASE_URL` - Your PostgreSQL connection string
- `OPENAI_API_KEY` - Your OpenAI API key
- `BREVO_API_KEY` - Your Brevo email API key
- `PEXELS_API_KEY` - Your Pexels API key
- `SESSION_SECRET` - Random string for session security

### For Frontend (Cloudflare Pages):
- `VITE_API_URL` - URL of your deployed API server

## Database Setup:

Since this project uses PostgreSQL, you'll need:
1. **Neon Database** (recommended, free tier available)
2. **Supabase** (free tier available)
3. **PlanetScale** (MySQL alternative)

Run the database migration after deployment:
```bash
npm run db:push
```

## Files Created for Cloudflare:
- `wrangler.toml` - Cloudflare Workers configuration
- `functions/api/[[path]].ts` - API route handler template
- This deployment guide

## Recommended Approach:

**Use Option 3 (GitHub Integration)** as it's the easiest:
1. Push code to GitHub
2. Connect GitHub to Cloudflare Pages
3. Deploy API server to Railway/Render
4. Configure environment variables
5. Your site will auto-deploy on every GitHub push!
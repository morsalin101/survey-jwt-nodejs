# 🚀 Vercel Deployment Guide

This guide will help you deploy your Firebase JWT authentication server to Vercel.

## 📋 Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Account**: For repository integration (recommended)
3. **Node.js 18+**: Ensure you have Node.js 18 or higher

## 🔧 Installation & Setup

### 1. Install Vercel CLI (Optional but Recommended)

```cmd
npm install -g vercel
```

### 2. Install Project Dependencies

```cmd
cd g:\project\survey-jwt-nodejs
npm install
```

## 🌐 Deployment Methods

### Method 1: GitHub Integration (Recommended)

1. **Push to GitHub**:
   ```cmd
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect the configuration

3. **Configure Environment Variables** (see section below)

4. **Deploy**: Click "Deploy" - your app will be live in minutes!

### Method 2: Vercel CLI

1. **Login to Vercel**:
   ```cmd
   vercel login
   ```

2. **Deploy from Local Directory**:
   ```cmd
   cd g:\project\survey-jwt-nodejs
   vercel
   ```

3. **Follow CLI Prompts**:
   - Set up and deploy: `Y`
   - Which scope: Choose your account
   - Link to existing project: `N`
   - Project name: `survey-jwt-nodejs`
   - Directory: `./`

4. **Production Deployment**:
   ```cmd
   vercel --prod
   ```

## 🔐 Environment Variables Configuration

### Via Vercel Dashboard:

1. Go to your project in [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on your project → Settings → Environment Variables
3. Add these variables:

| Name | Value | Environment |
|------|-------|-------------|
| `FIREBASE_PROJECT_ID` | `your-firebase-project-id` | Production, Preview, Development |
| `NODE_ENV` | `production` | Production |

### Via Vercel CLI:

```cmd
# Add environment variable
vercel env add FIREBASE_PROJECT_ID

# List environment variables
vercel env ls

# Remove environment variable
vercel env rm FIREBASE_PROJECT_ID
```

## 🧪 Testing Your Deployment

### 1. Health Check
```cmd
curl https://your-app-name.vercel.app/
```

### 2. Authentication Endpoint
```cmd
curl -X POST https://your-app-name.vercel.app/auth \
  -H "Authorization: Bearer YOUR_FIREBASE_JWT_TOKEN" \
  -H "Content-Type: application/json"
```

### 3. Local Development with Vercel
```cmd
npm run vercel-dev
```
This starts Vercel's local development server that mimics the production environment.

## 📂 Project Structure for Vercel

```
survey-jwt-nodejs/
├── api/                    # Serverless functions
│   ├── auth.js            # Main auth handler
│   └── health.js          # Health check endpoint
├── vercel.json            # Vercel configuration
├── package.json           # Dependencies and scripts
├── .env                   # Local environment (not deployed)
├── .gitignore            # Git ignore rules
└── README.md             # Documentation
```

## 🔄 Automatic Deployments

Once connected to GitHub:
- **Production**: Push to `main` branch
- **Preview**: Push to any other branch or PR
- **Rollback**: Use Vercel dashboard or CLI

## 🎯 Integration with Hasura

Update your Hasura configuration to use your Vercel URL:

```env
HASURA_GRAPHQL_AUTH_HOOK=https://your-app-name.vercel.app/auth
```

Or in Hasura Cloud:
- Go to your project settings
- Add environment variable: `HASURA_GRAPHQL_AUTH_HOOK`
- Value: `https://your-app-name.vercel.app/auth`

## 🐛 Troubleshooting

### Common Issues:

1. **Environment Variables Not Set**:
   - Ensure `FIREBASE_PROJECT_ID` is configured in Vercel
   - Check the environment variables in your project settings

2. **CORS Issues**:
   - The API functions include CORS headers
   - If issues persist, check your client-side requests

3. **Function Timeout**:
   - Vercel functions have a 10-second timeout (hobby plan)
   - Pro plans have higher limits

4. **Cold Starts**:
   - First request after inactivity may be slower
   - This is normal for serverless functions

### Debugging:

1. **View Logs**:
   ```cmd
   vercel logs your-app-name.vercel.app
   ```

2. **Real-time Logs**:
   ```cmd
   vercel logs --follow
   ```

## 🚀 Performance Tips

1. **Keep Functions Lightweight**: Minimize dependencies in API functions
2. **Use Environment Variables**: Store configuration in Vercel env vars
3. **Monitor Usage**: Check your Vercel dashboard for usage metrics
4. **Optimize Imports**: Use tree-shaking compatible imports

## 📝 Next Steps

After successful deployment:

1. ✅ Test all endpoints
2. ✅ Configure Hasura webhook
3. ✅ Set up monitoring/alerting
4. ✅ Configure custom domain (optional)
5. ✅ Set up CI/CD with GitHub Actions (optional)

## 💡 Pro Tips

- Use `vercel --prod` for production deployments
- Preview deployments are great for testing
- Environment variables can be scoped to specific environments
- Use Vercel Analytics for monitoring (available in dashboard)

Your Firebase JWT authentication server is now ready for production on Vercel! 🎉
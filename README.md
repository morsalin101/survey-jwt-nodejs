# Firebase JWT Authentication for Hasura

This Node.js server provides Firebase JWT token validation for Hasura GraphQL engine authentication webhooks.

## Features

- 🔥 Firebase JWT token verification
- 🔐 Hasura claims mapping
- 🚀 Express.js server with CORS support
- 🌍 Environment-based configuration
- 📝 Comprehensive error handling

## Setup Instructions

### 1. Install Dependencies

```cmd
cd g:\project\survey-jwt-nodejs
npm install
```

### 2. Configure Environment

Edit the `.env` file and replace `your-firebase-project-id` with your actual Firebase project ID:

```env
FIREBASE_PROJECT_ID=your-actual-firebase-project-id
PORT=3000
NODE_ENV=development
```

### 3. Start the Server

```cmd
npm start
```

For development with auto-reload:
```cmd
npm run dev
```

### 4. Test the Server

The server will be available at `http://localhost:3000`

- Health check: `GET http://localhost:3000/`
- Auth endpoint: `POST http://localhost:3000/auth`

## Usage with Hasura

Configure your Hasura GraphQL engine to use this authentication webhook:

1. Set the webhook URL in your Hasura configuration:
   ```
   HASURA_GRAPHQL_AUTH_HOOK=http://localhost:3000/auth
   ```

2. Or use it in Hasura Cloud by adding the webhook URL in the "Env vars" section.

## API Endpoints

### POST /auth

Validates Firebase JWT tokens and returns Hasura claims.

**Headers:**
```
Authorization: Bearer <firebase-jwt-token>
```

**Response (Success):**
```json
{
  "X-Hasura-User-Id": "user123",
  "X-Hasura-Role": "user",
  "X-Hasura-Default-Role": "user",
  "X-Hasura-Allowed-Roles": ["user", "admin", "super_admin"]
}
```

**Response (Error):**
```json
{
  "message": "Invalid token"
}
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `FIREBASE_PROJECT_ID` | Your Firebase project ID | Required |
| `PORT` | Server port | 3000 |
| `NODE_ENV` | Environment mode | development |

## Firebase Setup

1. Go to your Firebase Console
2. Select your project
3. Go to Project Settings > General
4. Copy your Project ID
5. Update the `.env` file with your Project ID

## Security Notes

- This server validates Firebase JWT tokens using Google's public keys
- Tokens must have the correct audience (your Firebase project ID)
- Tokens must be signed by Google's secure token service
- The server maps Firebase user roles to Hasura claims

## Troubleshooting

### PowerShell Execution Policy Issues

If you encounter PowerShell execution policy errors, use cmd instead:

```cmd
cmd /c "npm install"
cmd /c "npm start"
```

### Invalid Token Errors

- Ensure your Firebase project ID is correct in `.env`
- Check that the JWT token is properly formatted
- Verify the token hasn't expired
- Ensure the token was issued by your Firebase project

## 🚀 Deployment

### Local Development
```cmd
npm start              # Start Express server
npm run dev           # Development mode with auto-reload
```

### Vercel Deployment
```cmd
npm install -g vercel  # Install Vercel CLI
vercel                # Deploy to Vercel
vercel --prod         # Production deployment
```

📖 **[Complete Vercel Deployment Guide](./VERCEL_DEPLOYMENT.md)**

## Project Structure

```
survey-jwt-nodejs/
├── api/                        # Vercel serverless functions
│   ├── auth.js                # Main authentication handler
│   └── health.js              # Health check endpoint
├── .env                       # Environment configuration (local only)
├── .gitignore                 # Git ignore rules
├── package.json               # Node.js dependencies and scripts
├── server.js                  # Express server (for local development)
├── auth-handler.js           # Original handler (kept for reference)
├── vercel.json               # Vercel deployment configuration
├── README.md                 # This documentation
└── VERCEL_DEPLOYMENT.md      # Detailed deployment guide
```
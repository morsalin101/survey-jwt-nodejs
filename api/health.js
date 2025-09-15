export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  res.status(200).json({
    message: "Firebase JWT Authentication Server for Hasura",
    status: "running",
    environment: "vercel",
    endpoints: {
      auth: "/auth",
      health: "/"
    },
    firebase_project_id: process.env.FIREBASE_PROJECT_ID ? "configured" : "not configured",
    timestamp: new Date().toISOString()
  });
}
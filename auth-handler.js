import jwt from "jsonwebtoken";
import jwksClient from "jwks-rsa";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Firebase project config
const client = jwksClient({
  jwksUri: "https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com"
});

// Get signing key
function getKey(header, callback) {
  client.getSigningKey(header.kid, function (err, key) {
    if (err) {
      callback(err, null);
    } else {
      const signingKey = key.getPublicKey();
      callback(null, signingKey);
    }
  });
}

export default async function handler(req, res) {
  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Get Firebase project ID from environment
    const firebaseProjectId = process.env.FIREBASE_PROJECT_ID;
    
    if (!firebaseProjectId) {
      return res.status(500).json({ message: "Firebase project ID not configured" });
    }

    // Verify Firebase JWT
    jwt.verify(
      token,
      getKey,
      {
        algorithms: ["RS256"],
        audience: firebaseProjectId,
        issuer: `https://securetoken.google.com/${firebaseProjectId}`
      },
      (err, decoded) => {
        if (err) {
          console.error("JWT verification error:", err);
          return res.status(401).json({ message: "Invalid token" });
        }

        // Map Firebase user → Hasura claims
        const role = decoded.role || "user"; // default role = user
        const userId = decoded.user_id;

        return res.json({
          "X-Hasura-User-Id": userId,
          "X-Hasura-Role": role,
          "X-Hasura-Default-Role": role,
          "X-Hasura-Allowed-Roles": ["user", "admin", "super_admin"]
        });
      }
    );
  } catch (err) {
    console.error("Handler error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}
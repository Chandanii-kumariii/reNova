import jwt from "jsonwebtoken";

export default function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Access denied. No authentication token provided." });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "sr_void_super_secret_cipher_phrase_key");
    req.user = decoded; // { id, email }
    next();
  } catch (error) {
    res.status(401).json({ error: "Access denied. Invalid or expired token." });
  }
}

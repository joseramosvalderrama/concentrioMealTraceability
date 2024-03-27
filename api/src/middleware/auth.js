import jwt from "jsonwebtoken";

export function verifyToken(req, res, next) {
  const authHeader = req.header("Authorization");
  if (!authHeader) return res.status(401).json({ error: "Access denied" });

  const token = authHeader.split(" ")[1]; // Extract token without the "Bearer" prefix
  if (!token) return res.status(401).json({ error: "Access denied" });

  try {
    const decoded = jwt.verify(token, "concentrio");
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
}

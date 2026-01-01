import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    let user;
    try {
      user = await prisma.user.findUnique({
        where: { id: decoded.id },
        select: {
          id: true,
          email: true,
          role: true,
        },
      });
    } catch (dbErr) {
      console.error("Database error in auth:", dbErr.message);
      // If database is temporarily unavailable, still allow the request
      // The user ID from the token is valid even if we can't verify it
      user = {
        id: decoded.id,
        role: "FREE", // Default role
        email: "", // Unknown email
      };
    }

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("Auth error:", err.message);
    return res.status(401).json({ error: "Invalid token" });
  }
};

export default authMiddleware;

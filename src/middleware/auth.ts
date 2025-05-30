import type { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

// Extend the Request interface to include user
declare global {
  namespace Express {
    interface Request {
      user: any
    }
  }
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1]

  if (!token) {
    res.status(401).json({ error: "Authentication required" })
    return
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string)
    req.user = decoded
    console.log("Decoded token:", decoded)
    next()
  } catch (error) {
    res.status(403).json({ error: "Invalid or expired token" })
    return
  }
}

import jwt from "jsonwebtoken";
import auth from "../config/auth";

export function authMiddleware(req: any, res: any, next: any) {
  const token = req.headers.authorization;

  if (!token)
    return res.status(401).json({
      erro: "Token não enviado."
    });

  try {
    const decoded = jwt.verify(
      token.replace("Bearer ", ""),
      auth.jwtSecret
    );
    
    req.user = decoded;
    next();
  }
  catch {
    return res.status(401).json({
      erro: "Token inválido."
    });
  }
}
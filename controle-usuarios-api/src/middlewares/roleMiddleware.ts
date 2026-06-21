export function adminMiddleware(req: any, res: any, next: any) {
  if (req.user.role !== "Administrador") {
    return res.status(403).json({
      erro: "Acesso negado."
    });
  }
  
  next();
}
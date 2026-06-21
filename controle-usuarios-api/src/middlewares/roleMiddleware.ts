export function adminMiddleware(req: any, res: any, next: any) {
  if (req.user.role !== "Admin") {
    return res.status(403).json({
      erro: "Acesso negado.",
    });
  }

  next();
}
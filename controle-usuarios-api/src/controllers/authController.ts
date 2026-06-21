import { Request, Response } from "express";
import { AuthService } from "../services/authService";

const service = new AuthService();

export class AuthController {
  async login(req: Request, res: Response) {
    try {
      const { email, senha } = req.body;
      const resultado = await service.login(
        email,
        senha
      );
      
      return res.json(resultado);
    }
    catch (error: any) {
      return res.status(401).json({
        erro: error.message
      });
    }
  }
}
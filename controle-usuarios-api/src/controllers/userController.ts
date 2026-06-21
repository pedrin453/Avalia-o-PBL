import { Request, Response } from "express";
import { UserService } from "../services/userService";

const service = new UserService();

export class UserController {

  async create(req: Request, res: Response) {
    try {
      const user = await service.create(req.body);
      return res.status(201).json(user);
    } catch (error: any) {
      return res.status(400).json({
        erro: error.message
      });
    }
  }

  async findAll(req: Request, res: Response) {
    const users = await service.findAll();
    return res.json(users);
  }

  async findById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const user = await service.findById(id);
      return res.json(user);
    } catch (error: any) {
      return res.status(404).json({
        erro: error.message
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const user = await service.update(id, req.body);
      return res.json(user);
    } catch (error: any) {
      return res.status(400).json({
        erro: error.message
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      await service.delete(id);

      return res.json({
        mensagem: "Usuário removido."
      });
    } catch (error: any) {
      return res.status(400).json({
        erro: error.message
      });
    }
  }

} // <-- A classe termina somente aqui
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma";
import { compararSenha } from "../utils/hash";
import auth from "../config/auth";

export class AuthService {
  async login(email: string, senha: string) {
    const usuario = await prisma.user.findUnique({
      where: { email },
      include: { role: true }
    });

    if (!usuario)
      throw new Error("Usuário não encontrado.");

    const senhaCorreta = await compararSenha(
      senha,
      usuario.senha
    );

    if (!senhaCorreta)
      throw new Error("Senha inválida.");

    const token = jwt.sign(
      {
        id: usuario.id,
        role: usuario.role.nome
      },
      auth.jwtSecret,
      {
        expiresIn: "1d"
      }
    );

    await prisma.session.create({
      data: {
        token,
        userId: usuario.id
      }
    });

    return {
      usuario,
      token
    };
  }
}
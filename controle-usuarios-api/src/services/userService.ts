import { prisma } from "../lib/prisma";
import { gerarHash } from "../utils/hash";

export class UserService {
  async create(data: any) {
    const existe = await prisma.user.findUnique({
      where: {
        email: data.email
      }
    });

    if (existe) {
      throw new Error("Email já cadastrado.");
    }

    const senha = await gerarHash(data.senha);

    const user = await prisma.user.create({
      data: {
        nome: data.nome,
        email: data.email,
        senha,
        roleId: data.roleId
      }
    });

    await prisma.log.create({
      data: {
        acao: "Usuário criado.",
        userId: user.id
      }
    });

    return user;
  }

  async findAll() {
    return prisma.user.findMany({
      include: {
        role: true
      }
    });
  }

  async findById(id: number) {
    const user = await prisma.user.findUnique({
      where: { id },
      include: { role: true }
    });

    if (!user) {
      throw new Error("Usuário não encontrado.");
    }

    return user;
  }

  async update(id: number, data: any) {
    const usuario = await prisma.user.findUnique({
      where: { id }
    });

    if (!usuario) {
      throw new Error("Usuário não encontrado.");
    }

    const user = await prisma.user.update({
      where: { id },
      data: {
        nome: data.nome,
        email: data.email,
        status: data.status,
        roleId: data.roleId
      }
    });

    await prisma.log.create({
      data: {
        acao: "Usuário atualizado.",
        userId: user.id
      }
    });

    return user;
  }

  async delete(id: number) {
    const usuario = await prisma.user.findUnique({
      where: { id }
    });

    if (!usuario) {
      throw new Error("Usuário não encontrado.");
    }

    const user = await prisma.user.delete({
      where: { id }
    });

    await prisma.log.create({
      data: {
        acao: "Usuário removido.",
        userId: user.id
      }
    });

    return user;
  }
}
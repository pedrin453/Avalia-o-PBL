import { prisma } from "../lib/prisma";
import { gerarHash } from "../utils/hash";

export class UserService {
  async create(data: any) {
    if (!data.nome) throw new Error("Nome obrigatório.");
    if (!data.email) throw new Error("Email obrigatório.");
    if (!data.senha) throw new Error("Senha obrigatória.");

    const existe = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
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
        roleId: data.roleId,
      },
    });

    await prisma.log.create({
      data: {
        acao: `Usuário ${data.nome} criado.`,
        userId: user.id,
      },
    });

    return user;
  }

  async findAll() {
    return prisma.user.findMany({
      include: {
        role: true,
      },
    });
  }

  async findById(id: number) {
    const user = await prisma.user.findUnique({
      where: { id },
      include: { role: true },
    });

    if (!user) {
      throw new Error("Usuário não encontrado.");
    }

    return user;
  }

  async update(id: number, data: any) {
    if (!data.nome) throw new Error("Nome obrigatório.");

    const usuario = await prisma.user.findUnique({
      where: { id },
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
        roleId: data.roleId,
      },
    });

    await prisma.log.create({
      data: {
        acao: "Usuário atualizado.",
        userId: user.id,
      },
    });

    return user;
  }

  async delete(id: number) {
    const usuario = await prisma.user.findUnique({
      where: { id },
    });

    if (!usuario) {
      throw new Error("Usuário não encontrado.");
    }

    const user = await prisma.user.delete({
      where: { id },
    });

    return user;
  }
}

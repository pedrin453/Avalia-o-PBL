import bcrypt from "bcrypt";

export async function gerarHash(senha: string) {
  return await bcrypt.hash(senha, 10);
}

export async function compararSenha(
  senha: string,
  hash: string
) {
  return await bcrypt.compare(senha, hash);
}
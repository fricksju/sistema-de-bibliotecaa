import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function registrarUsuario(req, res) {
  const { username, password } = req.body;


  if (!username || !password) {
    return res.status(400).json({ message: "Username e senha são obrigatórios" });
  }

  if (password.length < 4) {
    return res.status(400).json({ message: "Senha deve ter pelo menos 4 caracteres" });
  }

  try {

    const existente = await prisma.users.findUnique({ where: { username } });
    if (existente) {
      return res.status(400).json({ message: "Esse username já existe" });
    }


    const totalUsers = await prisma.users.count();
    const isAdmin = totalUsers === 0;

    const novoUser = await prisma.users.create({
      data: { username, password, isAdmin }
    });

    return res.status(201).json({
      message: "Usuário registrado com sucesso",
      id: novoUser.id,
      isAdmin: novoUser.isAdmin
    });
  } catch (err) {
    console.error("Erro ao registrar usuário:", err);
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
}

async function listarUsuarios(req, res) {
  try {
    const usuarios = await prisma.user.findMany({
      select: { id: true, username: true, isAdmin: true }
    });
    return res.json(usuarios);
  } catch (err) {
    console.error("Erro ao listar usuários:", err);
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
}

async function meuPerfil(req, res) {
  if (!req.user) {
    return res.status(401).json({ message: "Usuário não autenticado" });
  }

  const { id, username, isAdmin } = req.user;
  return res.json({ id, username, isAdmin });
}

export { registrarUsuario, listarUsuarios, meuPerfil };

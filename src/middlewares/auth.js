import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function authMiddleware(req, res, next) {
  try {
    const auth = req.headers.authorization;

    if (!auth || !auth.startsWith("Basic ")) {
      return res.status(401).json({ message: "Token precisa ser Basic" });
    }
    
    const conteudoToken = auth.split(" ")[1];

    const tokenDescript = Buffer.from(conteudoToken, "base64").toString("utf8");
    const [username, password] = tokenDescript.split(":");

    if (!username || !password) {
      return res.status(401).json({ message: "Formato inválido do token" });
    }

    // Busca usuário no banco
    const acessarUser = await prisma.user.findUnique({ where: { username } });

    if (!acessarUser) {
      return res.status(401).json({ message: "Usuário não encontrado" });
    }

    if (acessarUser.password !== password) {
      return res.status(401).json({ message: "Senha incorreta!" });
    }

  
    req.user = acessarUser;
    next();

  } catch (erro) {
    console.error("Erro no authMiddleware:", erro);
    res.status(500).json({ message: "Erro de autenticação" });
  }
}

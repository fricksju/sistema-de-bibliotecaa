export async function verificarAdmin(req, res, next) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "usuário não autenticado" });
    }

    if (!req.user.isAdmin) {
      return res.status(403).json({ message: "usuário não tem permissão de admin" });
    }

    next();
  } catch (erro) {
    console.error("Erro no verificarAdmin:", erro);
    return res.status(500).json({ message: "Erro no servidor" });
  }
}

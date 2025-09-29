async function verificarAdmin(req, res, next) {
    try {
        if (!req.user) {
            return res.status(401).json({ mensagem: "usuário não autenticado" });
        }

        if (req.user.isAdmin) {
            return next();
        } else {
            return res.status(403).json({ mensagem: "usuário não tem permissão de admin" });
        }

    } catch (erro) {
        console.log(erro);
        return res.status(500).json({ mensagem: "erro no servidor" });
    }
}

module.exports = verificarAdmin;


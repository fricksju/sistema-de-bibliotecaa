async function verificarAdmin(req, res, next) {
    try {
        if (!req.user) {
            return res.status(401).json({ mensagem: "Usuário não autenticado" });
        }

        if (req.user.isAdmin) {
            return next();
        } else {
            return res.status(403).json({ mensagem: "Usuário não tem permissão de admin" });
        }

    } catch (err) {
        console.log(err);
        return res.status(500).json({ mensagem: "Erro no servidor" });
    }
}

module.exports = verificarAdmin;


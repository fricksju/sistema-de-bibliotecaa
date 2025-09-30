import { Router } from "express";
import {
    detalhesLivro,
    listarLivros,
    criarLivro,
    atualizarLivro,
    deletarLivro,
    emprestarLivro,
    devolverLivro
} from "../Controllers/bookscontroller.js";

import { authMiddleware } from "../middlewares/auth.js";
import { verificarAdmin } from "../middlewares/admin.js";

const router = Router();

// rotas de livros precisam de login
router.use(authMiddleware);

// listar todos os livros
router.get("/", listarLivros);

// pegar livro por id
router.get("/:id", detalhesLivro);

// criar livro (admin)
router.post("/", verificarAdmin, criarLivro);

// atualizar livro (admin)
router.patch("/:id", verificarAdmin, atualizarLivro);

// deletar livro (admin)
router.delete("/:id", verificarAdmin, deletarLivro);

// emprestar livro
router.post("/:id/borrow", emprestarLivro);

// devolver livro
router.post("/:id/return", devolverLivro);

export default router;

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function detalhesLivro(req, res) {
    try {
        const livroId = parseInt(req.params.id);

        if (isNaN(livroId)) {
            return res.status(400).json({ error: "ID inválido" });
        }

        const Detalhes = await prisma.books.findUnique({
            where: {
                id: livroId
            }
        });

        if (!Detalhes) {
            return res.status(404).json({ error: "Livro não encontrado" });
        }

        res.json(Detalhes);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Erro ao buscar livro" });
    }
}

export async function listarLivros(req, res) {
    try {

        const Listar = await prisma.books.findMany()
        
        return res.json(Listar);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ erro: "Erro ao listar livros"});
    }
}

export async function criarLivro(req, res) {

    try {
        const { titulo, autor } = req.body;

        if (!titulo || !autor) {
            return res.status(400).json({ erro: "Todos os campos devem ser preenchidos" });
        }

        const novoLivro = await prisma.books.create({
            data: {
                titulo,
                autor,
            },
        });

        return res.json({
            message: "Livro criado com sucesso!",
            book: titulo
        });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ erro: "Erro ao criar livro" });
    }
}

export async function atualizarLivro(req, res) {
    try{
        const { id } = req.params;
        const { titulo, autor, available } = req.body;

        const livroId = parseInt(id);
        
        if (isNaN(livroId)) {
            return res.status(400).json({ mensagem: "ID inválido" });
        }

        const livro = await prisma.books.findUnique({
            where: {
                id: livroId
            }
        });

        if (!livro) {
            return res.status(404).json({ mensagem: "Este livro não existe!" });
        }
        
        const livroAtualizado = await prisma.books.update({
            where: { id: Number(id) },
            data: {
                titulo,
                autor,
                available,
            },
        });

        return res.json({
            message: "Livro atualizado com sucesso!",
            book: titulo
        });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ erro: "Erro ao atualizar livro" });
    }
}

export async function deletarLivro(req, res) {
    try{
        const { id } = req.params;

        await prisma.books.delete({
            where: { id: Number(id) },
        });

        return res.json({ mensagem: "Livro deletado com sucesso" });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ erro: "Erro ao deletar livro" });
    }
}

export async function emprestarLivro(req, res) {
    try {
        const { id } = req.params;

        const livroId = Number(id);
        
        if (isNaN(livroId)) {
            return res.status(400).json({ error: "ID inválido" });
        }

        const livro = await prisma.books.findUnique({ 
            where: { id: livroId } 
        });

        if (!livro) {
            return res.status(404).json({ error: "Livro não encontrado" });
        }

        if (!livro.available) {
            return res.status(400).json({ error: "Livro indisponível" });
        }

        const livroAtualizado = await prisma.books.update({
            where: { id: livroId },
            data: { available: false },
        });

        return res.json({ 
            mensagem: "Livro emprestado com sucesso", 
        });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: "Erro ao emprestar livro" });
    }
}

export async function devolverLivro(req, res) {
    try {
        const { id } = req.params;
        
        const livroId = Number(id);
        
        if (isNaN(livroId)) {
            return res.status(400).json({ error: "ID inválido" });
        }

        const livro = await prisma.books.findUnique({
            where: { id: livroId },
        });

        if (!livro) {
            return res.status(404).json({ error: "Livro não encontrado" });
        }

        if (livro.available) {
            return res.status(400).json({ error: "Livro já está disponível" });
        }

        const livroAtualizado = await prisma.books.update({
            where: { id: livroId },
            data: {
                available: true,
            },
        });

        return res.json({ 
            mensagem: "Livro devolvido com sucesso", 
        });

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: "Erro ao devolver livro" });
    }
}
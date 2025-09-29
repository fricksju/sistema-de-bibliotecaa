const express = require("express");
const authRoutes = require("./src/routes/auth");
const booksRoutes = require("./src/routes/books");

const app = express();
app.use(express.json());

// rotas
app.use("/auth", authRoutes);   
app.use("/books", booksRoutes); 

app.get("/", (req, res) => res.json({ message: "API Biblioteca rodando" }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

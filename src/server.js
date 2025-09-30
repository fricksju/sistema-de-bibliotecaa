import express, { Router } from "express";
import booksRoutes from "./routes/books.js";
import authRoutes from "./routes/users.js";
import routerUser from "./routes/users.js";

const app = express();
app.use(express.json());


//router = express.Router();


// rotas
app.use("/auth", authRoutes);
app.use("/books", booksRoutes);

app.get("/", (req, res) => res.json({ message: "API Biblioteca rodando" }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${3000}`));

import { Router } from "express";
import {
  registrarUsuario,
  listarUsuarios,
  meuPerfil
} from "../Controllers/userscontroller.js";

import { authMiddleware } from "../middlewares/auth.js";
import { verificarAdmin } from "../middlewares/admin.js";

const router = Router();

router.post("/register", registrarUsuario);

router.get("/", authMiddleware, verificarAdmin, listarUsuarios);
router.get("/me", authMiddleware, meuPerfil);

export default routerUser;



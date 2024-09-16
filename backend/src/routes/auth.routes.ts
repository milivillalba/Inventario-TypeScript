import { Router } from "express";
import { login,register } from "../controllers/auth.controller";

const router= Router();

//ruta pra registro de usuario
router.post('/register',register);
//ruta para el login
router.post('/login',login)

export default router;
import { Router } from "express";
import AuthController from "./controllers.js";
import AcessoRotas from "../../middlewares/AcessoRotas.js";

const router = new Router();

const authController = new AuthController();

// LOGIN
router.post("/login", authController.login); 

// CRUD USUARIOS  
router.post("/usuarios", authController.criarUsuario);   
router.get("/usuarios", AcessoRotas, authController.listarUsuario);  
router.get("/usuarios/:id", AcessoRotas, authController.listarUsuarioPorId);  
router.put("/usuarios/:id", authController.atualizarUsuario);    
 
export default router;         
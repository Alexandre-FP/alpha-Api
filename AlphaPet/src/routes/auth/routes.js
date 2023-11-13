import express from "express";
import AuthController from "./controllers.js";
import AcessoRotas from "../../middlewares/AcessoRotas.js";

const router = express.Router();

const authController = new AuthController();

// LOGIN
router.post("/login", authController.login); 

// CRUD USUARIOS 
router.post("/usuaios", authController.criarUsuario);   
router.get("/usuarios", AcessoRotas, authController.listarUsuario); 
router.put("/usuarios/:id", AcessoRotas, authController.atualizarUsuario);    
 
export default router;     
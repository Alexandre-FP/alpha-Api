import ProcedimentosController from "./controllers.js"
import AcessoRotas from "../../middlewares/AcessoRotas.js";
import { Router } from "express";

const router = new Router();

const procedimentosController = new ProcedimentosController()

// CRUD PROCEDIMENTOS
router.post("/", AcessoRotas, procedimentosController.criarProcedimento); 
router.get("/", AcessoRotas, procedimentosController.listarProcedimentos);
router.get("/:id", AcessoRotas, procedimentosController.pesquisarProcedimento);
router.put("/:id", AcessoRotas, procedimentosController.atualizarProcedimento);
router.delete("/:id", AcessoRotas, procedimentosController.deleteProcedimento);  

export default router;   

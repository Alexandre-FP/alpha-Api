import AgendarCliente from "./controllers.js"
import AcessoRotas from "../../middlewares/AcessoRotas.js";
import express from "express";

const router = express.Router();

const agendarCliente = new AgendarCliente()

// CRUD CADASTRARCLIENTE
router.post("/", AcessoRotas, agendarCliente.cadastrarCliente);
router.get("/", AcessoRotas, agendarCliente.listarCliente); 

export default router;  
 
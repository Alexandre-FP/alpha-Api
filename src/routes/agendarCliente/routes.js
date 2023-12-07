import AgendarCliente from "./controllers.js"
import AcessoRotas from "../../middlewares/AcessoRotas.js";
import { Router } from "express";

const router = new Router();

const agendarCliente = new AgendarCliente()
 
// CRUD CADASTRARCLIENTE
router.post("/", AcessoRotas, agendarCliente.cadastrarCliente);
router.get("/", AcessoRotas, agendarCliente.listarCliente); 

export default router;   
 
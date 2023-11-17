import express, { json, urlencoded }  from "express";
import createHttpError from "http-errors";
import cors from "cors"
import morgan from "morgan";
const port = 3003

import { auth, procedimentos, agendarCliente } from "./routes/index.js"; 

const app = express();

app.use(json());
app.use(cors());
app.use(morgan("dev")) // aparece os http no terminal
app.use(urlencoded({ extended: false })); 

// HTTP ROTAS 
app.use("/api/auth", auth);   
app.use("/api/procedimentos", procedimentos);   
app.use("/api/clientes", agendarCliente);    

// app.use((req, res, next) => {
//     next(createHttpError.NotFound()); 
// });
  

app.listen(port, () => console.log(`✅ Running on PORT ${port}`));

export default app;  


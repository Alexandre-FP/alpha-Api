import jwt from "jsonwebtoken";
import prisma from "../../db/index.js";

class AgendarCliente {
    async cadastrarCliente(req, res){
        const { body, headers } = req;
        const [, tokenEncriptado] = headers.authorization.split(" ");

        const token = jwt.verify(tokenEncriptado, process.env.SECRET_PASS_JWT);

        const procedimentosCriados = await prisma.procedimentos.findMany()

        const result = await prisma.agendarClientes.create({
            data: {
                ...body, 
                procedimento: {
                    connect: procedimentosCriados
                },
                usuarioId: token?.id,  
            }
        });

        return res.status(201).json({ content: result })  
    }  

    async listarCliente(req, res){
        const result = await prisma.agendarClientes.findMany({
            include: { 
                procedimento: true,
                usuarios: {
                    select: { 
                        id: true,
                        nome: true
                    } 
                }
            }
        });

        return res.status(200).json({ content: result });
    }
}

export default AgendarCliente; 
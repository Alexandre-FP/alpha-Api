import prisma from "../../db/index.js";

class ProcedimentosController {
    async criarProcedimento(req, res){
        const { nome } = req.body

        const result  = await prisma.procedimentos.create({
            data: {
                nome  
            } 
        })

        res.status(201).json({ content: result }); 
    }

    async listarProcedimentos(req, res){
        const result = await prisma.procedimentos.findMany({
            where: {
                situacao: 'ATIVO'
            }
        });

        return res.status(200).json({ content: result });
    }

    async pesquisarProcedimento(req, res){
        const { params } = req

        const result = await prisma.procedimentos.findUnique({
            where: {
                id: Number(params.id)
            }
        });

            if(!result){
                return res.status(404).json({ mensage: "Procedimento não existe " })
            }

            return res.status(200).json({ content: result  }); 
        }

    async atualizarProcedimento(req, res){
        const { body, params } = req

        const procedimentoExiste = await prisma.procedimentos.findUnique({
            where: {
                id: Number(params.id)
            }  
        });

        if(!procedimentoExiste){
            return res.status(404).json({ mensage: "Procedimento não existe" })
        };

        const result = await prisma.procedimentos.update({
            where: {
                id: Number(params.id) 
            },
            data: {
                ...body
            } 
        }); 
 
        return res.status(200).json({ content: result })
    }



    async deleteProcedimento(req, res){
        const { params } = req  

        await prisma.procedimentos.delete({
            where: { 
                id: Number(params.id)
            }
        });

        return res.status(200).json({ mensage: "Excluido com sucesso"  });  
    }
}   
 
export default ProcedimentosController; 
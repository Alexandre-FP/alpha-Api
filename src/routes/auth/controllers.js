import bcrypt  from "bcryptjs";
import jwt  from "jsonwebtoken";
import _  from "lodash"
import prisma from "../../db/index.js"

class AuthController {
    async login(req, res, next){
        const { body } = req

        const usuarioExiste = await prisma.usuarios.findFirst({
            where: {
                email: body.email
            }
        }); 
 
        try{
            if(!usuarioExiste){
                throw new Error("Não existe usuário cadastro com esses dados");
            }
        }catch(error){
            error.statusCode = 404; 
            return next(error); 
        }
 
        const senhaCoincidem = await bcrypt.compare(body.senha, usuarioExiste.senha);

        try {
            if (!senhaCoincidem) {
              throw new Error("Email ou senha incorretos");
            }
          } catch (error) {
            error.statusCode = 404;
            return next(error);
          }

        const token = jwt.sign({ ..._.omit(usuarioExiste, "senha") }, process.env.SECRET_PASS_JWT, {
            subject: String(usuarioExiste.id),
            expiresIn: 60 * 60 * 3
        })

        return res.status(200).json({ content: { token, session: _.omit(usuarioExiste, "senha") } });
    }
 
    async criarUsuario(req, res, next){ 
        const { body } = req

        const usuarioJaExiste = await prisma.usuarios.findFirst({
            where: {
                email: body.email
            } 
        })  

        try {
            if (usuarioJaExiste) {
              throw new Error("Já existe usuário com esse e-mail"); 
            }
          } catch (error) {
            error.statusCode = 409; 
            return next(error);
          }

          const senhaEncriptada = await bcrypt.hash(body.senha, 8);

          const result = await prisma.usuarios.create({ 
            data: {
                ...body,
                senha: senhaEncriptada
            }
          })

          return res.status(201).json({ content: result })
    }

    async listarUsuarioPorId(req, res){ 
        const { params } = req; 

        const result = await prisma.usuarios.findFirst({
            where: {
                id: Number(params.id) 
            }
        });

        if(!result){
            return res.status(404).json({message: "Usuário não encontrado"})
        }
     

        return res.status(200).json({ content: {..._.omit(result,"senha") }});
    }

    async listarUsuario(req, res){ 
        const result = await prisma.usuarios.findMany({
            where: {
                situacao: 'ATIVO' 
            }
        });

        return res.status(200).json({ content: result });
    }

    async atualizarUsuario(req, res, next){
        const { body, params } = req; 

        const usuarioExiste = await prisma.usuarios.findFirst({
            where: {
                id: Number(params.id) 
            }
        });

        try{ 
            if(!usuarioExiste){
                return res.status(404).json({
                    mensage: "usuario não encontrado"
                })
            }
        }catch(error){ 
            error.statusCode = 404;
            return next(error);
        }

        const senhaEncriptada = await bcrypt.hash(body.senha, 8);

        const result = await prisma.usuarios.update({
            where: {
                id: Number(params.id)
            },
            data: {
                ...body,
                senha: senhaEncriptada,
            }  
        });

        return res.status(200).json({ content: result })
    }
}

export default AuthController; 
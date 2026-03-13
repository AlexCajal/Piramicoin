import express, { Request, Response } from "express";
import UsuarioUseCases from "../../application/usuario.usecases";
import UsuarioRepository from "../../domain/usuario.repository";
import UsuarioRepositoryPostgres from "../db/usuario.repository.postgres";
import Usuario from "../../domain/Usuario";
import { createToken } from "../../../context/security/auth";

const usuariosRepository: UsuarioRepository = new UsuarioRepositoryPostgres();

const usuariosUseCases: UsuarioUseCases = new UsuarioUseCases(
  usuariosRepository
);

const router = express.Router();

router.post('/registro', async(req: Request,res: Response) => {
  const { email, password,} = req.body;
  const userPost = {
    email,
    password,
    saldo: 0
  }
  const usuario: Usuario =  await usuariosUseCases.registro(userPost);
  res.status(201).send({
    message: "Inicio Correcto"
  })

})

router.post('/entrar', async(req: Request, res: Response) => {
  const {email, password,} = req.body;
  const userPost ={
    email,
    password,
    saldo: 0 
  }

  const usuario: Usuario | false = await usuariosUseCases.login(userPost);
  if(!usuario){
    res.status(400).send({
      message:"Usuario no encontrador",
      token: null
    })
  }else if (usuario.password === null) {
    res.status(400).send({
      message:"Contraseña incorrecta",
      token: null
    })
  }else{
    const token = createToken(usuario);
    res.status(200).send({
      message:"Credenciales correctas",
      result:{
        user:{
          email: usuario.email,
        },
        token: token
      },
    })
  }
})

export default router;
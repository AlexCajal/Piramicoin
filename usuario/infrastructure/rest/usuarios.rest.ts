import express, { Request, Response } from "express";
import UsuarioUseCases from "../../application/usuario.usecases";
import UsuarioRepository from "../../domain/usuario.repository";
import UsuarioRepositoryPostgres from "../db/usuario.repository.postgres";
import Usuario from "../../domain/Usuario";

const usuariosRepository: UsuarioRepository = new UsuarioRepositoryPostgres();

const usuariosUseCases: UsuarioUseCases = new UsuarioUseCases(
  usuariosRepository
);

const router = express.Router();

router.post('/registro', async(req: Request,res: Response) => {
  const { alias, password} = req.body;
  const UserPost = {
    alias,
    password
  }
  const usuario: Usuario =  await usuariosUseCases.registro(UserPost);
  res.send(usuario)

})

export default router;
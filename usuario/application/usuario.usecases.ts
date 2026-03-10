import { error } from "console";
import Usuario from "../domain/Usuario";
import UsuarioRepository from "../domain/usuario.repository";
import { hash } from "../../context/security/encrypter";
import bcrypt from "bcrypt";


export default class UsuarioUseCases {
    constructor(private UsuarioRepository: UsuarioRepository) {}

    async registro(usuario: Usuario): Promise<Usuario>{
        if (!usuario.password) throw new error("no Pswd")
            const cifrada = hash(usuario.password);
        usuario.password = cifrada;
        return this.UsuarioRepository.registro(usuario);
    }

    async login(usuario: Usuario): Promise<Usuario | false>{
        if (!usuario) throw new error("no user")
            const userDB = await this.UsuarioRepository.login(usuario);
        const coincide = await bcrypt.compare(
        userDB.password.toString(),   
        usuario.password.toString()  
        )
        if (!usuario.email){
            return false;
        }else if(!coincide){
            userDB.password = null;
        }
        return userDB;
    }

}

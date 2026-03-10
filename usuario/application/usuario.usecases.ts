import { error } from "console";
import Usuario from "../domain/Usuario";
import UsuarioRepository from "../domain/usuario.repository";
import { hash } from "../../context/security/encrypter";

export default class UsuarioUseCases {
    constructor(private UsuarioRepository: UsuarioRepository) {}

    async registro(usuario: Usuario): Promise<Usuario>{
        if (!usuario.password) throw new error("no Pswd")
            const cifrada = hash(usuario.password);
        usuario.password = cifrada;
        return this.UsuarioRepository.registro(usuario);
    }

}

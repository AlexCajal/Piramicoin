import Usuario from "../../domain/Usuario";
import UsuarioRepository from "../../domain/usuario.repository";
import executeQuery from "../../../context/postgres.connector";

export default class UsuarioRepositoryPostgres implements UsuarioRepository{
    async registro(usuario: Usuario): Promise<Usuario> {
        
        const {email, password} = usuario;
        const query = "insert into usuarios (alias,password) values ('${alias}','${password}') returning *;";
        const rows: any[] = await executeQuery(query);
        const UsuarioDB = {
            email: rows[0].alias,
            password: rows[0].password,
        };
        return UsuarioDB;
    }
    
    login(usuarios: Usuario): Promise<Usuario> {
        throw new Error("Method not implemented.");
    }


}
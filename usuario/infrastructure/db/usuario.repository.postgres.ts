import Usuario from "../../domain/Usuario";
import UsuarioRepository from "../../domain/usuario.repository";
import executeQuery from "../../../context/postgres.connector";

export default class UsuarioRepositoryPostgres implements UsuarioRepository{
    async registro(usuario: Usuario): Promise<Usuario> {
        
        const {email, password} = usuario;
        const query = `insert into usuarios (email,password,saldo) values ('${email}','${password}',0) returning *`;
        const rows: any[] = await executeQuery(query);
        const usuarioDB = {
            email: rows[0].email,
            password: rows[0].password,
            saldo: rows[0].saldo
        }
        return usuarioDB;
    }
    
    async loginUsuario(usuarios: Usuario): Promise<Usuario> {
        
        const{email,password,saldo} = usuarios;
        const query = `select * from usuarios where email = '${email}'`;
        const rows: any[] = await executeQuery(query);
        const usuarioDB = {
            email: rows[0].email,
            password: rows[0].password,
            saldo: rows[0].saldo
        }
        return usuarioDB;
    }


}
import Usuario from "./Usuario"; 

export default interface UsuarioRepository {
    registro(usuario: Usuario): Promise<Usuario>;
    loginUsuario(usuario: Usuario): Promise<Usuario>;
}

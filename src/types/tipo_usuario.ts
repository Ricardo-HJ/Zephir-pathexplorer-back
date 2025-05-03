export interface TipoUsuario {
    id_tipo_usuario: number;
    nombre: string;
    created_at?: string;
    updated_at?: string;
}

export interface TipoUsuarioInput {
    nombre: string;
}
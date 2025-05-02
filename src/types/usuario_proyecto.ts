export interface UsuarioProyecto {
    id_usuario_proyecto: number;
    id_usuario: string;
    id_proyecto: number;
    feedback?: string;
    calificacion?: number;
    created_at?: string;
    updated_at?: string;
    id_rol: number;

}

export interface UsuarioProyectoInput {
    id_usuario: string;
    id_proyecto: number;
    feedback?: string;
    calificacion?: number;
    id_rol: number;
}

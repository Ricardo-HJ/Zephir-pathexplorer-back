export interface UsuarioCurso {
    id_usuario_curso: number;
    usuario_id: string;
    id_curso: number;
    estatus: string;
    created_at?: string;
    updated_at?: string;
}

export interface UsuarioCursoInput {
    usuario_id: string;
    id_curso: number;
    estatus: string;
}


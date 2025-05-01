export interface UsuarioCurso {
    id_usuario_curso: number;
    usuario_id: string;
    id_curso: number;
    estatus: string;
    fecha_inicio: string;
    fecha_fin?: string;
    created_at?: string;
    updated_at?: string;
}

export interface UsuarioCursoInput {
    usuario_id: string;
    id_curso: number;
    fecha_inicio: string;
    fecha_fin?: string;
}


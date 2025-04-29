import e from "express";

export interface UsuarioProyecto {
    id_usuario_proyecto: number;
    id_usuario: string;
    id_proyecto: number;
    id_rol: number;
    feedback: string;
    calificacion: number;
    created_at?: string;
    updated_at?: string;

}

export interface UsuarioProyectoInput {
    id_usuario: string;
    id_proyecto: number;
    id_rol: number;
    feedback: string;
    calificacion: number;
}

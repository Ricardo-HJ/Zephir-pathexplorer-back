import { supabase } from "../../config/supabase";
import type { UsuarioCurso, UsuarioCursoInput } from "../../types/usuario_cursos";

export class UsuarioCursoModel {
    static async create(data: UsuarioCursoInput): Promise<UsuarioCurso> {
        const { data: result, error } = await supabase
            .from("usuario_cursos")
            .insert([data])
            .select();

        if (error) {
            throw new Error(`Error creando usuario_curso: ${error.message}`);
        }

        return result[0] as UsuarioCurso;
    }

    static async findById(id: number): Promise<UsuarioCurso[]> {
        const { data, error } = await supabase
            .from("usuario_cursos")
            .select("*")
            .eq("id_usuario_curso", id);

        if (error) {
            throw new Error(`Error encontrando usuario_curso con ese id: ${error.message}`);
        }

        return data as UsuarioCurso[];
    }

    static async findByUser(idUsuario: string): Promise<UsuarioCurso[]> {
        const { data, error } = await supabase
            .from("usuario_cursos")
            .select("*")
            .eq("usuario_id", idUsuario);

        if (error) {
            throw new Error(`Error encontrando usuario_curso del usuario: ${error.message}`);
        }

        return data as UsuarioCurso[];
    }

    static async findByCurso(idCurso: number): Promise<UsuarioCurso[]> {
        const { data, error } = await supabase
            .from("usuario_cursos")
            .select("*")
            .eq("id_curso", idCurso);

        if (error) {
            throw new Error(`Error encontrando usuario_curso del curso: ${error.message}`);
        }

        return data as UsuarioCurso[];
    }

    static async findByCursoUsuarioEstatus(idUsuario: string, estatus: string): Promise<UsuarioCurso[]> {
        const { data, error } = await supabase
            .from("usuario_cursos")
            .select("*")
            .eq("usuario_id", idUsuario)
            .eq("estatus", estatus);

        if (error) {
            throw new Error(`Error encontrando usuario_curso del usuario con estatus: ${error.message}`);
        }

        return data as UsuarioCurso[];
    }

    static async findByCursoUsuario(idUsuario: string, idCurso: number): Promise<UsuarioCurso[]> {
        const { data, error } = await supabase
            .from("usuario_cursos")
            .select("*")
            .eq("usuario_id", idUsuario)
            .eq("id_curso", idCurso);

        if (error) {
            throw new Error(`Error encontrando usuario_curso del usuario con ese curso: ${error.message}`);
        }

        return data as UsuarioCurso[];

    }


    static async delete(id: number): Promise<void> {
        const { error } = await supabase.from("usuario_cursos").delete().eq("id_usuario_curso", id);

        if (error) {
            throw new Error(`Error eliminando usuario_curso: ${error.message}`);
        }
    }

}
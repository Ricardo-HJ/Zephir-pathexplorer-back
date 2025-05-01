import { supabase  } from "../../config/supabase";
import type { Curso, CursoInput } from "../../types/curso";

export class CursoModel {
    static async create(data: CursoInput): Promise<Curso> {
        const { data: result, error } = await supabase
        .from("cursos")
        .insert([data])
        .select();

        if (error) {
            throw new Error(`Error creando curso: ${error.message}`);
        }

        return result[0] as Curso;
    }

    static async findById(id: number): Promise<Curso[]> {
        const { data, error } = await supabase
        .from("cursos")
        .select("*")
        .eq("id_curso", id);

        if (error) {
            throw new Error(`Error encontrando curso con ese id: ${error.message}`);
        }

        return data as Curso[];
    }

    static async findByName(nombre: string): Promise<Curso[]> {
        const { data, error } = await supabase
        .from("cursos")
        .select("*")
        .eq("nombre", nombre);

        if (error) {
            throw new Error(`Error encontrando cursos con ese nombre: ${error.message}`);
        }

        return data as Curso[];
    }

    static async findByOrganizacion(organizacion: string): Promise<Curso[]> {
        const { data, error } = await supabase
        .from("cursos")
        .select("*")
        .eq("organizacion", organizacion);

        if (error) {
            throw new Error(`Error encontrando cursos de la organización: ${error.message}`);
        }

        return data as Curso[];
    }


    static async delete(id: number): Promise<void> {
        const { error } = await supabase.from("cursos").delete().eq("id_curso", id);

        if (error) {
            throw new Error(`Error eliminando curso: ${error.message}`);
        }
    }

}
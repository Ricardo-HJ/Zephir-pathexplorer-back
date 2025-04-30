import { supabase } from "../config/supabase";
import type { CursoSubetapa, CursoSubetapaInput } from "../types/curso_subetapa";

export class CursoSubetapaModel {
    static async create(data: CursoSubetapaInput): Promise<CursoSubetapa> {
        const { data: result, error } = await supabase
            .from("curso_subetapas")
            .insert([data])
            .select();

        if (error) {
            throw new Error(`Error creando curso_subetapa: ${error.message}`);
        }

        return result[0] as CursoSubetapa;
    }

    static async findById(id: number): Promise<CursoSubetapa[]> {
        const { data, error } = await supabase
            .from("curso_subetapas")
            .select("*")
            .eq("id_curso_subetapa", id);

        if (error) {
            throw new Error(`Error encontrando curso_subetapa con ese id: ${error.message}`);
        }

        return data as CursoSubetapa[];
    }

    static async findBySubetapa(idSubetapa: number): Promise<CursoSubetapa[]> {
        const { data, error } = await supabase
            .from("curso_subetapas")
            .select("*")
            .eq("id_subetapa", idSubetapa);

        if (error) {
            throw new Error(`Error encontrando curso_subetapa de la subetapa: ${error.message}`);
        }

        return data as CursoSubetapa[];
    }

    static async delete(id: number): Promise<void> {
        const { error } = await supabase.from("curso_subetapas").delete().eq("id_curso_subetapa", id);

        if (error) {
            throw new Error(`Error eliminando curso_subetapa: ${error.message}`);
        }
    }

    static async deleteByCursoSubetapa(idCursoSubetapa: number): Promise<void> {
        const { error } = await supabase.from("curso_subetapas").delete().eq("id_curso_subetapa", idCursoSubetapa);

        if (error) {
            throw new Error(`Error eliminando curso_subetapa: ${error.message}`);
        }
    }

    static async deleteBySubetapa(idSubetapa: number): Promise<void> {
        const { error } = await supabase.from("curso_subetapas").delete().eq("id_subetapa", idSubetapa);

        if (error) {
            throw new Error(`Error eliminando curso_subetapa: ${error.message}`);
        }
    }

    static async deleteByCurso(idCurso: number): Promise<void> {
        const { error } = await supabase.from("curso_subetapas").delete().eq("id_curso", idCurso);

        if (error) {
            throw new Error(`Error eliminando curso_subetapa: ${error.message}`);
        }
    }

}
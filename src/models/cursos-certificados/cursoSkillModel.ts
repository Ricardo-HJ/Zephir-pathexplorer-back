import { supabase } from "../../config/supabase";
import type { CursoSkill, CursoSkillInput } from "../../types/curso_skill";

export class CursoSkillModel {
    static async create(data: CursoSkillInput): Promise<CursoSkill> {
        const { data: result, error } = await supabase
            .from("curso_skill")
            .insert([data])
            .select();

        if (error) {
            throw new Error(`Error creando curso_skill: ${error.message}`);
        }

        return result[0] as CursoSkill;
    }

    static async findById(id: number): Promise<CursoSkill[]> {
        const { data, error } = await supabase
            .from("curso_skill")
            .select("*")
            .eq("id_curso_skill", id);

        if (error) {
            throw new Error(`Error encontrando curso_skill con ese id: ${error.message}`);
        }

        return data as CursoSkill[];
    }

    static async findByCurso(idCurso: number): Promise<CursoSkill[]> {
        const { data, error } = await supabase
            .from("curso_skill")
            .select("*")
            .eq("id_curso", idCurso);

        if (error) {
            throw new Error(`Error encontrando curso_skill del curso: ${error.message}`);
        }

        return data as CursoSkill[];
    }

    static async findBySkill(idSkill: number): Promise<CursoSkill[]> {
        const { data, error } = await supabase
            .from("curso_skill")
            .select("*")
            .eq("id_skill", idSkill);

        if (error) {
            throw new Error(`Error encontrando curso_skill de la skill: ${error.message}`);
        }

        return data as CursoSkill[];
    }

    static async delete(id: number): Promise<void> {
        const { error } = await supabase.from("curso_skill").delete().eq("id_curso_skill", id);

        if (error) {
            throw new Error(`Error eliminando curso_skill: ${error.message}`);
        }
    }

}
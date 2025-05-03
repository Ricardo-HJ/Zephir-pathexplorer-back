import { supabase } from "../../config/supabase";
import type { ProyectoSkill, ProyectoSkillInput } from "../../types/proyecto_skill";

export class ProyectoSkillModel {
    static async create(data: ProyectoSkillInput): Promise<ProyectoSkill> {
        const { data: result, error } = await supabase
            .from("proyecto_skill")
            .insert([data])
            .select();

        if (error) {
            throw new Error(`Error creando proyecto_skill: ${error.message}`);
        }

        return result[0] as ProyectoSkill;
    }

    static async findById(id: number): Promise<ProyectoSkill[]> {
        const { data, error } = await supabase
            .from("proyecto_skill")
            .select("*")
            .eq("id_proyecto_skill", id);

        if (error) {
            throw new Error(`Error encontrando proyecto_skill con ese id: ${error.message}`);
        }

        return data as ProyectoSkill[];
    }

    static async findByProyecto(id_proyecto: number): Promise<ProyectoSkill[]> {
        const { data, error } = await supabase
            .from("proyecto_skill")
            .select("*")
            .eq("id_proyecto", id_proyecto);

        if (error) {
            throw new Error(`Error encontrando proyecto_skill con ese id_proyecto: ${error.message}`);
        }

        return data as ProyectoSkill[];
    }

    static async findBySkill(id_skill: number): Promise<ProyectoSkill[]> {
        const { data, error } = await supabase
            .from("proyecto_skill")
            .select("*")
            .eq("id_skill", id_skill);

        if (error) {
            throw new Error(`Error encontrando proyecto_skill con ese id_skill: ${error.message}`);
        }

        return data as ProyectoSkill[];
    }
    

    static async delete(id: number): Promise<void> {
        const { error } = await supabase.from("proyecto_skill").delete().eq("id_proyecto_skill", id);

        if (error) {
            throw new Error(`Error eliminando proyecto_skill: ${error.message}`);
        }
    }

    static async deleteByProyecto(id_proyecto: number): Promise<void> {
        const { error } = await supabase.from("proyecto_skill").delete().eq("id_proyecto", id_proyecto);

        if (error) {
            throw new Error(`Error eliminando proyecto_skill: ${error.message}`);
        }
    }

    static async deleteBySkill(id_skill: number): Promise<void> {
        const { error } = await supabase.from("proyecto_skill").delete().eq("id_skill", id_skill);

        if (error) {
            throw new Error(`Error eliminando proyecto_skill: ${error.message}`);
        }
    }

}
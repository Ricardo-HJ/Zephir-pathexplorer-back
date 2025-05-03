import { supabase } from "../config/supabase";
import type { Skill, SkillInput } from "../types/skill";

export class SkillModel {
    static async create(data: SkillInput): Promise<Skill> {
        const { data: result, error } = await supabase
            .from("skill")
            .insert([data])
            .select();

        if (error) {
            throw new Error(`Error creando skill: ${error.message}`);
        }

        return result[0] as Skill;
    }

    static async findById(id: number): Promise<Skill[]> {
        const { data, error } = await supabase
            .from("skill")
            .select("*")
            .eq("id_skill", id);

        if (error) {
            throw new Error(`Error encontrando skill con ese id: ${error.message}`);
        }

        return data as Skill[];
    }

    static async findByName(name: string): Promise<Skill[]> {
        const { data, error } = await supabase
            .from("skill")
            .select("*")
            .eq("nombre", name);

        if (error) {
            throw new Error(`Error encontrando skill con ese nombre: ${error.message}`);
        }

        return data as Skill[];
    }

    static async findByTipo(tipo: string): Promise<Skill[]> {
        const { data, error } = await supabase
            .from("skill")
            .select("*")
            .eq("tipo", tipo);

        if (error) {
            throw new Error(`Error encontrando skill con ese tipo: ${error.message}`);
        }

        return data as Skill[];
    }

    static async delete(id: number): Promise<void> {
        const { error } = await supabase.from("skill").delete().eq("id_skill", id);

        if (error) {
            throw new Error(`Error eliminando skill: ${error.message}`);
        }
    }

}


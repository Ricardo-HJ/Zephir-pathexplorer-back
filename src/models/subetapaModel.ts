import { supabase } from "../config/supabase";
import type { SubEtapa, SubEtapaInput } from "../types/sub_etapa";

export class SubEtapaModel {
    static async create(data: SubEtapaInput): Promise<SubEtapa> {
        const { data: result, error } = await supabase
            .from("Subetapa")
            .insert([data])
            .select();

        if (error) {
            throw new Error(`Error creando subetapa: ${error.message}`);
        }

        return result[0] as SubEtapa;
    }

    static async findById(id: number): Promise<SubEtapa[]> {
        const { data, error } = await supabase
            .from("Subetapa")
            .select("*")
            .eq("idSubetapa", id);

        if (error) {
            throw new Error(`Error encontrando subetapa con ese id: ${error.message}`);
        }

        return data as SubEtapa[];
    }

    static async findByEtapa(idEtapa: number): Promise<SubEtapa[]> {
        const { data, error } = await supabase
            .from("Subetapa")
            .select("*")
            .eq("id_etapa", idEtapa);

        if (error) {
            throw new Error(`Error encontrando subetapas de la etapa: ${error.message}`);
        }

        return data as SubEtapa[];
    }

    static async findByNombreEtapa(idEtapa: number, nombre: string): Promise<SubEtapa[]> {
        const { data, error } = await supabase
            .from("Subetapa")
            .select("*")
            .eq("id_etapa", idEtapa)
            .eq("nombre", nombre);

        if (error) {
            throw new Error(`Error encontrando subetapa con ese nombre: ${error.message}`);
        }

        return data as SubEtapa[];
    }


    static async delete(id: number): Promise<void> {
        const { error } = await supabase.from("Subetapa").delete().eq("idSubetapa", id);

        if (error) {
            throw new Error(`Error eliminando subetapa: ${error.message}`);
        }
    }

}



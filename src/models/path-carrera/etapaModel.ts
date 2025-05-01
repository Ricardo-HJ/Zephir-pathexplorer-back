import { supabase  } from "../config/supabase";
import type { Etapa, EtapaInput } from "../types/etapa";

export class EtapaModel {
    static async create(data: EtapaInput): Promise<Etapa> {
        const { data: result, error } = await supabase
        .from("Etapa")
        .insert([data])
        .select();
    
        if (error) {
            throw new Error(`Error creando etapa: ${error.message}`);
        }
    
        return result[0] as Etapa;
    }

    static async findById(id: number): Promise<Etapa[]> {
        const { data, error } = await supabase
        .from("Etapa")
        .select("*")
        .eq("idEtapa", id);
    
        if (error) {
            throw new Error(`Error encontrando etapa con ese id: ${error.message}`);
        }
    
        return data as Etapa[];
    }

    static async findByPathCarrera(idPathCarrera: number): Promise<Etapa[]> {
        const { data, error } = await supabase
        .from("Etapa")
        .select("*")
        .eq("id_path_carrera", idPathCarrera);
    
        if (error) {
            throw new Error(`Error encontrando etapas del path carrera: ${error.message}`);
        }
    
        return data as Etapa[];
    }

    static async findByEtapaNumero(idPathCarrera: number, numero: number): Promise<Etapa[]> {
        const { data, error } = await supabase
        .from("Etapa")
        .select("*")
        .eq("id_path_carrera", idPathCarrera)
        .eq("numero", numero);

        if (error) {
            throw new Error(`Error encontrando etapa con ese número: ${error.message}`);
        }

        return data as Etapa[];

    }

    static async findByTitulo(titulo: string): Promise<Etapa[]> {
        const { data, error } = await supabase
        .from("Etapa")
        .select("*")
        .eq("titulo", titulo);

        if (error) {
            throw new Error(`Error encontrando etapa con ese título: ${error.message}`);
        }

        return data as Etapa[];

    }

    static async delete(id: number): Promise<void> {
        const { error } = await supabase.from("Etapa").delete().eq("idEtapa", id);
    
        if (error) {
            throw new Error(`Error eliminando etapa: ${error.message}`);
        }
    }

}


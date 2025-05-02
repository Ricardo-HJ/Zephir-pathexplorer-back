import { supabase } from "../../config/supabase";
import type { Proyecto, ProyectoInput } from "../../types/proyecto";

export class ProyectoModel {
    static async create(data: ProyectoInput): Promise<Proyecto> {
        const { data: result, error } = await supabase
        .from("proyecto")
        .insert([data])
        .select();
    
        if (error) {
        throw new Error(`Error creando proyecto: ${error.message}`);
        }
    
        return result[0] as Proyecto;
    }

    static async findByPeopleLead(idPeopleLead: string): Promise<Proyecto[]> {
        const { data, error } = await supabase
        .from("proyecto")
        .select("*")
        .eq("id_people_lead", idPeopleLead);
    
        if (error) {
        throw new Error(`Error encontrando proyectos del people lead: ${error.message}`);
        }
    
        return data as Proyecto[];
    }

    static async findByName(nombre: string): Promise<Proyecto[]> {
        const { data, error } = await supabase
        .from("proyecto")
        .select("*")
        .eq("nombre", nombre);
    
        if (error) {
        throw new Error(`Error encontrando proyectos con ese nombre: ${error.message}`);
        }
    
        return data as Proyecto[];
    }

    static async findById(id_proyecto: number): Promise<Proyecto[]> {
        const { data, error } = await supabase
        .from("proyecto")
        .select("*")
        .eq("id_proyecto", id_proyecto);
    
        if (error) {
        throw new Error(`Error encontrando proyecto con ese id: ${error.message}`);
        }
    
        return data as Proyecto[];
    }

    static async delete(id: number): Promise<void> {
        const { error } = await supabase.from("proyectos").delete().eq("id", id);
    
        if (error) {
        throw new Error(`Error eliminando proyecto: ${error.message}`);
        }
    }

}
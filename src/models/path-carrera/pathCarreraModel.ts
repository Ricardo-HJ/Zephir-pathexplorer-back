import { supabase } from "../../config/supabase";
import type { PathCarrera, PathCarreraInput } from "../../types/path_carrera";

export class PathCarreraModel {
    static async create(data: PathCarreraInput): Promise<PathCarrera> {
        const { data: result, error } = await supabase
        .from("path_carrera")
        .insert([data])
        .select();
    
        if (error) {
        throw new Error(`Error creando path carrera: ${error.message}`);
        }
    
        return result[0] as PathCarrera;
    }

    static async findById(id: number): Promise<PathCarrera[]> {
        const { data, error } = await supabase
        .from("path_carrera")
        .select("*")
        .eq("id", id);
    
        if (error) {
            throw new Error(`Error encontrando path carrera con ese id: ${error.message}`);
        }
    
        return data as PathCarrera[];
    }

    static async findByUser(idUsuario: string): Promise<PathCarrera[]> {
        const { data, error } = await supabase
        .from("path_carrera")
        .select("*")
        .eq("usuario_id", idUsuario);
    
        if (error) {
        throw new Error(`Error encontrando path carrera del usuario: ${error.message}`);
        }
    
        return data as PathCarrera[];
    }

    static async delete(id: number): Promise<void> {
        const { error } = await supabase.from("path_carrera").delete().eq("id", id);
    
        if (error) {
        throw new Error(`Error eliminando path carrera: ${error.message}`);
        }
    }

}
import { supabase } from "../../config/supabase"
import type { Objetivo, ObjetivoInput } from "../../types/objetivo"

export class ObjetivoModel {
    static async create(data: ObjetivoInput): Promise<Objetivo> {
        const { data: result, error } = await supabase
        .from("objetivos")
        .insert([data])
        .select()
    
        if (error) {
        throw new Error(`Error creando objetivo: ${error.message}`)
        }
    
        return result[0] as Objetivo
    }

    static async findById(id: number): Promise<Objetivo[]> {
        const { data, error } = await supabase
        .from("objetivos")
        .select("*")
        .eq("id", id)

        if (error) {
            throw new Error(`Error encontrando objetivo con ese id: ${error.message}`)
        }

        return data as Objetivo[]
    }
    
    static async findByUser(idUsuario: string): Promise<Objetivo[]> {
        const { data, error } = await supabase
        .from("objetivos")
        .select("*")
        .eq("usuario_id", idUsuario)
    
        if (error) {
        throw new Error(`Error encontrando objetivos del usuario: ${error.message}`)
        }
    
        return data as Objetivo[]
    }
    
    static async delete(id: number): Promise<void> {
        const { error } = await supabase.from("objetivos").delete().eq("id", id)
    
        if (error) {
        throw new Error(`Error eliminando objetivo: ${error.message}`)
        }
    }

}

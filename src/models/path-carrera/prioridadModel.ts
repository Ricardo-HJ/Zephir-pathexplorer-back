import { supabase } from "../../config/supabase"
import type { Prioridad, PrioridadInput } from "../../types/prioridad"

export class PrioridadModel {
    static async create(data: PrioridadInput): Promise<Prioridad> {
        const { data: result, error } = await supabase
        .from("prioridades")
        .insert([data])
        .select()
    
        if (error) {
        throw new Error(`Error creando prioridad: ${error.message}`)
        }
    
        return result[0] as Prioridad
    }

    static async findByUser(idUsuario: string): Promise<Prioridad[]> {
        const { data, error } = await supabase
        .from("prioridades")
        .select("*")
        .eq("usuario_id", idUsuario)
    
        if (error) {
        throw new Error(`Error encontrando prioridades del usuario: ${error.message}`)
        }
    
        return data as Prioridad[]
    }

    static async findById(id: number): Promise<Prioridad[]> {
        const { data, error } = await supabase
        .from("prioridades")
        .select("*")
        .eq("id", id)

        if (error) {
            throw new Error(`Error encontrando prioridad con ese id: ${error.message}`)
        }

        return data as Prioridad[]
    }

    static async delete(id: number): Promise<void> {
        const { error } = await supabase.from("prioridades").delete().eq("id", id)
    
        if (error) {
        throw new Error(`Error eliminando prioridad: ${error.message}`)
        }
    }

}
import { supabase } from "../../config/supabase"
import type { Interes, InteresInput } from "../../types/interes"

export class InteresModel {
  static async create(data: InteresInput): Promise<Interes> {
    const { data: result, error } = await supabase
      .from("intereses")
      .insert([data])
      .select()

    if (error) {
      throw new Error(`Error creando interes: ${error.message}`)
    }

    return result[0] as Interes
  }

  static async findById(id: number): Promise<Interes[]> {
    const { data, error } = await supabase
      .from("intereses")
      .select("*")
      .eq("id", id)

    if (error) {
      throw new Error(`Error encontrando interés con ese id: ${error.message}`)
    }

    return data as Interes[]
  }

  static async findByUser(idUsuario: string): Promise<Interes[]> {
    const { data, error } = await supabase
      .from("intereses")
      .select("*")
      .eq("usuario_id", idUsuario)

    if (error) {
      throw new Error(`Error encontrando intereses del usuario: ${error.message}`)
    }

    return data as Interes[]
  }

  static async delete(id: number): Promise<void> {
    const { error } = await supabase.from("intereses").delete().eq("id", id)

    if (error) {
      throw new Error(`Error eliminando interés: ${error.message}`)
    }
  }


}

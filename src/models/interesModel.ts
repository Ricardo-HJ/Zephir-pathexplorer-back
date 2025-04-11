import { supabase } from "../config/supabase"
import type { Interes, InteresInput, UsuarioInteresInput } from "../types/interes"

export class InteresModel {
    // crear nuevo interes
  static async create(interesData: InteresInput): Promise<Interes> {
    const { data, error } = await supabase
      .from("interes")
      .insert([{
        nombre: interesData.nombre,
      }])
      .select()

    if (error) {
      throw new Error(`Error creating interes: ${error.message}`)
    }

    return data[0] as Interes
  }

  // encontrar interes por nombre
  static async findByNombre(nombre: string): Promise<Interes | null> {
    const { data, error } = await supabase
      .from("interes")
      .select("*")
      .eq("nombre", nombre)
      .single()

    if (error) {
      if (error.code === "PGRST116") {
        return null
      }
      throw new Error(`Error finding interes: ${error.message}`)
    }

    return data as Interes
  }

  // encontrar interes por id
  static async findById(id: string): Promise<Interes | null> {
    const { data, error } = await supabase
      .from("interes")
      .select("*")
      .eq("idInteres", id)
      .single()

    if (error) {
      if (error.code === "PGRST116") {
        return null
      }
      throw new Error(`Error finding interes: ${error.message}`)
    }

    return data as Interes
  }

  // actualizar interes
  static async update(id: string, interesData: Partial<InteresInput>): Promise<Interes> {
    const { data, error } = await supabase
      .from("interes")
      .update(interesData)
      .eq("idInteres", id)
      .select()

    if (error) {
      throw new Error(`Error updating interes: ${error.message}`)
    }

    return data[0] as Interes
  }

  // eliminar interes
  static async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from("interes")
      .delete()
      .eq("idInteres", id)

    if (error) {
      throw new Error(`Error deleting interes: ${error.message}`)
    }
  }

  // asignar un interés a un usuario
  static async assignToUser(usuarioInteresData: UsuarioInteresInput): Promise<void> {
    const { error } = await supabase
      .from("usuario_interes")
      .insert([
        {
          id_usuario: usuarioInteresData.idUsuario,
          id_interes: usuarioInteresData.idInteres,
        },
      ])

    if (error) {
      throw new Error(`Error assigning interes to user: ${error.message}`)
    }
  }

  // eliminar interes de usuario
  static async removeFromUser(usuarioInteresData: UsuarioInteresInput): Promise<void> {
    const { error } = await supabase
      .from("usuario_interes")
      .delete()
      .eq("id_usuario", usuarioInteresData.idUsuario)
      .eq("id_interes", usuarioInteresData.idInteres)

    if (error) {
      throw new Error(`Error removing interes from user: ${error.message}`)
    }
  }

  // obtener intereses de un usuario
  static async getUserInterests(userId: string): Promise<Interes[]> {
    const { data, error } = await supabase
      .from("usuario_interes")
      .select("id_interes")
      .eq("id_usuario", userId);
  
    if (error) {
      throw new Error(`Error getting user interests: ${error.message}`);
    }
  
    // caso de usuario no tiene intereses
    if (!data || data.length === 0) {
      return [];
    }
  
    // obtener ids de intereses
    const interesIds = data.map((item: { id_interes: number }) => item.id_interes);

    const { data: intereses, error: interesesError } = await supabase
    .from("interes")
    .select("idInteres, nombre")
    .in("idInteres", interesIds);

    if (interesesError) {
        throw new Error(`Error fetching intereses: ${interesesError.message}`);
    }

    // devuelve intereses como objetos de interes
    return intereses as Interes[];
  }
  
}

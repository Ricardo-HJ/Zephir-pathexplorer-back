import { supabase } from "../../config/supabase"
import type { Certificado, CertificadoInput } from "../../types/certificacion"

export class CertificacionModel {
  static async create(data: CertificadoInput): Promise<Certificado> {
    const { data: result, error } = await supabase
      .from("certificado")
      .insert([data])
      .select()

    if (error) {
      throw new Error(`Error creando certificación: ${error.message}`)
    }

    return result[0] as Certificado
  }

    static async findByUser(idUsuario: string): Promise<Certificado[]> {
        const { data, error } = await supabase
        .from("certificacdo")
        .select("*")
        .eq("id_usuario", idUsuario)
    
        if (error) {
        throw new Error(`Error encontrando certificaciones del usuario: ${error.message}`)
        }
    
        return data as Certificado[]
    }

    static async findById(id: number): Promise<Certificado[]> {
        const { data, error } = await supabase
        .from("certificado")
        .select("*")
        .eq("id_certificado", id)
    
        if (error) {
        throw new Error(`Error encontrando certificación con ese id: ${error.message}`)
        }
    
        return data as Certificado[]
    }

    static async delete(id: number): Promise<void> {
        const { error } = await supabase.from("certificado").delete().eq("id_certificado", id)
    
        if (error) {
        throw new Error(`Error eliminando certificación: ${error.message}`)
        }
    }

}
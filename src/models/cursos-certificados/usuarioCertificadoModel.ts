import { supabase } from "../../config/supabase";
import type { UsuarioCertificado, UsuarioCertificadoInput } from "../../types/usuario_certificado";

export class UsuarioCertificadoModel {
    static async create(data: UsuarioCertificadoInput): Promise<UsuarioCertificado> {
        const { data: result, error } = await supabase
            .from("usuario_certificados")
            .insert([data])
            .select();

        if (error) {
            throw new Error(`Error creando usuario_certificado: ${error.message}`);
        }

        return result[0] as UsuarioCertificado;
    }

    static async findById(id: number): Promise<UsuarioCertificado[]> {
        const { data, error } = await supabase
            .from("usuario_certificados")
            .select("*")
            .eq("id_usuario_certificado", id);

        if (error) {
            throw new Error(`Error encontrando usuario_certificado con ese id: ${error.message}`);
        }

        return data as UsuarioCertificado[];
    }

    static async findByUser(idUsuario: string): Promise<UsuarioCertificado[]> {
        const { data, error } = await supabase
            .from("usuario_certificados")
            .select("*")
            .eq("usuario_id", idUsuario);

        if (error) {
            throw new Error(`Error encontrando usuario_certificado del usuario: ${error.message}`);
        }

        return data as UsuarioCertificado[];
    }

    static async findByCertificado(idCertificado: number): Promise<UsuarioCertificado[]> {
        const { data, error } = await supabase
            .from("usuario_certificados")
            .select("*")
            .eq("certificado_id", idCertificado);

        if (error) {
            throw new Error(`Error encontrando usuario_certificado del certificado: ${error.message}`);
        }

        return data as UsuarioCertificado[];
    }

    static async findUserCertificado(idUsuario: string, idCertificado: number): Promise<UsuarioCertificado[]> {
        const { data, error } = await supabase
            .from("usuario_certificados")
            .select("*")
            .eq("usuario_id", idUsuario)
            .eq("certificado_id", idCertificado);

        if (error) {
            throw new Error(`Error encontrando usuario_certificado del certificado: ${error.message}`);
        }

        return data as UsuarioCertificado[];
    }

    static async delete(id: number): Promise<void> {
        const { error } = await supabase.from("usuario_certificados").delete().eq("id_usuario_certificado", id);

        if (error) {
            throw new Error(`Error eliminando usuario_certificado: ${error.message}`);
        }
    }

}
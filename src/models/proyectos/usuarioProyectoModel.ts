import { supabase } from "../../config/supabase";
import type { UsuarioProyecto, UsuarioProyectoInput } from "../../types/usuario_proyecto";

export class UsuarioProyectoModel {
    static async create(data: UsuarioProyectoInput): Promise<UsuarioProyecto> {
        const { data: result, error } = await supabase
            .from("usuario_proyecto")
            .insert([data])
            .select();

        if (error) {
            throw new Error(`Error creando usuario proyecto: ${error.message}`);
        }

        return result[0] as UsuarioProyecto;
    }

    static async findById(id: number): Promise<UsuarioProyecto[]> {
        const { data, error } = await supabase
            .from("usuario_proyecto")
            .select("*")
            .eq("id", id);

        if (error) {
            throw new Error(`Error encontrando usuario proyecto con ese id: ${error.message}`);
        }

        return data as UsuarioProyecto[];
    }

    static async findByUser(idUsuario: string): Promise<UsuarioProyecto[]> {
        const { data, error } = await supabase
            .from("usuario_proyecto")
            .select("*")
            .eq("usuario_id", idUsuario);

        if (error) {
            throw new Error(`Error encontrando usuario proyecto con ese id de usuario: ${error.message}`);
        }

        return data as UsuarioProyecto[];
    }


    static async findByProyecto(idProyecto: number): Promise<UsuarioProyecto[]> {
        const { data, error } = await supabase
            .from("usuario_proyecto")
            .select("*")
            .eq("id_proyecto", idProyecto);

        if (error) {
            throw new Error(`Error encontrando usuario proyecto con ese id de proyecto: ${error.message}`);
        }

        return data as UsuarioProyecto[];
    }

    static async findByProyectoUsuario(idUsuario: string, idProyecto: string): Promise<UsuarioProyecto[]> {
        const { data, error } = await supabase
            .from("usuario_proyecto")
            .select("*")
            .eq("usuario_id", idUsuario)
            .eq("id_proyecto", idProyecto);

        if (error) {
            throw new Error(`Error encontrando usuario proyecto con ese id de usuario y proyecto: ${error.message}`);
        }

        return data as UsuarioProyecto[];
    }

    static async delete(id: number): Promise<void> {
        const { error } = await supabase.from("usuario_proyecto").delete().eq("id", id);

        if (error) {
            throw new Error(`Error eliminando usuario proyecto: ${error.message}`);
        }
    }

    static async deleteByUser(idUsuario: string): Promise<void> {
        const { error } = await supabase.from("usuario_proyecto").delete().eq("usuario_id", idUsuario);

        if (error) {
            throw new Error(`Error eliminando usuario proyecto: ${error.message}`);
        }
    }

    static async deleteByProyecto(idProyecto: number): Promise<void> {
        const { error } = await supabase.from("usuario_proyecto").delete().eq("id_proyecto", idProyecto);

        if (error) {
            throw new Error(`Error eliminando usuario proyecto: ${error.message}`);
        }
    }

    static async deleteByProyectoUsuario(idUsuario: string, idProyecto: string): Promise<void> {
        const { error } = await supabase.from("usuario_proyecto").delete().eq("usuario_id", idUsuario).eq("id_proyecto", idProyecto);

        if (error) {
            throw new Error(`Error eliminando usuario proyecto: ${error.message}`);
        }
    }

}

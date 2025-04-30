import { supabase } from "../config/supabase";
import type { TipoUsuario, TipoUsuarioInput } from "../types/tipo_usuario";

export class TipoUsuarioModel {
    static async create(data: TipoUsuarioInput): Promise<TipoUsuario> {
        const { data: result, error } = await supabase
            .from("tipo_usuario")
            .insert([data])
            .select();

        if (error) {
            throw new Error(`Error creando tipo usuario: ${error.message}`);
        }

        return result[0] as TipoUsuario;
    }

    static async findById(id: number): Promise<TipoUsuario[]> {
        const { data, error } = await supabase
            .from("tipo_usuario")
            .select("*")
            .eq("id_tipo_usuario", id);

        if (error) {
            throw new Error(`Error encontrando tipo usuario con ese id: ${error.message}`);
        }

        return data as TipoUsuario[];
    }

    static async findByName(name: string): Promise<TipoUsuario[]> {
        const { data, error } = await supabase
            .from("tipo_usuario")
            .select("*")
            .eq("nombre", name);

        if (error) {
            throw new Error(`Error encontrando tipo usuario con ese nombre: ${error.message}`);
        }

        return data as TipoUsuario[];
    }

    static async delete(id: number): Promise<void> {
        const { error } = await supabase.from("tipo_usuario").delete().eq("id_tipo_usuario", id);

        if (error) {
            throw new Error(`Error eliminando tipo usuario: ${error.message}`);
        }
    }

}
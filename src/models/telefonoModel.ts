import { supabase } from "../config/supabase";
import type { Telefono, TelefonoInput } from "../types/telefono";

export class TelefonoModel {
    static async create(data: TelefonoInput): Promise<Telefono> {
        const { data: result, error } = await supabase
            .from("telefono")
            .insert([data])
            .select();

        if (error) {
            throw new Error(`Error creando telefono: ${error.message}`);
        }

        return result[0] as Telefono;
    }

    static async findById(id: number): Promise<Telefono[]> {
        const { data, error } = await supabase
            .from("telefono")
            .select("*")
            .eq("id_telefono", id);

        if (error) {
            throw new Error(`Error encontrando telefono con ese id: ${error.message}`);
        }

        return data as Telefono[];
    }

    static async findByUser(idUsuario: string): Promise<Telefono[]> {
        const { data, error } = await supabase
            .from("telefono")
            .select("*")
            .eq("id_usuario", idUsuario);

        if (error) {
            throw new Error(`Error encontrando telefonos del usuario: ${error.message}`);
        }

        return data as Telefono[];
    }

    static async delete(id: number): Promise<void> {
        const { error } = await supabase.from("telefono").delete().eq("id_telefono", id);

        if (error) {
            throw new Error(`Error eliminando telefono: ${error.message}`);
        }
    }

}
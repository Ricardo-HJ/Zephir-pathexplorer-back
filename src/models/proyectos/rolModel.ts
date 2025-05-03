import { supabase } from "../../config/supabase";
import type { Rol, RolInput } from "../../types/rol";

export class RolModel {
    static async create(data: RolInput): Promise<Rol> {
        const { data: result, error } = await supabase
            .from("rol")
            .insert([data])
            .select();

        if (error) {
            throw new Error(`Error creando rol: ${error.message}`);
        }

        return result[0] as Rol;
    }

    static async findById(id: number): Promise<Rol[]> {
        const { data, error } = await supabase
            .from("rol")
            .select("*")
            .eq("id_rol", id);

        if (error) {
            throw new Error(`Error encontrando rol con ese id: ${error.message}`);
        }

        return data as Rol[];
    }

    static async findByName(name: string): Promise<Rol[]> {
        const { data, error } = await supabase
            .from("rol")
            .select("*")
            .eq("nombre", name);

        if (error) {
            throw new Error(`Error encontrando rol con ese nombre: ${error.message}`);
        }

        return data as Rol[];
    }

    static async delete(id: number): Promise<void> {
        const { error } = await supabase.from("rol").delete().eq("id_rol", id);

        if (error) {
            throw new Error(`Error eliminando rol: ${error.message}`);
        }
    }
}
import { supabase } from "../../config/supabase";
import type { StackTecnologico, StackTecnologicoInput } from "../../types/stack_tecnologico";

export class StackTecnologicoModel {
    static async create(data: StackTecnologicoInput): Promise<StackTecnologico> {
        const { data: result, error } = await supabase
            .from("stack_tecnologico")
            .insert([data])
            .select();

        if (error) {
            throw new Error(`Error creando stack tecnologico: ${error.message}`);
        }

        return result[0] as StackTecnologico;
    }

    static async findById(id: number): Promise<StackTecnologico[]> {
        const { data, error } = await supabase
            .from("stack_tecnologico")
            .select("*")
            .eq("id", id);

        if (error) {
            throw new Error(`Error encontrando stack tecnologico con ese id: ${error.message}`);
        }

        return data as StackTecnologico[];
    }

    static async findByUserProject(idUsuarioProyecto: number): Promise<StackTecnologico[]> {
        const { data, error } = await supabase
            .from("stack_tecnologico")
            .select("*")
            .eq("id_usuario_proyecto", idUsuarioProyecto);

        if (error) {
            throw new Error(`Error encontrando stack tecnologico del usuario: ${error.message}`);
        }

        return data as StackTecnologico[];
    }

    static async findByCategory(cateogira: string): Promise<StackTecnologico[]> {
        const { data, error } = await supabase
            .from("stack_tecnologico")
            .select("*")
            .eq("categoria", cateogira);

        if (error) {
            throw new Error(`Error encontrando stack tecnologico de esa categoria: ${error.message}`);
        }

        return data as StackTecnologico[];
    }

    static async findByUserProjectAndCategory(idUsuarioProyecto: string, categoria: string): Promise<StackTecnologico[]> {
        const { data, error } = await supabase
            .from("stack_tecnologico")
            .select("*")
            .eq("id_usuario_proyecto", idUsuarioProyecto)
            .eq("categoria", categoria);

        if (error) {
            throw new Error(`Error encontrando stack tecnologico del usuario y categoria: ${error.message}`);
        }

        return data as StackTecnologico[];
    }


    static async delete(id: number): Promise<void> {
        const { error } = await supabase.from("stack_tecnologico").delete().eq("id", id);

        if (error) {
            throw new Error(`Error eliminando stack tecnologico: ${error.message}`);
        }
    }

}


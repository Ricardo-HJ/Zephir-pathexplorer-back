export interface SubEtapa {
    id_subetapa: number;
    nombre: string;
    descripcion: string;
    usuario_id: string;
    id_etapa: number;
    created_at?: string;
}

export interface SubEtapaInput {
    nombre: string;
    descripcion: string;
    usuario_id: string;
    idEtapa: number;
}
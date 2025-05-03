export interface SubEtapa {
    idSubetapa: number;
    created_at?: string;
    nombre: string;
    descripcion: string;
    usuario_id: string;
    id_etapa: number;
}

export interface SubEtapaInput {
    nombre: string;
    descripcion: string;
    usuario_id: string;
    id_etapa: number;
}
export interface Etapa{
    idEtapa: number;
    created_at?: string;
    titulo: string;
    descripcion: string;
    numero: string;
    usuario_id: string;
    id_path_carrera: number;
}

export interface EtapaInput{
    titulo: string;
    descripcion: string;
    numero: string;
    usuario_id: string;
    id_path_carrera: number;
}

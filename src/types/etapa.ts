export interface Etapa{
    id_etapa: number;
    numero: string;
    titulo: string;
    descripcion: string;
    id_path_carrera: number;
    usuario_id: string;
}

export interface EtapaInput{
    numero: string;
    titulo: string;
    descripcion: string;
    id_path_carrera: number;
    usuario_id: string;
}

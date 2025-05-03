export interface Proyecto {
    id_proyecto: number;
    id_people_lead: string;
    nombre: string;
    descripcion: string;
    fecha_inicio: string;
    fecha_fin: string;
    cupo_limite: number;
    horas: number;
    created_at?: string;
    updated_at?: string;
  }
  
  export interface ProyectoInput {
    id_people_lead: string;
    nombre: string;
    descripcion: string;
    fecha_inicio: string;
    fecha_fin: string;
    cupo_limite: number;
    horas: number;
  }
  
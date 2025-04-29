export interface Proyecto {
    id_proyecto: number;
    nombre: string;
    descripcion: string;
    fecha_inicio: string;
    fecha_fin: string;
    horas: number;
    cupo_limite: number;
    id_people_lead: string;
    created_at?: string;
    updated_at?: string;
  }
  
  export interface ProyectoInput {
    nombre: string;
    descripcion: string;
    fecha_inicio: string;
    fecha_fin: string;
    horas: number;
    cupo_limite: number;
    id_people_lead: string;
  }
  
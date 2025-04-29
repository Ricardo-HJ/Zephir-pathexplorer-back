export interface Curso {
    id_curso: number;
    id_usuario: string;
    nombre: string;
    descripcion: string;
    organizacion: string;
    fecha_inicio: string; //aqui van las fechas en strings
    fecha_fin: string;
    created_at?: string;
    updated_at?: string;
  }
  
  export interface CursoInput {
    id_usuario: string;
    nombre: string;
    descripcion: string;
    organizacion: string;
    fecha_inicio: string;
    fecha_fin: string;
  }
  
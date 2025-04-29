export interface Curso {
    id_curso: number;
    nombre: string;
    descripcion: string;
    fecha_inicio: string; //aqui van las fechas en strings
    fecha_fin: string;
    id_usuario: string;
    organizacion: string;
    created_at?: string;
    updated_at?: string;
  }
  
  export interface CursoInput {
    nombre: string;
    descripcion: string;
    fecha_inicio: string;
    fecha_fin: string;
    id_usuario: string;
    organizacion: string;
  }
  
export interface Curso {
    id_curso: number;
    nombre: string;
    descripcion: string;
    organizacion: string;
    created_at?: string;
    updated_at?: string;
  }
  
  export interface CursoInput {
    nombre: string;
    descripcion: string;
    organizacion: string;
  }
  
export interface CursoSubetapa {
    id_curso_subetapa: number;
    id_curso: number;
    id_subetapa: number;
    created_at?: string;
  }
  
  export interface CursoSubetapaInput {
    id_curso: number;
    id_subetapa: number;
  }
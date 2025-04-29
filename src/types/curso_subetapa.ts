export interface CursoSubetapa {
    id: number;
    id_curso: number;
    id_subetapa: number;
    created_at?: string;
  }
  
  export interface CursoSubetapaInput {
    id_curso: number;
    id_subetapa: number;
  }
export interface Objetivo {
    id_objetivo: number;
    usuario_id: string;
    objetivo: string;
    created_at?: string;
  }
  
  export interface ObjetivoInput {
    objetivo: string;
    usuario_id: string;
  }
  
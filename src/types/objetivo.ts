export interface Objetivo {
    id: number;
    created_at?: string;
    objetivo: string;
    usuario_id: string;
  }
  
  export interface ObjetivoInput {
    objetivo: string;
    usuario_id: string;
  }
  
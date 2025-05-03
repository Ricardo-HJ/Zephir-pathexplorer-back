export interface Prioridad {
    id: number;
    created_at?: string;
    nombre: string;
    usuario_id: string;
  }
  
  export interface PrioridadInput {
    nombre: string;
    usuario_id: string;
  }
  
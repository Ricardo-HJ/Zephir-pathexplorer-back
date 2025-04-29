export interface Prioridad {
    id_prioridad: number;
    usuario_id: string;
    nombre: string;
    created_at?: string;
  }
  
  export interface PrioridadInput {
    nombre: string;
    usuario_id: string;
  }
  
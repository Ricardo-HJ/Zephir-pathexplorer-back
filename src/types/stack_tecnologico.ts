export interface StackTecnologico {
    id: number;
    created_at?: string;
    nombre: string;
    categoria: string;
    id_usuario_proyecto: number;
  }
  
export interface StackTecnologicoInput {
    nombre: string;
    categoria: string;
    id_usuario_proyecto: number;
  }
export interface StackTecnologico {
    id_stack_tecnologico: number;
    id_usuario_proyecyo: number;
    nombre: string;
    categoria: string;
    created_at?: string;
  }
  
export interface StackTecnologicoInput {
    id_usuario_proyecyo: number;
    nombre: string;
    categoria: string;
  }
export interface Rol {
    id_rol: number;
    created_at?: string;
    updated_at?: string;
    nombre: string;
  }
  
  export interface RolInput {
    nombre: string;
  }

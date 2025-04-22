export interface User {
    idUsuario: string;
    tipoUsuario: string;
    correo: string;
    contraseña: string;
    created_at?: string;
  }
  
  export interface UserInput {
    tipoUsuario: string;
    correo: string;
    contraseña: string;
  }
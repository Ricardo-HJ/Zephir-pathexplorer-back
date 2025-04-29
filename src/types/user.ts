export interface User {
  id_usuario: string;
  id_tipo_usuario: number;
  correo: string;
  contraseña: string;
  profesion: string;
  nombre: string;
  apellido_p: string;
  apellido_m: string;
  fecha_ingreso: string;
  descripcion: string;
  created_at?: string;
  updated_at?: string;
}

export interface UserInput {
  id_tipo_usuario: number;
  correo: string;
  contraseña: string;
  profesion: string;
  nombre: string;
  apellido_p: string;
  apellido_m: string;
  fecha_ingreso: string;
  descripcion: string;
}
export interface Certificado {
    id_certificado: number;
    id_usuario: string;
    nombre: string;
    link: string;
    expedicion: string; //aqui van las fechas en strings
    caducidad: string;
    created_at?: string;
    updated_at?: string;
  }
  
  export interface CertificadoInput {
    id_usuario: string;
    nombre: string;
    link: string;
    expedicion: string;
    caducidad: string;
  }
  
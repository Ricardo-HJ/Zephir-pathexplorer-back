export interface Certificado {
    id_certificado: number;
    nombre: string;
    link: string;
    expedicion: string; //aqui van las fechas en strings
    caducidad: string;
    id_usuario: string; //el id también va en string
    created_at?: string;
    updated_at?: string;
  }
  
  export interface CertificadoInput {
    nombre: string;
    link: string;
    expedicion: string;
    caducidad: string;
    id_usuario: string;
  }
  
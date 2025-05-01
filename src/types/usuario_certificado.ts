export interface UsuarioCertificado {
    id_usuario_certificado: number;
    usuario_id: string;
    id_certificado: number;
    created_at?: string;
    updated_at?: string;
}

export interface UsuarioCertificadoInput {
    usuario_id: string;
    certificado_id: number;
}


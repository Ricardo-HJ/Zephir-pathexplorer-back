export interface Telefono {
    id_telefono: number;
    id_usuario: string;
    numero: string;
    created_at?: string;
    updated_at?: string;
}

export interface TelefonoInput {
    id_usuario: string;
    numero: string;
}
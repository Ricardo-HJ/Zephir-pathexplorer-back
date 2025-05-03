/**
 * Validar la entrada para una prioridad
 */

export function validatePriority(data: any): { isValid: boolean; errors: string[] } {
    const errors: string[] = []
    
        // Validar nombre de la prioridad
        if (!data.nombre) {
            errors.push("El nombre de la prioridad es obligatorio")
        }
    
        // Validar descripción de la prioridad
        if (!data.usuario_id) {
            errors.push("El usuario_id de la prioridad es obligatorio")
        }
    
        return {
            isValid: errors.length === 0,
            errors,
        }
}

export function validateInteres(data: any): { isValid: boolean; errors: string[] } {
    const errors: string[] = []
    
        // Validar nombre del interés
        if (!data.nombre) {
            errors.push("El nombre del interés es obligatorio")
        }
    
        // Validar descripción del interés
        if (!data.usuario_id) {
            errors.push("El usuario_id del interés es obligatorio")
        }
    
        return {
            isValid: errors.length === 0,
            errors,
        }
    }

export function validateObjetivo(data: any): { isValid: boolean; errors: string[] } {
    const errors: string[] = []
    
        // Validar nombre del objetivo
        if (!data.objetivo) {
            errors.push("El nombre del objetivo es obligatorio")
        }
    
        // Validar descripción del objetivo
        if (!data.usuario_id) {
            errors.push("El usuario_id del objetivo es obligatorio")
        }
    
        return {
            isValid: errors.length === 0,
            errors,
        }
    }

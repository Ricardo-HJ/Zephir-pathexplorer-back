
// validar entrada de un proyecto

export function validateProject(data: any): { isValid: boolean; errors: string[] } {
    const errors: string[] = []
    
        // Validar nombre del proyecto
        if (!data.nombre) {
            errors.push("El nombre del proyecto es obligatorio")
        }
    
        // Validar descripción del proyecto
        if (!data.descripcion) {
            errors.push("La descripción del proyecto es obligatoria")
        } 
    
        // Validar fecha de inicio del proyecto
        if (!data.fecha_inicio) {
            errors.push("La fecha de inicio del proyecto es obligatoria")
        }
    
        // Validar fecha de fin del proyecto
        if (!data.fecha_fin) {
            errors.push("La fecha de fin del proyecto es obligatoria")
        } else if (new Date(data.fecha_fin) < new Date(data.fecha_inicio)) {
            errors.push("La fecha de fin del proyecto no puede ser anterior a la fecha de inicio")
        }

        // Validar cupo limite del proyecto
        if (!data.cupo_limite) {
            errors.push("El cupo limite del proyecto es obligatorio")
        } else if (isNaN(data.cupo_limite) || data.cupo_limite <= 0) {
            errors.push("El cupo limite del proyecto debe ser un número positivo")
        }

        // Validar horas del proyecto
        if (!data.horas) {
            errors.push("Las horas del proyecto son obligatorias")
        } else if (isNaN(data.horas) || data.horas <= 0) {
            errors.push("Las horas del proyecto deben ser un número positivo")
        }

        // Validar id_people_lead del proyecto
        if (!data.id_people_lead) {
            errors.push("El id_people_lead del proyecto es obligatorio")
        } else if (typeof data.id_people_lead !== "string") {
            errors.push("El id_people_lead del proyecto debe ser una cadena de texto")
        }

        return {
            isValid: errors.length === 0,
            errors,
        }
}

// validar entrada de un proyecto de un usuario
export function validateUserProject(data: any): { isValid: boolean; errors: string[] } {
    const errors: string[] = []

        // Validar id_usuario del proyecto
        if (!data.id_usuario) {
            errors.push("El id_usuario del proyecto es obligatorio")
        } else if (typeof data.id_usuario !== "string") {
            errors.push("El id_usuario del proyecto debe ser una cadena de texto")
        }

        // Validar id_proyecto del proyecto
        if (!data.id_proyecto) {
            errors.push("El id_proyecto del proyecto es obligatorio")
        } else if (typeof data.id_proyecto !== "string") {
            errors.push("El id_proyecto del proyecto debe ser una cadena de texto")
        }

        // Validar id_rol del proyecto
        if (!data.id_rol) {
            errors.push("El id_rol del proyecto es obligatorio")
        }

        return {
            isValid: errors.length === 0,
            errors,
        }
}
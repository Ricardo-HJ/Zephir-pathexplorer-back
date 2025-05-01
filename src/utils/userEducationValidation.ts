/**
 * Validar la entrada para registrar un curso
 */
export function validateAddCourse(data: any): { isValid: boolean; errors: string[] } {
    const errors: string[] = []
  
    // Validar nombre del curso
    if (!data.nombre) {
      errors.push("El nombre del curso es obligatorio")
    }
  
    if (!data.descripcion) {
      errors.push("La descripción del curso es obligatoria")
    }

    if (!data.organizacion) {
      errors.push("La organización del curso es obligatoria")
    }

  
    return {
      isValid: errors.length === 0,
      errors,
    }
  }
  
  /**
   * Validar la entrada para registrar una certificación
   */
  export function validateAddCertification(data: any): { isValid: boolean; errors: string[] } {
    const errors: string[] = []
  
    // Validar nombre de la certificación
    if (!data.nombre) {
      errors.push("El nombre de la certificación es obligatorio")
    }

    if (!data.id_usuario) {
        errors.push("El id del usuario es obligatorio")
    }
  

    if (!data.expedicion) {
        errors.push("La fecha de caducidad es obligatoria")
    } else if (!isValidDate(data.fechaCaducidad)) {
        errors.push("La fecha de caducidad debe ser una fecha válida")
    }

    if (!data.caducidad) {
        errors.push("La fecha de caducidad es obligatoria")
    } else if (!isValidDate(data.caducidad)) {
        errors.push("La fecha de caducidad debe ser una fecha válida")
    } else if (new Date(data.expedicion) > new Date(data.caducidad)) {
        errors.push("La fecha de expedición no puede ser mayor que la fecha de caducidad")
    }

    if (!data.link) {
      errors.push("La URL del certificado es obligatoria")

    }

    return {
      isValid: errors.length === 0,
      errors,
    }
  }
  
  //falta que se validen los demás campos 

  /**
   * Validar la entrada para agregar un usuario a un curso
   */
  export function validateAddUserCourse(data: any): { isValid: boolean; errors: string[] } {
    const errors: string[] = []

    // Validar userId
    if (!data.usuario_id) {
      errors.push("El userId es obligatorio")
    }
  
    // Validar cursoId
    if (!data.id_curso) {
      errors.push("El cursoId es obligatorio")
    }

    if (!data.fecha_inicio) {
        errors.push("La fecha de inicio es obligatoria")
    } else if (!isValidDate(data.fecha_inicio)) {
        errors.push("La fecha de inicio debe ser una fecha válida")
    }
  
    return {
      isValid: errors.length === 0,
      errors,
    }
  }
  
  /**
   * Validar la entrada para agregar una certificación a un usuario
   */
  export function validateAddUserCertification(data: any): { isValid: boolean; errors: string[] } {
    const errors: string[] = []
  
    // Validar userId
    if (!data.userId) {
      errors.push("El userId es obligatorio")
    }
  
    // Validar certificacionId
    if (!data.certificacionId) {
      errors.push("El certificacionId es obligatorio")
    }
  
    // Validar fecha de emisión
    if (!data.fechaEmision) {
      errors.push("La fecha de emisión es obligatoria")
    } else if (!isValidDate(data.fechaEmision)) {
      errors.push("La fecha de emisión debe ser una fecha válida")
    }
  
    return {
      isValid: errors.length === 0,
      errors,
    }
  }
  
  /**
   * Validar si una fecha es válida
   */
  function isValidDate(date: string): boolean {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/
    return dateRegex.test(date)
  }
  
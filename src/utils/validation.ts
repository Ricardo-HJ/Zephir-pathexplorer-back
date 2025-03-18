/**
 * Validate user input for registration
 */
export function validateUserRegistration(data: any): { isValid: boolean; errors: string[] } {
    const errors: string[] = []
  
    // Check if required fields are present
    if (!data.tipoUsuario) {
      errors.push("tipoUsuario is required")
    }
  
    if (!data.correo) {
      errors.push("correo is required")
    } else if (!isValidEmail(data.correo)) {
      errors.push("correo must be a valid email address")
    }
  
    if (!data.contraseña) {
      errors.push("contraseña is required")
    } else if (data.contraseña.length < 8) {
      errors.push("contraseña must be at least 8 characters long")
    }
  
    return {
      isValid: errors.length === 0,
      errors,
    }
  }
  
  /**
   * Validate user input for login
   */
  export function validateUserLogin(data: any): { isValid: boolean; errors: string[] } {
    const errors: string[] = []
  
    if (!data.correo) {
      errors.push("correo is required")
    }
  
    if (!data.contraseña) {
      errors.push("contraseña is required")
    }
  
    return {
      isValid: errors.length === 0,
      errors,
    }
  }
  
  /**
   * Check if a string is a valid email
   */
  function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }
  
  
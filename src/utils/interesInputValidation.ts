import type { Interes, InteresInput, UsuarioInteresInput } from "../types/interes"

export function validateInteresInput(interesInput: InteresInput): boolean {
    if (!interesInput.nombre || interesInput.nombre.length < 3) {
      alert("El nombre debe tener al menos 3 caracteres.");
      return false;
    }
    return true;
  }
  
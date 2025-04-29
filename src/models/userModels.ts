import { supabase } from "../config/supabase"
import type { User, UserInput } from "../types/user"
import bcrypt from "bcrypt"

export class UserModel {
  /**
   * Create a new user
   */
  static async create(userData: UserInput): Promise<User> {
    // Hash the password
    const hashedPassword = await bcrypt.hash(userData.contraseña, 10)

    // Insert user into database
    const { data, error } = await supabase
      .from("usuario")
      .insert([
        {
          id_tipo_usuario: userData.id_tipo_usuario, // Aseguramos que coincidan las claves de la base de datos
          correo: userData.correo,
          contraseña: hashedPassword,
          profesion: userData.profesion,
          nombre: userData.nombre,
          apellido_p: userData.apellido_p,
          apellido_m: userData.apellido_m,
          fecha_ingreso: userData.fecha_ingreso,
          descripcion: userData.descripcion
        }
      ])
      .select()

    if (error) {
      throw new Error(`Error creating user: ${error.message}`)
    }

    return data[0] as User
  }

  /**
   * Find a user by email
   */
  static async findByEmail(email: string): Promise<User | null> {
    const { data, error } = await supabase.from("usuario").select("*").eq("correo", email).single()

    if (error) {
      if (error.code === "PGRST116") {
        // PGRST116 is the error code for "no rows returned"
        return null
      }
      throw new Error(`Error finding user: ${error.message}`)
    }

    return data as User
  }

  /**
   * Find a user by ID
   */
  static async findById(id: string): Promise<User | null> {
    const { data, error } = await supabase
      .from("usuario")
      .select("id_usuario, id_tipo_usuario, correo, created_at")
      .eq("id_usuario", id)  // Usamos 'id_usuario' en lugar de 'idUsuario'
      .single()

    if (error) {
      if (error.code === "PGRST116") {
        return null
      }
      throw new Error(`Error finding user: ${error.message}`)
    }

    return data as User
  }

  /**
   * Update a user
   */
  static async update(id: string, userData: Partial<UserInput>): Promise<User> {
    // If password is being updated, hash it
    if (userData.contraseña) {
      userData.contraseña = await bcrypt.hash(userData.contraseña, 10)
    }

    const { data, error } = await supabase.from("usuario").update(userData).eq("id_usuario", id).select()

    if (error) {
      throw new Error(`Error updating user: ${error.message}`)
    }

    return data[0] as User
  }

  /**
   * Delete a user
   */
  static async delete(id: string): Promise<void> {
    const { error } = await supabase.from("usuario").delete().eq("id_usuario", id)  // Usamos 'id_usuario'

    if (error) {
      throw new Error(`Error deleting user: ${error.message}`)
    }
  }

  /**
   * Verify password
   */
  static async verifyPassword(user: User, password: string): Promise<boolean> {
    return bcrypt.compare(password, user.contraseña)
  }
}

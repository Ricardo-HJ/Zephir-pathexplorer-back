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
          tipoUsuario: userData.tipoUsuario,
          correo: userData.correo,
          contraseña: hashedPassword,
        },
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
      .select("idUsuario, tipoUsuario, correo, created_at")
      .eq("idUsuario", id)
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

    const { data, error } = await supabase.from("usuario").update(userData).eq("idUsuario", id).select()

    if (error) {
      throw new Error(`Error updating user: ${error.message}`)
    }

    return data[0] as User
  }

  /**
   * Delete a user
   */
  static async delete(id: string): Promise<void> {
    const { error } = await supabase.from("usuario").delete().eq("idUsuario", id)

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


import type { Request, Response } from "express"
import jwt from "jsonwebtoken"
import { UserModel } from "../models/userModels"
import { validateUserRegistration, validateUserLogin } from "../utils/validation"

// Register a new user
export const registerUser = async (req: Request, res: Response) => {
  try {
    console.log("Register user request body:", req.body)

    // Validate input
    const validation = validateUserRegistration(req.body)
    if (!validation.isValid) {
      res.status(400).json({ error: validation.errors.join(", ") })
      return
    }

    // Create user
    const user = await UserModel.create(req.body)

    // Remove password from response
    const { contraseña, ...userWithoutPassword } = user

    res.status(201).json({ user: userWithoutPassword })
  } catch (error: any) {
    console.error("Error registering user:", error)

    // Handle duplicate email error
    if (error.message.includes("duplicate key value violates unique constraint")) {
      res.status(400).json({ error: "Email already exists" })
      return
    }

    res.status(500).json({ error: error.message || "Internal server error" })
  }
}

// Login user
export const loginUser = async (req: Request, res: Response) => {
  try {
    console.log("Login user request body:", req.body)

    // Validate input
    const validation = validateUserLogin(req.body)
    if (!validation.isValid) {
      res.status(400).json({ error: validation.errors.join(", ") })
      return
    }

    const { correo, contraseña } = req.body

    // Find user by email
    const user = await UserModel.findByEmail(correo)
    if (!user) {
      res.status(401).json({ error: "Invalid credentials" })
      return
    }

    // Verify password
    const isPasswordValid = await UserModel.verifyPassword(user, contraseña)
    if (!isPasswordValid) {
      res.status(401).json({ error: "Invalid credentials" })
      return
    }

    // Generate JWT token
    const token = jwt.sign(
      { idUsuario: user.idUsuario, correo: user.correo, tipoUsuario: user.tipoUsuario },
      process.env.JWT_SECRET as string,
      { expiresIn: "24h" },
    )

    // Remove password from response
    const { contraseña: _, ...userWithoutPassword } = user

    res.status(200).json({ user: userWithoutPassword, token })
  } catch (error: any) {
    console.error("Error logging in:", error)
    res.status(500).json({ error: error.message || "Internal server error" })
  }
}

// Get user profile
export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.idUsuario

    if (!userId) {
      res.status(400).json({ error: "User ID is required" })
      return
    }

    const user = await UserModel.findById(userId)
    if (!user) {
      res.status(404).json({ error: "User not found" })
      return
    }

    res.status(200).json({ user })
  } catch (error: any) {
    console.error("Error getting user profile:", error)
    res.status(500).json({ error: error.message || "Internal server error" })
  }
}

// Update user profile
export const updateUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.idUsuario

    if (!userId) {
      res.status(400).json({ error: "User ID is required" })
      return
    }

    // Only allow updating certain fields
    const { tipoUsuario, contraseña } = req.body
    const updateData: any = {}

    if (tipoUsuario) updateData.tipoUsuario = tipoUsuario
    if (contraseña) updateData.contraseña = contraseña

    // Update user
    const updatedUser = await UserModel.update(userId, updateData)

    // Remove password from response
    const { contraseña: _, ...userWithoutPassword } = updatedUser

    res.status(200).json({ user: userWithoutPassword })
  } catch (error: any) {
    console.error("Error updating user profile:", error)
    res.status(500).json({ error: error.message || "Internal server error" })
  }
}

// Delete user account
export const deleteUserAccount = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.idUsuario

    if (!userId) {
      res.status(400).json({ error: "User ID is required" })
      return
    }

    await UserModel.delete(userId)

    res.status(200).json({ message: "User account deleted successfully" })
  } catch (error: any) {
    console.error("Error deleting user account:", error)
    res.status(500).json({ error: error.message || "Internal server error" })
  }
}


import type { Request, Response } from "express"
import { UserModel } from "../models/userModels"
import { InteresModel } from "../models/path-carrera/interesModel"
import { PrioridadModel } from "../models/path-carrera/prioridadModel"
import { ObjetivoModel } from "../models/path-carrera/objetivoModel"
import { validatePriority, validateInteres, validateObjetivo } from "../utils/pathCarreraValidation"
import e from "express"


// añadir prioridad al usuario

export const addPriority = async (req: Request, res: Response) => {
    try {
        console.log("Add user priority request body:", req.body)

        const id_usuario = req.user?.id_usuario

        if (!id_usuario) {
            res.status(400).json({ error: "User ID is required" })
            return
        }

        // Validate input
        const validation = validatePriority(req.body)
        if (!validation.isValid) {
            res.status(400).json({ error: validation.errors.join(", ") })
            return
        }

        const nombre = req.body

        // Create user priority
        const newPriority = await PrioridadModel.create({ nombre, usuario_id: id_usuario })
        console.log("New priority created:", newPriority)
        res.status(201).json(newPriority)
    } catch (error: any) {
        console.error("Error al agregar prioridad al usuario:", error.message);
        return res.status(500).json({ error: "Error del servidor" });
    }
}

// obtener prioridades del usuario
export const getMyPriorities = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id_usuario

        if (!userId) {
            res.status(400).json({ error: "User ID is required" })
            return
        }
        

        const prioridades = await PrioridadModel.findByUser(userId)
        return res.status(200).json(prioridades)
    } catch (error: any) {
        console.error("Error al obtener prioridades del usuario:", error.message)
        return res.status(500).json({ error: "Error del servidor" })
    }
}

// añadir interes al usuario
export const addInteres = async (req: Request, res: Response) => {
    try {
        console.log("Add user interest request body:", req.body)

        const userId = req.user?.id_usuario

        if (!userId) {
            res.status(400).json({ error: "User ID is required" })
            return
        }


        // Validate input
        const validation = validateInteres(req.body)
        if (!validation.isValid) {
            res.status(400).json({ error: validation.errors.join(", ") })
            return
        }

        const { nombre } = req.body

        // Create user interest
        const newInterest = await InteresModel.create({ nombre, usuario_id: userId })

        res.status(201).json(newInterest)
    } catch (error: any) {
        console.error("Error al agregar interés al usuario:", error.message);
        return res.status(500).json({ error: "Error del servidor" });
    }
}

// obtener intereses del usuario
export const getMyIntereses = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id_usuario

        if (!userId) {
            res.status(400).json({ error: "User ID is required" })
            return
        }

        const intereses = await InteresModel.findByUser(userId)
        return res.status(200).json(intereses)
    } catch (error: any) {
        console.error("Error al obtener intereses del usuario:", error.message)
        return res.status(500).json({ error: "Error del servidor" })
    }
}


// añadir objetivo al usuario
export const addObjetivo = async (req: Request, res: Response) => {
    try {
        console.log("Add user objective request body:", req.body)

        const userId = req.user?.id_usuario

        if (!userId) {
            res.status(400).json({ error: "User ID is required" })
            return
        }


        // Validate input
        const validation = validateObjetivo(req.body)
        if (!validation.isValid) {
            res.status(400).json({ error: validation.errors.join(", ") })
            return
        }

        const { objetivo } = req.body

        // Create user objective
        const newObjective = await ObjetivoModel.create({ objetivo, usuario_id: userId })

        res.status(201).json(newObjective)
    } catch (error: any) {
        console.error("Error al agregar objetivo al usuario:", error.message);
        return res.status(500).json({ error: "Error del servidor" });
    }
}

// obtener objetivos del usuario
export const getMyObjetivos = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id_usuario

        if (!userId) {
            res.status(400).json({ error: "User ID is required" })
            return
        }

        const objetivos = await ObjetivoModel.findByUser(userId)
        return res.status(200).json(objetivos)
    } catch (error: any) {
        console.error("Error al obtener objetivos del usuario:", error.message)
        return res.status(500).json({ error: "Error del servidor" })
    }
}






// obtener path carrera del usuario

// obtener etapas del path de carrera del usuario

// obtener sub etapas del path de carrera del usuario

// obtener cursos de las sub etapas path de carrera del usuario

// obtener cursos generales de las etapas del path de carrera del usuario
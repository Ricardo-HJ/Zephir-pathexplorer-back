import type { Request, Response } from "express"
import jwt from "jsonwebtoken"
import { UsuarioEducacionService } from "../services/usuarioEducacionService"
import { UsuarioCursoModel } from "../models/cursos-certificados/usuarioCursoModel"
import { CertificacionModel } from "../models/cursos-certificados/certificacionModel"
import { validateAddCertification, validateAddCourse, validateAddUserCourse } from "../utils/userEducationValidation"
import e from "express"
import { CursoModel } from "../models/cursos-certificados/cursoModel"


export const addUserCourse = async (req: Request, res: Response) => {
    try {
        console.log("Add user course request body:", req.body)

        // Validate input
        const validation = validateAddUserCourse(req.body)
        if (!validation.isValid) {
            res.status(400).json({ error: validation.errors.join(", ") })
            return
        }

        const { usuario_id, id_curso } = req.body

        // Create user course
        const fecha_inicio = new Date().toISOString();
        const newCourse = await UsuarioCursoModel.create({ usuario_id, id_curso, fecha_inicio })

        res.status(201).json(newCourse)
    } catch (error: any) {
        console.error("Error al agregar curso al usuario:", error.message);
        return res.status(500).json({ error: "Error del servidor" });
    }
}

export const addCertification = async (req: Request, res: Response) => {
    try {
        console.log("Add user certification request body:", req.body)

        // Validate input
        const validation = validateAddCertification(req.body)
        if (!validation.isValid) {
            res.status(400).json({ error: validation.errors.join(", ") })
            return
        }

        const { id_usuario, nombre, link, expedicion, caducidad } = req.body

        const newCertification = await CertificacionModel.create({ id_usuario, nombre, link, expedicion, caducidad})

        res.status(201).json(newCertification)
    } catch (error: any) {
        console.error("Error al agregar certificación al usuario:", error.message);
        return res.status(500).json({ error: "Error del servidor" });
    }
}

export const getUserCourses = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params

        if (!userId) {
            return res.status(400).json({ error: "Falta el parámetro userId" })
        }

        const cursos = await UsuarioEducacionService.getUserCourses(userId)
        return res.status(200).json(cursos)
    } catch (error: any) {
        console.error("Error al obtener cursos del usuario:", error.message)
        return res.status(500).json({ error: "Error del servidor" })
    }
}

export const getUserCertifications = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params

        if (!userId) {
            return res.status(400).json({ error: "Falta el parámetro userId" })
        }

        const certificaciones = await UsuarioEducacionService.getUserCertifications(userId)
        return res.status(200).json(certificaciones)
    } catch (error: any) {
        console.error("Error al obtener certificaciones del usuario:", error.message)
        return res.status(500).json({ error: "Error del servidor" })
    }
}

export const addCourse = async (req: Request, res: Response) => {
    try {
        console.log("Add course request body:", req.body)

        // Validate input
        const validation = validateAddCourse(req.body)
        if (!validation.isValid) {
            res.status(400).json({ error: validation.errors.join(", ") })
            return
        }

        const { nombre, descripcion, organizacion } = req.body

        const newCourse = await CursoModel.create({ nombre, descripcion, organizacion })

        res.status(201).json(newCourse)
    } catch (error: any) {
        console.error("Error al agregar curso:", error.message)
        return res.status(500).json({ error: "Error del servidor" })
    }
}




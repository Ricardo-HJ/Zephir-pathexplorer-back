import type { Request, Response } from "express"
import jwt from "jsonwebtoken"
import { UserModel } from "../models/userModels"
import { SkillModel } from "../models/skillModel"
import { ProyectoSkillModel } from "../models/proyectoSkillModel"
import { validateUserRegistration, validateUserLogin } from "../utils/validation"
import e from "express"


// obtener skills del usuario

import { Request, Response } from "express";
import { InteresModel } from "../models/interesModel";
import { validateInteresInput } from "../utils/interesInputValidation";

// Crear un nuevo interés
export const createInteres = async (req: Request, res: Response) => {
  try {
    console.log("Create interest request body:", req.body);

    // validar input de interes
    const isValid = validateInteresInput(req.body);
    if (!isValid) {
      res.status(400).json({ error: "Invalid input data" });
      return;
    }

    // generar interes
    const interes = await InteresModel.create(req.body);

    res.status(201).json({ interes });
  } catch (error: any) {
    console.error("Error creating interest:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};

// obtener interes por nombre
export const getInteresByName = async (req: Request, res: Response) => {
  try {
    const { nombre } = req.params;

    const interes = await InteresModel.findByNombre(nombre);
    if (!interes) {
      res.status(404).json({ error: "Interest not found" });
      return;
    }

    res.status(200).json({ interes });
  } catch (error: any) {
    console.error("Error fetching interest by name:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};

// interes por id
export const getInteresById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const interes = await InteresModel.findById(id);
    if (!interes) {
      res.status(404).json({ error: "Interest not found" });
      return;
    }

    res.status(200).json({ interes });
  } catch (error: any) {
    console.error("Error fetching interest by ID:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};

// actualizar interes
export const updateInteres = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;


    const updatedInteres = await InteresModel.update(id, req.body);

    res.status(200).json({ interes: updatedInteres });
  } catch (error: any) {
    console.error("Error updating interest:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};

// eliminar interes
export const deleteInteres = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await InteresModel.delete(id);

    res.status(200).json({ message: "Interest deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting interest:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};

// asignar interes a un usuario
export const assignInteresToUser = async (req: Request, res: Response) => {
  try {
    const { idUsuario, idInteres } = req.body;

    await InteresModel.assignToUser({ idUsuario, idInteres });

    res.status(200).json({ message: "Interest assigned to user successfully" });
  } catch (error: any) {
    console.error("Error assigning interest to user:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};

// eliminar interes de usuario
export const removeInteresFromUser = async (req: Request, res: Response) => {
  try {
    const { idUsuario, idInteres } = req.body;

    await InteresModel.removeFromUser({ idUsuario, idInteres });

    res.status(200).json({ message: "Interest removed from user successfully" });
  } catch (error: any) {
    console.error("Error removing interest from user:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};

// obtener intereses de usuario
export const getUserInterests = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.idUsuario;

    if (!userId) {
      res.status(400).json({ error: "User ID is required" });
      return;
    }

    const intereses = await InteresModel.getUserInterests(userId);

    res.status(200).json({ intereses });
  } catch (error: any) {
    console.error("Error getting user interests:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};

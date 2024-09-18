import EquiposService from "../services/equipmentService";
import { Request,Response } from "express";
import { InterfazEquiposImformaticos } from "../models/types/equipos.type";

export const createEquipos= async (req:Request,res:Response):Promise<void>=>{
    try {
        const data: InterfazEquiposImformaticos = req.body;
        const equipo = await EquiposService.createEquipos(data);
        res.status(201).json(equipo);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}
export const getEquipos = async (req: Request, res: Response): Promise<void> => {
    try {
        const equipos = await EquiposService.getAllEquipos();
        res.status(200).json(equipos);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
export const getEquipoById = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id, 10);
        const equipo = await EquiposService.getEquipoById(id);
        if (equipo) {
            res.status(200).json(equipo);
        } else {
            res.status(404).json({ message: 'Equipo no encontrado' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const updateEquipos = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id, 10);
        const data: Partial<InterfazEquiposImformaticos> = req.body;
        const equipo = await EquiposService.updateEquipos(id, data);
        res.status(200).json(equipo);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteEquipos = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id, 10);
        await EquiposService.deleteEquipos(id);
        res.status(200).json({ message: 'Equipo eliminado' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
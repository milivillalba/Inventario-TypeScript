// controllers/equipmentController.ts
import { Request, Response } from 'express';
import * as equipmentService from '../services/equipmentService';

// Obtener todos los equipos
export const getEquipments = async (req: Request, res: Response) => {
    try {
        const equipos = await equipmentService.getAllEquipments();
        res.json(equipos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los equipos', error });
    }
};

// Obtener un equipo por ID
export const getEquipmentById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const equipo = await equipmentService.getEquipmentById(id);
        if (!equipo) {
            return res.status(404).json({ message: 'Equipo no encontrado' });
        }
        res.json(equipo);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el equipo', error });
    }
};

// Crear un nuevo equipo
export const createEquipment = async (req: Request, res: Response) => {
    try {
        const { name, type, status, location, fechaCompra } = req.body;
        if (!name || !type || !status || !location || !fechaCompra) {
            return res.status(400).json({ message: 'Faltan datos para crear el equipo' });
        }
        const newEquipment = await equipmentService.createEquipment({ name, type, status, location, fechaCompra });
        res.status(201).json(newEquipment);
    } catch (error) {
        res.status(400).json({ message: 'Error al crear el equipo', error });
    }
};

// Actualizar un equipo existente
export const updateEquipment = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updated = await equipmentService.updateEquipment(id, req.body);
        if (updated) {
            const updatedEquipment = await equipmentService.getEquipmentById(id);
            res.json(updatedEquipment);
        } else {
            res.status(404).json({ message: 'Equipo no encontrado' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar el equipo', error });
    }
};

// Eliminar un equipo
export const deleteEquipment = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deleted = await equipmentService.deleteEquipment(id);
        if (deleted) {
            res.json({ message: 'Equipo eliminado correctamente' });
        } else {
            res.status(404).json({ message: 'Equipo no encontrado' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Error al eliminar el equipo', error });
    }
};

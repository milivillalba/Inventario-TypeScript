import { Request, Response } from 'express';
import Equipos from '../models/equipmentModel';

// Obtener todos los equipos
export const getEquipments = async (req: Request, res: Response) => {
    try {
        const equipos = await Equipos.findAll();
        res.json(equipos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los equipos', error });
    }
};

// Obtener un equipo por ID
export const getEquipmentById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const equipo = await Equipos.findByPk(id);
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
        const newEquipment = await Equipos.create({ name, type, status, location, fechaCompra });
        res.status(201).json(newEquipment);
    } catch (error) {
        res.status(400).json({ message: 'Error al crear el equipo', error });
    }
};

// Actualizar un equipo existente
export const updateEquipment = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const [updated] = await Equipos.update(req.body, { where: { id } });
        if (updated) {
            const updatedEquipment = await Equipos.findByPk(id);
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
        const deleted = await Equipos.destroy({ where: { id } });
        if (deleted) {
            res.json({ message: 'Equipo eliminado correctamente' });
        } else {
            res.status(404).json({ message: 'Equipo no encontrado' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Error al eliminar el equipo', error });
    }
};

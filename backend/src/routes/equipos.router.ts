import { Router } from 'express';
import { authenticateJWT } from '../middlewares/auth.middleware';
import {
    getEquipments,
    getEquipmentById,
    createEquipment,
    updateEquipment,
    deleteEquipment
} from '../controllers/equipo.controllers';

const router = Router();

// Ruta para obtener todos los equipos
router.get('/', authenticateJWT, getEquipments);

// Ruta para obtener un equipo por ID
router.get('/:id', authenticateJWT, getEquipmentById);

// Ruta para crear un nuevo equipo
router.post('/', authenticateJWT, createEquipment);

// Ruta para actualizar un equipo por ID
router.put('/:id', authenticateJWT, updateEquipment);

// Ruta para eliminar un equipo por ID
router.delete('/:id', authenticateJWT, deleteEquipment);

export default router;

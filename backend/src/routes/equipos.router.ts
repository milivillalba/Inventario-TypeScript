import { Router } from 'express';
import { createEquipment, updateEquipment, deleteEquipment } from '../controllers/equipo.controllers';
import { authenticateJWT } from '../middlewares/auth.middleware';
import { verifyAdminRole } from '../middlewares/verifyAdminRole';

const router = Router();

// Rutas protegidas por autenticación y verificación de rol admin
router.post('/equipments', authenticateJWT, verifyAdminRole, createEquipment);
router.put('/equipments/:id', authenticateJWT, verifyAdminRole, updateEquipment);
router.delete('/equipments/:id', authenticateJWT, verifyAdminRole, deleteEquipment);

export default router;

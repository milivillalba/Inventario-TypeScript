import { Router } from 'express';
import { createEquipos,deleteEquipos,updateEquipos, getEquipos,getEquipoById} from '../controllers/equipo.controllers';
import { authenticateJWT } from '../middlewares/auth.middleware';
import { verifyAdminRole } from '../middlewares/verifyAdminRole';

const router = Router();

// Rutas para los equipos
router.get('/equipos', getEquipos);
router.get('/equipos/:id', authenticateJWT, verifyAdminRole, getEquipoById); 
router.post('/equipos', authenticateJWT, verifyAdminRole, createEquipos);
router.put('/equipos/:id', authenticateJWT, verifyAdminRole, updateEquipos);
router.delete('/equipos/:id', authenticateJWT, verifyAdminRole, deleteEquipos);

export default router;

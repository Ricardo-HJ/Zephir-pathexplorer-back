import { Router } from 'express';
import { addPriority, addInteres, addObjetivo, getUserInterests, getUserObjetivos, getUserPriorities } from '../controllers/pathCarreraController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// there are no public routes in this file, all routes are protected
// Protected routes
router.post('/user/prioridad', authenticateToken, addPriority);
router.post('/user/interes', authenticateToken, addInteres);
router.post('/user/objetivo', authenticateToken, addObjetivo);
router.get('/user/prioridades/:idUsuario', authenticateToken, getUserPriorities);
router.get('/user/intereses/:idUsuario', authenticateToken, getUserInterests);
router.get('/user/objetivos/:idUsuario', authenticateToken, getUserObjetivos);


export default router;

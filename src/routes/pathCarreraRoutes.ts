import { Router } from 'express';
import { addPriority, addInteres, addObjetivo, getMyIntereses, getMyObjetivos, getMyPriorities } from '../controllers/pathCarreraController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// there are no public routes in this file, all routes are protected
// Protected routes
router.post('/user/add-prioridad', authenticateToken, addPriority);
router.post('/user/add-interes', authenticateToken, addInteres);
router.post('/user/add-objetivo', authenticateToken, addObjetivo);
router.get('/user/mis-prioridades/', authenticateToken, getMyPriorities);
router.get('/user/mis-intereses', authenticateToken, getMyIntereses);
router.get('/user/mis-objetivos', authenticateToken, getMyObjetivos);


export default router;

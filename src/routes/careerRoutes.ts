import { Router } from 'express';
import { getInteresById, getInteresByName, getUserInterests, assignInteresToUser, removeInteresFromUser } from '../controllers/interesController';
import { authenticateToken } from '../middleware/auth';
import { get } from 'http';

const router = Router();

// Protected routes
router.get('/getInteresById', authenticateToken, getInteresById);
router.get('/getInteresByName', authenticateToken, getInteresByName);
router.get('/getUserInterests', authenticateToken, getUserInterests);
router.post('/assignInteresToUser', authenticateToken, assignInteresToUser);
router.post('/removeInteresFromUser', authenticateToken, removeInteresFromUser);

export default router;

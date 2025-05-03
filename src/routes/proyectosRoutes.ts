import { Router } from 'express';
import { addProject, addProjectToUser, getProjectAssignedUsers, getProjectsByDeliveryLead, getUserProjects } from '../controllers/proyectosController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// there are no public routes in this file, all routes are protected
// Protected routes
router.post('/user/proyectoUsuario', authenticateToken, addProjectToUser);
router.post('/user/proyecto', authenticateToken, addProject);
router.get('/user/proyectos/:idUsuario', authenticateToken, getUserProjects);
router.get('/user/proyectos/deliverylead/:idDeliveryLead', authenticateToken, getProjectsByDeliveryLead);
router.get('/user/proyectos/:idProyecto/usuarios', authenticateToken, getProjectAssignedUsers);

// falta implementar la parte de confirmar permisos para poder ejecutar el endpoint de agregar un proyecto a un usuario



export default router;
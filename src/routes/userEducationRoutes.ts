import { Router } from 'express';
import { addUserCourse, addCertification, getUserCertifications, getUserCourses, addCourse } from '../controllers/cursos_certificacionesController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// there are no public routes in this file, all routes are protected
// Protected routes
router.get('/user/:userId/cursos', authenticateToken, getUserCourses);
router.get('/user/:userId/certificaciones', authenticateToken, getUserCertifications);
router.post('/user/cursos', authenticateToken, addUserCourse);
router.post('/user/certificaciones', authenticateToken, addCertification);
router.post('/addCourse', authenticateToken, addCourse);  // falta garantizar que se evalue que el usuario tiene permisos para agregar datos porq solo los delivery leads y admins pueden agregar cursos

export default router;

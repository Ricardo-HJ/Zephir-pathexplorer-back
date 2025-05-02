//servicio para obtener la educacion de un usuario

import { UsuarioCursoModel } from "../models/cursos-certificados/usuarioCursoModel";
import { CursoModel } from "../models/cursos-certificados/cursoModel";
import { UsuarioCertificadoModel } from "../models/cursos-certificados/usuarioCertificadoModel";
import { CertificacionModel } from "../models/cursos-certificados/certificacionModel";
import { CursoSkillModel } from "../models/cursos-certificados/cursoSkillModel";
import { SkillModel } from "../models/skillModel";


export class UsuarioEducacionService {
    static async getUserCourses(userId: string) {
        const usuarioCursos = await UsuarioCursoModel.findByUser(userId);
        const cursos = [];
      
        for (const uc of usuarioCursos) {
          const curso = await CursoModel.findById(uc.id_curso);
          if (!curso) continue;

          const cursoSkills = await CursoSkillModel.findByCurso(uc.id_curso);
          const skills = [];
      
          for (const cs of cursoSkills) {
            const skill = await SkillModel.findById(cs.id_skill);
            if (skill) skills.push(skill);
          }
      
          cursos.push({
            ...curso,
            skills
          });
        }
      
        return cursos;
      }
      

  static async getUserCertifications(userId: string) {
    // Certificaciones
    const usuarioCertificados = await UsuarioCertificadoModel.findByUser(userId);
    const certificaciones = [];

    for (const uc of usuarioCertificados) {
      const certificacion = await CertificacionModel.findById(uc.id_certificado);
      if (certificacion) certificaciones.push(certificacion);
    }

    return certificaciones;
  }

  // falta implementar la logica para usuario_cursos
}



// servicio para obtener los proyectos de un usuario

import { UsuarioProyectoModel } from "../models/proyectos/usuarioProyectoModel";
import { StackTecnologicoModel } from "../models/proyectos/stackTecnologicoModel";
import { ProyectoModel } from "../models/proyectos/proyectoModel";
import { RolModel } from "../models/proyectos/rolModel";
import { ProyectoSkillModel } from "../models/proyectos/proyectoSkillModel";
import { SkillModel } from "../models/skillModel";
import { UserModel } from "../models/userModels";
import { UsuarioProyecto, UsuarioProyectoInput } from "../types/usuario_proyecto";


export class UsuarioProyectosService {

    // obtener los proyectos de un usuario
    static async getUserProjects(userId: string) {
        const usuarioProyectos = await UsuarioProyectoModel.findByUser(userId);
        const proyectos = [];

        for (const up of usuarioProyectos) {
            //obtener info proyecto
            const proyecto = await ProyectoModel.findById(up.id_proyecto);
            if (!proyecto) continue;

            //obtener info del rol del usuario en el proyecto
            const rol = await RolModel.findById(up.id_rol);
            if (!rol) continue;

            //obtener info del stack tecnologico que uso el usuario en el proyecto
            const stackTecnologico = await StackTecnologicoModel.findByUserProject(up.id_usuario_proyecto);

            //implementar la logica para obtener las skills del proyecto

            proyectos.push({
                ...proyecto,
                rol,
                stackTecnologico: stackTecnologico,
            });
        }

        return proyectos;
    }


    static async getProjectAssignedUsers(idProyecto: number) {
        const usuariosProyectos = await UsuarioProyectoModel.findByProyecto(idProyecto);
        const usuarios = [];

        for (const up of usuariosProyectos) {
            const usuario = await UserModel.findById(up.id_usuario);
            if (!usuario) continue;
            usuarios.push(usuario);
        }

        return usuarios;
    }

}
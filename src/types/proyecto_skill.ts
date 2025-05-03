export interface ProyectoSkill {
    id_proyecto_skill: number;
    id_skill: number;
    id_usuario_proyecto: number;
    created_at?: string;
    updated_at?: string;
  }
  
  export interface ProyectoSkillInput {
    id_skill: number;
    id_usuario_proyecto: number;
  }
  
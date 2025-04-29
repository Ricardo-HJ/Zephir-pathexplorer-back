export interface Skill {
    id_skill: number;
    nombre: string;
    tipo: string;
    created_at?: string;
    updated_at?: string;
  }
  
  export interface SkillInput {
    nombre: string;
    tipo: string;
  }
  
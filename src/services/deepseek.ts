import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

// Asegurarse de que la clave API está definida
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
if (!DEEPSEEK_API_KEY) {
  console.error('⚠️ DEEPSEEK_API_KEY no está configurada en variables de entorno');
}

export async function generateCareerContent(
  careerPath: number,
  interests: string[],
  objectives: string[]
): Promise<{
  stages: Array<{ number: number; title: string; description: string }>;
  skillAssessments: Array<{ skill: string; assessment: string }>;
}> {
  try {
    console.log('🧠 Generando contenido personalizado con DeepSeek AI');
    
    const careerName = {
      1: 'Senior Frontend Developer',
      2: 'Full-stack Developer',
      3: 'Cloud Architect',
    }[careerPath] || 'Profesional tecnológico';

    const prompt = createDeepSeekPrompt(careerName, interests, objectives);
    
    console.log('🔵 Enviando petición a DeepSeek API...');
    const response = await axios.post(
      'https://api.deepseek.com/v1/chat/completions',
      {
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: 'Eres un experto asesor de carreras tecnológicas...'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        response_format: { type: 'json_object' }, // ⚠️ Removido temporalmente
        temperature: 0.7,
        max_tokens: 1000 // Aumentado para respuestas completas
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
        },
        timeout: 60000 // 60 segundos
      }
    );

    console.log('🟢 Respuesta recibida. Status:', response.status);
    
    // Verificación de estructura básica
    if (!response.data?.choices?.[0]?.message?.content) {
      console.error('❌ Estructura de respuesta inesperada:', response.data);
      return getDefaultContent(careerPath);
    }

    const aiContent = response.data.choices[0].message.content;
    console.log('📄 Contenido crudo recibido:', aiContent);

    // Intento de parseo (la API podría devolver string JSON o ya objeto)
    let parsedContent;
    if (typeof aiContent === 'string') {
      try {
        parsedContent = JSON.parse(aiContent);
      } catch (e) {
        console.error('❌ Error parseando JSON:', e);
        // Intento de extraer JSON de un string que lo contenga
        const jsonMatch = aiContent.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          try {
            parsedContent = JSON.parse(jsonMatch[0]);
          } catch (e2) {
            console.error('❌ Falló extracción de JSON:', e2);
            return getDefaultContent(careerPath);
          }
        } else {
          return getDefaultContent(careerPath);
        }
      }
    } else if (typeof aiContent === 'object') {
      parsedContent = aiContent;
    } else {
      return getDefaultContent(careerPath);
    }

    // Validación de estructura esperada
    if (!parsedContent?.stages || !parsedContent?.skillAssessments) {
      console.error('❌ Estructura JSON incorrecta:', parsedContent);
      return getDefaultContent(careerPath);
    }

    return parsedContent;

  } catch (error) {
    console.error('❌ Error en generateCareerContent:');
    
    if (axios.isAxiosError(error)) {
      console.error('🔴 Error de Axios:');
      console.error('- Código:', error.code);
      console.error('- Respuesta:', error.response?.data);
      console.error('- Status:', error.response?.status);
      console.error('- Headers:', error.response?.headers);
    } else {
      console.error(error);
    }
    
    return getDefaultContent(careerPath);
  }
}

// Función auxiliar para crear el prompt para DeepSeek
function createDeepSeekPrompt(
  careerName: string,
  interests: string[],
  objectives: string[]
): string {
  return `
Crea un plan de desarrollo profesional personalizado para alguien que quiere convertirse en ${careerName}.

INTERESES DEL USUARIO:
${interests.map(interest => `- ${interest}`).join('\n')}

OBJETIVOS PROFESIONALES:
${objectives.map(objective => `- ${objective}`).join('\n')}

Por favor, devuelve la respuesta en formato JSON con la siguiente estructura exacta:

{
  "stages": [
    {
      "number": 1,
      "title": "Título de la primera etapa",
      "description": "Descripción detallada de la primera etapa del viaje profesional"
    },
    {
      "number": 2,
      "title": "Título de la segunda etapa",
      "description": "Descripción detallada de la segunda etapa del viaje profesional"
    },
    {
      "number": 3,
      "title": "Título de la tercera etapa",
      "description": "Descripción detallada de la tercera etapa final del viaje profesional"
    }
  ],
  "skillAssessments": [
    {
      "skill": "Cloud",
      "assessment": "Una evaluación honesta de 2-3 líneas sobre las habilidades de cloud computing del usuario basada en sus intereses y objetivos"
    },
    {
      "skill": "Automation",
      "assessment": "Una evaluación honesta de 2-3 líneas sobre las habilidades de automatización del usuario"
    },
    {
      "skill": "Linux",
      "assessment": "Una evaluación honesta de 2-3 líneas sobre las habilidades de Linux del usuario"
    },
    {
      "skill": "GIT",
      "assessment": "Una evaluación honesta de 2-3 líneas sobre las habilidades de Git del usuario"
    },
    {
      "skill": "CI/CD",
      "assessment": "Una evaluación honesta de 2-3 líneas sobre las habilidades de CI/CD del usuario"
    }
  ]
}

Asegúrate de que el contenido sea específico para la carrera de ${careerName}, relevante para los intereses del usuario y alineado con sus objetivos profesionales. Usa el español en todo momento.
`;
}

// Contenido predeterminado por si falla la API
function getDefaultContent(careerPath: number) {
  // Contenido básico predeterminado que varía según la carrera elegida
  const defaultContents: Record<number | string, {
    stages: Array<{ number: number; title: string; description: string }>;
    skillAssessments: Array<{ skill: string; assessment: string }>;
  }> = {
    1: { // Senior Frontend Developer
      stages: [
        {
          number: 1,
          title: "Fundamentos de desarrollo frontend",
          description: "En esta etapa, dominarás HTML5, CSS3 y JavaScript moderno. Aprenderás los principios de diseño UI/UX y te familiarizarás con herramientas de desarrollo y control de versiones."
        },
        {
          number: 2,
          title: "Frameworks y arquitecturas avanzadas",
          description: "Profundizarás en React, Vue o Angular, patrones de diseño y arquitecturas escalables. Aprenderás sobre testing, optimización de rendimiento y accesibilidad."
        },
        {
          number: 3,
          title: "Liderazgo técnico y especialización",
          description: "Te convertirás en líder técnico, dirigiendo equipos y definiendo estándares. Aprenderás arquitecturas micro-frontend, estrategias de rendimiento avanzadas y nuevas tecnologías emergentes."
        }
      ],
      skillAssessments: [
        {
          skill: "Cloud",
          assessment: "Tienes conocimientos básicos de servicios cloud para frontend, pero necesitas profundizar en implementaciones y estrategias de optimización para aplicaciones web modernas."
        },
        {
          skill: "Automation",
          assessment: "Conoces algunas herramientas de automatización, pero necesitas desarrollar flujos de trabajo eficientes para tests, builds y despliegues frontend."
        },
        {
          skill: "Linux",
          assessment: "Tienes conocimientos básicos de línea de comandos, pero puedes beneficiarte de profundizar en herramientas de desarrollo en entornos Linux."
        },
        {
          skill: "GIT",
          assessment: "Manejas los conceptos básicos de Git, pero necesitas mejorar en flujos de trabajo colaborativos y estrategias de branching para proyectos frontend complejos."
        },
        {
          skill: "CI/CD",
          assessment: "Comprendes los conceptos de CI/CD, pero necesitas implementar pipelines específicos para aplicaciones frontend con tests, optimizaciones y despliegues automáticos."
        }
      ]
    },
    2: { // Full-stack Developer
      stages: [
        {
          number: 1,
          title: "Fundamentos del desarrollo full-stack",
          description: "Dominarás tanto el frontend (HTML, CSS, JavaScript) como el backend (Node.js, Express), junto con bases de datos relacionales y NoSQL. Aprenderás sobre arquitecturas MVC y APIs RESTful."
        },
        {
          number: 2,
          title: "Frameworks y tecnologías avanzadas",
          description: "Profundizarás en React o Angular para frontend, y desarrollarás habilidades en backends robustos con arquitecturas escalables, microservicios y bases de datos avanzadas."
        },
        {
          number: 3,
          title: "Desarrollo integral y liderazgo técnico",
          description: "Te convertirás en un desarrollador full-stack completo, capaz de liderar equipos, arquitectar soluciones end-to-end, implementar DevOps y adoptar metodologías ágiles avanzadas."
        }
      ],
      skillAssessments: [
        {
          skill: "Cloud",
          assessment: "Tienes conocimientos básicos de servicios cloud, pero necesitas profundizar en arquitecturas serverless, contenedores y servicios gestionados para aplicaciones full-stack."
        },
        {
          skill: "Automation",
          assessment: "Conoces herramientas de automatización básicas, pero debes fortalecer tus habilidades en scripts avanzados, IaC y automatización de pruebas end-to-end."
        },
        {
          skill: "Linux",
          assessment: "Tienes un manejo decente de Linux, pero necesitas mejorar en administración de servidores, scripting avanzado y configuración para entornos de desarrollo full-stack."
        },
        {
          skill: "GIT",
          assessment: "Manejas Git cotidianamente, pero necesitas dominar workflows complejos, estrategias de branching y técnicas avanzadas de resolución de conflictos."
        },
        {
          skill: "CI/CD",
          assessment: "Comprendes los conceptos de CI/CD pero necesitas implementar pipelines completos que integren pruebas, validaciones y despliegues tanto de frontend como backend."
        }
      ]
    },
    3: { // Cloud Architect
      stages: [
        {
          number: 1,
          title: "Fundamentos de infraestructura cloud",
          description: "Dominarás conceptos esenciales de AWS, Azure o GCP, servicios fundamentales como computación, almacenamiento y redes, junto con principios de seguridad en la nube."
        },
        {
          number: 2,
          title: "Diseño de soluciones escalables",
          description: "Profundizarás en arquitecturas multi-región, alta disponibilidad, estrategias de escalabilidad, contenedores, orquestación y computación serverless."
        },
        {
          number: 3,
          title: "Arquitecturas empresariales y liderazgo",
          description: "Te convertirás en un arquitecto cloud integral, desarrollando soluciones multi-cloud, FinOps, gobernanza de la nube y liderando transformaciones digitales completas."
        }
      ],
      skillAssessments: [
        {
          skill: "Cloud",
          assessment: "Tienes buenos conocimientos cloud pero necesitas desarrollar experiencia en arquitecturas multi-cloud, optimización de costos y soluciones avanzadas para entornos empresariales."
        },
        {
          skill: "Automation",
          assessment: "Manejas herramientas de automatización, pero debes fortalecer tus capacidades en IaC avanzada, automatización completa de entornos y orquestación de servicios."
        },
        {
          skill: "Linux",
          assessment: "Tienes un buen dominio de Linux, pero necesitas profundizar en administración avanzada, seguridad y optimización para entornos cloud."
        },
        {
          skill: "GIT",
          assessment: "Conoces Git para gestión de código, pero debes aplicarlo para gestionar configuraciones, IaC y documentación en flujos de trabajo colaborativos complejos."
        },
        {
          skill: "CI/CD",
          assessment: "Comprendes CI/CD pero necesitas implementar pipelines sofisticados para infraestructura como código, automatización multi-entorno y estrategias de despliegue avanzadas."
        }
      ]
    },
    default: { // Contenido genérico para cualquier otra carrera
      stages: [
        {
          number: 1,
          title: "Fundamentos tecnológicos",
          description: "Esta etapa se enfoca en construir una base sólida en los conceptos fundamentales y herramientas básicas relacionadas con tu área profesional."
        },
        {
          number: 2,
          title: "Especialización y profundización",
          description: "Ahora desarrollarás conocimientos y habilidades más profundas, enfocándote en tecnologías específicas y prácticas avanzadas en tu campo."
        },
        {
          number: 3,
          title: "Maestría y liderazgo",
          description: "En esta etapa final te convertirás en un experto, capaz de liderar proyectos, innovar en tu campo y mantenerte a la vanguardia de las tendencias tecnológicas."
        }
      ],
      skillAssessments: [
        {
          skill: "Cloud",
          assessment: "Tu conocimiento en servicios cloud es intermedio. Necesitas profundizar en arquitecturas específicas y optimización para tu área profesional particular."
        },
        {
          skill: "Automation",
          assessment: "Tienes conocimientos básicos de automatización. Deberías enfocar tus esfuerzos en las herramientas y prácticas más relevantes para tu especialidad."
        },
        {
          skill: "Linux",
          assessment: "Tu nivel de Linux es funcional para tareas básicas, pero puedes beneficiarte de profundizar en aspectos más relevantes para tu campo específico."
        },
        {
          skill: "GIT",
          assessment: "Manejas Git para tareas fundamentales, pero necesitarás desarrollar habilidades más avanzadas en workflows colaborativos específicos de tu área."
        },
        {
          skill: "CI/CD",
          assessment: "Comprendes los conceptos básicos de CI/CD, pero necesitas implementar prácticas más específicas y avanzadas para tu campo profesional."
        }
      ]
    }
  };

  // Devolver el contenido específico para la carrera o el predeterminado si no existe
  return defaultContents[careerPath] || defaultContents.default;
} 
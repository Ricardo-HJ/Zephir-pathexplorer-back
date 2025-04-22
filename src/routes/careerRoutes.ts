import { Router } from "express"
import { authenticateToken } from "../middleware/auth"
import { supabase } from "../config/supabase" // Asegúrate de tener tu cliente supabase configurado
import { generateCareerContent } from '../services/deepseek'

const router = Router()

// Obtener la información de carrera del usuario
router.get("/:userId", authenticateToken, async (req, res) => {
  try {
    const userId = req.params.userId
    
    //  lógica
    // Ejemplo estatico  de datos de path de carrera 
    const careerData = {
      title: "Senior DevOps Path",
      role: "Mobile developer, Nivel 11",
      plan: "5 años",
      salary: "$140K - $170K",
      progress: 16, 
      stageProgress: 65,
      courses: [
        { name: "AWS Cloud Practitioner", status: "Completo" },
        { name: "Kubernetes Administrator", status: "En progreso" },
        { name: "Terraform Associate", status: "Siguiente" },
        { name: "Terraform Associate", status: "Siguiente" },
        { name: "Terraform Associate", status: "Siguiente" }
      ],
      skills: {
        mastered: ["Linux", "Git"],
        developing: ["CI/CD", "Automatizacion"],
        exploring: ["Kubernetes", "Terraform"]
      },
      currentStage: {
        number: 1,
        title: "Preparación y fundamentos",
        description: "En esta etapa, aprenderás los fundamentos de Linux, Git y programación básica para gestionar sistemas, automatizar tareas y colaborar en proyectos de manera eficiente."
      },
      skillAnalysis: {
        cloud: "Tienes una base sólida en servicios en la nube, pero aún puedes mejorar en arquitecturas escalables y optimización de costos.",
        automation: "Tienes nociones básicas de automatización, pero necesitas trabajar más en la orquestación de procesos y herramientas avanzadas.",
        linux: "Dominas los comandos fundamentales y la administración básica, pero aún puedes mejorar en scripting y gestión avanzada de servidores.",
        git: "Conoces los conceptos esenciales de Git, pero te falta práctica en estrategias avanzadas como rebase y manejo de conflictos complejos.",
        cicd: "Tienes un buen conocimiento de los flujos de integración y despliegue continuo, pero necesitas experiencia aplicándolos en entornos productivos."
      }
    }
      
    res.status(200).json(careerData)
  } catch (error: any) {
    console.error("Error fetching career data:", error)
    res.status(500).json({ error: error.message || "Internal server error" })
  }
})

// Añadir un middleware para debugging en esta ruta
router.use('/career', (req, res, next) => {
  console.log(`🔍 [DEBUG] Solicitud a ruta /career: ${req.method} ${req.path}`);
  console.log(`🔍 [DEBUG] Headers:`, req.headers);
  next();
});

//................................Endpoint para guardar preferencias................................
//................................Endpoint para guardar preferencias................................
//................................Endpoint para guardar preferencias................................
//................................Endpoint para guardar preferencias................................
//................................Endpoint para guardar preferencias................................



router.post("/:userId/preferences", authenticateToken, async (req, res) => {
  try {
    console.log("💾 Solicitud para guardar preferencias");
    const userId = req.params.userId;
    const { interests, objectives } = req.body;
    
    console.log(`💾 Usuario: ${userId}`);
    console.log(`💾 Datos recibidos:`, { interests, objectives });
    console.log("💾 Usuario autenticado:", req.user);
    
    // Verificar que req.user exista (garantía de authenticateToken)
    if (!req.user) {
      console.error("❌ req.user no existe a pesar de pasar authenticateToken");
      return res.status(500).json({ 
        error: "Error interno: usuario no autenticado correctamente" 
      });
    }
    
    /* COMENTADO PARA PRUEBAS
    // Opcional: Verificar que el usuario autenticado coincida con el userId de la ruta
    if (req.user.id !== userId && !req.user.isAdmin) {
      console.error(`❌ Usuario ${req.user.id} intentó modificar datos de ${userId}`);
      return res.status(403).json({ 
        error: "No tiene permisos para modificar datos de este usuario" 
      });
    }
    */
    
    // CORRECCIÓN: Guardar en la tabla 'intereses' de Supabase
    console.log("💾 Guardando intereses en Supabase...");
    
    // Primero eliminamos los intereses anteriores del usuario
    const { error: deleteInteresesError } = await supabase
      .from('intereses')
      .delete()
      .eq('usuario_id', userId);
      
    if (deleteInteresesError) {
      console.error("❌ Error al eliminar intereses anteriores:", deleteInteresesError);
      return res.status(400).json({ error: deleteInteresesError.message });
    }
    
    // Insertar nuevos intereses
    const interesesToInsert = interests.map((interes: string) => ({
      nombre: interes,
      usuario_id: userId
    }));
    
    const { data: interesesData, error: interesesError } = await supabase
      .from('intereses')
      .insert(interesesToInsert);
    
    if (interesesError) {
      console.error("❌ Error al guardar intereses:", interesesError);
      return res.status(400).json({ error: interesesError.message });
    }
    
    // Guardar en la tabla 'objetivos' 
    console.log("💾 Guardando objetivos en Supabase...");
    
    // Eliminar objetivos anteriores del usuario si hay
    const { error: deleteObjetivosError } = await supabase
      .from('objetivos')
      .delete()
      .eq('usuario_id', userId);
      
    if (deleteObjetivosError) {
      console.error("❌ Error al eliminar objetivos anteriores:", deleteObjetivosError);
      return res.status(400).json({ error: deleteObjetivosError.message });
    }
    
    // Insertar nuevos objetivos
    const objetivosToInsert = objectives.map((objetivo: string) => ({
      objetivo: objetivo,
      usuario_id: userId
    }));
    
    const { data: objetivosData, error: objetivosError } = await supabase
      .from('objetivos')
      .insert(objetivosToInsert);
    
    if (objetivosError) {
      console.error("❌ Error al guardar objetivos:", objetivosError);
      return res.status(400).json({ error: objetivosError.message });
    }
    
    console.log("✅ Datos guardados correctamente");
    return res.status(200).json({ 
      message: "Preferencias guardadas correctamente", 
      data: {
        intereses: interesesData,
        objetivos: objetivosData
      }
    });
    
  } catch (error: any) {
    console.error("❌ Error general guardando preferencias:", error);
    
    return res.status(500).json({
      error: error.message || "Error al guardar preferencias",
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});


// ....................Endpoint para generar contenido personalizado........................
// ....................Endpoint para generar contenido personalizado.........................
// ....................Endpoint para generar contenido personalizado.........................
// ....................Endpoint para generar contenido personalizado.........................


router.post("/:userId/generate-path", authenticateToken, async (req, res) => {
  try {
    console.log("🧠 Solicitud para generar ruta de carrera personalizada");
    const userId = req.params.userId;
    const { careerPathId } = req.body;
    
    if (!careerPathId) {
      return res.status(400).json({ error: "Se requiere ID de ruta de carrera" });
    }
    
    console.log(`🧠 Generando ruta para usuario ${userId}, carrera ID ${careerPathId}`);
    
    // 1. Obtener intereses y objetivos del usuario desde la base de datos
    const { data: intereses, error: interesesError } = await supabase
      .from('intereses')
      .select('nombre')
      .eq('usuario_id', userId);
      
    if (interesesError) {
      console.error("❌ Error al obtener intereses:", interesesError);
      return res.status(500).json({ error: interesesError.message });
    }
    
    const { data: objetivos, error: objetivosError } = await supabase
      .from('objetivos')
      .select('objetivo')
      .eq('usuario_id', userId);
      
    if (objetivosError) {
      console.error("❌ Error al obtener objetivos:", objetivosError);
      return res.status(500).json({ error: objetivosError.message });
    }
    
    //Extraer solo los textos de intereses y objetivos
    const interesesList = intereses.map(item => item.nombre);
    const objetivosList = objetivos.map(item => item.objetivo);
    
    // 2. Generar contenido personalizado con DeepSeek
    const generatedContent = await generateCareerContent(
      Number(careerPathId),
      interesesList,
      objetivosList
    );
    
    // 3. Guardar las etapas en la tabla "Etapa"
    console.log("💾 Guardando etapas en la base de datos...");
    for (const stage of generatedContent.stages) {
      const { data: etapaData, error: etapaError } = await supabase
        .from('Etapa')
        .insert([
          { 
            titulo: stage.title,
            descripcion: stage.description,
            numero: stage.number,
            usuario_id: userId,
           // carrera_id: careerPathId
          }
        ]);
        
      if (etapaError) {
        console.error("❌ Error al guardar etapa:", etapaError);
        // Continuar con las demás etapas aunque falle una
      }
    }
    
    // 4. Guardar las habilidades en la tabla "Subetapa"
    console.log("💾 Guardando evaluaciones de habilidades en la base de datos...");
    for (const skill of generatedContent.skillAssessments) {
      const { data: subetapaData, error: subetapaError } = await supabase
        .from('Subetapa')
        .insert([
          { 
            nombre: skill.skill,
            descripcion: skill.assessment,
            usuario_id: userId,
            //carrera_id: careerPathId
          }
        ]);
        
      if (subetapaError) {
        console.error("❌ Error al guardar habilidad:", subetapaError);
        // Continuar con las demás habilidades aunque falle una
      }
    }
    
    // 5. Devolver el contenido generado
    return res.status(200).json({
      message: "Ruta de carrera generada y guardada exitosamente",
      content: generatedContent
    });
    
  } catch (error: any) {
    console.error("❌ Error al generar ruta de carrera:", error);
    return res.status(500).json({
      error: "Error al generar ruta de carrera personalizada",
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

//.................................... endpoint para obtener la ruta.....................................
//.................................... endpoint para obtener la ruta.....................................
//.................................... endpoint para obtener la ruta.....................................
//.................................... endpoint para obtener la ruta.....................................



router.get("/:userId/path/:careerPathId", authenticateToken, async (req, res) => {
  try {
    const userId = req.params.userId;
    const careerPathId = parseInt(req.params.careerPathId);
    
    console.log(`🔍 Obteniendo ruta guardada para usuario ${userId}, carrera ID ${careerPathId}`);
    
    // 1. Obtener etapas de la tabla Etapa
    const { data: etapas, error: etapasError } = await supabase
      .from('Etapa')
      .select('*')
      .eq('usuario_id', userId)
      //.eq('carrera_id', careerPathId)
      .order('numero', { ascending: true });
      
    if (etapasError) {
      console.error("❌ Error al obtener etapas:", etapasError);
      return res.status(404).json({ 
        error: "Ruta de carrera no encontrada",
        message: "Necesitas generar una ruta personalizada primero" 
      });
    }
    
    // 2. Obtener habilidades de la tabla Subetapa
    const { data: subetapas, error: subetapasError } = await supabase
      .from('Subetapa')
      .select('*')
      .eq('usuario_id', userId)
     // .eq('carrera_id', careerPathId);
      
    if (subetapasError) {
      console.error("❌ Error al obtener subetapas:", subetapasError);
      return res.status(404).json({ 
        error: "Evaluaciones de habilidades no encontradas",
        message: "Necesitas generar una ruta personalizada primero" 
      });
    }
    
    // 3. Si no hay datos o están vacíos, devolver un 404
    if (etapas.length === 0 || subetapas.length === 0) {
      console.log("⚠️ No se encontraron datos guardados para este usuario y carrera");
      return res.status(404).json({ 
        error: "Ruta de carrera no encontrada",
        message: "Necesitas generar una ruta personalizada primero" 
      });
    }
    
    // 4. Formatear datos recuperados al formato esperado por el frontend
    const formattedContent = {
      stages: etapas.map(etapa => ({
        number: etapa.numero,
        title: etapa.titulo,
        description: etapa.descripcion
      })),
      skillAssessments: subetapas.map(subetapa => ({
        skill: subetapa.nombre,
        assessment: subetapa.descripcion
      }))
    };
    
    // 5. Devolver el contenido recuperado
    return res.status(200).json({
      content: formattedContent
    });
    
  } catch (error: any) {
    console.error("❌ Error al obtener ruta de carrera:", error);
    return res.status(500).json({
      error: "Error al obtener ruta de carrera",
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});


export default router 
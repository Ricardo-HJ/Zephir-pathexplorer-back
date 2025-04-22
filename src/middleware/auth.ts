import type { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

// Cargar variables de entorno
dotenv.config()

// Verificar que JWT_SECRET esté definido al inicio
const JWT_SECRET = process.env.JWT_SECRET
if (!JWT_SECRET) {
  console.error("⚠️ JWT_SECRET no está configurado en variables de entorno");
  // No terminamos el proceso, pero dejamos advertencia clara
}

// Extend the Request interface to include user
declare global {
  namespace Express {
    interface Request {
      user: any
    }
  }
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // Logs de depuración detallados
  console.log("🔒 Auth middleware - Ruta:", req.path);
  console.log("🔒 Headers de autenticación:", {
    authorization: req.headers.authorization,
    cookie: req.headers.cookie
  });
  
  // Obtener token de múltiples fuentes
  let token: string | undefined;
  
  // 1. Verificar header de Authorization
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
    console.log("🔒 Token obtenido de Authorization header");
  }
  
  // 2. Si no hay token en header, buscar en cookies
  if (!token && req.cookies) {
    token = req.cookies.auth_token;
    if (token) console.log("🔒 Token obtenido de cookies");
  }
  
  // 3. Verificar en query params (menos seguro pero útil para pruebas)
  if (!token && req.query && req.query.token) {
    token = req.query.token as string;
    if (token) console.log("🔒 Token obtenido de query params");
  }

  if (!token) {
    console.log("❌ No se encontró token de autenticación");
    return res.status(401).json({ 
      error: "Acceso no autorizado",
      message: "Se requiere autenticación para acceder a este recurso" 
    });
  }

  try {
    // Mostrar información sobre el token antes de verificarlo
    console.log("🔒 Verificando token:", token.substring(0, 15) + "...");
    console.log("🔒 Usando JWT_SECRET:", JWT_SECRET ? "Configurado (longitud " + JWT_SECRET.length + ")" : "NO CONFIGURADO");
    
    // Verificar el token
    const decoded = jwt.verify(token, JWT_SECRET || 'default_insecure_secret');
    
    // Mostrar información sobre el token decodificado
    console.log("✅ Token verificado correctamente:", decoded);
    
    // Guardar datos del usuario en la solicitud para uso posterior
    req.user = decoded;
    
    // Continuar con el siguiente middleware o controlador
    next();
  } catch (error: any) {
    // Mostrar información detallada sobre el error
    console.error("❌ Error al verificar token:", error.message);
    console.error("❌ Tipo de error:", error.name);
    
    // Responder con mensaje de error específico
    let statusCode = 403;
    let errorMessage = "Token inválido o expirado";
    
    if (error.name === 'TokenExpiredError') {
      errorMessage = "Su sesión ha expirado. Por favor, inicie sesión nuevamente.";
    } else if (error.name === 'JsonWebTokenError') {
      errorMessage = "Token de autenticación inválido.";
    } else if (error.name === 'NotBeforeError') {
      errorMessage = "Token aún no es válido.";
    }
    
    return res.status(statusCode).json({ 
      error: errorMessage,
      details: process.env.NODE_ENV === 'development' ? error.message : undefined 
    });
  }
}


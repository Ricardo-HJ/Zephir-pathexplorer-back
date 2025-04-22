import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import userRoutes from "./routes/userRoutes"
import testRoutes from "./routes/testRoutes"
import careerRoutes from "./routes/careerRoutes"
import { version } from "os"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

//CORS Configuration
const allowedOrigins = [
  "https://zephir-accenture.vercel.app",
  "https://v0-zephir.vercel.app",
  "http://localhost:3000", 
  "http://localhost:8080",
  "http://localhost:3001"
]

app.get("/", (req, res) => {
  res.json({
    message: 'Pathexplorer API is Running',
    version: '1.0.0',
    endpoints: [
      '/api/users',
      '/api/test',
    ]
  });
});

// Middleware
app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV !== 'production') {
      callback(null, true);
    } else {
      console.log("Origen bloqueado por CORS:", origin);
      callback(new Error('No permitido por CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Log all requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`)
  next()
})

// Register routes
app.use("/api/users", userRoutes)
app.use("/api/test", testRoutes)
app.use("/api/career", careerRoutes)

// Health check route
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" })
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`Health check available at http://localhost:${PORT}/health`)
})


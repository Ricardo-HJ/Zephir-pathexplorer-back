import { Router } from "express"

const router = Router()

// Simple GET endpoint
router.get("/", (req, res) => {
  res.status(200).json({ message: "Test route working!" })
})

// Echo POST endpoint
router.post("/echo", (req, res) => {
  console.log("Echo endpoint hit with body:", req.body)
  res.status(200).json({
    message: "Echo test successful!",
    receivedData: req.body,
  })
})

export default router


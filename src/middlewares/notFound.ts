import { Request, Response } from "express"

export const notFound = (req : Request , res : Response) => {
  res.status(404).json({
    message : "Rounte not found",
    path : req.originalUrl,
    data : Date()
    
  })
}
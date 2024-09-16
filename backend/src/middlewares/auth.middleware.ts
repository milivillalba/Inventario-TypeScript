import jwt  from "jsonwebtoken";
import { Request,Response,NextFunction } from "express";


export const authenticateJWT=(req:Request, res:Response,next:NextFunction)=>{
    const token= req.header('Autorización')?.split(' ')[1];
    
    if(!token){
        return res.status(401).json({message:'Acceso denegado, no se proporcionó ningún token.'});

    }try {
        const decifrado = jwt.verify(token, process.env.JWT_SECRET as string);
        (req as any).user=decifrado;//utilice any para evitar el error de tipos
        next();
    } catch (error) {
        res.status(400).json({message:'Token inválido'})
    }

}
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { JWT_SECRET } from '../config/config'; 

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado, no se proporcionó ningún token.' });
    }

    try {
        const decifrado = jwt.verify(token, JWT_SECRET as string);
        (req as any).user = decifrado;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Token inválido' });
    }
};

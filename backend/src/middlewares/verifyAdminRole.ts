import { Request, Response, NextFunction } from 'express';

// Middleware de autorización para verificar el rol admin
export const verifyAdminRole = (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;

    if (user.role !== 'admin') {
        return res.status(403).json({ message: 'Acceso denegado. Solo los administradores pueden realizar esta acción.' });
    }

    next();
};

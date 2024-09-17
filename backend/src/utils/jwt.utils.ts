import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config"; // Asegúrate de que esta ruta es correcta

export const createJWT = (payload: { id: number; role: string }) => {
    return new Promise<string>((resolve, reject) => {
        jwt.sign(payload, JWT_SECRET as string, { expiresIn: '1h' }, (err, token) => {
            if (err) {
                reject("Error while creating the token");
            } else {
                resolve(token as string);
            }
        });
    });
};

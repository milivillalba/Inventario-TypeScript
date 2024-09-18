import { Request, Response } from 'express';
import User from '../models/userModel';
import bcrypt from 'bcryptjs';
import { createJWT } from '../utils/jwt.utils'; //funcion para generar el token

// Endpoint para iniciar sesión
export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        //si el username o la password no estan presentes devuelve error 400
        if (!username || !password) {
            return res.status(400).json({ message: 'Se requiere nombre de usuario y contraseña.' });
        }
        //se busca el usuario en la bade de datos si no existe se devuelve error 400
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(400).json({ message: 'Credenciales Invalidas' });
        }
        //se compara la contraseña proporcionada con la almacenada en la db , si no coinciden devielve errp 400
        const compararPass = await bcrypt.compare(password, user.password);
        if (!compararPass) {
            return res.status(400).json({ message: 'Credenciales Invalidas' });
        }
        //si las credenciales son correctas se genera un token usando la funcion createJWT
        //Este token contiene informacion como el id y el rol del user
        const token = await createJWT({ id: user.id, role: user.role }); // Usa la función createJWT
        //el token y el rol se envian en la respuesta.
        res.json({ token, role: user.role });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Endpoint para registrar un usuario
export const register = async (req: Request, res: Response) => {
    const { username, password, role } = req.body;

    try {
        //validacion de entrada
        if (!username || !password || !role) {
            return res.status(400).json({ message: 'Se requiere nombre de usuario, contraseña y rol.' });
        }
        //verificar si ya existe un user con el mismo nombre de usuario, si es asi mostrar error 400.
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ message: 'El usuario ya existe.' });
        }
        //La contraseña ingresada por el user se encripta con un factor de costo de 10.
        const hashedPassword = await bcrypt.hash(password, 10);
       
        //Se crea un nuevo registro de usuario en la db.
        const user = await User.create({ username, password: hashedPassword, role });
        //Se genera un token para el usuario recien creado y responde con el token y el rol del usuario.
        const token = await createJWT({ id: user.id, role: user.role }); // Usa la función createJWT
        res.status(201).json({ token, role: user.role });
    } catch (error) {
        console.error('Error durante el registro:', error);
        res.status(500).json({ message: 'Error interno del servidor:(' });
    }
};

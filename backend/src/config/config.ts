import dotenv from 'dotenv';
dotenv.config();

type VE = string | undefined;
export const PORT: VE = process.env.PORT;
export const URI: VE = process.env.DB_URI;
export const JWT_SECRET: VE = process.env.JWT_SECRET;

//para verificar si se cargan 
console.log('PORT:', PORT);
console.log('URI:', URI);
console.log('JWT_SECRET:', JWT_SECRET);

import dotenv from 'dotenv';
dotenv.config();

type VE = string | undefined;
export const PORT: VE = process.env.PORT;
export const URI: VE = process.env.DB_URI;

//para verificar si se cargan 
console.log('PORT:', PORT);
console.log('URI:', URI);

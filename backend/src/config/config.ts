import dotenv from 'dotenv';
dotenv.config();

type VE = string | undefined;
export const PORT:VE= process.env.PORT;
export const URI: VE= process.env.DB_URI;
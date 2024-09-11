import { Pool } from "pg";
import { URI } from "../config/config";

//crear un nuevo pool para manejar las conexiones a la base de datos 
const pool = new Pool({
    connectionString: URI, // Usar la variable de entorno URI
  });
  
  // Función para conectarse a la base de datos
  export const connectDB = async () => {
    try {
      const client = await pool.connect();
      console.log('Conexión exitosa a la base de datos');
      client.release(); // Liberar el cliente después de conectarse
    } catch (error) {
      console.error('Error al conectar a la base de datos:', error);
      process.exit(1); // Salir si no se puede conectar
    }
  };
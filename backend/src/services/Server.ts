import express, {Application} from 'express';
// import cors from 'cors';
import { connectDB } from '../db/connect';
import { PORT } from '../config/config';




class Server {
    private app: Application;
    public port:string|undefined

    constructor(){
        this.app= express();
        this.port=PORT;
        this.connectToDatabase();

    }
    //metodo para conectarce a la base de datos 
    private async connectToDatabase() {
        try {
            await connectDB();
            console.log('Conexión a la base de datos exitosa');
        } catch (error) {
            console.error('Error al conectar a la base de datos', error);
        }
    }

    //iniciar servicio
    listen(){
        this.app.listen(this.port, ()=>console.log(`Servidor corriendo en http://localhost:${this.port} `))
    }
}
export default Server;


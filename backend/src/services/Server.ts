import express, {Application} from 'express';
// import cors from 'cors';
import sequelize, { connectDB } from '../db/connect';
import { PORT } from '../config/config';
import '../models/equipmentModel'
import '../models/userModel'


//clase del servicio de mi aplicacion

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
            //sincronizar los modelos 
            await sequelize.sync({force: false});
            console.log('Se crearon los modelos en las base de datos')
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


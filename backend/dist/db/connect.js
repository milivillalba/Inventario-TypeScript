"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const pg_1 = require("pg");
const config_1 = require("../config/config");
//crear un nuevo pool para manejar las conexiones a la base de datos 
const pool = new pg_1.Pool({
    connectionString: config_1.URI, // Usar la variable de entorno URI
});
// Función para conectarse a la base de datos
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = yield pool.connect();
        console.log('Conexión exitosa a la base de datos');
        client.release(); // Liberar el cliente después de conectarse
    }
    catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        process.exit(1); // Salir si no se puede conectar
    }
});
exports.connectDB = connectDB;

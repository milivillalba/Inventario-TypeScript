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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import cors from 'cors';
const connect_1 = require("../db/connect");
const config_1 = require("../config/config");
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = config_1.PORT;
        this.connectToDatabase();
    }
    //metodo para conectarce a la base de datos 
    connectToDatabase() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, connect_1.connectDB)();
                console.log('Conexión a la base de datos exitosa');
            }
            catch (error) {
                console.error('Error al conectar a la base de datos', error);
            }
        });
    }
    //iniciar servicio
    listen() {
        this.app.listen(this.port, () => console.log(`Servidor corriendo en http://localhost:${this.port} `));
    }
}
exports.default = Server;

import { Model, DataTypes } from "sequelize";
import sequelize from "../db/connect";
import { IUser,InterfazUser } from "./types/user.type";
import bcrypt from 'bcryptjs'

//crear modelo para user 
class User extends Model<IUser,InterfazUser> implements IUser{
    public id!:number;
    public username!: string;
    public password!: string;
    public role!:'admin'|'user';

    //metodo para comparar contraseña
    public async compararPass(PassIngresUser:string): Promise<boolean>{
        return bcrypt.compare(PassIngresUser, this.password);
    }
}

//configuracion de como sera el modelo User en la base de datos
User.init({
    //definicion de los atributos del modelo
    id:{
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    username:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false,
    },
    password:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    role:{
        type:DataTypes.ENUM('admin','user'),
        defaultValue:'user',
    }
},{
    //condiguracion del modelo
    sequelize,//instancia
    modelName:'User',//nombre del modelo
    tableName:'users',//nombre d ela tabla en la base d edatos
});
export default User;
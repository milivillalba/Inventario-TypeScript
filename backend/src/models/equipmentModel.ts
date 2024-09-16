import { Model,DataTypes } from "sequelize";
import sequelize from "../db/connect";
import { IEquiposImfor,InterfazEquiposImformaticos } from "./types/equipos.type";

class Equipos extends Model<IEquiposImfor,InterfazEquiposImformaticos> implements IEquiposImfor{
    public id!: number;
    public name!: string;
    public type!: string;
    public status!: "disponible" | "en_reparacion" | "asignado";
    public location!: string;
    public fechaCompra!: Date;
}

Equipos.init({
    id:{
        type:DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey:true,
    },
    name:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    type:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    status:{
        type: DataTypes.ENUM("disponible","en_reparacion", "asignado"),
        allowNull:false,
    },
    location:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    fechaCompra:{
        type:DataTypes.DATE,
        allowNull:false,
    },
},{
    sequelize,
    modelName:'Equipos',
    tableName:'equipos',
});
export default Equipos;
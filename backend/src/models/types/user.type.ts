//Aqui la interfaz que describe los atributos del usuario

export interface IUser{
    id: number;
    username:string;
    password:string;
    role:'admin'|'user';
}

//aqui se exporta los atributos ecepto el id
export interface InterfazUser extends Omit<IUser,'id'>{}
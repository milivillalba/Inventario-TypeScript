//Aqui la interfaz que describe los atributos para los equipos informaticos
export interface IEquiposImfor{
    id: number;
    name: string;
    type: string;
    status: 'disponible'|'en_reparacion'|'asignado';
    location: string;
    fechaCompra:Date;
}

export interface InterfazEquiposImformaticos extends Omit<IEquiposImfor,'id'>{}



import Equipos from '../models/equipmentModel';
import { IEquiposImfor,InterfazEquiposImformaticos } from '../models/types/equipos.type';

class EquiposService {
    async createEquipos(data: InterfazEquiposImformaticos):Promise<IEquiposImfor>{
        try {
            const equipo = await Equipos.create(data);
            return equipo;
        } catch (error) {
            throw new Error('Error al crear el equipo')
        }
    }
    async getAllEquipos():Promise<IEquiposImfor[]>{
        try {
            return await Equipos.findAll();
        } catch (error) {
            throw new Error('Error al mostrar los equipos')
        }
    }
    async updateEquipos(id:number,data:Partial<InterfazEquiposImformaticos>):Promise<IEquiposImfor>{
        try {
            const equipo= await Equipos.findByPk(id);
            if(!equipo) throw new Error('Equipo no encontrado');
            await equipo.update(data);
            return equipo;
        } catch (error) {
            throw new Error('Error sl actualizarel equipo');
        }
        
    }
    async deleteEquipos(id: number): Promise<IEquiposImfor> {
        try {
            const equipo = await Equipos.findByPk(id);
            if (!equipo) throw new Error('Equipo no encontrado');
            await equipo.destroy();
            return equipo;
        } catch (error) {
            throw new Error('Error al eliminar el equipo');
        }
    }
}

export default new EquiposService();
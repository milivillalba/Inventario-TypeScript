// services/equipmentService.ts
import Equipos from '../models/equipmentModel';

export const getAllEquipments = async () => {
    return await Equipos.findAll();
};

export const getEquipmentById = async (id: string) => {
    return await Equipos.findByPk(id);
};

export const createEquipment = async (data: any) => {
    return await Equipos.create(data);
};

export const updateEquipment = async (id: string, data: any) => {
    const [updated] = await Equipos.update(data, { where: { id } });
    return updated;
};

export const deleteEquipment = async (id: string) => {
    return await Equipos.destroy({ where: { id } });
};

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DashAdmin = () => {
  const [equipos, setEquipos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEquipos = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:4000/api/equipos', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Error al obtener los equipos');
        }

        const data = await response.json();
        setEquipos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEquipos();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("¿Estás seguro de eliminar este equipo?");
    if (confirmDelete) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:4000/api/equipos/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Error al eliminar el equipo');
        }

        setEquipos(equipos.filter(equipo => equipo.id !== id)); // Remover equipo de la lista
      } catch (error) {
        console.error(error);
        setError(error.message);
      }
    }
  };

  const handleAddEquipo = () => {
    navigate('/crear-equipo'); // Cambia a la ruta de creación de equipos
  };

  const handleEditEquipo = (id) => {
    navigate(`/editar-equipo/${id}`); // Cambia a la ruta de edición de equipos
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <>
      <div className="bg-pink-600 p-4 flex justify-between items-center">
        <button
          onClick={handleLogout}
          className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          🔙Volver al Login
        </button>
        <h1 className="text-white text-3xl font-bold">💗Perfil del Admin💗</h1>
      </div>
      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-pink-700">Lista de Equipos</h2>
            <button
              onClick={handleAddEquipo}
              className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-400"
            >
              Agregar Equipo
            </button>
          </div>
          {loading ? (
            <p className="text-center text-gray-500">Cargando equipos...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <table className="table-auto w-full bg-white rounded-lg shadow-md">
              <thead>
                <tr className="bg-pink-100 text-left">
                  <th className="px-4 py-2">Nombre</th>
                  <th className="px-4 py-2">Tipo</th>
                  <th className="px-4 py-2">Estado</th>
                  <th className="px-4 py-2">Ubicación</th>
                  <th className="px-4 py-2">Fecha de Compra</th>
                  <th className="px-4 py-2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {equipos.map((equipo) => (
                  <tr key={equipo.id}>
                    <td className="px-4 py-2 border">{equipo.name}</td>
                    <td className="px-4 py-2 border">{equipo.type}</td>
                    <td className="px-4 py-2 border">{equipo.status}</td>
                    <td className="px-4 py-2 border">{equipo.location}</td>
                    <td className="px-4 py-2 border">{equipo.fechaCompra}</td>
                    <td className="px-4 py-2 border">
                      <button
                        onClick={() => handleEditEquipo(equipo.id)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-400"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(equipo.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-400"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default DashAdmin;

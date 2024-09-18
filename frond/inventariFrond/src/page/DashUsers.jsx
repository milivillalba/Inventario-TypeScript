import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardUser = () => {
  const [equipos, setEquipos] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEquipos = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:4000/api/equipos', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Error al obtener los equipos');
        }

        const data = await response.json();
        setEquipos(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchEquipos();
  }, []);

  return (
    <div className="p-4 bg-pink-50 min-h-screen">
      <button
        onClick={() => navigate('/')}
        className="mb-4 bg-pink-300 text-white px-4 py-2 rounded"
      >
         🔙Volver al Login
      </button>
      <h1 className="text-2xl font-bold mb-4 text-center">💻Equipos💻</h1>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {equipos.map((equipo) => (
          <div key={equipo.id} className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
            <h2 className="text-xl font-semibold mb-2">{equipo.name}</h2>
            <p className="text-gray-700"><strong>Tipo:</strong> {equipo.type}</p>
            <p className="text-gray-700"><strong>Estado:</strong> {equipo.status}</p>
            <p className="text-gray-700"><strong>Ubicación:</strong> {equipo.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardUser;

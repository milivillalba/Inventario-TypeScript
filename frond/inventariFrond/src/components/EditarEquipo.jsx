import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditEquipoPage = () => {
  const { id } = useParams(); 
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [status, setStatus] = useState('disponible');
  const [location, setLocation] = useState('');
  const [fechaCompra, setFechaCompra] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEquipo = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:4000/api/equipos/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
            const errorData = await response.json(); // Obtener el mensaje de error del servidor
            console.error('Error del servidor:', errorData);
            throw new Error(errorData.message || 'Error al obtener el equipo');
        }

        const data = await response.json();
        setName(data.name || '');
        setType(data.type || '');
        setStatus(data.status || 'disponible');
        setLocation(data.location || '');
        setFechaCompra(data.fechaCompra || '');
      } catch (error) {
        setError(error.message);
      }
    };

    fetchEquipo();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:4000/api/equipos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name, type, status, location, fechaCompra }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update equipo');
      }

      const data = await response.json();
      console.log('Equipo actualizado con éxito:', data);
      navigate('/dashAdmin'); // Redirige a la página principal después de la actualización
    } catch (error) {
      console.error('Error al actualizar el equipo:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-pink-600 p-4 flex justify-between items-center">
        <button
          onClick={() => navigate('/dashAdmin')}
          className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          🔙Volver a Dashboard
        </button>
        <h1 className="text-white text-3xl font-bold">📝Editar Equipo📝</h1>
      </div>
      <div className="max-w-md mx-auto p-6 bg-gray-100 min-h-screen">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Nombre del Equipo</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Tipo</label>
              <input
                type="text"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Estado</label>
              <input
                type="text"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Ubicación</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Fecha de Compra</label>
              <input
                type="date"
                value={fechaCompra}
                onChange={(e) => setFechaCompra(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <button
              type="submit"
              className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-400"
              disabled={loading}
            >
              {loading ? 'Actualizando...' : 'Actualizar Equipo'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditEquipoPage;

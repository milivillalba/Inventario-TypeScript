import React, { useState } from 'react';

const CreateEquipoPage = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [status, setStatus] = useState('disponible'); // Valor por defecto
  const [location, setLocation] = useState('');
  const [fechaCompra, setFechaCompra] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token'); // Obtén el token desde local storage

      const response = await fetch('http://localhost:4000/api/equipos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Envía el token en el encabezado
        },
        body: JSON.stringify({ name, type, status, location, fechaCompra }), // Envía los datos del equipo
      });

      if (!response.ok) {
        const errorData = await response.json(); // Lee el mensaje de error del servidor
        throw new Error(errorData.message || 'Failed to create equipo');
      }

      const data = await response.json();
      console.log('Equipo creado con éxito:', data);
      // Redirige o muestra un mensaje de éxito
    } catch (error) {
      console.error('Error al crear el equipo:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Crear Nuevo Equipo</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Nombre del Equipo</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Tipo</label>
          <input
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Estado</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
          >
            <option value="disponible">Disponible</option>
            <option value="en_reparacion">En reparación</option>
            <option value="asignado">Asignado</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Ubicación</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Fecha de Compra</label>
          <input
            type="date"
            value={fechaCompra}
            onChange={(e) => setFechaCompra(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded" disabled={loading}>
          {loading ? 'Creando...' : 'Crear Equipo'}
        </button>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </form>
    </div>
  );
};

export default CreateEquipoPage;

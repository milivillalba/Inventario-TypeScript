import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (!response.ok) {
        const errorData = await response.json(); // Lee el mensaje de error del servidor
        throw new Error(errorData.message || 'Login failed');
      }
  
      const data = await response.json();
      localStorage.setItem('token', data.token); // Guarda el token en local storage
      localStorage.setItem('role', data.role); // Guarda el rol en local storage
  
      if (data.role === 'admin') {
        navigate('/dashAdmin');
      } else {
        navigate('/dashUser');
      }
    } catch (error) {
      console.error('Error durante el login:', error);
      setError('Error de inicio de sesión. Por favor, verifica tus credenciales y vuelve a intentarlo.');
    }
  };
  

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            className="w-full px-3 py-2 border border-gray-300 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Login</button>
      </form>
      <p className="mt-4">
        No tienes una cuenta? <a href="/register" className="text-blue-500">Registrarse</a>
      </p>
    </div>
  );
};

export default LoginPage;

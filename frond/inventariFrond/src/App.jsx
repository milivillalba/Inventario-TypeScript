// src/App.jsx
import React from 'react';
import { BrowserRouter  } from 'react-router-dom';
import AppRouter from './routes/AppRoutes';
import './index.css'; // Asegúrate de importar los estilos de Tailwind CSS aquí

const App = () => {
  return (
    <BrowserRouter basename="/">
      <AppRouter />
   </BrowserRouter>
  );
};

export default App;

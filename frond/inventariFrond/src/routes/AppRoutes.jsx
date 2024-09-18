// src/AppRouter.jsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from '../page/LoginPage';
import RegisterPage from '../page/RegisterPage';
import DashAdmin  from '../page/DashboardPage';
import  DashUsers from '../page/DashUsers';
import CreateEquipoPage from '../components/CreateEquipoPage';
import EditEquipoPage from '../components/EditarEquipo';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashAdmin" element={<DashAdmin/>} />
      <Route path="/dashUser" element={<DashUsers/>} />
      <Route path="/crear-equipo" element={<CreateEquipoPage/>} />
      <Route path="/editar-equipo/:id" element={<EditEquipoPage/>} />
      
      
    </Routes>
  );
};

export default AppRouter;

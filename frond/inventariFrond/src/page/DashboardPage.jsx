//Este va a ser el dashboar para el administraor y el va a poder edita , crear y eliminar los equipos.
import React from "react";
import CreateEquipoPage from "../components/CreateEquipoPage";
export const DashAdmin=()=>{
  return(
    <>
      <h1>Perfil del Admin</h1>
      <CreateEquipoPage/>
    </>
  )
}
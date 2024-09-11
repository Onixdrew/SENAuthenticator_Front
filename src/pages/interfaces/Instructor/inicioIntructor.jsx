import React, { useEffect } from "react";
import Navbar from "../../../components/Navbar/Navbar";

import { inicioSesion } from "../../../api/userController";
import { useAuth } from "../../../Context/AuthContext";
// import Footer from "../../../components/Footer/Footer";



const InicioIntructor = () => {

  // los hooks solo pueden ser llamados dentro de un componente funcional
  const {isAuthenticated, user} = useAuth();


  

  return (
    <>
      {isAuthenticated && user.rol_usuario === "Instructor" ? (
        <div>
          <Navbar
            item1="inicio"
            item2="Reportes"
            ruta2="/ReportesInstructor"
            color="activo"
          ></Navbar> 

          <div className="p-4">
            <h1 className="text-2xl font-bold text-left mb-4 inline-block">
              Bienvenid@ {user.username}
            </h1>
          </div>
        </div>
      ) : (
        <p className="text-red-500 ">
          Error: Pagina no encontrada.
        </p>

        //  se redirecciona al login si no esta autenticado
        // <Navigate to="/" />
      )}
    </>
  );
};

export default InicioIntructor;

import React from "react";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";
import { useAuth } from "../../../auth/authProvider";


const InicioAdmin = () => {

 

  // traer el rol de la base de datos
  const rol2="Administrador"
  
  // los hooks solo pueden ser llamados dentro de un componente funcional
  const Autenticador = useAuth();


  return (
    <>
      {Autenticador.isAuthenticated && rol2 === "Administrador"  ? (
        <div>
          <Navbar
            item1="inicio"
            item2="Reportes"
            ruta2="/ReportesAdmin"
            color="activo"
          ></Navbar>

          <h1 className="text-2xl font-bold text-center mt-10">
            Inicio Administrador{" "}
          </h1>
        </div>
      ) : (
        <p className="text-red-500 ">
          Error: No tienes permiso para acceder a esta página.
        </p>

        //  se redirecciona al login si no esta autenticado
        // <Navigate to="/" />
      )}
    </>
  );
};

export default InicioAdmin;

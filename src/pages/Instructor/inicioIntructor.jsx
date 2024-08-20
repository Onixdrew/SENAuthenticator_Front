import React from "react";
import Navbar from "../../components/Navbar";
import { useAuth } from "../../auth/authProvider";


const InicioIntructor = () => {

 

  // traer el rol de la base de datos
  const rol2 = "Instructor";

  // los hooks solo pueden ser llamados dentro de un componente funcional
  const Autenticador = useAuth();


  return (
    <>
      {Autenticador.isAuthenticated && rol2 === "Instructor" ? (
        <div>
          <Navbar
            item1="inicio"
            item2="Reportes"
            item3=""
            ruta1=""
            ruta2="/ReportesInstructor"
            ruta3=""
            color="activo"
          ></Navbar>

          <h1 className="text-2xl font-bold text-center mt-10">
            Inicio Instructor{" "}
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

export default InicioIntructor;

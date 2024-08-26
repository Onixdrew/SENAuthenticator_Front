import React from "react";
import Navbar from "../../components/Navbar";
import { useAuth } from "../../auth/authProvider";


const InicioAdmin = () => {



  // traer el rol de la base de datos
  const rol2 = "Administrador"
  const nombre = "Miguel A"



  // los hooks solo pueden ser llamados dentro de un componente funcional
  const Autenticador = useAuth();


  return (
    <>
      {Autenticador.isAuthenticated && rol2 === "Administrador" ? (
        <div>
          <Navbar
            item1="inicio"
            item2="Reportes"
            ruta2="/ReportesAdmin"
            color="activo"
          ></Navbar>

          <div className="p-4">
            <h1 className="text-2xl font-bold text-left mb-4 inline-block">
              Bienvenido {nombre}
            </h1>
          </div>
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

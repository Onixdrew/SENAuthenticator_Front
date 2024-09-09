import React from "react";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";
import { useAuth } from "../../../Context/AuthContext";


const InicioAdmin = () => {

 
  
  // los hooks solo pueden ser llamados dentro de un componente funcional
  const {isAuthenticated, user} = useAuth();


  return (
    <>
      {isAuthenticated && (user.rol_usuario === "Administrador" || user)  ? (
        <div>
          <Navbar
            item1="inicio"
            item2="Reportes"
            ruta2="/ReportesAdmin"
            color="activo"
          ></Navbar>

          <h1 className="text-2xl font-bold text-center mt-10">
            {`Inicio Administrador ${user.username}`}
          </h1>
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

export default InicioAdmin;

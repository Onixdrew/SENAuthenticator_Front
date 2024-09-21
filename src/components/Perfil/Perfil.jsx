import React, { useEffect } from "react";
import "./media/perfil.css";
import { useAuth } from "../../Context/AuthContext";
import { useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const Perfil = () => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation(); // Obtiene la ruta actual

  // Almacenar la ruta actual en localStorage al cargar el componente
  useEffect(() => {
    localStorage.setItem("lastRoute", location.pathname);
  }, [location]);


  return (
    <>
      {isAuthenticated && user ? (
        <div>
            <div className="sticky top-0 z-40 bg-white">
            <Navbar
              item1="inicio"
              item2="Reportes"
              item3="Perfil"
              ruta1="/inicioAdmin"
              ruta2="/ReportesAdmin"
              color3="activo"
            />
          </div>
            <div className=" flex justify-center">
              <div className="border-2  border-black  mt-2 inline-block  bg-slate-50 h-auto shadow-xl">
                <div className="flex mt-6 ml-10">
                  <div>
                    <img
                      src="https://certificadossena.net/wp-content/uploads/2022/10/logo-sena-naranja-png-2022.png"
                      alt="Logo SENA"
                      className="w-20"
                    />
                  </div>
    
                  <img
                    src="https://media.istockphoto.com/id/913062404/es/foto/cara-de-hombre-de-negocios-contra-el-fondo-blanco.jpg?s=612x612&w=0&k=20&c=KWNbHS35bjiMRjHFXg5FLCMNOpBI7rTEAfyds_3XQ-8="
                    alt="Foto"
                    className="w-28 ml-7 border border-black"
                  />
    
                  <div>
                    <p className="apre  ">{user.rol_usuario}</p>
                  </div>
                </div>
                <div className="w-72 ml-4 h-1 mt-1 bg-orange-500"></div>
                <p className="text-xl flex mt-3">
                  <p className="text-lg mr-2 ml-4 text-orange-500">Nombres: </p>
                  {user.first_name || "Alejandro"}
                </p>
                <p className="text-xl flex ">
                  <p className="text-lg mr-2 ml-4 text-orange-500">Apellidos: </p>
                  {user.last_name || "Carvajal Gómez"}
                </p>
                <p className="text-xl flex mt-2">
                  <p className="text-lg mr-2 ml-4 text-orange-500">Cc : </p>
                  {user.numero_documento_usuario || "1.061.367.623"}
                </p>
                <p className="text-xl flex mt-2">
                  <p className="text-lg mr-2 ml-4 text-orange-500">RH: </p>A+
                </p>
                <div className="w-40 ml-4 h-1 mt-2 bg-orange-500"></div>
    
                {user.rol_usuario == "Aprendiz" && (
                  <div>
                    <p className="text-xl flex mt-1">
                      <p className="text-lg mr-2 ml-4 text-orange-500">
                        Programa:{" "}
                      </p>
                      ADSO
                    </p>
                    <p className="text-xl flex ">
                      <p className="text-lg mr-2 ml-4 text-orange-500">Ficha: </p>
                      2669742
                    </p>
                    <div className="w-20 ml-4 h-1 mt-2 bg-orange-500"></div>
                  </div>
                )}
    
                <p className="text-xl mr-2 ml-4 mt-2 text-black">Regional Cauca</p>
                <p className="text-xl mr-2 ml-4 mb-6 text-orange-600">C.T.P.I.</p>
              </div>
            </div>
        </div>
      ) : (
        <p className="text-red-500 ">Error: Pagina no encontrada.</p>
      )}
    </>
  );
};

export default Perfil;

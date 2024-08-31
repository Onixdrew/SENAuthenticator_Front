import React from "react";
import Navbar from "../../../components/Navbar/Navbar";
import { useAuth } from "../../../Context/AuthContext";

const Inicio = () => {
  // Traer rol de la base de datos del usuario para comprobar
  const rol3 = "Guardia de seguridad";
  const {isAuthenticated} = useAuth();

  return (
    <>
      {isAuthenticated && rol3 === "Guardia de seguridad" ? (
        <div className="bg-gray-100 h-screen flex flex-col">
          <Navbar
            item1="Registro Facial"
            item2="Registro Personas"
            item3="Mas"
            ruta1="/InicioGuardia"
            ruta2="/ReconocimientoGuardia"
            ruta3="/Mas"
            color=""
          />

          {/* Main Content */}
          <div className="flex-1 flex flex-col md:flex-row">
            {/* Formulario de Registro */}
            <div className="flex-1 flex items-center justify-center p-4 bg-white border border-gray-300 rounded-lg shadow-md">
              <div className="w-full max-w-xl">
                <h2 className="text-2xl font-semibold text-black mb-4 text-center">
                  Formulario de Registro
                </h2>
                <form className="space-y-4">
                  <div>
                    <label
                      htmlFor="nombresC"
                      className="block text-sm font-medium text-black"
                    >
                      Nombres completos
                    </label>
                    <input
                      type="text"
                      id="nombresC"
                      name="nombresC"
                      required
                      className="mt-1 block w-full bg-white px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="documento"
                      className="block text-sm font-medium text-black"
                    >
                      Documento de identificación
                    </label>
                    <input
                      type="text"
                      id="documento"
                      name="documento"
                      required
                      className="mt-1 block w-full bg-white px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="diligencia"
                      className="block text-sm font-medium text-black"
                    >
                      Diligencia a realizar
                    </label>
                    <textarea
                      id="diligencia"
                      name="diligencia"
                      rows="3"
                      className="mt-1 block w-full bg-white px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    ></textarea>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="w-full px-4 py-2 bg-green-600 text-white font-semibold rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      Registrar
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Imagen de Indicaciones */}
            <div className="flex-1 flex flex-col items-center justify-center ">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3534/3534139.png"
                alt="Indicaciones"
                className="w-50 h-50 rounded border mb-10"
              />
              <p className="text-center text-black">
                Esto es solo para personas que no pertencen a el sena y solo van
                a entrar a hacer algunas diligencias en especifico
              </p>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-red-500 text-center mt-4">
          Error: No tienes permiso para acceder a esta página.
        </p>
      )}
    </>
  );
};

export default Inicio;

import React, { useState, useEffect } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import axios from "../../../api/axios";
import { useAuth } from "../../../Context/AuthContext";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";

const RegistroPersona = () => {
  const [oficinas, setOficinas] = useState([]);
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();
  // hooks de react-hook-form
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    localStorage.setItem("lastRoute", location.pathname);
  }, [location]);

  useEffect(() => {
    const fetchOficinas = async () => {
      try {
        const response = await axios.get(
          "oficina/"
        );
        setOficinas(response.data);
      } catch (error) {
        console.error("Error al obtener las oficinas", error);
      }
    };

    fetchOficinas();
  }, []);

  

  const enviarForm = handleSubmit(async (values,e) => {
    e.preventDefault();
 
    console.log(values)

    // // const response = await registerForm(data);
    // const response = await registerUser(values);

    // if (response.status === 201 || response.status === 200) {
    //   // se cierra el modal
    //   cerrarModalProp(false);
    // }
  });

  return (
    <>
      {isAuthenticated && user.rol_usuario === "Guardia de seguridad" ? (
        <div className="bg-gray-50 min-h-screen flex flex-col">
          <Navbar
            item1="Registro Facial"
            item2="Registro Personas"
            item3="Historial"
            ruta1="/InicioGuardia"
            ruta2="/ReconocimientoGuardia"
            ruta3="/HistorialUser"
            color2="activo"

          />

          {/* Main Content */}
          <div className="flex-1 flex flex-col md:flex-row items-center justify-center p-6 space-y-8 md:space-y-0 md:space-x-12">
            {/* Formulario de Registro */}
            <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-lg border border-gray-200">
              <h2 className="text-3xl font-bold text-gray-700 mb-6 text-center">
                Formulario de Registro
              </h2>
              <form className="space-y-5" onSubmit={enviarForm}>
                <div>
                  <label
                    htmlFor="nombresC"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Nombres completos
                  </label>
                  <input
                    type="text"
                    id="nombresC"
                    name="nombresC"
                    {...register("nombre", { required: true })}
                    required
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="documento"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Documento de identificación
                  </label>
                  <input
                    type="number"
                    id="documento"
                    name="documento"
                    {...register("numID", { required: true })}
                    required
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="oficina"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Oficina destino
                  </label>
                  <select
                    id="oficina"
                    {...register("oficina", { required: true })}

                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="">Seleccione una oficina</option>
                    {oficinas.map((oficina) => (
                      <option key={oficina.id} value={oficina.nombre_oficina}>
                        {oficina.nombre_oficina}
                      </option>
                    ))}
                  </select>
                </div>

                  <div className="mb-4">
                    <label
                      htmlFor="diligencia"
                      className="block text-sm font-medium text-black"
                    >
                      Diligencia a realizar (no obligatorio)
                    </label>
                    <textarea
                    placeholder="no obligatorio "
                      id="diligencia"
                      name="diligencia"
                      rows="3"
                      className="mt-1 block w-full bg-white px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-green-500 sm:text-sm"
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
            <div className="w-full md:w-1/3 flex justify-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3534/3534139.png"
                alt="Indicaciones"
                className="max-w-full h-auto rounded-lg shadow-lg"
              />
              <p className="text-center text-black">
                Esto es solo para personas que no pertencen a el sena y solo van
                a entrar a hacer algunas diligencias en especifico
              </p>
            </div>
          </div>
       
      ) : (
        <p className="text-red-500 text-center mt-4">
          Error: Página no encontrada.
        </p>
      )}
    </>
  );
};

export default RegistroPersona;

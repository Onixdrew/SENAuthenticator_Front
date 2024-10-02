// import React, { useState, useEffect } from "react";
// import Navbar from "../../../components/Navbar/Navbar";
// import axios from "../../../api/axios";
// import { useAuth } from "../../../Context/AuthContext";
// import { useLocation } from "react-router-dom";
// import { useForm } from "react-hook-form";

// const Inicio = () => {
//   const [oficinas, setOficinas] = useState([]);
//   const { isAuthenticated, user } = useAuth();
//   const location = useLocation();
//   // hooks de react-hook-form
//   const { register, handleSubmit } = useForm();

//   useEffect(() => {
//     // Hacer la petición a la API para obtener las oficinas
//     const fetchOficinas = async () => {
//       try {
//         const response = await axios.get(
//           "https://backendsenauthenticator.up.railway.app/api/oficinas/"
//         );
//         setOficinas(response.data); // Asumimos que la respuesta es un array de oficinas
//       } catch (error) {
//         console.error("Error al obtener las oficinas:", error);
//       }
//     };

//     fetchOficinas();
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("lastRoute", location.pathname);
//   }, [location]);

//   useEffect(() => {
//     const fetchOficinas = async () => {
//       try {
//         const response = await axios.get(
//           "oficina/"
//         );
//         setOficinas(response.data);
//       } catch (error) {
//         console.error("Error al obtener las oficinas", error);
//       }
//     };

//     fetchOficinas();
//   }, []);

  

//   const enviarForm = handleSubmit(async (values,e) => {
//     e.preventDefault();
 
//     console.log(values)


//   });
  

//   return (
//     <>
//       {isAuthenticated && user.rol_usuario === "Guardia de seguridad" ? (
//         <div className="bg-gray-50 min-h-screen flex flex-col">
//           <Navbar
//             item1="Registro Facial"
//             item2="Registro Personas"
//             item3="Historial"
//             ruta1="/InicioGuardia"
//             ruta2="/ReconocimientoGuardia"
//             ruta3="/HistorialUser"
//             color2="activo"

//           />

//           {/* Main Content */}
//           <div className="flex-1 flex flex-col md:flex-row items-center justify-center p-6 space-y-8 md:space-y-0 md:space-x-12">
//             {/* Formulario de Registro */}
//             <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-lg border border-gray-200">
//               <h2 className="text-3xl font-bold text-gray-700 mb-6 text-center">
//                 Formulario de Registro
//               </h2>
//               <form className="space-y-5" onSubmit={enviarForm}>
//                 <div>
//                   <label
//                     htmlFor="nombresC"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     Nombres completos
//                   </label>
//                   <input
//                     type="text"
//                     id="nombresC"
//                     name="nombresC"
//                     {...register("nombre", { required: true })}
//                     required
//                     className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
//                   />
//                 </div>

//                 <div>
//                   <label
//                     htmlFor="documento"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     Documento de identificación
//                   </label>
//                   <input
//                     type="number"
//                     id="documento"
//                     name="documento"
//                     {...register("numID", { required: true })}
//                     required
//                     className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
//                   />
//                 </div>

//                 <div>
//                   <label
//                     htmlFor="oficina"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     Oficina destino
//                   </label>
//                   <select
//                     id="oficina"
//                     {...register("oficina", { required: true })}

//                     className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
//                   >
//                     <option value="">Seleccione una oficina</option>
//                     {oficinas.map((oficina) => (
//                       <option key={oficina.id} value={oficina.nombre_oficina}>
//                         {oficina.nombre_oficina}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div>
//                   <label
//                     htmlFor="diligencia"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     Diligencia a realizar
//                   </label>
//                   <textarea
//                     id="diligencia"
//                     name="diligencia"
//                     placeholder="Opcional"
//                     {...register("diligencia", { required: true })}
                    
//                     rows="4"
//                     className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
//                   ></textarea>
//                 </div>

//                 <button
//                   type="submit"
//                   className="w-full py-2 bg-green-600 text-white font-bold rounded-lg shadow-md hover:bg-green-700 transition duration-300"
//                 >
//                   Registrar
//                 </button>
//               </form>
//             </div>

//             {/* Imagen de Indicaciones */}
//             <div className="w-full md:w-1/3 flex justify-center">
//               <img
//                 src="https://cdn-icons-png.flaticon.com/512/3534/3534139.png"
//                 alt="Indicaciones"
//                 className="max-w-full h-auto rounded-lg shadow-lg"
//               />
//             </div>
//           </div>
//         </div>
//       ) : (
//         <p className="text-red-500 text-center mt-4">
//           Error: Página no encontrada.
//         </p>
//       )}
//     </>
//   );
// };

// export default Inicio;

import React, { useState, useEffect } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import axios from "../../../api/axios";
import { useAuth } from "../../../Context/AuthContext";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";

const Inicio = () => {
  const [oficinas, setOficinas] = useState([]);
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    const fetchOficinas = async () => {
      try {
        const response = await axios.get(
          "https://backendsenauthenticator.up.railway.app/api/oficinas/"
        );
        setOficinas(response.data); // Asumimos que la respuesta es un array de oficinas
      } catch (error) {
        console.error("Error al obtener las oficinas:", error);
      }
    };

    fetchOficinas();
  }, []);

  useEffect(() => {
    localStorage.setItem("lastRoute", location.pathname);
  }, [location]);

  const enviarForm = handleSubmit(async (values) => {
    try {
      const data = {
        nombre: values.first_name,
        numero_documento_usuario: values.numero_documento_usuario_externo,
        oficina: values.oficina_usuario_externo,
        // diligencia: values.diligencia,
      };

      const response = await axios.post(
        "https://backendsenauthenticator.up.railway.app/api/usuarios-externos/",
        data
      );

      console.log("Registro exitoso:", response.data);
      // Aquí puedes agregar lógica para mostrar un mensaje de éxito o redirigir a otra página

    } catch (error) {
      console.error("Error al registrar usuario:", error);
      // Manejo de errores, como mostrar un mensaje al usuario
    }
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

                <div>
                  <label
                    htmlFor="diligencia"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Diligencia a realizar
                  </label>
                  <textarea
                    id="diligencia"
                    name="diligencia"
                    placeholder="Opcional"
                    {...register("diligencia")}
                    rows="4"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-2 bg-green-600 text-white font-bold rounded-lg shadow-md hover:bg-green-700 transition duration-300"
                >
                  Registrar
                </button>
              </form>
            </div>

            {/* Imagen de Indicaciones */}
            <div className="w-full md:w-1/3 flex justify-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3534/3534139.png"
                alt="Indicaciones"
                className="max-w-full h-auto rounded-lg shadow-lg"
              />
            </div>
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

export default Inicio;



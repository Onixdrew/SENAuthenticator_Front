// import React, { useEffect, useState } from "react";
// import Navbar from "../../components/Navbar";
// import Footer from "../../components/Footer";
// import { useAuth } from "../../auth/authProvider";
// // import { getAllUsers } from "../../api/userController";

// const ReportesInstructor = async () => {
//   // Traer rol de la bd del user para comprobar
//   const rol2 = "Instructor";
//   const Autenticador = useAuth();

//   // const [datos, setDatos] = useState([]);
//   // const [loading, setLoading] = useState(true);
//   // const [error, setError] = useState(null);

//   // useEffect(() => {
//   //   const fetchData = async () => {
//   //     try {
//   //       const result = await getAllUsers();
//   //       setDatos(result);
//   //     } catch (error) {
//   //       console.error("Error al cargar los datos:", error.message);
//   //       setError(error.message);
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   };

//   //   fetchData();
//   // }, []);

//   // if (loading) return <p>Loading...</p>;
//   // if (error) return <p className="text-red-500">Error: {error}</p>;

//   return (
//     <>
//       {Autenticador.isAuthenticated && rol2 === "Instructor" ? (
//         <div className="bg-white min-h-screen relative">
//           {" "}
//           {/* Agrega 'relative' para el posicionamiento absoluto */}
//           <div className="mt-0">
//             <Navbar
//               item1="inicio"
//               item2="Reportes"
//               item3=""
//               ruta1="/inicioInstructor"
//               ruta2=""
//               ruta3=""
//               color2="activo"
//             />
//           </div>
//           {/* Inputs de filtro */}
//           <form action="" className="flex gap-10 justify-center mt-20">
//             <select name="" id="" className="bg-white p-3 border rounded-lg">
//               <option value="">Ficha</option>
//               <option value="">2669742</option>
//               <option value="">2669756</option>
//               <option value="">2669723</option>
//             </select>
//             <input
//               type="text"
//               className="border rounded-lg pl-4 bg-white text-black"
//               placeholder="# Documento"
//             />
//             <select name="" id="" className="bg-white p-3 border rounded-lg">
//               <option value="">Mañana</option>
//               <option value="">Tarde</option>
//               <option value="">Noche</option>
//             </select>
//             <select name="" id="" className="bg-white p-3 border rounded-lg">
//               <option value="">Tiempo</option>
//               <option value="">Hoy</option>
//               <option value="">Semanal</option>
//               <option value="">Mensual</option>
//             </select>
//             <button className="btn bg-white">Graficas</button>
//           </form>
//           {/* Tarjeta con los registros */}
//           <div className="absolute top-36 right-80 bg-gray-100 border border-gray-300 rounded-lg p-4 shadow-md">
//             <p className="text-center text-2xl font-semibold">10/20</p>
//             <p className="text-center text-lg">Ingresos</p>
//           </div>
//           {/* Tabla */}
//           <div className="relative container mx-auto">
//             <table className="mt-28 mx-auto table-auto w-full max-w-6xl">
//               <thead className="border text-gray-600">
//                 <tr>
//                   <th className="px-4 py-2 text-center w-1/6">Puesto</th>
//                   <th className="px-4 py-2 text-center w-1/6">Nombre</th>
//                   <th className="px-4 py-2 text-center w-1/6">
//                     Tipo Identificación
//                   </th>
//                   <th className="px-4 py-2 text-center w-1/6">
//                     Número Identificación
//                   </th>
//                   <th className="px-4 py-2 text-center w-1/6">Ingreso</th>
//                   <th className="px-4 py-2 text-center w-1/6">Fecha</th>
//                   <th className="px-4 py-2 text-center w-1/6">Hora</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-gray-200 text-center">
                
//                 <tr className="bg-white border-b border-gray-200">
//                   <td className="px-4 py-2">sfdsdf</td>
//                   <td className="px-4 py-2 font-semibold">sfsdf</td>
//                   <td className="px-4 py-2">sfsd</td>
//                   <td className="px-4 py-2">sfsdf</td>
//                   <td className="px-4 py-2 text-center text-green-500 flex items-center justify-center">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="w-5 h-5"
//                       viewBox="0 0 24 24"
//                       strokeWidth="1.5"
//                       stroke="#7DDF0C"
//                       fill="none"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     >
//                       <path stroke="none" d="M0 0h24v24H0z" />
//                       <path d="M5 12l5 5l10 -10" />
//                     </svg>
//                   </td>
//                   <td className="px-4 py-2">05/06/2020</td>
//                   <td className="px-4 py-2">10:00</td>
//                 </tr>

//                 {/* {datos.map((registro) => (
//                     <tr
//                       key={registro.id}
//                       className="bg-white border-b border-gray-200"
//                     >
//                       <td className="px-4 py-2">{registro.id}</td>
//                       <td className="px-4 py-2 font-semibold">
//                         {registro.first_name}
//                       </td>
//                       <td className="px-4 py-2">
//                         {registro.tipo_documento_usuario}
//                       </td>
//                       <td className="px-4 py-2">
//                         {registro.numero_documento_usuario}
//                       </td>
//                       <td className="px-4 py-2 text-center text-green-500 flex items-center justify-center">
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           className="w-5 h-5"
//                           viewBox="0 0 24 24"
//                           strokeWidth="1.5"
//                           stroke="#7DDF0C"
//                           fill="none"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                         >
//                           <path stroke="none" d="M0 0h24v24H0z" />
//                           <path d="M5 12l5 5l10 -10" />
//                         </svg>
//                       </td>
//                       <td className="px-4 py-2">05/06/2020</td>
//                       <td className="px-4 py-2">10:00</td>
//                     </tr>
//                   ))} */}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       ) : (
//         <p className="text-red-500">
//           Error: No tienes permiso para acceder a esta página.
//         </p>
//       )}
//     </>
//   );
// };

// export default ReportesInstructor;



// //////////////////////////////////////////////////////// Cambiado


import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useAuth } from '../../auth/authProvider';

const ReportesInstructor = () => {

   // traer rol de la bd del user para comprobar
   const rol2="Instructor"

   const Autenticador = useAuth();

  return (
    <>
    {Autenticador.isAuthenticated && rol2 === "Instructor" ? (
        <div className="bg-white min-h-screen ">
        <div className="mt-0">
          <Navbar
            item1="inicio"
            item2="Reportes"
            item3=""
            ruta1="/inicioInstructor"
            ruta2=""
            ruta3=""
            color2="activo"
            
          />
        </div>

        <form action="" className="flex gap-10 justify-center mt-20">
        <select
            name=""
            id=""
            className="bg-white p-3 border rounded-lg"
           
          >
            <option value="">Ficha</option>
            <option value="">2669742</option>
            <option value="">2669756</option>
            <option value="">2669723</option>
          </select>
          <input
            type="text"
            
            className=" border rounded-lg pl-4 bg-white text-black"
            placeholder="# Documento"
          />

          <select
            name=""
            id=""
            className="bg-white p-3 border rounded-lg"
           
          >
            <option value="">Tiempo</option>
            <option value="">Mañana</option>
            <option value="">Tarde</option>
            <option value="">Noche</option>
          </select>

          <button className="btn bg-white">Graficas</button>
        </form>

        <div className="relative container mx-auto">
          <table className="mt-28 mx-auto table-auto w-full max-w-6xl">
            <thead className="border text-gray-600 ">
              <tr>
                <th className="px-4 py-2 w-1/6 text-left">Puesto</th>
                <th className="px-4 py-2 w-1/6 text-left">Nombre</th>
                <th className="px-4 py-2 w-1/6 text-left">
                  Número Identificación
                </th>
                <th className="px-4 py-2 w-1/6 text-left">Ingreso</th>
                <th className="px-4 py-2 w-1/6 text-left">Hora de Ingreso</th>
                <th className="px-4 py-2 w-1/6 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="bg-gray-200">
              <tr className="bg-white border-b border-gray-200">
                <td className="px-4 py-2 flex items-center">
                  <img
                    className="h-8 w-8 rounded-full object-cover"
                    src="https://randomuser.me/api/portraits/men/30.jpg"
                    alt="Profile Picture"
                  />
                </td>
                <td className="px-4 py-2 text-left font-semibold">
                  Dean Lynch
                </td>
                <td className="px-4 py-2 text-center">
                  <button className="bg-indigo-500 text-white px-4 py-2 border rounded-md hover:bg-white hover:border-indigo-500 hover:text-black">
                    Open Link
                  </button>
                </td>
                <td className="px-4 py-2 text-center">05/06/2020</td>
                <td className="px-4 py-2 text-center">10:00</td>
                <td className="px-4 py-2 text-center text-green-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="#2c3e50"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <path d="M5 12l5 5l10 -10" />
                  </svg>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      ) : (
        <p className="text-red-500">Error: No tienes permiso para acceder a esta página.</p>
      )
    }
      
    </>
  );
};

export default ReportesInstructor;

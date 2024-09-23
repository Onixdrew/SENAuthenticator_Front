import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../Context/AuthContext';
import { getAllUsers } from '../../../api/userController';

const HistorialUser = () => {
    const { isAuthenticated, user } = useAuth();
    const [ingresos, setIngresos] = useState([]);



    useEffect(() => {
        const recibirDatos = async () => {
            try {
                const result = await getAllUsers();
                console.log(result)
                setIngresos(result)
                // console.log(ingresos)



                // Se obtiene solo los aprendices
                // if (tipoPersona != "Todos") {
                //   if (result) {
                //     const aprendices = result.filter(
                //       (registro) => registro.rol_usuario === tipoPersona
                //     );

                //     setDatos(aprendices);
                //     setDatosFiltrados(aprendices);
                //   }
                // } else {
                //   setDatos(result);
                //   setDatosFiltrados(result);
                // }
            } catch (error) {
                console.error("Error al cargar los datos:", error.message);
                setError(error.message);
            } finally {
                // setLoading(false);
            }
        };

        recibirDatos();
    }, [isAuthenticated]);

 

    return (
        <>
            {isAuthenticated && user.rol_usuario === "Guardia de seguridad" ? (
                <div className="relative min-h-screen flex flex-col">


                    {/* Contenedor con desplazamiento vertical */}
                    <div className="relative max-w-full mt-10 mb-20 overflow-x-auto">
                        <div className="max-h-[400px] overflow-y-auto">
                            {" "}
                            {/* Ajusta la altura según sea necesario */}
                            <table
                                className="w-full table-auto border-collapse bg-white rounded-lg shadow-md"

                            >
                                <thead className="bg-gray-200 border-b border-gray-300 text-gray-600 sticky top-0 z-10">
                                    <tr>
                                        <th className="px-4 py-2 text-center">Puesto</th>
                                        <th className="px-4 py-2 text-start ">Nombre</th>

                                        <th className="px-4 py-2 text-start inline-block">
                                            Número Identificación
                                        </th>
                                        <th className=" text-center">Ingreso</th>
                                        <th className="px-4 py-2 text-center">Fecha</th>
                                        <th className="px-4 py-2 text-center">Hora</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-gray-100 text-center">
                                    {/* {ingresos.map((registro, index) => (
                                        <tr key={index} className="border-b border-gray-300">
                                            <td className="px-4 py-2">{index + 1}</td>
                                            <td className="px-4 py-2 font-semibold text-start">
                                                {registro.first_name}
                                            </td>

                                            <td className="px-4 py-2 text-start">
                                                {registro.numero_documento_usuario}
                                            </td>
                                            <td className=" py-2 text-green-500 flex items-center justify-center">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="w-5 h-5"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                    stroke="#7DDF0C"
                                                    fill="none"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <path stroke="none" d="M0 0h24v24H0z" />
                                                    <path d="M5 12l5 5l10 -10" />
                                                </svg>
                                            </td>
                                            <td className="px-4 py-2">05/06/2020</td>
                                            <td className="px-4 py-2">10:00 am</td>
                                        </tr>
                                    ))} */}

                                    <tr>
                                        <td>gdfgdf</td>
                                        <td>gdfgdf</td>
                                        <td>gdfgdf</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* <nav className="flex items-center justify-between pt-4">
                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                            Mostrando {indicePrimerRegistro + 1}-
                            {indiceUltimoRegistro > datosFiltrados.length
                                ? datosFiltrados.length
                                : indiceUltimoRegistro}{" "}
                            de {datosFiltrados.length}
                        </span>
                        <div className="inline-flex">
                            <button
                                onClick={irAPaginaAnterior}
                                disabled={paginaActual === 1}
                                className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l hover:bg-blue-200   "
                            >
                                Anterior
                            </button>
                            <button
                                onClick={irAPaginaSiguiente}
                                disabled={paginaActual === totalPaginas}
                                className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r hover:bg-blue-200"
                            >
                                Siguiente
                            </button>
                        </div>
                    </nav> */}





                </div >
            ) : (
                <p className="text-red-500 text-center mt-4">
                    Error: Página no encontrada.
                </p>
            )}
        </>
    )
}

export default HistorialUser
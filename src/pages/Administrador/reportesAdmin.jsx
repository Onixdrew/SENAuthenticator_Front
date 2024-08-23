import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useAuth } from "../../auth/authProvider";
import { getAllUsers } from "../../api/userController";
import { Link } from "react-router-dom";
import { MdOutlineRefresh } from "react-icons/md";


const ReportesAdmin= () => {
  const rol2 = "Administrador";

  const Autenticador = useAuth();

  const [datos, setDatos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [documentoFiltro, setDocumentoFiltro] = useState("");
  const [datosFiltrados, setDatosFiltrados] = useState([]);
  const [refrescar, setRefrescar] = useState(false);

  useEffect(() => {
    const recibirDatos = async () => {
      try {
        const result = await getAllUsers();

        // Esta es la variable de contexto
        // const result = await Autenticador.getAllUsers();

        setDatos(result);
        setDatosFiltrados(result);
      } catch (error) {
        console.error("Error al cargar los datos:", error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    recibirDatos();
  }, [refrescar]);

  useEffect(() => {
    if (documentoFiltro) {
      setDatosFiltrados(
        datos.filter((registro) =>
          registro.numero_documento_usuario.toString().includes(documentoFiltro)
        )
      );
    } else {
      setDatosFiltrados(datos);
    }
  }, [documentoFiltro, datos]);

  const actualizarUsers = () => {
    setLoading(true)
    setRefrescar(prevRefresh => !prevRefresh); // Alterna el valor de `refrescar`
  };


  return (
    <>
      {Autenticador.isAuthenticated && rol2 === "Administrador" ? (
        <div className="relative min-h-screen flex flex-col">
          <div className="relative">
            <div className="sticky top-0 z-40 bg-white">
              <Navbar
                item1="inicio"
                item2="Reportes"
                ruta1="/inicioAdmin"
                color2="activo"
              />
            </div>

            <div className="max-w-full mx-auto px-4 md:px-6">
              <form className="flex flex-col md:flex-row gap-4 md:gap-10 justify-center mt-10">
                <select
                  name=""
                  id=""
                  className="bg-white p-3 border rounded-lg flex-1"
                >
                  <option value="">2669742</option>
                  <option value="">2669756</option>
                  <option value="">2669723</option>
                </select>
                <input
                  type="text"
                  className="border rounded-lg pl-4 bg-white text-black flex-1"
                  placeholder="# Documento"
                  value={documentoFiltro}
                  onChange={(e) => setDocumentoFiltro(e.target.value)}
                />
                <select
                  name=""
                  id=""
                  className="bg-white p-3 border rounded-lg flex-1"
                >
                  <option value="">Mañana</option>
                  <option value="">Tarde</option>
                  <option value="">Noche</option>
                </select>
                <select
                  name=""
                  id=""
                  className="bg-white p-3 border rounded-lg flex-1"
                >
                  <option value="">Hoy</option>
                  <option value="">Semanal</option>
                  <option value="">Mensual</option>
                </select>
                <Link to="/GraficasAdmin">
                  <button className="btn bg-white flex-1 md:flex-none">
                    Graficas
                  </button>
                </Link>
              </form>

              <div className="mt-6 flex  bg-gray-100 border border-gray-300 rounded-lg p-4 shadow-md max-w-xs mx-auto  ">
                <div className="flex flex-col mx-auto">
                  <p className="text-center text-2xl font-semibold">
                    10/{datos.length}
                  </p>
                  <h1 className="text-center text-lg">Ingresos</h1>
                </div>

                <button onClick={actualizarUsers}   title="Refrescar"><MdOutlineRefresh className="text-3xl ml-10" /></button>
              </div>

              {loading && (
                <div className="flex justify-center items-center mt-10">
                  <div className="loader text-center"></div>
                  <p className="text-gray-400 z-50 text-lg font-serif mt-4">
                    Cargando...
                  </p>
                </div>
              )}

              {error && (
                <p className="text-red-500 text-center mt-4">Error: {error}</p>
              )}

              {/* Contenedor con desplazamiento vertical */}
              <div className="relative max-w-full mt-10 mb-20 overflow-x-auto">
                <div className="max-h-[400px] overflow-y-auto">
                  {" "}
                  {/* Ajusta la altura según sea necesario */}
                  <table className="w-full table-auto border-collapse bg-white rounded-lg shadow-md">
                    <thead className="bg-gray-200 border-b border-gray-300 text-gray-600 sticky top-0 z-10">
                      <tr>
                        <th className="px-4 py-2 text-center">Puesto</th>
                        <th className="px-4 py-2 text-center">Nombre</th>
                        <th className="px-4 py-2 text-center">
                          Tipo Identificación
                        </th>
                        <th className="px-4 py-2 text-center">
                          Número Identificación
                        </th>
                        <th className="px-4 py-2 text-center">Ingreso</th>
                        <th className="px-4 py-2 text-center">Fecha</th>
                        <th className="px-4 py-2 text-center">Hora</th>
                      </tr>
                    </thead>
                    <tbody className="bg-gray-100 text-center">
                    {datosFiltrados
                        .filter(
                          (registro) => registro.rol_usuario === "Aprendiz"
                        )
                        .map((registro, index) => (
                          <tr key={index} className="border-b border-gray-300">
                            <td className="px-4 py-2">{index}</td>
                            <td className="px-4 py-2 font-semibold">
                              {registro.first_name}
                            </td>
                            <td className="px-4 py-2">
                              {registro.tipo_documento_usuario}
                            </td>
                            <td className="px-4 py-2">
                              {registro.numero_documento_usuario}
                            </td>
                            <td className="px-4 py-2 text-green-500 flex items-center justify-center">
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
                            <td className="px-4 py-2">10:00</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className={`${loading ? "mt-52 " : "mt-72"} `}>
            <Footer />
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

export default ReportesAdmin;

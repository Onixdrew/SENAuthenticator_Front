import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";
import { Link, useLocation } from "react-router-dom";
import { MdOutlineRefresh } from "react-icons/md";
import { getAllUsers } from "../../../api/userController";
import { useAuth } from "../../../Context/AuthContext";
import Loader from "../../../components/Loader/Loader";
import ReactToPrint from "react-to-print";


const ReportesAdmin = () => {
  const { isAuthenticated, user } = useAuth();

  const [datos, setDatos] = useState([]);
  const [datosFiltrados, setDatosFiltrados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [documentoFiltro, setDocumentoFiltro] = useState("");
  const [refrescar, setRefrescar] = useState(false);
  const [tipoPersona, setTipoPersona] = useState("Aprendiz");
  const location = useLocation(); // Obtiene la ruta actual


  // Estados para la paginación
  const [paginaActual, setPaginaActual] = useState(1);
  const registrosPorPagina = 5;


  // Referencia para impresión
  const printRef = useRef();


  // Almacenar la ruta actual en localStorage al cargar el componente
  useEffect(() => {
    localStorage.setItem("lastRoute", location.pathname);
  }, [location]);

  useEffect(() => {
    const recibirDatos = async () => {
      try {
        const result = await getAllUsers();

        // Se obtiene solo los aprendices
        if (tipoPersona != "Todos") {
          if (result) {
            const aprendices = result.filter(
              (registro) => registro.rol_usuario === tipoPersona
            );

            setDatos(aprendices);
            setDatosFiltrados(aprendices);
          }
        } else {
          setDatos(result);
          setDatosFiltrados(result);
        }
      } catch (error) {
        console.error("Error al cargar los datos:", error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    recibirDatos();
  }, [refrescar, tipoPersona]);



  // se filtra por numero de documento
  useEffect(() => {
    if (documentoFiltro) {
      const datosFiltrados = datos.filter((registro) =>
        registro.numero_documento_usuario.toString().includes(documentoFiltro)
      );
      setDatosFiltrados(datosFiltrados);
    } else {
      setDatosFiltrados(datos);
    }
  }, [documentoFiltro, datos]);

  const actualizarUsers = () => {
    setLoading(true);
    setRefrescar((prevRefresh) => !prevRefresh); // Alterna el valor de `refrescar`
  };

  // Calcular el número total de páginas
  const totalPaginas = Math.ceil(datosFiltrados.length / registrosPorPagina);

  // Obtener los registros correspondientes a la página actual
  const indiceUltimoRegistro = paginaActual * registrosPorPagina;
  const indicePrimerRegistro = indiceUltimoRegistro - registrosPorPagina;
  const registrosActuales = datosFiltrados.slice(
    indicePrimerRegistro,
    indiceUltimoRegistro
  );

  // Funciones para cambiar de página
  const irAPaginaSiguiente = () => {
    if (paginaActual < totalPaginas) {
      setPaginaActual(paginaActual + 1);
    }
  };

  const irAPaginaAnterior = () => {
    if (paginaActual > 1) {
      setPaginaActual(paginaActual - 1);
    }
  };

  return (
    <>
      {isAuthenticated && user.rol_usuario === "Administrador" ? (
        <div className="relative min-h-screen flex flex-col">
          {loading && <Loader />}
          <div className="relative">
            <div className="sticky top-0 z-40 bg-white">
              <Navbar
                item1="inicio"
                item2="Reportes"
                ruta1="/inicioAdmin"
                color2="activo"
                OpenPerfil={true}
              />
            </div>

            <div className="max-w-full mx-auto px-4 md:px-6">
              <form
                action=""
                className="flex  gap-4 justify-center  mt-12 [@media(max-width:768px)]:flex-col  md:gap-6 md:px-24 [@media(max-width:425px)]:px-7 lg:gap-10"
              >
                <select
                  name=""
                  id=""
                  className="bg-white p-3 border rounded-lg w-full md:w-auto"
                >
                  <option value="">Mañana</option>
                  <option value="">Tarde</option>
                  <option value="">Noche</option>
                  <option value="">Todos</option>
                </select>
                <select
                  name=""
                  id=""
                  value={tipoPersona}
                  onChange={(e) => setTipoPersona(e.target.value)}
                  className="bg-white p-3 border rounded-lg w-full md:w-auto "
                >
                  <option value="Aprendiz">Aprendiz</option>
                  <option value="Instructor">Instructor</option>
                  <option value="Personal Aseo">Personal Aseo</option>
                  <option value="Todos">Todos</option>
                </select>

                {tipoPersona == "Aprendiz" && (
                  <select
                    name=""
                    id=""
                    className="bg-white p-3 border rounded-lg w-full md:w-auto"
                  >
                    <option value="2669742">2669742</option>
                    <option value="">2669756</option>
                    <option value="">2669723</option>
                    <option value="Todos">Todos</option>
                  </select>
                )}

                <input
                  type="number"
                  className="border rounded-btn pl-6 h-11 bg-white text-black "
                  placeholder="# Documento"
                  value={documentoFiltro}
                  onChange={(e) => setDocumentoFiltro(e.target.value)}
                />
                <select
                  name=""
                  id=""
                  className="bg-white p-3 border rounded-lg w-full md:w-auto"
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

              <div className="relative max-w-full mt-4  overflow-x-auto p-6 ">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                  <p className="text-center text-2xl font-semibold">
                    0/{datosFiltrados.length}
                  </p>
                  <h1 className="text-center text-lg">Ingresos</h1>
                </div>

                <button title="Refrescar">
                  <MdOutlineRefresh
                    className="text-3xl ml-10"
                    onClick={actualizarUsers}
                  />
                </button>
              </div>

              {error && (
                <p className="text-red-500 text-center mt-4">Error: {error}</p>
              )}

              {/* Botones de descarga */}
              <div className="inline-block">
                <ReactToPrint
                  trigger={() => (
                    <button className="btn bg-red-500 text-white hover:bg-red-600 hover:shadow-lg transition ease-in-out duration-150">
                      PDF
                    </button>
                  )}
                  content={() => printRef.current}
                />
              </div>

              {/* Contenedor con desplazamiento vertical */}
              <div className="relative max-w-full mt-10 mb-20 overflow-x-auto">
                <div className="max-h-[400px] overflow-y-auto">
                  {" "}
                  {/* Ajusta la altura según sea necesario */}
                  <table
                    className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    ref={printRef}
                  >
                    <thead className="text-xs text-white uppercase bg-gray-700 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-6 py-3">Puesto</th>
                        <th scope="col" className="px-6 py-3 ">Nombre</th>

                        <th scope="col" className="px-6 py-3 inline-block">
                          Número Identificación
                        </th>
                        <th scope="col" className=" px-6 py-3 text-center">Ingreso</th>
                        <th scope="col" className="px-6 py-3 text-center">Fecha</th>
                        <th scope="col" className="px-6 py-3 text-center">Hora</th>
                      </tr>
                    </thead>
                    <tbody className="">
                      {datosFiltrados.map((registro, index) => (
                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                          <td className="px-6 py-4">{index + 1}</td>
                          <td className="px-6 py-4 font-semibold">
                            {registro.first_name}
                          </td>

                          <td className="px-6 py-4">
                            {registro.numero_documento_usuario}
                          </td>
                          <td className=" px-6 py-4 text-green-500 flex items-center justify-center">
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
                          <td className="px-6 py-4 text-center">05/06/2020</td>
                          <td className="px-6 py-4 text-center">10:00 am</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <nav className="flex items-center justify-between pt-4">
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
                </nav>
              </div>
            </div>
          </div>

          <div className={`${loading ? "mt-52 " : "mt-44"} `}>
            <Footer />
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

export default ReportesAdmin;

import React, { useEffect, useState, useRef } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";
import { Link } from "react-router-dom";
import { MdOutlineRefresh } from "react-icons/md";
import { useAuth } from "../../../auth/authProvider";
import { getAllUsers } from "../../../api/userController";
import Loader from "../../../components/Loader/Loader";

const ReportesInstructor = () => {
  const rol2 = "Instructor";
  const Autenticador = useAuth();
  const printRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [documentoFiltro, setDocumentoFiltro] = useState("");
  const [datosFiltrados, setDatosFiltrados] = useState([]);
  const [refrescar, setRefrescar] = useState(false);

  // Estados para la paginación
  const [paginaActual, setPaginaActual] = useState(1);
  const registrosPorPagina = 5;

  useEffect(() => {
    const recibirDatos = async () => {
      try {
        const result = await getAllUsers();

        if (result) {
          setDatosFiltrados(
            result.filter((registro) => registro.rol_usuario === "Aprendiz")
          );
        }
      } catch (error) {
        console.error("Error al cargar los datos:", error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    recibirDatos();
  }, [refrescar]);

  // Filtrar los datos por número de documento
  useEffect(() => {
    if (documentoFiltro) {
      const filtrados = datosFiltrados.filter((registro) =>
        registro.numero_documento_usuario.toString().includes(documentoFiltro)
      );
      setDatosFiltrados(filtrados);
    }
  }, [documentoFiltro]);

  const actualizarUsers = () => {
    setLoading(true);
    setRefrescar((prevRefresh) => !prevRefresh);
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
      {Autenticador.isAuthenticated && rol2 === "Instructor" ? (
        <div className="relative min-h-screen flex flex-col">
          <Navbar
            item1="Inicio"
            item2="Reportes"
            ruta1="/inicioInstructor"
            ruta2="/ReportesInstructor"
            color=""
          />

          <div className="max-w-full mx-auto px-4 md:px-6">
            <form className="flex flex-col gap-4 justify-center mt-12 md:flex-row md:gap-6 lg:gap-10">
              <select className="bg-white p-3 border rounded-lg w-full md:w-auto">
                <option value="">Mañana</option>
                <option value="">Tarde</option>
                <option value="">Noche</option>
              </select>
              <select className="bg-white p-3 border rounded-lg w-full md:w-auto">
                <option value="">2669742</option>
                <option value="">2669756</option>
                <option value="">2669723</option>
              </select>

              <input
                type="text"
                className="text-center border rounded-lg pl-4 bg-white text-black w-full md:w-1/2 lg:w-1/3 xl:w-1/4 py-2 px-4 shadow-sm focus:outline-none focus:ring-2"
                placeholder="# Documento"
                value={documentoFiltro}
                onChange={(e) => setDocumentoFiltro(e.target.value)}
              />

              <select className="bg-white p-3 border rounded-lg w-full md:w-auto">
                <option value="">Hoy</option>
                <option value="">Semanal</option>
                <option value="">Mensual</option>
              </select>

              <Link to="/GraficasAdmin">
                <button className="btn bg-white flex-1 md:flex-none">
                  Gráficas
                </button>
              </Link>
            </form>

            <div className="mt-6 flex items-center justify-between bg-gray-100 border border-gray-300 rounded-lg p-2 shadow-md max-w-xs mx-auto">
              <div className="flex flex-col">
                <p className="text-center text-xl font-semibold">
                  {registrosActuales.length}/{datosFiltrados.length}
                </p>
                <h1 className="text-center text-sm">Ingresos</h1>
              </div>

              <button title="Refrescar" className="ml-4 p-1">
                <MdOutlineRefresh
                  className="text-2xl"
                  onClick={actualizarUsers}
                />
              </button>
            </div>

            {loading && (
              <div className="flex justify-center">
                <Loader />
              </div>
            )}

            {error && (
              <p className="text-red-500 text-center mt-4">Error: {error}</p>
            )}

            {/* Contenedor con desplazamiento vertical */}
            <div className="relative max-w-full mt-10 mb-20 overflow-x-auto">
              <div className="max-h-[400px] overflow-y-auto">
                <table
                  className="w-full table-auto border-collapse bg-white rounded-lg shadow-md"
                  ref={printRef}
                >
                  <thead className="bg-gray-200 border-b border-gray-300 text-gray-600 sticky top-0 z-10">
                    <tr>
                      <th className="px-4 py-2 text-left">Nombre</th>
                      <th className="px-4 py-2 text-center">Número Identificación</th>
                      <th className="px-4 py-2 text-center">Fecha Entrada</th>
                      <th className="px-4 py-2 text-center">Fecha Salida</th>
                      <th className="px-4 py-2 text-center">Hora Entrada</th>
                      <th className="px-4 py-2 text-center">Hora Salida</th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-100">
                    {registrosActuales.map((registro) => (
                      <tr key={registro.numero_documento_usuario} className="border-b border-gray-300">
                        <td className="px-4 py-2 font-semibold">{registro.first_name}</td>
                        <td className="px-4 py-2 text-center">{registro.numero_documento_usuario}</td>
                        <td className="px-4 py-2 text-center">05/06/2020</td>
                        <td className="px-4 py-2 text-center">05/06/2021</td>
                        <td className="px-4 py-2 text-center">6:59 am</td>
                        <td className="px-4 py-2 text-center">1:00 pm</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <nav className="flex items-center justify-between pt-4">
                  <span className="text-sm font-normal text-gray-500">
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
                      className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l hover:bg-blue-200"
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

          <Footer className={`${loading ? "mt-52 " : "mt-72"}`} />
        </div>
      ) : (
        <p className="text-red-500 text-center mt-4">
          Error: No tienes permiso para acceder a esta página.
        </p>
      )}
    </>
  );
};

export default ReportesInstructor;

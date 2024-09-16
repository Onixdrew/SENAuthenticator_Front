import { useEffect, useState, useRef } from "react";
import { getAllUsers } from "../../../api/userController";
import { FaSearch } from 'react-icons/fa';
import Navbar from "../../../components/Navbar/Navbar";
import Loader from "../../../components/Loader/Loader";
import { useAuth } from "../../../Context/AuthContext";

const Informes = () => {
  const rol3 = "Guardia de seguridad";
  const Autenticador = useAuth();

  const [datos, setDatos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [documentoFiltro, setDocumentoFiltro] = useState("");
  const [datosFiltrados, setDatosFiltrados] = useState([]);
  const [refrescar, setRefrescar] = useState(false);

  // Estados para la paginación
  const [paginaActual, setPaginaActual] = useState(1);
  const registrosPorPagina = 5;

  const printRef = useRef();

  useEffect(() => {
    const recibirDatos = async () => {
      try {
        const result = await getAllUsers();
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

  // Filtra por número de documento
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

  // Actualiza los usuarios
  const actualizarUsers = () => {
    setLoading(true);
    setRefrescar((prevRefresh) => !prevRefresh); // Alterna el valor de refrescar
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
      {Autenticador.isAuthenticated && rol3 === "Guardia de seguridad" ? (
        <div className="min-h-screen bg-gray-100">
          <Navbar
            item1="Registro Facial"
            item2="Registro Personas"
            item3="Historial de ingreso"
            ruta1="/InicioGuardia"
            ruta2="/ReconocimientoGuardia"
            ruta3="/PersonasEntrantes"
            color=""
          />

          <div className="max-w-full mx-auto px-4 md:px-6">
            <form className="flex justify-center mt-9 relative">
              <div className="relative w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
                <input
                  type="number"
                  className="text-center border rounded-lg pl-10 bg-white text-black w-full py-2 px-4 shadow-sm focus:outline-none focus:ring-2"
                  placeholder="Número de documento"
                  value={documentoFiltro}
                  onChange={(e) => setDocumentoFiltro(e.target.value)}
                />
                <FaSearch
                  className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500"
                  size={20} // Tamaño grande
                />
              </div>
            </form>

            {loading && (
              <div className="flex mt-10 justify-center">
                <Loader />
              </div>
            )}

            {error && (
              <p className="text-red-500 text-center mt-4">Error: {error}</p>
            )}

            <div className="relative max-w-full mt-4 mb-20 overflow-x-auto p-6">
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table
                  className="w-full text-sm text-left text-gray-500 dark:text-gray-400"
                  ref={printRef}
                >
                  <thead className="text-xs text-white uppercase bg-gray-700 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th className="px-6 py-3">Nombre</th>
                      <th className="px-6 py-3">Número Identificación</th>
                      <th className="px-6 py-3 text-center">Fecha Entrada</th>
                      <th className="px-6 py-3 text-center">Fecha Salida</th>
                      <th className="px-6 py-3 text-center">Hora Entrada</th>
                      <th className="px-6 py-3 text-center">Hora Salida</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white text-gray-900 dark:bg-gray-800 dark:text-white">
                    {registrosActuales.map((registro) => (
                      <tr
                        key={registro.numero_documento_usuario}
                        className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                      >
                        <td className="px-4 py-2 font-semibold">{registro.first_name}</td>
                        <td className="px-6 py-4">{registro.numero_documento_usuario}</td>
                        <td className="px-6 py-4 text-center">05/06/2020</td>
                        <td className="px-6 py-4 text-center">05/06/2021</td>
                        <td className="px-6 py-4 text-center">6:59 am</td>
                        <td className="px-6 py-4 text-center">1:00 pm</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <nav className="flex items-center justify-between p-4">
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
                      className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l hover:bg-gray-200"
                    >
                      Anterior
                    </button>
                    <button
                      onClick={irAPaginaSiguiente}
                      disabled={paginaActual === totalPaginas}
                      className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r hover:bg-gray-200"
                    >
                      Siguiente
                    </button>
                  </div>
                </nav>
              </div>
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

export default Informes;

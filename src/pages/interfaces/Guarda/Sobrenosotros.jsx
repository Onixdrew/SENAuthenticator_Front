import React, { useEffect, useState, useRef } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import { useAuth } from "../../../Context/AuthContext";
import { getAllUsers } from "../../../api/userController";
import Loader from "../../../components/Loader/Loader";

const Sobrenosotros = () => {
  const { isAuthenticated, user } = useAuth();
  
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
        if (result) {
          const aprendices = result.filter((registro) => registro.rol_usuario === "Aprendiz");
          setDatos(aprendices);
          setDatosFiltrados(aprendices);
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
      {isAuthenticated && user.rol_usuario === "Guardia de seguridad" ? (
        <div className="min-h-screen bg-gray-100">
          <Navbar
            item1="Registro Facial"
            item2="Registro Personas"
            item3="Informes"
            ruta1="/InicioGuardia"
            ruta2="/ReconocimientoGuardia"
            ruta3="/Informes"
            color=""
          />
  
          <div className="max-w-full mx-auto px-4 md:px-6">
            <form className="flex justify-center mb-4">
              <input
                type="text"
                className="text-center border rounded-lg pl-4 bg-white text-black w-full md:w-1/2 lg:w-1/3 xl:w-1/4 py-2 px-4 shadow-sm focus:outline-none focus:ring-2"
                placeholder="# Documento"
                value={documentoFiltro}
                onChange={(e) => setDocumentoFiltro(e.target.value)}
              />
            </form>

            {loading && (
              <div className="flex justify-center">
                <Loader />
              </div>
            )}

            {error && (
              <p className="text-red-500 text-center mt-4">Error: {error}</p>
            )}

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
                    {registrosActuales.map((registro,index) => (
                      <tr key={index} className="border-b border-gray-300">
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
        </div>
      ) : (
        <p className="text-red-500 text-center mt-4">
          Error: Página no encontrada.
        </p>
      )}
    </>
  );
};

export default Sobrenosotros;

import React, { useEffect, useState } from "react";
import { useAuth } from "../../../Context/AuthContext";
import { getAllUsers } from "../../../api/userController";
import Navbar from "../../../components/Navbar/Navbar";
// import { FaSearch, FaCalendarAlt, FaUser, FaIdCard } from "react-icons/fa";
import "@fortawesome/fontawesome-free/css/all.min.css";
const HistorialUser = () => {
  const { isAuthenticated, user } = useAuth();
  const [ingresos, setIngresos] = useState([]);
  const [filteredIngresos, setFilteredIngresos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });

  useEffect(() => {
    const recibirDatos = async () => {
      try {
        const result = await getAllUsers();
        setIngresos(result);
        setFilteredIngresos(result);
      } catch (error) {
        console.error("Error al cargar los datos:", error.message);
      }
    };

    recibirDatos();
  }, []);

  // Función para manejar la búsqueda en tiempo real
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = ingresos.filter(
      (ingreso) =>
        ingreso.first_name.toLowerCase().includes(query) ||
        ingreso.numero_documento_usuario.includes(query)
    );
    setFilteredIngresos(filtered);
  };

  // Función para manejar el ordenamiento de columnas
  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    const sortedData = [...filteredIngresos].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "ascending" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
    setSortConfig({ key, direction });
    setFilteredIngresos(sortedData);
  };

  return (
    <>
      {isAuthenticated && user.rol_usuario === "Guardia de seguridad" ? (
        <div className="min-h-screen bg-gray-50">
          <div className="sticky top-0 z-40 bg-white shadow-md">
            <Navbar
              item1="Registro Facial"
              item2="Registro Personas"
              item3="Historial"
              ruta1="/InicioGuardia"
              ruta2="/ReconocimientoGuardia"
              color3="activo"
            />
          </div>

          <div className="flex flex-col justify-center items-center mt-12">
            <div className="w-full max-w-7xl">
              <div className="flex flex-wrap justify-between  mb-9 items-end ">
                <div className="w-full md:w-auto border rounded-lg p-3 shadow-sm h-12">
                  <i className="fa-solid fa-magnifying-glass text-lg"></i>
                  <input
                    type="text"
                    placeholder="Buscar por nombre o documento"
                    value={searchQuery}
                    onChange={handleSearch}
                    className="focus:outline-none bg-gray-50 pl-3 "
                    style={{ minWidth: "250px" }}
                  />
                </div>

                <div className="flex gap-4">
                  <div className="flex flex-col w-full md:w-auto ">
                    <label
                      htmlFor="jornada"
                      className="text-gray-600 mb-1 opacity-50"
                    >
                      Jornada
                    </label>
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
                  </div>

                  <div className="flex flex-col w-full md:w-auto">
                    <label
                      htmlFor="personas"
                      className="text-gray-600 mb-1 opacity-50"
                    >
                      Personas
                    </label>
                    <select
                      name=""
                      id=""
                      className="bg-white p-3 border rounded-lg w-full md:w-auto"
                    >
                      <option value="Todos">Todos</option>
                      <option value="Aprendiz">Aprendiz</option>
                      <option value="Instructor">Instructor</option>
                      <option value="Personal Aseo">Personal Aseo</option>
                    </select>
                  </div>

                  <div className="flex flex-col w-full md:w-auto">
                    <label
                      htmlFor="personas"
                      className="text-gray-600 mb-1 opacity-50"
                    >
                      Tiempo
                    </label>
                    <select
                      name=""
                      id=""
                      className="bg-white p-3 border rounded-lg w-full md:w-auto"
                    >
                      <option value="">Hoy</option>
                      <option value="">Semanal</option>
                      <option value="">Mensual</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Tabla con sort y paginación */}
              <div className="overflow-x-auto bg-white shadow rounded-lg">
                <table className="table-auto w-full border-collapse">
                  <thead className="bg-gray-200 border-b border-gray-300 text-gray-600">
                    <tr>
                      <th>#</th>
                      <th
                        className="px-4 py-2 text-start cursor-pointer"
                        onClick={() => handleSort("first_name")}
                      >
                        Nombre{" "}
                        {sortConfig.key === "first_name"
                          ? sortConfig.direction === "ascending"
                            ? "▲"
                            : "▼"
                          : ""}
                      </th>
                      <th
                        className="px-4 py-2 text-start cursor-pointer"
                        onClick={() => handleSort("numero_documento_usuario")}
                      >
                        Número Identificación{" "}
                        {sortConfig.key === "numero_documento_usuario"
                          ? sortConfig.direction === "ascending"
                            ? "▲"
                            : "▼"
                          : ""}
                      </th>

                      <th
                        className="px-4 py-2 text-start cursor-pointer"
                        onClick={() => handleSort("fecha")}
                      >
                        Fecha{" "}
                        {sortConfig.key === "fecha"
                          ? sortConfig.direction === "ascending"
                            ? "▲"
                            : "▼"
                          : ""}
                      </th>
                      <th
                        className="px-4 py-2 text-start cursor-pointer"
                        onClick={() => handleSort("hora")}
                      >
                        Hora{" "}
                        {sortConfig.key === "hora"
                          ? sortConfig.direction === "ascending"
                            ? "▲"
                            : "▼"
                          : ""}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-100 text-start">
                    {filteredIngresos.map((registro, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-300 hover:border-b-green-300 
                      
                      "
                      >
                        <td className="px-4 py-2 text-center">
                          {ingresos.length - index}
                        </td>
                        <td className="px-4 py-2">{registro.first_name}</td>
                        <td className="px-4 py-2">
                          {registro.numero_documento_usuario}
                        </td>

                        <td className="px-4 py-2">05/06/2020</td>
                        <td className="px-4 py-2">10:00 am</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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

export default HistorialUser;

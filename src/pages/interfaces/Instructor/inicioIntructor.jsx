import { useEffect } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";
import { useAuth } from "../../../Context/AuthContext";
import { Link, useLocation } from "react-router-dom";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const InicioIntructor = () => {
  // los hooks solo pueden ser llamados dentro de un componente funcional
  const { isAuthenticated, user } = useAuth();

  const location = useLocation(); // Obtiene la ruta actual

  // Almacenar la ruta actual en localStorage al cargar el componente
  useEffect(() => {
    localStorage.setItem("lastRoute", location.pathname);
  }, [location]);

  const data = [
    { name: "Mañana", Aprendices: 45 },
    { name: "Tarde", Aprendices: 38 },
    { name: "Noche", Aprendices: 20 },
  ];
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  return (
    <>
      {isAuthenticated && user.rol_usuario === "Instructor" ? (
        <div>
          <Navbar
            item1="Inicio"
            item2="Reportes"
            ruta2="/reportesInstructor"
            color=""
          />

          <div className="p-4 flex-1 flex flex-col items-center justify-center">
            <p className="text-lg text-gray-700 mb-8 text-center">
              Desde aquí podrás acceder a reportes detallados y gráficos sobre
              el desempeño y asistencia de tus aprendices. Utiliza las opciones
              a continuación para explorar la información más relevante para ti.
            </p>

            <div className="w-full mt-10">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={data}
                    dataKey="Aprendices"
                    nameKey="name"
                    outerRadius={100}
                    fill="#8884d8"
                    label
                  >
                    {data.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className=" grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex justify-center items-center">
              {/* Tarjeta de acceso a Reportes */}
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col items-center">
                <h2 className="text-xl font-semibold mb-4">Ver Reportes</h2>
                <p className="text-gray-600 mb-4 text-center">
                  Accede a los reportes detallados de tus aprendices y mantente
                  al tanto de su progreso.
                </p>
                <Link to="/reportesInstructor">
                  <button className="bg-blue-500  rounded-btn text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-colors">
                    Ir a Reportes
                  </button>
                </Link>
              </div>

              {/* Tarjeta de acceso a Gráficas */}
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col items-center">
                <h2 className="text-xl font-semibold mb-4">Ver Gráficas</h2>
                <p className="text-gray-600 mb-4 text-center">
                  Visualiza datos gráficos sobre el desempeño y asistencia de
                  tus aprendices para obtener una visión más clara.
                </p>
                <Link to="/graficasInstructor">
                  <button className="bg-blue-500  rounded-btn text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-colors">
                    Ir a Gráficas
                  </button>
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-14"><Footer /></div>
        </div>
      ) : (
        <p className="text-red-500 ">Error: Pagina no encontrada.</p>
      )}
    </>
  );
};

export default InicioIntructor;

import React from "react";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";
import { useAuth } from "../../../auth/authProvider";
import { Link, Navigate } from "react-router-dom";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const InicioInstructor = () => {
  const Autenticador = useAuth();
  const rol2 = "Instructor";

  const data = [
    { name: "Mañana", Aprendices: 45 },
    { name: "Tarde", Aprendices: 38 },
    { name: "Noche", Aprendices: 20 },
  ];
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  if (!Autenticador.isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <>
      {Autenticador.isAuthenticated && rol2 === "Instructor" ? (
        <div className="min-h-screen flex flex-col">
          <Navbar
            item1="Inicio"
            item2="Reportes"
            ruta1="/inicioInstructor"
            ruta2="/reportesInstructor"
            color=""
          />

          <div className="p-4 flex-1 flex flex-col items-center justify-center">
            <p className="text-lg text-gray-700 mb-8 text-center">
              Desde aquí podrás acceder a reportes detallados y gráficos sobre el desempeño y asistencia de tus aprendices. 
              Utiliza las opciones a continuación para explorar la información más relevante para ti.
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
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
                  Accede a los reportes detallados de tus aprendices y mantente al tanto de su progreso.
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
                  Visualiza datos gráficos sobre el desempeño y asistencia de tus aprendices para obtener una visión más clara.
                </p>
                <Link to="/graficasInstructor">
                  <button className="bg-blue-500  rounded-btn text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-colors">
                    Ir a Gráficas
                  </button>
                </Link>
              </div>
            </div>

            

          </div>

          <Footer />
        </div>
      ) : (
        <p className="text-red-500 text-center mt-4">
          Error: No tienes permiso para acceder a esta página.
        </p>
      )}
    </>
  );
};

export default InicioInstructor;

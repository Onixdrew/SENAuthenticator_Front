import React from "react";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";
import { useAuth } from "../../../Context/AuthContext";
import Loader from "../../../components/Loader/Loader";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Navigate } from "react-router-dom";

const InicioAdmin = () => {
  // Get authentication status and loading state
  const { isAuthenticated, loading, user } = useAuth();

  // Example data (you can replace this with actual data if needed)
  const data = [
    { name: "2024-08-20", ficha: "2669742", jornada: "Mañana", Aprendices: 45 },
    { name: "2024-08-20", ficha: "2669756", jornada: "Tarde", Aprendices: 38 },
    { name: "2024-08-21", ficha: "2669742", jornada: "Noche", Aprendices: 20 },
    { name: "2024-08-21", ficha: "2669723", jornada: "Mañana", Aprendices: 50 },
    { name: "2024-08-22", ficha: "2669756", jornada: "Tarde", Aprendices: 42 },
    { name: "2024-08-22", ficha: "2669723", jornada: "Noche", Aprendices: 35 },
  ];

  // Chart filtering and data processing (customize as needed)
  const filteredData = data; // Adjust this if you need specific filters

  // // If still loading, show loader
  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center min-h-screen">
  //       <Loader />
  //     </div>
  //   );
  // }

  return (
    <>
      {isAuthenticated && user.rol_usuario === "Administrador" ? (
        <div>
          <Navbar item1="Inicio" item2="Reportes" ruta2="/ReportesAdmin"  color="activo" />

          <main className="p-6 bg-gray-100 min-h-screen">
            <div className="container mx-auto">
              <div className="bg-white rounded-lg shadow-md p-6 mb-6 flex items-center flex-col ">
                <p className="text-gray-600 mb-6 ">
                  Estas son las personas que entraron al SENA en el lapso de
                  tres días.
                </p>
                <div className="gap-6">
                  <div className="p-4 bg-white rounded-lg shadow-md flex items-center justify-center flex-col">
                    <ResponsiveContainer width={700} height={400}>
                      <BarChart
                        data={filteredData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          dataKey="name"
                          label={{
                            value: "Fecha",
                            position: "insideBottom",
                            offset: -8,
                          }}
                        />
                        <YAxis
                          label={{
                            value: "Aprendices",
                            angle: -90,
                            position: "insideLeft",
                          }}
                        />
                        <Tooltip cursor={{ fill: "rgba(0, 0, 0, 0.1)" }} />
                        <Legend />
                        <Bar
                          dataKey="Aprendices"
                          fill="#82ca9d"
                          animationDuration={1500}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Resumen de Datos</h2>
                <p className="text-gray-600">
                  Se puede mostrar el promedio de aprendices por jornada, los
                  días con mayor asistencia, o cualquier otro dato relevante.
                </p>
              </div>
            </div>
          </main>
        </div>
      ) : (
        <p className="text-red-500 ">Error: Pagina no encontrada.</p>
      )}
    </>
  );
};

export default InicioAdmin;

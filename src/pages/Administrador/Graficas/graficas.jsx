import React from "react";
import { Link } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  Cell,
  PieChart,
  Pie,
} from "recharts";

import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

const GraficasAdmin = () => {
  const data = [
    { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
    { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
    { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
    { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
    { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
    { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
    { name: "Page G", uv: 3490, pv: 4300, amt: 2100 },
  ];

  // Define colors for the pie chart slices
  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#FF6F61",
    "#6A5ACD",
    "#FFD700",
  ];

  return (
    <>
      <div>
        <Navbar
          item1="inicio"
          item2="Reportes"
          item3="Graficas"
          ruta1="/inicioAdmin"
          ruta2="/ReportesAdmin"
          color3="activo"
        />
        <form className="flex flex-col md:flex-row sm:px-10 [@media(max-width:650px)]:max-w-4xl gap-4 md:gap-6 justify-center mt-6 mb-10 md:mb-16">
          <div className="flex flex-col w-full md:w-auto">
            <label htmlFor="ficha" className="text-gray-600 mb-1 opacity-50">
              Ficha
            </label>
            <select
              id="ficha"
              className="bg-white p-3 border border-gray-300 rounded-lg w-full"
            >
              <option value="">2669742</option>
              <option value="">2669756</option>
              <option value="">2669723</option>
            </select>
          </div>
          <div className="flex flex-col w-full md:w-auto">
            <label htmlFor="jornada" className="text-gray-600 mb-1 opacity-50">
              Jornada
            </label>
            <select
              id="jornada"
              className="bg-white p-3 border border-gray-300 rounded-lg w-full"
            >
              <option value="">Mañana</option>
              <option value="">Tarde</option>
              <option value="">Noche</option>
            </select>
          </div>
          <div className="flex flex-col w-full md:w-auto">
            <label
              htmlFor="frecuencia"
              className="text-gray-600 mb-1 opacity-50"
            >
              Frecuencia
            </label>
            <select
              id="frecuencia"
              className="bg-white p-3 border border-gray-300 rounded-lg w-full"
            >
              <option value="">Hoy</option>
              <option value="">Semanal</option>
              <option value="">Mensual</option>
            </select>
          </div>
        </form>

        <main className="scroll- p-4 mb-52">
          <div className="charts grid gap-4 md:grid-cols-2 mb-40 ">
            <div className="chart-container p-2">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={data}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="pv" fill="#8884d8" />
                  <Bar dataKey="uv" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-container p-2">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={data}
                    dataKey="uv"
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

        
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default GraficasAdmin;

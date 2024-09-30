import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import Navbar from "../../../../components/Navbar/Navbar";
import Footer from "../../../../components/Footer/Footer";
import { useAuth } from "../../../../Context/AuthContext";
import { useLocation } from "react-router-dom";
import domtoimage from "dom-to-image";
import jsPDF from "jspdf";
import Logo from "../../../../../public/img/Logo Reconocimiento Facial - Verde.png";
import { getAllUsers } from "../../../../api/userController";
import Swal from "sweetalert2";

const GraficasAdmin = () => {
  // const [fechaInicio, setfechaInicio] = useState("");
  // const [fechaFin, setFechaFin] = useState("");

  const [users, setUsers] = useState([]);
  const [selectedFicha, setSelectedFicha] = useState("Todos");
  const [selectedJornada, setSelectedJornada] = useState("Todos");
  const [tipoPersona, setTipoPersona] = useState("Todos");
  const [selectedTiempo, setSelectedTiempo] = useState("Semanal");
  const [botonDescarga, setBotonDescarga] = useState(false);

  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  useEffect(() => {
    localStorage.setItem("lastRoute", location.pathname);
  }, [location]);

  useEffect(() => {
    const getdatos = async () => {
      const users = await getAllUsers();

      if (users) {
        if (tipoPersona == "Todos") {
          return setUsers(users);
        }

        const usersFiltrados = users.filter((user) => {
          return user.rol_usuario == tipoPersona;
        });

        setUsers(usersFiltrados);
        return;
      }
      console.log(`Error al traer usuarios en graficas Admin`);
    };
    getdatos();
  }, [tipoPersona]);

  const data = [
    {
      Semanal: "Semana 1",
      Mensual: "Enero",
      ficha: selectedFicha,
      jornada: selectedJornada,
      Aprendiz: 1300,
      Instructor: 120,
      Todos: 2250,
      PersonalAseo: 30,
      cantidad: users.length,
    },
    {
      Semanal: "Semana 2",
      Mensual: "Febrero",
      ficha: selectedFicha,
      Aprendiz: 450,
      Instructor: 40,
      Todos: 3524,
      PersonalAseo: 22,
      persona: tipoPersona,
      cantidad: users.length,
    },
    {
      Semanal: "Semana 3",
      Mensual: "Marzo",
      ficha: selectedFicha,
      jornada: selectedJornada,
      Aprendiz: 820,
      Instructor: 85,
      Todos: 2658,
      PersonalAseo: 26,
      cantidad: users.length,
    },
    {
      Semanal: "Semana 4",
      Mensual: "Abril",
      ficha: selectedFicha,
      jornada: selectedJornada,
      persona: tipoPersona,
      Aprendiz: 642,
      Instructor: 57,
      Todos: 2857,
      PersonalAseo: 24,
      cantidad: users.length,
    },
    {
      Mensual: "Mayo",
      ficha: selectedFicha,
      jornada: selectedJornada,
      persona: tipoPersona,
      Aprendiz: 463,
      Instructor: 25,
      Todos: 2357,
      PersonalAseo: 15,
      cantidad: users.length,
    },
    {
      Mensual: "Junio",
      ficha: selectedFicha,
      jornada: selectedJornada,
      persona: tipoPersona,
      Aprendiz: 800,
      Instructor: 56,
      Todos: 3500,
      PersonalAseo: 27,
      cantidad: users.length,
    },
    {
      Mensual: "Julio",
      ficha: selectedFicha,
      jornada: selectedJornada,
      persona: tipoPersona,
      Aprendiz: 268,
      Instructor: 66,
      Todos: 1723,
      PersonalAseo: 34,
      cantidad: users.length,
    },
    {
      Mensual: "Agosto",
      ficha: selectedFicha,
      jornada: selectedJornada,
      persona: tipoPersona,
      Aprendiz: 587,
      Instructor: 47,
      Todos: 1324,
      PersonalAseo: 31,
      cantidad: users.length,
    },
    {
      Mensual: "Septiembre",
      ficha: selectedFicha,
      jornada: selectedJornada,
      persona: tipoPersona,
      Aprendiz: 675,
      Instructor: 32,
      Todos: 2000,
      PersonalAseo: 25,
      cantidad: users.length,
    },
    {
      Mensual: "Octubre",
      ficha: selectedFicha,
      jornada: selectedJornada,
      persona: tipoPersona,
      Aprendiz: 589,
      Instructor: 53,
      Todos: 3009,
      PersonalAseo: 28,
      cantidad: users.length,
    },
  ];

  const filteredData = data.filter(
    (item) => (selectedTiempo === "Semanal" ? item.Semanal : item.Mensual)
    // (selectedFicha === "Todos" || item.ficha === selectedFicha) &&
    // (selectedJornada === "Todos" || item.jornada === selectedJornada)||
    // (fechaInicio === "" || new Date(item.name) >= new Date(fechaInicio)) &&
    // (fechaFin === "" || new Date(item.name) <= new Date(fechaFin))
  );

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#FF6F61",
    "#6A5ACD",
    "#FFD700",
  ];

  const descargarGrafica = () => {
    const input = document.getElementById("grafica-container");

    domtoimage
      .toPng(input)
      .then((imgData) => {
        const pdf = new jsPDF();
        const pageWidth = pdf.internal.pageSize.getWidth();
        // Añadir el logo
        const logoUrl = Logo; // Cambia esto por la ruta de tu logo
        const currentDate = new Date().toLocaleDateString(); // Obtener la fecha actual

        // Añadir el logo al PDF
        const logoWidth = 10;
        const logoHeight = 10;
        const logoX = 10; // Posición X del logo
        const logoY = 10; // Posición Y del logo

        pdf.addImage(logoUrl, "PNG", logoX, logoY, logoWidth, logoHeight);

        // Añadir el texto centrado del "Centro de teleinformática y producción industrial..."
        const textoCentro1 =
          "Centro de teleinformática y producción industrial";
        const textoCentro2 = "SENA alto Cauca.";

        pdf.setFontSize(12);
        const textoCentroX = logoX + logoWidth + 5; // Posición X del texto junto al logo
        const textoCentroY1 = logoY + 7; // Alinear con el logo verticalmente
        const textoCentroY2 = logoY + 15; // Segunda línea

        pdf.text(textoCentro1, textoCentroX, textoCentroY1);
        pdf.text(textoCentro2, textoCentroX, textoCentroY2);

        // Añadir título centrado "Reporte de Gráficas"
        const titulo = "Reporte de Gráficas";
        pdf.setFontSize(16);
        const tituloX =
          pageWidth / 2 -
          (pdf.getStringUnitWidth(titulo) * pdf.internal.getFontSize()) / 2;
        const tituloY = logoY + 30; // Ajustar la posición Y debajo del logo y el texto
        pdf.text(titulo, tituloX, tituloY);

        // Añadir la fecha actual en el encabezado
        pdf.setFontSize(12);
        pdf.text(`Fecha: ${currentDate}`, 10, tituloY + 10); // Fecha debajo del título

        // Ajustar la imagen de la gráfica
        const yPosition = tituloY + 20; // Espacio debajo del título para la gráfica
        const imgWidth = pdf.internal.pageSize.getWidth() - 20; // Ancho del PDF
        const imgHeight = (input.offsetHeight * imgWidth) / input.offsetWidth;
        pdf.addImage(imgData, "PNG", 10, yPosition, imgWidth, imgHeight);

        // Guardar el PDF
        pdf.save("GraficasAdmin.pdf");
        setBotonDescarga(false);
      })
      .catch((error) => {
        console.error("Error al capturar la gráfica:", error);
        alert("Ocurrió un error al capturar la gráfica.");
      });
  };

  botonDescarga &&
    Swal.fire({
      title: "¿Desea descargarlo?",
      icon: "question",
      confirmButtonText: "Aceptar",
      showCloseButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        descargarGrafica();
      } else {
        setBotonDescarga(false);
      }
    });


  return (
    <>
      {isAuthenticated && user.rol_usuario === "Administrador" ? (
        <div>
          <Navbar
            item1="Inicio"
            item2="Reportes"
            item3="Graficas"
            ruta1="/inicioAdmin"
            ruta2="/ReportesAdmin"
            color3="activo"
            OpenPerfil={true}
          />

          {/* Filtros Avanzados */}
          <form className="flex flex-col [@media(max-width:425px)]:px-12 md:flex-row sm:px-10 gap-4 justify-center mt-6 mb-10">
            <div className="flex flex-col w-full md:w-auto">
              <label
                htmlFor="jornada"
                className="text-gray-600 mb-1 opacity-50"
              >
                Jornada
              </label>
              <select
                id="jornada"
                className="bg-white p-3 border border-gray-300 rounded-lg w-full"
                value={selectedJornada}
                onChange={(e) => setSelectedJornada(e.target.value)}
              >
                <option value="Todos">Todos</option>
                <option value="Mañana">Mañana</option>
                <option value="Tarde">Tarde</option>
                <option value="Noche">Noche</option>
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
                id="personas"
                className="bg-white p-3 border border-gray-300 rounded-lg w-full"
                value={tipoPersona}
                onChange={(e) => setTipoPersona(e.target.value)}
              >
                <option value="Todos">Todos</option>
                <option value="Aprendiz">Aprendiz</option>
                <option value="Instructor">Instructor</option>
                <option value="PersonalAseo">Personal Aseo</option>
              </select>
            </div>

            {tipoPersona === "Aprendiz" && (
              <div className="flex flex-col w-full md:w-auto">
                <label
                  htmlFor="ficha"
                  className="text-gray-600 mb-1 opacity-50"
                >
                  Ficha
                </label>
                <select
                  id="ficha"
                  className="bg-white p-3 border border-gray-300 rounded-lg w-full"
                  value={selectedFicha}
                  onChange={(e) => setSelectedFicha(e.target.value)}
                >
                  <option value="Todos">Todos</option>
                  <option value="2669756">2669756</option>
                  <option value="2669723">2669723</option>
                  <option value="2669723">2669723</option>
                  <option value="2669723">2669723</option>
                  <option value="2669723">2669723</option>
                </select>
              </div>
            )}

            <div className="flex flex-col w-full md:w-auto">
              <label htmlFor="Tiempo" className="text-gray-600 mb-1 opacity-50">
                Tiempo
              </label>
              <select
                id="Tiempo"
                className="bg-white p-3 border border-gray-300 rounded-lg w-full"
                value={selectedTiempo}
                onChange={(e) => setSelectedTiempo(e.target.value)}
              >
                <option value="Semanal">Semanal</option>
                <option value="Mensual">Mensual</option>
              </select>
            </div>

            {/* <div className="flex flex-col w-full md:w-auto">
              <label
                htmlFor="fechaInicio"
                className="text-gray-600 mb-1 opacity-50"
              >
                Fecha de Inicio
              </label>
              <input
                type="date"
                id="fechaInicio"
                className="bg-white p-3 border border-gray-300 rounded-lg w-full"
                value={fechaInicio}
                onChange={(e) => setfechaInicio(e.target.value)}
              />
            </div>
            <div className="flex flex-col w-full md:w-auto">
              <label
                htmlFor="FechaFin"
                className="text-gray-600 mb-1 opacity-50"
              >
                Fecha de Fin
              </label>
              <input
                type="date"
                id="FechaFin"
                className="bg-white p-3 border border-gray-300 rounded-lg w-full"
                value={fechaFin}
                onChange={(e) => setFechaFin(e.target.value)}
              />
            </div> */}
          </form>

          {/* Botón de Descarga */}
          <div className="flex justify-center mt-10">
            <button
              onClick={() => setBotonDescarga(true)}
              className="btn bg-blue-500 text-white p-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
            >
              Descargar Reporte
            </button>
          </div>

          {/* Indicadores Clave de Rendimiento (KPIs) */}
          <div id="grafica-container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
              <div className=" kpi-card bg-blue-500 text-white p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold">Total {tipoPersona}</h3>
                <p className="text-3xl font-bold">
                  {users.length}
                  {/* {filteredData.reduce((acc, curr) => acc + curr.cantidad, 0)} */}
                </p>
              </div>
              <div className="kpi-card bg-green-500 text-white p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold">Promedio por Día</h3>
                <p className="text-3xl font-bold">
                  {(
                    filteredData.reduce((acc, curr) => acc + curr.cantidad, 0) /
                    (filteredData.length || 1)
                  ).toFixed(2)}
                </p>
              </div>
              <div className="kpi-card bg-yellow-500 text-white p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold">Día con Mayor Entrada</h3>
                <p className="text-3xl font-bold">
                  26/09/2024 (
                  {filteredData.reduce(
                    (max, curr) => (curr.cantidad > max ? curr.cantidad : max),
                    0
                  )}
                  )
                </p>
              </div>
            </div>

            <main className="p-4 mb-40 [@media(max-width:425px)]:mb-96 mt-7">
              <div className="charts grid gap-4 md:grid-cols-2 mb-10">
                <div className="chart-container p-2  bg-white rounded-lg shadow-md">
                  <ResponsiveContainer width="100%" height={300}>
                    <h1>Jornada: {selectedJornada}</h1>
                    {selectedTiempo == "Semanal" ? (
                      <h1 className="mb-4">Mes: Septiembre</h1>
                    ) : null}

                    <BarChart
                      data={filteredData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey={selectedTiempo}
                        label={{
                          value: selectedTiempo,
                          position: "insideBottom",
                          offset: -2,
                        }}
                      />
                      <YAxis
                        dataKey={tipoPersona}
                        label={{
                          value: tipoPersona,
                          angle: -90,
                          position: "insideLeft",
                        }}
                      />
                      <Tooltip cursor={{ fill: "rgba(0, 0, 0, 0.1)" }} />
                      <Legend />
                      <Bar
                        dataKey={tipoPersona}
                        fill="#82ca9d"
                        animationDuration={1500}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="chart-container p-2 bg-white rounded-lg shadow-md">
                  <ResponsiveContainer width="100%" height={400}>
                    <PieChart>
                      <Pie
                        data={filteredData}
                        dataKey={tipoPersona}
                        nameKey={selectedTiempo}
                        outerRadius={100}
                        fill="#8884d8"
                        label
                      >
                        {filteredData.map((entry, index) => (
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
          </div>

          <div className="mt-80">
            <Footer />
          </div>
        </div>
      ) : (
        <p className="text-red-500">Error: Página no encontrada.</p>
      )}
    </>
  );
};

export default GraficasAdmin;

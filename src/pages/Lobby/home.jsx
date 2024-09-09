import React, { useEffect } from "react";
import NavbarInicio from "../../components/NavbarLobby/NavbarInicio";
import foto from "../../../public/img/Reconocimiento Facial.webp";
import Footer from "../../components/Footer/Footer";
import Swal from "sweetalert2";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { isAuthenticated, extraerUserStorege } = useAuth();
  const navegar = useNavigate();

  useEffect(() => {
    const checarRol = () => {
      if (isAuthenticated) {
        const userStorage = extraerUserStorege();
        if (userStorage) {
          switch (userStorage.rol_usuario) {
            case "Instructor":
              navegar("/inicioInstructor");
              break;
            case "Administrador":
              navegar("/inicioAdmin");
              break;
            case "Guardia de seguridad":
              navegar("/InicioGuardia");
              break;
            default:
              Swal.fire({
                title: "Rol no reconocido",
                text: `${dataRol} no es un rol reconocido`,
                icon: "warning",
                confirmButtonText: "OK",
              });
              break;
          }
        }
      }
    };
    checarRol();
  }, [isAuthenticated]);

  return (
    <div>
      <NavbarInicio
        item1="Nuestros Servicios"
        item2="Sobre la App"
        item3=""
        ruta1="#nuestros-servicios"
        ruta2="#sobre-la-app"
        ruta3=""
        color=""
      />

      <main className="p-8 max-w-5xl mx-auto">
        <section className="mb-12 flex flex-col md:flex-row items-center">
          <div className=" bg-white-400  w-full md:w-1/2 mb-6 md:mb-0">
            <img
              src={foto}
              alt="Reconocimiento"
              className="object-cover w-full h-65 rounded-lg shadow-lg"
            />
          </div>

          <div className="w-full md:w-1/2 md:pl-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">
              Sobre Nosotros
            </h1>
            <p className="text-lg text-gray-700">
              SENAuthenticator es una aplicación de Reconocimiento Facial con IA
              para tener un control en la verificación de las personas que
              entran a las instalaciones del SENA Alto Cauca.
            </p>
          </div>
        </section>
        <section id="nuestros-servicios" className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Nuestros Servicios
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-green-300 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Reconocimiento Facial
              </h3>
              <p className="text-gray-700">
                Utilizamos tecnología avanzada de reconocimiento facial para
                garantizar la seguridad en nuestras instalaciones.
              </p>
            </div>
            <div className="p-6 bg-green-300 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Monitoreo en Tiempo Real
              </h3>
              <p className="text-gray-700">
                Monitorea en tiempo real las entradas y salidas, con alertas
                inmediatas ante cualquier irregularidad.
              </p>
            </div>
            <div className="p-6 bg-green-300 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Reportes Detallados
              </h3>
              <p className="text-gray-700">
                Genera reportes detallados de todas las actividades para un
                seguimiento exhaustivo.
              </p>
            </div>
          </div>
        </section>

        <section id="sobre-la-app" className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Sobre la App
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-green-300 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                ¿Qué es SENAuthenticator?
              </h3>
              <p className="text-gray-700">
                SENAuthenticator es una aplicación innovadora diseñada para
                gestionar y mejorar la seguridad en las instalaciones del SENA
                Alto Cauca. Utilizando inteligencia artificial y tecnologías
                avanzadas de reconocimiento facial, la aplicación permite un
                control de acceso eficiente y seguro.
              </p>
            </div>
            <div className="p-6 bg-green-300 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Características Principales
              </h3>
              <ul className="list-disc list-inside text-gray-700">
                <li>Autenticación facial rápida y precisa.</li>
                <li>Monitoreo en tiempo real de entradas y salidas.</li>
                <li>Generación de reportes detallados.</li>
                <li>Interfaz intuitiva y fácil de usar.</li>
                <li>
                  Seguridad mejorada para todas las personas que ingresan a las
                  instalaciones.
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;

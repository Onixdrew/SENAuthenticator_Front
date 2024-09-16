import React, { useEffect, useState } from "react";
import NavbarInicio from "../../components/NavbarLobby/NavbarInicio";
import foto from "../../../public/img/Reconocimiento Facial.webp";
import Footer from "../../components/Footer/Footer";
import Swal from "sweetalert2";
import { useAuth } from "../../Context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import Register from "../../components/Register/Register";

const Home = () => {
  const { isAuthenticated, user } = useAuth();
  const navegar = useNavigate();
  const [abrirRegister, setAbrirRegister] = useState(false);

  useEffect(() => {
    const checarRol = () => {
      if (isAuthenticated) {
        if (user) {
          switch (user.rol_usuario) {
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
                title: "No estas logueado",
                text: "Inicia sesión",
                icon: "info",
                confirmButtonText: "OK",
              });
              break;
          }
        }
      }
    };
    checarRol();
  }, [isAuthenticated]);

  // Función para abrir el modal de registro
  const abrirModal = (e) => {
    setAbrirRegister(e);
  };

  return (
    <div>
      {abrirRegister && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white md:max-w-2xl max-w-4xl mx-auto p-8 rounded-lg shadow-lg lg:max-w-6xl max-h-[90vh] overflow-auto">
            <Register cerrarModal={abrirModal} />
          </div>
        </div>
      )}
      <div className="sticky top-0 z-40">
        <NavbarInicio
          item1="Nuestros Servicios"
          item2="Sobre la App"
          item3="Testimonios"
          ruta1="#nuestros-servicios"
          ruta2="#sobre-la-app"
          ruta3="#testimonios"
          color=""
          abrirModal={abrirModal}
        />
      </div>

      <main className="">
        <section className="  mb-12 py-10  flex justify-center items-center w-full ">
          <div className="max-w-[80%] flex  justify-center items-center">
            <div>
              <h1 className="text-7xl font-bold [@media(max-width:425px)]:text-3xl text-gray-900 mb-10">
                Bienvenido a SENAuthenticator
              </h1>
              <p className="text-lg text-gray-700 mb-8">
                Nuestra misión es ofrecer una solución de seguridad avanzada con
                tecnología de reconocimiento facial para proteger tus
                instalaciones y asegurar un control de acceso eficiente.
              </p>
            </div>
            <figure className="h-full [@media(max-width:1024px)]:hidden  flex justify-center items-end">
              <div className='relative w-full h-full flex justify-center items-center after:absolute after:content-[""] after:bg-green-500 after:w-[90%] after:h-[110%] z-10 after:z-[-1] after:top-[-3%] after:left-20 after:rounded-custom-border'>
                <img
                  src={foto}
                  alt="Reconocimiento Facial en el SENA"
                  className="object-cover w-[80%] h-[80%]"
                />
              </div>
            </figure>
          </div>
        </section>
        <section
          id="sobre-la-app"
          className="  bg-custom-gris  text-gray-900 mb-12 py-7 flex justify-center items-center w-full"
        >
          <div className="max-w-[80%] flex-col flex gap-16 justify-center items-center">
            <h2 className="text-7xl font-bold  mb-6 [@media(max-width:425px)]:text-3xl ">
              Sobre la App
            </h2>
            <div className=" grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className=" rounded-lg  rounded-lg p-6 rounded-lg hover:scale-105 transition-transform ">
                <h3 className=" text-2xl font-semibold text-gray-800 mb-4 text-center">
                  ¿Qué es SENAuthenticator?
                </h3>
                <p className=" text-gray-700 text-center">
                  SENAuthenticator es una aplicación innovadora diseñada para
                  gestionar y mejorar la seguridad en las instalaciones del SENA
                  Alto Cauca. Utilizando inteligencia artificial y tecnologías
                  avanzadas de reconocimiento facial, la aplicación permite un
                  control de acceso eficiente y seguro.
                </p>
              </div>
              <div className="p-6 rounded-lg hover:scale-105 transition-transform  rounded-lg  rounded-lg ">
                <h3 className=" text-2xl font-semibold text-gray-800 mb-4 text-center">
                  Características Principales
                </h3>
                <ul className=" list-disc list-inside text-gray-700">
                  <li>Autenticación facial rápida y precisa.</li>
                  <li>Monitoreo en tiempo real de entradas y salidas.</li>
                  <li>Generación de reportes detallados.</li>
                  <li>Interfaz intuitiva y fácil de usar.</li>
                  <li>
                    Seguridad mejorada para todas las personas que ingresan a
                    las instalaciones.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section
          id="nuestros-servicios"
          className="  mb-12 py-7  flex justify-center items-center w-full"
        >
          <div className="max-w-[80%] gap-16 flex flex-col justify-center items-center">
            <h2 className="text-7xl font-bold [@media(max-width:425px)]:text-3xl text-gray-900 mb-6 ">
              Nuestros Servicios
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-lg hover:scale-105 transition-transform">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
                  Reconocimiento Facial
                </h3>
                <p className="text-center text-gray-700">
                  Utilizamos tecnología avanzada de reconocimiento facial para
                  garantizar la seguridad en nuestras instalaciones.
                </p>
              </div>
              <div className="p-6 rounded-lg  hover:scale-105 transition-transform">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
                  Monitoreo en Tiempo Real
                </h3>
                <p className="text-center text-gray-700">
                  Monitorea en tiempo real las entradas y salidas, con alertas
                  inmediatas ante cualquier irregularidad.
                </p>
              </div>
              <div className="p-6 rounded-lg  hover:scale-105 transition-transform">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
                  Reportes Detallados
                </h3>
                <p className="text-center text-gray-700">
                  Genera reportes detallados de todas las actividades para un
                  seguimiento exhaustivo.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="testimonios"
          className=" bg-custom-gris   mb-12 py-7  flex justify-center items-center w-full"
        >
          <div className="max-w-[80%] flex-col gap-16 flex justify-center items-center">
            <h2 className="text-7xl font-bold text-gray-900  mb-14 [@media(max-width:425px)]:text-3xl">
              Testimonios
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-lg hover:scale-105 transition-transform bg-white">
                <blockquote className="  text-lg text-gray-700 text-center">
                  "SENAuthenticator ha transformado la manera en que gestionamos
                  la seguridad en nuestras instalaciones. La integración y
                  precisión del reconocimiento facial son impresionantes."
                </blockquote>
                <cite className="block mt-4 font-semibold text-gray-900 text-center">
                  Pepito Pérez, Guarda de Seguridad
                </cite>
              </div>
              <div className="  hover:scale-105 transition-transform p-6 rounded-lg  bg-white">
                <blockquote className=" text-lg text-gray-700 text-center">
                  "La implementación de SENAuthenticator ha mejorado
                  significativamente la seguridad y la eficiencia en el control
                  de acceso en nuestra institución. ¡Altamente recomendado!"
                </blockquote>
                <cite className="block mt-4 font-semibold text-gray-900 text-center">
                  Emmanuel Castañeda, Coordinadora de Operaciones
                </cite>
              </div>
            </div>
          </div>
        </section>

       

        <section className=" py-7 flex mb-20 justify-center items-center w-full">
          <div className="max-w-[80%] flex flex-col gap-16 justify-center items-center">
            <h2 className="text-7xl font-bold text-gray-900 mb-10 [@media(max-width:425px)]:text-3xl">
              Últimas Noticias
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <article className="hover:scale-105 transition-transform p-6 rounded-lg border ">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
                  Actualización de Seguridad
                </h3>
                <p className="text-gray-700 text-center ">
                  Hemos lanzado una nueva actualización que mejora aún más la
                  precisión del reconocimiento facial y agrega nuevas
                  funcionalidades para una mayor seguridad.
                </p>
              </article>
              <article className="hover:scale-105 transition-transform p-6 rounded-lg border ">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
                  Nuevo Socio Estratégico
                </h3>
                <p className="text-gray-700 text-center ">
                  Estamos emocionados de anunciar nuestra colaboración con un
                  nuevo socio estratégico que ampliará nuestras capacidades y
                  ofrecerá más valor a nuestros clientes.
                </p>
              </article>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;

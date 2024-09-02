import React from "react";
import Navbar from "../../../components/Navbar/Navbar";
import  useAuth  from "../../../Context/AuthContext";

const Sobrenosotros = () => {

  // Traer rol de la base de datos del usuario para comprobar
  const rol3 = "Guardia de seguridad";
  const {isAuthenticated} = useAuth();
  
  return (
    <>
      {isAuthenticated && rol3 === "Guardia de seguridad" ? (
        <div className="min-h-screen bg-gray-100">
          <Navbar
            item1="Registro Facial"
            item2="Registro Personas"
            item3="Mas"
            ruta1="/InicioGuardia"
            ruta2="/ReconocimientoGuardia"
            ruta3="/Mas"
            color=""
          />

          <main className="p-8 max-w-5xl mx-auto">
            <section className="mb-12 flex flex-col md:flex-row items-center">
              <div className="w-full md:w-1/2 mb-6 md:mb-0">
                <img
                  src="https://apd-images.imgix.net/uploads/sites/2/2021/01/ramas_ia_1.jpg?auto=compress%2Cformat&crop=edges&fit=crop&ixlib=php-1.1.0&w=900&s=0655022506ec76e0f2e64d5735c1465f"
                  alt="Tecnología Avanzada"
                  className="object-cover w-full h-64 rounded-lg shadow-lg"
                />
              </div>
              <div className="w-full md:w-1/2 md:pl-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  Sobre Nosotros
                </h1>
                <p className="text-lg text-gray-700">
                  Bienvenido a la sección sobre nosotros. Aquí podrás conocer
                  más sobre nuestra empresa, nuestra misión, visión y valores.
                  Estamos dedicados a proporcionar un excelente servicio y a
                  innovar en el campo de la tecnología de reconocimiento facial.
                </p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-semibold text-gray-800 mb-4">
                Nuestra Misión
              </h2>
              <div className="flex items-center space-x-4">
                <img
                  src="https://www.imprentaonline.net/blog/wp-content/webpc-passthru.php?src=https://www.imprentaonline.net/blog/wp-content/uploads/DALL%C2%B7E-2023-10-16-10.41.49-Illustration-depicting-a-humanoid-robot-with-half-of-its-face-transparent-revealing-intricate-circuits-and-gears-inside.-The-robot-is-holding-a-light-1.png&nocache=1"
                  alt="Nuestra Misión"
                  className="w-32 h-32 object-cover rounded-full shadow-md"
                />
                <p className="text-base text-gray-600">
                  Nuestra misión es liderar la industria de la seguridad
                  mediante el uso de tecnologías avanzadas y ofrecer soluciones
                  efectivas para nuestros clientes.
                </p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-semibold text-gray-800 mb-4">
                Nuestra Visión
              </h2>
              <div className="flex items-center space-x-4">
                <img
                  src="https://hanwhavisionlatam.com/wp-content/uploads/2023/01/aplicaciones-de-camaras-e-inteligencia-artificial-en-retail-1110x555-1@2x.jpg"
                  alt="Nuestra Visión"
                  className="w-32 h-32 object-cover rounded-full shadow-md"
                />
                <p className="text-base text-gray-600">
                  Buscamos ser la empresa de referencia en soluciones de
                  reconocimiento facial a nivel global, destacándonos por
                  nuestra innovación y compromiso con la excelencia.
                </p>
              </div>
            </section>
          </main>

          <footer className="bg-gray-800 text-white text-center py-4">
            <p>© 2024 Nuestra Empresa. Todos los derechos reservados.</p>
          </footer>
        </div>
      ) : (
        <p className="text-red-500 text-center mt-4">
          Error: No tienes permiso para acceder a esta página.
        </p>
      )}
    </>
  );
};

export default Sobrenosotros;

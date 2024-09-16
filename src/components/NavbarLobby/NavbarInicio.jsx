import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Logo from "../../../public/img/Logo Reconocimiento Facial - Blanco.png";

const NavbarInicio = ({
  item1,
  item2,
  item3,
  ruta1,
  ruta2,
  ruta3,
  color,
  color2,
  color3,
  abrirModal,
}) => {
  // Estado para controlar la visibilidad del menú móvil
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Función para alternar el estado del menú móvil
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Función para manejar clics fuera del menú móvil
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  // Configurar el event listener para clics fuera del menú móvil
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Función para abrir el modal de registro
  const cerrarModal = (e) => {
    abrirModal(e);
  };

  return (
    <>
      <div className="flex w-full z-50 flex-col">
        <nav className="flex items-center justify-between border-b bg-[rgb(39,169,0)] p-4">
          <div className="flex items-center xl:ml-16">
            <img src={Logo} alt="Logo" className="w-12 text-black" />
            <h1 className="text-xl ml-2 font-medium text-white">
              SENAuthenticator
            </h1>
          </div>

          {/* Menu Desktop */}
          <div className="hidden md:flex gap-8 justify-center items-center">
            <a
              href={ruta1}
              className={`text-xl font-medium ${
                color === "activo" ? "text-red-700" : "text-white"
              } hover:text-green-800`}
            >
              {item1}
            </a>
            <a
              href={ruta2}
              className={`text-xl font-medium ${
                color2 === "activo" ? "text-red-700" : "text-white"
              } hover:text-green-800`}
            >
              {item2}
            </a>
            <a
              href={ruta3}
              className={`text-xl font-medium ${
                color3 === "activo" ? "text-red-700" : "text-white"
              } hover:text-green-800`}
            >
              {item3}
            </a>
          </div>

          {/* Botones */}
          <div className="hidden md:flex gap-4">
            <Link to="/Login">
              <button className="btn rounded-box">
                Iniciar Sesión
              </button>
            </Link>
            <button
              className="btn rounded-box "
              onClick={() => cerrarModal(true)}
            >
              Registrarse
            </button>
          </div>

          {/* Menu Mobile */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-white btn btn-ghost">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>

          {isMenuOpen && (
            <div
              ref={menuRef}
              className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg"
            >
              <a
                href={ruta1}
                className="block px-4 py-2 text-lg font-medium text-gray-800 hover:bg-gray-200"
                onClick={toggleMenu}
              >
                {item1}
              </a>
              <a
                href={ruta2}
                className="block px-4 py-2 text-lg font-medium text-gray-800 hover:bg-gray-200"
                onClick={toggleMenu}
              >
                {item2}
              </a>
              <a
                href={ruta3}
                className="block px-4 py-2 text-lg font-medium text-gray-800 hover:bg-gray-200"
                onClick={toggleMenu}
              >
                {item3}
              </a>
            </div>
          )}
        </nav>

        {/* Mobile buttons */}
        {/* <div className="md:hidden flex gap-2 justify-center mt-4">
          <Link to="/Login">
            <button className="btn  rounded-box py-2 px-4 bg-blue-600 text-white  hover:bg-blue-700 ">
              Iniciar Sesión
            </button>
          </Link>
          <button
            className="btn rounded-box py-2 px-4 bg-blue-600 text-white  hover:bg-blue-700 "
            onClick={() => cerrarModal(true)}
          >
            Registrarse
          </button>
        </div> */}
      </div>
    </>
  );
};

export default NavbarInicio;

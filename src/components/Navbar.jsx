import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";


import Logo from "../../public/img/Logo Reconocimiento Facial - Blanco.png";

const Navbar = ({
  item1,
  item2,
  item3,
  ruta1,
  ruta2,
  ruta3,
  color,
  color2,
  color3,
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

  return (
    <>
      <div className="flex   w-full z-50 flex-col ">
        <nav className="flex  items-center justify-between border-b  bg-green-500 p-4">
          <div className="flex items-center xl:ml-16">
            <img src={Logo} alt="Logo" className="w-12 text-black" />
            <h1 className="text-xl ml-2 font-medium text-white">SENAuthenticator</h1>
          </div>

          {/* Menu Items for larger screens */}
          <div className="hidden md:flex space-x-14">
            <Link
              to={ruta1}
              className={`text-xl font-medium ${
                color == "activo" ? "text-red-700" : "text-white"
              } hover:text-green-800`}
            >
              {item1}
            </Link>
            <Link
              to={ruta2}
              className={`text-xl font-medium ${
                color2 == "activo" ? "text-red-700" : "text-white"
              } hover:text-green-800`}
            >
              {item2}
            </Link>
            <Link
              to={ruta3}
              className={`text-xl font-medium ${
                color3 == "activo" ? "text-red-700" : "text-white"
              } hover:text-green-800`}
            >
              {item3}
            </Link>
          </div>

          {/* Menu Button (Hamburger) for smaller screens */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-white">
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

          {/* Avatar (visible in all screens) */}
          <div className="hidden md:flex items-center mr-16">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle  avatar"
              >
                <div className="w-16 rounded-full">
                  <img
                    alt="Profile"
                    src="https://www.shutterstock.com/image-photo/young-police-caucasian-man-isolated-260nw-2391831079.jpg"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-white rounded-box z-[1] mt-3 w-52 p-2 shadow "
              >
                <li>
                  <Link className="justify-between ">Perfil</Link>
                </li>
                <li>
                  <Link>Configuraciòn</Link>
                </li>
                <li>
                  <Link>Salir</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div
          ref={menuRef}
          className={`md:hidden ${
            isMenuOpen ? "block" : "hidden"
          } bg-green-500 `}
        >
          <Link
            to={ruta1}
            className="block text-white py-2 p-4 hover:bg-green-600"
          >
            {item1}
          </Link>
          <Link
            to={ruta2}
            className="block text-white py-2 p-4 hover:bg-green-600"
          >
            {item2}
          </Link>
          <Link
            to={ruta3}
            className="block text-white py-2 p-4 hover:bg-green-600"
          >
            {item3}
          </Link>
          <Link
            to="#"
            className="block bg-green-600 text-white py-2 px-4 hover:bg-green-700"
          >
            Perfil
          </Link>
          <Link
            to="#"
            className="block bg-green-600 text-white py-2 px-4 hover:bg-green-700"
          >
            Configuraciòn
          </Link>
          <Link
            to="#"
            className="block bg-green-600 text-white py-2 px-4 hover:bg-green-700"
          >
            Salir
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;

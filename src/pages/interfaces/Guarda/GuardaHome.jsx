import React, { useRef, useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import foto from "../../../../public/img/emmanuel.jpg";
import "./media/guardia.css";
import ModalGuarda from "./modalGuarda";
import { useAuth } from "../../../Context/AuthContext";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../../../public/img/Logo Reconocimiento Facial - Blanco.png";

const Admin = () => {
  const { isAuthenticated, user } = useAuth();
  const videoRef = useRef(null);
  const sidebarRef = useRef(null);
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cameraActive, setCameraActive] = useState(true); // Estado para activar/desactivar la cámara
  const [stream, setStream] = useState(null); // Estado para almacenar el stream de la cámara

  const { cerrarSesion } = useAuth();

  useEffect(() => {
    localStorage.setItem("lastRoute", location.pathname);
  }, [location]);

  // Función para iniciar la cámara
  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
      });
      setStream(mediaStream); // Guardar el stream para poder detenerlo
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error("Error al acceder a la cámara:", error);
    }
  };

  // Función para detener la cámara
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  // Efecto para manejar el encendido/apagado de la cámara
  useEffect(() => {
    if (cameraActive) {
      startCamera();
    } else {
      stopCamera();
    }

    return () => {
      stopCamera(); // Asegurarse de apagar la cámara al desmontar el componente
    };
  }, [cameraActive]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarOpen(false);
      }
    };

    if (sidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarOpen]);

  return (
    <>
      {isAuthenticated && user.rol_usuario === "Guardia de seguridad" ? (
        <div className="relative flex flex-col min-h-screen">
          {!sidebarOpen && (
            <button
              className="absolute top-4 left-4 z-20 "
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <FaBars size={30} />
            </button>
          )}

          {/* Sidebar */}
          <div
            ref={sidebarRef}
            className={`fixed inset-y-0 left-0 transform ${
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-300 ease-in-out bg-gray-900 bg-opacity-80 p-4 w-64 z-10 shadow-lg`}
          >
            <div className="text-white text-center mt-4 lg:mt-10 ">
              <div className="flex items-center flex-col">
                <img src={Logo} alt="Logo" className="w-12" />
                <h1 className="text-xl font-medium">SENAuthenticator</h1>
              </div>

              <ul className="space-y-7 mt-16 text-lg lg:mt-32 lg:text-xl lg:space-y-10">
                <li>
                  <a href="/InicioGuardia" className="text-gray-400">
                    Registro Facial
                  </a>
                </li>
                <li>
                  <a
                    href="/ReconocimientoGuardia"
                    className="text-gray-300 hover:text-[rgb(39,169,0)]"
                  >
                    Registro Personas
                  </a>
                </li>
                <li>
                  <a
                    href="/HistorialUser"
                    className="text-gray-300 hover:text-[rgb(39,169,0)]"
                  >
                    Historial
                  </a>
                </li>
                <li>
                  <button
                    onClick={cerrarSesion}
                    className="btn mt-72 w-full hover:text-[rgb(39,169,0)]"
                  >
                    Cerrar Sesión
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex p-4 gap-4 justify-between">
            {/* Sección de cámara con toggle */}
            <div className="camara p-4 w-2/3 relative">
              <div className="flex justify-end items-center mb-2">
                <label className="flex items-center  gap-2">
                  <span className="text-sm">Activar cámara</span>
                  <input
                    type="checkbox"
                    checked={cameraActive}
                    onChange={() => setCameraActive(!cameraActive)}
                    className="toggle toggle-success"
                  />
                </label>
              </div>
              <div className="relative w-full h-full shadow-lg rounded-lg overflow-hidden border border-gray-100">
                {cameraActive ? (
                  <video
                    ref={videoRef}
                    autoPlay
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-300">
                    <p className="text-gray-500">Cámara desactivada</p>
                  </div>
                )}
              </div>
            </div>

            {/* Tarjeta de información del usuario */}
            <div class="p-4 w-4/12 shadow-xl border rounded-lg bg-white flex flex-col items-center">
              <div class="flex flex-col items-center ">
                <p class="text-gray-600 font-semibold">Aprendiz</p>
                <div class="w-48 h-48 mb-2 border rounded-box">
                  <img class="zoom-img" src={foto} alt="Foto de usuario" />
                </div>
                <h2 class="text-xl font-semibold  text-gray-800">
                  Emmanuel Castañeda
                </h2>
                <p class="text-gray-600">Programa: ADSO</p>
                <p class="text-gray-600">Ficha: 2669742</p>
              </div>

              {/* Información de objetos */}
              <div class="mt-4 w-full bg-gray-100 p-4 rounded-lg">
                <h3 class="text-lg font-medium mb-4 text-gray-700">
                  Objetos asociados
                </h3>
                <div class="flex items-center gap-4 p-4 border border-gray-300 rounded-lg bg-white">
                  <div class=" w-20 h-20">
                    <img
                      src="https://e7.pngegg.com/pngimages/289/417/png-clipart-laptop-hewlett-packard-computer-monitors-graphy-laptop-electronics-netbook.png"
                      alt="Objeto"
                      class="zoom-img"
                    />
                  </div>
                  <div class="flex flex-col  gap-1">
                    <span class="text-gray-600 text-sm">
                      Objeto: Laptop ACER
                    </span>
                    <span class="text-gray-600 text-sm">Serial: DE34021</span>
                    <span class="text-gray-600 text-sm">
                      Descripción: color Gris
                    </span>
                  </div>
                </div>
                <button
                  class="bg-gray-200 text-black px-4 py-2 mt-4 rounded hover:bg-gray-300 w-full"
                  onClick={() =>
                    document.getElementById("my_modal_1").showModal()
                  }
                >
                  Más objetos
                </button>
              </div>
            </div>
          </div>

          {/* Modal */}
          <ModalGuarda />
        </div>
      ) : (
        <p className="text-red-500 text-center mt-4">
          Error: Página no encontrada.
        </p>
      )}
    </>
  );
};

export default Admin;

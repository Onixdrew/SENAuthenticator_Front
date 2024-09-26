import React, { useRef, useEffect, useState } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import foto from "../../../../public/img/emmanuel.jpg";
import "./media/guardia.css";
import ModalGuarda from "./modalGuarda";
import { useAuth } from "../../../Context/AuthContext";
import { useLocation } from "react-router-dom";
import Logo from "../../../../public/img/Logo Reconocimiento Facial - Blanco.png";

const GuardaHome = () => {
  const { isAuthenticated, user } = useAuth();
  const videoRef = useRef(null);
  const location = useLocation(); // Obtiene la ruta actual
  const [cameraActive, setCameraActive] = useState(false); // Estado para manejar la cámara

  // Almacenar la ruta actual en localStorage al cargar el componente
  useEffect(() => {
    localStorage.setItem("lastRoute", location.pathname);
  }, [location]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error al acceder a la cámara:", error);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
    }
  };

  useEffect(() => {
    if (cameraActive) {
      startCamera();
    } else {
      stopCamera();
    }
    // Limpiar el stream al desmontar el componente
    return () => stopCamera();
  }, [cameraActive]);

  return (
    <>
      {isAuthenticated && user.rol_usuario === "Guardia de seguridad" ? (
        <div className="flex flex-col min-h-screen">
          <Navbar
            item1="Registro Facial"
            item2="Registro Personas"
            item3="Informes"
            ruta1="/InicioGuardia"
            ruta2="/ReconocimientoGuardia"
            ruta3="/Informes"
            color=""
          />

          <div className="flex p-4 gap-4 justify-between">
            {/* Sección de cámara con toggle */}
            <div className="camara p-4 w-2/3 relative">
              <div className="flex justify-end items-center mb-2">
                <label className="flex items-center gap-2">
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
                  <img
                    class="zoom-img"
                    src={foto}
                    alt="Foto de usuario"
                  />
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
                    <span class="text-gray-600 text-sm">Objeto: Laptop ACER</span>
                    <span class="text-gray-600 text-sm">Serial: DE34021</span>
                    <span class="text-gray-600 text-sm">Descripción: color Gris</span>
                  </div>

                  <button
                    className="bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300"
                    onClick={() =>
                      document.getElementById("my_modal_1").showModal()
                    }
                  >
                    Mis objetos
                  </button>
                </div>
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

export default GuardaHome;

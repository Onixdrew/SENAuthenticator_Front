import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import Swal from "sweetalert2";

function CapturaFacial({ datos, cerrarModalCamara }) {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [abrirCamara, setAbrirCamara] = useState(false);
  const [registroExitoso, setRegistroExitoso] = useState(false);
  const [mostrarBotonAceptar, setMostrarBotonAceptar] = useState(false);
  const [fotoCapturada, setFotoCapturada] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (abrirCamara) {
      startCamera();
      return () => stopCamera();
    }
  }, [abrirCamara]);

  const startCamera = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        streamRef.current = stream;
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      })
      .catch((err) => {
        console.error("Error al acceder a la cámara: ", err);
        setError("No se pudo acceder a la cámara");
      });
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
  };

  const captureImage = () => {
    if (canvasRef.current && videoRef.current) {
      const context = canvasRef.current.getContext("2d");
      canvasRef.current.width = 800;  // Tamaño más grande
      canvasRef.current.height = 600;
      context.drawImage(
        videoRef.current,
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );

      canvasRef.current.toBlob((blob) => {
        const newFile = new File([blob], "face.jpg", { type: "image/jpeg" });
        
        console.log(`Esta es la foto: ${JSON.stringify(newFile)}`)
        
        setFile(newFile);
        setFotoCapturada(URL.createObjectURL(blob)); // Guardar la previsualización
        setMostrarBotonAceptar(true);
      }, "image/jpeg");
    }
  };


  const retakePhoto = () => {
    setFotoCapturada(null); // Limpiar la previsualización
    setMostrarBotonAceptar(false); // Ocultar botón de aceptar hasta nueva captura
    startCamera(); // Reiniciar la cámara
  };

  const submitData = async () => {
    try {
      if (!file || !datos) {
        setError("Faltan datos o no se ha capturado una imagen.");
        return;
      }

      const formData = new FormData();
      formData.append("nombre_completo", datos.nombre);
      formData.append("numero_documento", datos.numID);
      formData.append("face_register", file);

      const response = await axios.post(
        "registro-facial/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        setRegistroExitoso(true);
        cerrarModalCamara(false);
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      Swal.fire({
        title: "Error en el servidor",
        text: error.message,
        icon: "error",
      });
      setError(
        error.response ? error.response.data : { message: error.message }
      );
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <div className="text-center">
          {!fotoCapturada ? (
            <h2 className="text-3xl font-semibold mb-6 text-gray-800">
              Toma una foto de tu rostro en un lugar iluminado
            </h2>
          ) : (
            <h2 className="text-3xl font-semibold mb-4 text-gray-800">
              Revisa tu Foto
            </h2>
          )}

          {!fotoCapturada && !abrirCamara && (
            <button
              className="btn bg-blue-500 text-white px-6 py-3 shadow-lg hover:bg-blue-600 transition-all duration-300"
              onClick={() => setAbrirCamara(true)}
            >
              Empezar
            </button>
          )}
        </div>

        {abrirCamara && !fotoCapturada && (
          <div className="flex flex-col items-center mt-6">
            <video
              ref={videoRef}
              style={{ width: "600px", height: "450px" }} // Aumentar tamaño
              className="border-2 border-gray-300 rounded-lg mb-6 shadow-md"
            />
            <canvas
              ref={canvasRef}
              style={{ display: "none" }}
              width="800"
              height="600"
            ></canvas>
            <button
              className="btn bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-600 transition-all duration-300 mt-4"
              onClick={captureImage}
            >
              Capturar Foto
            </button>
          </div>
        )}

        {fotoCapturada && (
          <div className="mt-6">
            <img
              src={fotoCapturada}
              alt="Foto Capturada"
              className="mb-4 border-2 border-gray-300 rounded-lg shadow-md"
            />
            <div className="flex justify-center gap-4">
              <button
                className="btn bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-600 transition-all duration-300"
                onClick={submitData}
              >
                Enviar
              </button>
              <button
                className="btn bg-yellow-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-yellow-600 transition-all duration-300"
                onClick={retakePhoto}
              >
                Tomar otra foto
              </button>
            </div>
          </div>
        )}

        {error && (
          <div className="text-red-500 mt-4 text-center">
            Error: {error.message || error}
          </div>
        )}

        {registroExitoso && (
          <p className="text-green-500 mt-4 text-center">
            Registro exitoso. ¡Gracias por registrarte!
          </p>
        )}
      </div>
    </div>
  );
}

export default CapturaFacial;

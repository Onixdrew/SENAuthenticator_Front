import React, { useRef, useEffect, useState } from "react";
import * as faceapi from "face-api.js";

const CameraComponent = ({ cameraActive }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const intervalRef = useRef(null); // Usar ref para almacenar el ID del intervalo

  // Cargar modelos de face-api.js cuando el componente se monta
  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = "/models"; // Ruta de los modelos pre-entrenados de face-api.js
      // Carga del modelo SSD Mobilenet
      await faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL);
      setIsModelLoaded(true);
    };

    loadModels();
  }, []);

  // Iniciar la cámara cuando los modelos estén cargados
  useEffect(() => {
    if (isModelLoaded && cameraActive) {
      startCamera();
    } else {
      stopCamera();
    }
  }, [isModelLoaded, cameraActive]);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {},
      });
      videoRef.current.srcObject = mediaStream;

      // Ajusta el tamaño del canvas al tamaño del video
      videoRef.current.onloadedmetadata = () => {
        videoRef.current.play(); // Asegúrate de que el video se reproduzca
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
      };
    } catch (error) {
      console.error("Error al acceder a la cámara:", error);
    }
  };

  const stopCamera = () => {
    // Detener el intervalo de detección si está activo
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    // Detener el flujo de video
    const stream = videoRef.current?.srcObject;
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
    }
    console.log("Cámara detenida");
  };

  // Detectar rostros en tiempo real
  const handleVideoPlay = async () => {
    const canvas = canvasRef.current;

    // Espera hasta que las dimensiones sean válidas
    if (!videoRef.current.videoWidth || !videoRef.current.videoHeight) {
      return;
    }

    const displaySize = {
      width: videoRef.current.videoWidth,
      height: videoRef.current.videoHeight,
    };
    faceapi.matchDimensions(canvas, displaySize);

    intervalRef.current = setInterval(async () => {
      // Esperar hasta que las dimensiones sean válidas antes de la detección
      if (!videoRef.current.videoWidth || !videoRef.current.videoHeight) {
        return;
      }

      const detections = await faceapi.detectAllFaces(
        videoRef.current,
        new faceapi.SsdMobilenetv1Options({ minConfidence: 0.5 }) // Ajustar la confianza mínima
      );

      const resizedDetections = faceapi.resizeResults(detections, displaySize);
      canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

      // Dibuja los rectángulos de los rostros detectados en el video
      faceapi.draw.drawDetections(canvas, resizedDetections);

      // Enviar la imagen del rostro al servidor
      // const faceImage = faceCanvas.toDataURL("image/jpeg");
      // sendFaceToServer(faceImage);

    }, 100);
  };
  

  // const sendFaceToServer = async (faceImage) => {
  //   try {
  //     await axios.post('http://localhost:5000/reconocimiento', {
  //       image: faceImage,
  //     });
  //     console.log('Rostro enviado al servidor');
  //   } catch (error) {
  //     console.error('Error al enviar la imagen del rostro:', error);
  //   }
  // };

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {cameraActive ? (
        <>
          <video
            ref={videoRef}
            onPlay={handleVideoPlay}
            autoPlay
            muted
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%", // Usar 100% del ancho del contenedor
              height: "100%", // Usar 100% de la altura del contenedor
              objectFit: "cover", // Mantener la relación de aspecto y cubrir el contenedor
              transform: "scaleX(-1)", // Efecto espejo
            }}
          />
          <canvas
            ref={canvasRef}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%", // Usar 100% del ancho del contenedor
              height: "100%", // Usar 100% de la altura del contenedor
              transform: "scaleX(-1)", // Efecto espejo
            }}
          />
        </>
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-300">
          <p className="text-gray-500">Cámara desactivada</p>
        </div>
      )}
    </div>
  );
};

export default CameraComponent;

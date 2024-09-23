import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CapturaFacial({ datos }) {
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const [abrirCamara, setAbrirCamara] = useState(false);
    const [registroExitoso, setRegistroExitoso] = useState(false); // Estado para mostrar el mensaje de éxito
    const [mostrarBotonAceptar, setMostrarBotonAceptar] = useState(false); // Estado para mostrar el botón de "Aceptar"
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const streamRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        startCamera();

        const captureTimeout = setTimeout(() => {
            captureImage();
        }, 5000);

        return () => {
            stopCamera();
            clearTimeout(captureTimeout);
        };
    }, []);

    const startCamera = () => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                streamRef.current = stream;
                videoRef.current.srcObject = stream;
                videoRef.current.play();
            })
            .catch(err => {
                console.error("Error al acceder a la cámara: ", err);
            });
    };

    const stopCamera = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
        }
    };

    const captureImage = () => {
        if (canvasRef.current && videoRef.current) {
            const context = canvasRef.current.getContext('2d');
            canvasRef.current.width = 640;
            canvasRef.current.height = 480;
            context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);

            canvasRef.current.toBlob((blob) => {
                const newFile = new File([blob], "face.jpg", { type: 'image/jpeg' });
                setFile(newFile);
                submitData(newFile); // Enviar la imagen capturada
            }, 'image/jpeg');
        }
    };

    const submitData = async (capturedFile) => {
        const nombreCompleto = localStorage.getItem('nombreCompleto');
        const numeroDocumento = localStorage.getItem('numeroDocumento');

        if (!capturedFile || !nombreCompleto || !numeroDocumento) {
            setError("Faltan datos. No se puede registrar.");
            return;
        }

        const formData = new FormData();
        formData.append('nombre_completo', nombreCompleto);
        formData.append('numero_documento', numeroDocumento);
        formData.append('face_register', capturedFile);

        try {
            await axios.post('http://localhost:8000/api/registroFacial/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Mostrar mensaje de éxito y el botón de aceptar después de 2 segundos
            setRegistroExitoso(true);
            setTimeout(() => {
                setMostrarBotonAceptar(true);
            }, 2000);
        } catch (err) {
            console.error("Error al enviar los datos:", err);
            setError(err.response ? err.response.data : { message: err.message });
        }
    };

    const handleAceptar = () => {
        navigate('/'); // Redirigir al home
    };



    return (
        <div>
            <h2>Captura Facial</h2>
            <button className='btn' onClick={setAbrirCamara(true)}>Empenzar</button>
            {abrirCamara && (
                <div>
                    <video ref={videoRef} style={{ width: '320px', height: '240px' }} />
                    <canvas ref={canvasRef} style={{ display: 'none' }} width="640" height="480"></canvas>
                </div>
            )}


            {error && <div style={{ color: 'red' }}>Error: {error.message || error}</div>}

            {registroExitoso && <p>Registro exitoso. ¡Gracias por registrarte!</p>}

            {mostrarBotonAceptar && (
                <button onClick={handleAceptar}>
                    Aceptar
                </button>
            )}
        </div>
    );
}

export default CapturaFacial;

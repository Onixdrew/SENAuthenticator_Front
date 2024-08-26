import React, { useRef, useEffect } from 'react';
import { useAuth } from '../../auth/authProvider';
import Navbar from '../../components/Navbar';
import foto from "../../../public/img/emmanuel.jpg";
import "./guardia.css";
import ModalGuarda from './modalGuarda';

const Admin = () => {
    const Autenticador = useAuth();
    const videoRef = useRef(null);
    const nombre = "Andres";

    useEffect(() => {
        const startCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (error) {
                console.error('Error al acceder a la cámara:', error);
            }
        };

        startCamera();

        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                videoRef.current.srcObject.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    return (
        <div className="flex flex-col"> 
            <Navbar
                item1="Inicio"
                item2="Registro Personas"
                item3="Mas"
                ruta1="/InicioGuardia"
                ruta2="/ReconocimientoGuardia"
                ruta3="/Mas"
                color=""
            />

            
            <div className="p-4">
                <h1 className="text-2xl font-bold text-left mb-4 inline-block">
                    Bienvenido {nombre}
                </h1>
            </div>

            <div className="flex p-4 gap-4 justify-between flex-grow">
                
                <div className="camara p-4 w-2/3">
                    <div className="relative w-full h-full shadow-lg rounded-lg overflow-hidden border border-gray-100">
                        <video ref={videoRef} autoPlay className="w-full h-full object-cover" />
                    </div>
                </div>

                
                <div className="p-4 w-4/12 shadow-lg rounded-lg bg-white flex-shrink-0 overflow-auto"> 
                    <div className="p-6 flex flex-col gap-8">
                        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">ROL</h2>
                        <form className="flex flex-col items-center gap-3">
                            <div className="flex justify-center w-40 h-40 mb-4"> 
                                <img
                                    className="w-auto h-auto max-w-full max-h-full text-center object-cover rounded border border-gray-300"
                                    src={foto}
                                    alt="Foto de usuario"
                                />
                            </div>
                            <div className="flex flex-col gap-3 items-center">
                                <label htmlFor="nombre" className="block text-gray-700 text-sm font-medium">
                                    Emmanuel Castañeda
                                </label>
                            </div>
                        </form>

                        
                        <div className="flex flex-col items-center gap-5">
                            <div className="flex items-center gap-4 p-4 border border-gray-300 rounded-lg bg-gray-100">
                                <img
                                    src="https://e7.pngegg.com/pngimages/289/417/png-clipart-laptop-hewlett-packard-computer-monitors-graphy-laptop-electronics-netbook.png"
                                    alt="Objeto"
                                    className="w-28 rounded border border-gray-300"
                                />
                                <div className="flex flex-col text-center gap-1">
                                    <span className="text-gray-600 text-sm">ACER</span>
                                    <span className="text-gray-600 text-sm">DE34021</span>
                                    <span className="text-gray-600 text-sm">Gris</span>
                                </div>
                            </div>

                            <button
                                className="bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300"
                                onClick={() => document.getElementById('my_modal_1').showModal()}
                            >
                                Más objetos
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <ModalGuarda />
        </div>
    );
}

export default Admin;

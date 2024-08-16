import React, { useRef, useEffect } from 'react';
import { useAuth } from '../../auth/authProvider';
import Navbar from '../../components/Navbar';
import foto from "../Guarda/emmanuel.jpg"

const Admin = () => {
    // Traer rol de la base de datos del usuario para comprobar
    const rol3 = "Guarda";

    const Autenticador = useAuth();
    const videoRef = useRef(null);

    useEffect(() => {
        // Intentar acceder a la cámara sin solicitar permiso explícito
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

        // Limpiar el stream al desmontar el componente
        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                videoRef.current.srcObject.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    return (
        <div className="flex flex-col  ">
            <Navbar
                item1="REGISTRO FACIAL"
                item2="REGISTRO PERSONAS"
                item3="MAS"
                ruta1="/InicioGuardia"
                ruta2="/ReconocimientoGuardia"
                ruta3="/Mas"
                color=""  
            />
            <div className='flex p-4 gap-4 '>
                {/* Camara */}
                <div className="lg:w-1/2 p-4 w-2/5">
                    <div className="relative w-full h-full shadow-lg rounded-lg overflow-hidden border-4 border-green-500">
                        <video ref={videoRef} autoPlay className="w-full h-full object-cover" />
                    </div>
                </div>

                <div>
                    
                </div>
                {/* Formulario */}

                <div className=" p-4 w-4/12 mt-5">
                    <div className="bg-white shadow-lg   rounded-lg p-6 mb-8">
                        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Usuario</h2>
                        <form className='flex items-center flex-col gap-3 '>
                            <div className='flex  justify-center w-40 h-90'>
                                <img className='w-auto h-auto max-w-full max-h-full  text-center object-cover rounded  border-gray-300' src={foto} alt="" />
                            </div>
                            <div className='flex flex-col gap-3 items-center'>
                                <div className="mb-4">
                                    <label htmlFor="nombre" className="block text-gray-700 text-sm font-medium mb-2">Emmanuel Castañeda</label>
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="rol" className="block text-gray-700 text-sm font-medium mb-2">Aprendiz</label>
                                </div>


                                <div className="mb-4">
                                    <label htmlFor="programa" className="block text-gray-700 text-sm font-medium mb-2">Analisis y desarrollo de software</label>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>´

                                {/* Objetos */}

                <div className="bg-white h-64 shadow-lg mt-36 rounded-lg p-2 w-1/4">
                    <div className="flex  flex-col gap-5 justify-center items-center">
                        <img src="https://e7.pngegg.com/pngimages/289/417/png-clipart-laptop-hewlett-packard-computer-monitors-graphy-laptop-electronics-netbook.png"
                            alt="Objeto" className="w-28 rounded border border-gray-300 mr-4" />
                        <div className="ml-4 flex flex-col text-center gap-3">
                            <span className="text-gray-700 text-lg font-medium block">Portatil Gris</span>
                            <span className="text-gray-600 text-sm block"> ACER</span>
                            <span className="text-gray-600 text-sm block"> DE34021</span>
                            <span className="text-gray-600 text-sm block">Emmanuel Castañeda</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Admin;


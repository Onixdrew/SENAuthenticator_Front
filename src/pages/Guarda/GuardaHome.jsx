import React, { useRef, useEffect } from 'react';
import { useAuth } from '../../auth/authProvider';
import Navbar from '../../components/Navbar';
import foto from "../Guarda/emmanuel.jpg"
import "./guardia.css"

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
                item1="Registro Facial"
                item2="Registro Personas"
                item3="Mas"
                ruta1="/InicioGuardia"
                ruta2="/ReconocimientoGuardia"
                ruta3="/Mas"
                color=""
            />
            <div className='flex p-4 gap-4 justify-between'>

                <div className="camara p-4 ">
                    <div className="relative w-full h-full shadow-lg rounded-lg overflow-hidden border-1 border-gray-100">
                        <video ref={videoRef} autoPlay className="w-full h-full object-cover" />
                    </div>
                </div>


                <div className=" p-4 w-4/12 shadow-lg  carta">
                    <div className="bg-white   rounded-lg p-6 mb-8 flex flex-col gap-8">
                        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center"> ROL </h2>
                        <form className='flex items-center flex-col gap-3 '>
                            <div className='flex  justify-center w-40 h-90'>
                                <img className='w-auto h-auto max-w-full max-h-full  text-center object-cover rounded  border-gray-300' src={foto} alt="" />
                            </div>
                            <div className='flex flex-col gap-3 items-center'>
                                <div className="mb-4">
                                    <label htmlFor="nombre" className="block text-gray-700 text-sm font-medium mb-2">Emmanuel Castañeda</label>
                                </div>
                            </div>
                        </form>

                        <div className="flex gap-5 justify-center items-center">
                            <img src="https://e7.pngegg.com/pngimages/289/417/png-clipart-laptop-hewlett-packard-computer-monitors-graphy-laptop-electronics-netbook.png"
                                alt="Objeto" className="w-28 rounded border border-gray-300 mr-4" />
                            <div className="ml-4 flex flex-col text-center gap-3">
                                {/* <span className="text-gray-700 text-lg font-medium block">Portatil Gris</span> */}
                                <span className="text-gray-600 text-sm block">ACER</span>
                                <span className="text-gray-600 text-sm block">DE34021</span>
                                <span className="text-gray-600 text-sm block">Gris</span>
                            </div>
                        </div>
                    </div>



                </div>





            </div>
        </div>
    );
}

export default Admin;


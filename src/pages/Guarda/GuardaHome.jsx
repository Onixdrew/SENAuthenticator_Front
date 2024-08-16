import React, { useRef, useEffect } from 'react';
import { useAuth } from '../../auth/authProvider';
import Navbar from '../../components/Navbar';

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
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <Navbar
                item1="Inicio"
                item2="REGISTRO FACIAL"
                item3="MAS"
                ruta1="/InicioGuardia"
                ruta2="/ReconocimientoGuardia"
                ruta3="/Mas"
                color=""
            />
            <div className="flex flex-col lg:flex-row w-full max-w-screen-lg mx-auto p-4 gap-8">
                {/* Sección de la cámara */}
                <div className="lg:w-1/2 p-4">
                    <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Bienvenido al registro facial</h1>
                    <div className="relative w-full h-80 shadow-lg rounded-lg overflow-hidden border-4 border-red-500">
                        <video ref={videoRef} autoPlay className="w-full h-full object-cover" />
                    </div>
                </div>

                
                <div className="lg:w-1/2 p-4">
                    <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">REGISTRO</h2>
                        <form>
                            <div className="mb-4">
                                <label htmlFor="nombre" className="block text-gray-700 text-sm font-medium mb-2">Nombre</label>
                                <input type="text" id="nombre" name="nombre" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="apellidos" className="block text-gray-700 text-sm font-medium mb-2">Apellidos</label>
                                <input type="text" id="apellidos" name="apellidos" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="rol" className="block text-gray-700 text-sm font-medium mb-2">Rol</label>
                                <input type="text" id="rol" name="rol" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="tipo_identificacion" className="block text-gray-700 text-sm font-medium mb-2">Tipo de Identificación</label>
                                <input type="text" id="tipo_identificacion" name="tipo_identificacion" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="numero_identificacion" className="block text-gray-700 text-sm font-medium mb-2">Número de Identificación</label>
                                <input type="text" id="numero_identificacion" name="numero_identificacion" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="programa" className="block text-gray-700 text-sm font-medium mb-2">Programa</label>
                                <input type="text" id="programa" name="programa" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="ficha" className="block text-gray-700 text-sm font-medium mb-2">Ficha</label>
                                <input type="text" id="ficha" name="ficha" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="centro_formacion" className="block text-gray-700 text-sm font-medium mb-2">Centro de Formación</label>
                                <input type="text" id="centro_formacion" name="centro_formacion" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                            </div>
                        </form>
                    </div>

                    
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <div className="flex items-center">
                            <img src="https://e7.pngegg.com/pngimages/289/417/png-clipart-laptop-hewlett-packard-computer-monitors-graphy-laptop-electronics-netbook.png" alt="Objeto" className="w-16 h-16 rounded-full border border-gray-300 mr-4" />
                            <div className="ml-4">
                                <span className="text-gray-700 text-lg font-medium block">Portatil Gris</span>
                                <span className="text-gray-600 text-sm block">Marca: ACER</span>
                                <span className="text-gray-600 text-sm block">Serie: DE34021</span>
                                <span className="text-gray-600 text-sm block">Nombre: Daniel</span>
                                <span className="text-gray-600 text-sm block">Apellidos: Astaiza</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Admin;


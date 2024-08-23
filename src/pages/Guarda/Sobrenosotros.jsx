import React from 'react';
import Navbar from '../../components/Navbar';
import foto from "../../../public/img/Reconocimiento Facial.webp"

const Sobrenosotros = () => {
    return (
        <div className="">
            <Navbar
                item1="Inicio"
                item2="Registro Personas"
                item3="Mas"
                ruta1="/InicioGuardia"
                ruta2="/ReconocimientoGuardia"
                ruta3="/Mas"
                color=""
            />

            <main className="p-8 max-w-5xl mx-auto">
                <section className="mb-12 flex flex-col md:flex-row items-center">
                    
                    <div className=" bg-gray-400  w-full md:w-1/2 mb-6 md:mb-0">
                        <img
                            src={foto}
                            alt="Reconocimiento"
                            className="object-cover w-full h-65 rounded-lg shadow-lg" 
                        />
                    </div>
                    
                    
                    <div className="w-full md:w-1/2 md:pl-8">
                        <h1 className="text-4xl font-bold text-gray-900 mb-8">Sobre Nosotros</h1>
                        <p className="text-lg text-gray-700">
                            SENAuthenticator es una aplicación de Reconocimiento Facial con IA para tener un control en la verificación de las personas que entran a las instalaciones del SENA Alto Cauca.
                        </p>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Sobrenosotros;

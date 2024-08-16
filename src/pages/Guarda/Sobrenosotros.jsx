import React from 'react';
import Navbar from '../../components/Navbar';

const Sobrenosotros = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar
                item1="Inicio"
                item2="REGISTRO FACIAL"
                item3="MAS"
                ruta1="/InicioGuardia"
                ruta2="/ReconocimientoGuardia"
                ruta3="/Mas"
                color="" 
            />

            <main className="p-8 max-w-4xl mx-auto">
                <section className="mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Sobre Nosotros</h1>
                    <p className="text-lg text-gray-700">
                        Bienvenido a la sección sobre nosotros. Aquí podrás conocer más sobre nuestra empresa, nuestra misión, visión y valores. Estamos dedicados a proporcionar un excelente servicio y a innovar en el campo de la tecnología de reconocimiento facial.
                    </p>
                </section>

                <section className="mb-12">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4">Nuestra Misión</h2>
                    <p className="text-base text-gray-600">
                        Nuestra misión es liderar la industria de la seguridad mediante el uso de tecnologías avanzadas y ofrecer soluciones efectivas para nuestros clientes.
                    </p>
                </section>

                <section className="mb-12">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4">Nuestra Visión</h2>
                    <p className="text-base text-gray-600">
                        Buscamos ser la empresa de referencia en soluciones de reconocimiento facial a nivel global, destacándonos por nuestra innovación y compromiso con la excelencia.
                    </p>
                </section>

                <section className="mb-12">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4">Valores</h2>
                    <ul className="list-disc list-inside text-base text-gray-600 space-y-2">
                        <li>Innovación</li>
                        <li>Compromiso</li>
                        <li>Excelencia</li>
                        <li>Integridad</li>
                    </ul>
                </section>
            </main>

            <footer className="bg-gray-800 text-white text-center py-4">
                <p>© 2024 Nuestra Empresa. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
};

export default Sobrenosotros;

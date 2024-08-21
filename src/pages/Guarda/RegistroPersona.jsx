import React from 'react';
import Navbar from '../../components/Navbar';

const Inicio = () => {
    return (
        <div className="min-h-screen bg-gray-100">

            <Navbar
                item1="Registro Facial"
                item2="Registro Personas"
                item3="Mas"
                ruta1="/InicioGuardia"
                ruta2="/ReconocimientoGuardia"
                ruta3="/Mas"
                color=""
            />

            {/* Main Content */}
            <div className="max-w-4xl mx-auto p-4 border border-gray-300 rounded-lg shadow-md mt-8 bg-white">
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
                    {/* Formulario de Registro */}
                    <div className="flex-1">
                        <h2 className="text-2xl font-semibold text-black mb-4 text-center">Formulario de Registro</h2>
                        <form className="space-y-4">
                            <div>
                                <label htmlFor="full-name" className="block text-sm font-medium text-gray-700">Nombres completos </label>
                                <input
                                    type="text"
                                    id="full-name"
                                    name="full-name"
                                    required
                                    className="mt-1 block w-full bg-white px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div>
                                <label htmlFor="id-doc" className="block text-sm font-medium text-gray-700">Documento de identificación</label>
                                <input
                                    type="text"
                                    id="id-doc"
                                    name="id-doc"
                                    required
                                    className="mt-1 block w-full bg-white px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div class="mb-4">
                                <label for="diligence" class="block text-sm font-medium text-gray-700">Diligencia a realizar</label>
                                <textarea
                                    id="diligence"
                                    name='diligence'
                                    rows="3"
                                    className="mt-1 block w-full  bg-white px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                ></textarea>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="w-full px-4 py-2 bg-green-600 text-white font-semibold rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                >
                                    Registrar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Inicio;

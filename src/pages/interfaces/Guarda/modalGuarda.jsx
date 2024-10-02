import React, { useState, useEffect } from 'react';

const ModalGuarda = () => {
    // Estado para manejar los objetos y el objeto seleccionado
    const [items, setItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);

    // Función para obtener los objetos desde la API
    const fetchItems = async () => {
        try {
            const response = await fetch('https://backendsenauthenticator.up.railway.app/api/objetos/');
            const data = await response.json();
            setItems(data); // Asumiendo que la respuesta es un array de objetos
        } catch (error) {
            console.error("Error fetching items:", error);
        }
    };

    // Cargar los objetos al inicio
    useEffect(() => {
        fetchItems();
    }, []);

    // Función para seleccionar un objeto
    const handleSelectItem = (item) => {
        setSelectedItem(item);
    };

    // Función para volver a la vista de lista
    const handleBackToModal = () => {
        setSelectedItem(null);
    };

    return (
        <div>
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box relative p-4">
                    {selectedItem ? (
                        <div>
                            <button
                                onClick={handleBackToModal}
                                className="absolute top-4 right-4 p-2 bg-gray-300 rounded-full text-gray-800 hover:bg-gray-400 focus:outline-none"
                                title="Volver a la lista"
                            >
                                <span className="">x</span> {/* Ícono de cerrar */}
                            </button>
                            <p className="text-center text-gray-600 mb-4">Este es tu objeto</p>
                            <div className="flex items-center gap-4 p-4 border border-gray-300 rounded-lg bg-gray-100">
                                <img
                                    src={selectedItem.foto_objeto}
                                    alt={selectedItem.model}
                                    className="w-28 rounded border border-gray-300"
                                />
                                <div className="flex flex-col text-center gap-1">
                                    <span className="text-gray-600 text-sm">{selectedItem.marca_objeto}</span>
                                    <span className="text-gray-600 text-sm">{selectedItem.modelo_objeto}</span>
                                    <span className="text-gray-600 text-sm">{selectedItem.descripcion_objeto}</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <h2 className='text-center text-black mb-4'>Estos son tus objetos registrados</h2>
                            {items.map(item => (
                                <div
                                    key={item.id}
                                    className="flex items-center gap-4 p-4 border border-gray-300 rounded-lg bg-gray-100 cursor-pointer"
                                    onClick={() => handleSelectItem(item)}
                                >
                                    <img
                                        src={item.foto_objeto}
                                        alt={item.model}
                                        className="w-28 rounded border border-gray-300"
                                    />
                                    <div className="flex flex-col text-center gap-1">
                                        <span className="text-gray-600 text-sm">{item.marca_objeto}</span>
                                        <span className="text-gray-600 text-sm">{item.modelo_objeto}</span>
                                        <span className="text-gray-600 text-sm">{item.descripcion_objeto}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300">salir</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default ModalGuarda;

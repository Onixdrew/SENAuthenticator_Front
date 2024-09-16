// import React from 'react';


// const ModalGuarda = () => {
//     return (
//         <div>
//             Open the modal using document.getElementById('ID').showModal() method
//             <dialog id="my_modal_1" className="modal">
//                 <div className="modal-box">
//                     <h2 className=' text-center text-black'>Estos son tus objestos registrados</h2>
//                     <div className="flex items-center gap-4 p-4 border border-gray-300 rounded-lg bg-gray-100">
//                         <img
//                             src="https://e7.pngegg.com/pngimages/289/417/png-clipart-laptop-hewlett-packard-computer-monitors-graphy-laptop-electronics-netbook.png"
//                             alt="Objeto"
//                             className="w-28 rounded border border-gray-300"
//                         />
//                         <div className="flex flex-col text-center gap-1">
//                             <span className="text-gray-600 text-sm">ACER</span>
//                             <span className="text-gray-600 text-sm">DE34021</span>
//                             <span className="text-gray-600 text-sm">Gris</span>
//                         </div>
//                     </div>
//                     <div className="flex items-center gap-4 p-4 border border-gray-300 rounded-lg bg-gray-100">
//                         <img
//                             src="https://www.madrigal.co/wp-content/uploads/d2240-8.jpg"
//                             alt="Objeto"
//                             className="w-28 rounded border border-gray-300"
//                         />
//                         <div className="flex flex-col text-center gap-1">
//                             <span className="text-gray-600 text-sm">DELL</span>
//                             <span className="text-gray-600 text-sm">XPS13</span>
//                             <span className="text-gray-600 text-sm">Negro</span>
//                         </div>
//                     </div>
//                     <div className="flex items-center gap-4 p-4 border border-gray-300 rounded-lg bg-gray-100">
//                         <img
//                             src="https://images.ecestaticos.com/QCn4Bh-vevoKsux6Cmjj1oexwCg=/10x11:1915x1082/1338x752/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2Fc0c%2Fbf9%2Feec%2Fc0cbf9eec80d66a32d7c692c6f7b4277.jpg"
//                             alt="Objeto"
//                             className="w-28 rounded border border-gray-300"
//                         />
//                         <div className="flex flex-col text-center gap-1">
//                             <span className="text-gray-600 text-sm">HP</span>
//                             <span className="text-gray-600 text-sm">SXZW435</span>
//                             <span className="text-gray-600 text-sm">Blanco</span>
//                         </div>
//                     </div>
//                     <div className="flex items-center gap-4 p-4 border border-gray-300 rounded-lg bg-gray-100">
//                         <img
//                             src="https://fotografias.lasexta.com/clipping/cmsimages02/2020/01/20/1B7822E4-B244-48CC-97F3-351AE194EA49/default.jpg?crop=1200,675,x0,y0&width=1900&height=1069&optimize=low"
//                             alt="Objeto"
//                             className="w-28 rounded border border-gray-300"
//                         />
//                         <div className="flex flex-col text-center gap-1">
//                             <span className="text-gray-600 text-sm">LENOVO</span>
//                             <span className="text-gray-600 text-sm">DCAZ17</span>
//                             <span className="text-gray-600 text-sm">Negro</span>
//                         </div>
//                     </div>

//                     <div className="modal-action">
//                         <form method="dialog">
//                             <button className="btn">Close</button>
//                         </form>
//                     </div>
//                 </div>
//             </dialog>
//         </div>
//     );
// }

// export default ModalGuarda;
import React, { useState } from 'react';

const ModalGuarda = () => {
    // Estado para manejar el objeto seleccionado
    const [selectedItem, setSelectedItem] = useState(null);

    // Datos de los objetos
    const items = [
        {
            id: 1,
            brand: 'ACER',
            model: 'DE34021',
            color: 'Gris',
            img: 'https://e7.pngegg.com/pngimages/289/417/png-clipart-laptop-hewlett-packard-computer-monitors-graphy-laptop-electronics-netbook.png',
        },
        {
            id: 2,
            brand: 'Teclado Gamer',
            model: 'XPS13',
            color: 'Negro ',
            img: 'https://http2.mlstatic.com/D_NQ_NP_965588-MLA50158986098_062022-O.webp',
        },
        {
            id: 3,
            brand: 'HP',
            model: 'SXZW435',
            color: 'Blanco',
            img: 'https://images.ecestaticos.com/QCn4Bh-vevoKsux6Cmjj1oexwCg=/10x11:1915x1082/1338x752/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2Fc0c%2Fbf9%2Feec%2Fc0cbf9eec80d66a32d7c692c6f7b4277.jpg',
        },
        {
            id: 4,
            brand: 'LENOVO',
            model: 'DCAZ7',
            color: 'Negro',
            img: 'https://fotografias.lasexta.com/clipping/cmsimages02/2020/01/20/1B7822E4-B244-48CC-97F3-351AE194EA49/default.jpg?crop=1200,675,x0,y0&width=1900&height=1069&optimize=low',
        },
    ];

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
                                <span className="">chao</span> {/* Ícono de cerrar */}
                            </button>
                            <p className="text-center text-gray-600 mb-4">Este es tu objeto</p>
                            <div className="flex items-center gap-4 p-4 border border-gray-300 rounded-lg bg-gray-100">
                                <img
                                    src={selectedItem.img}
                                    alt={selectedItem.model}
                                    className="w-28 rounded border border-gray-300"
                                />
                                <div className="flex flex-col text-center gap-1">
                                    <span className="text-gray-600 text-sm">{selectedItem.brand}</span>
                                    <span className="text-gray-600 text-sm">{selectedItem.model}</span>
                                    <span className="text-gray-600 text-sm">{selectedItem.color}</span>
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
                                        src={item.img}
                                        alt={item.model}
                                        className="w-28 rounded border border-gray-300"
                                    />
                                    <div className="flex flex-col text-center gap-1">
                                        <span className="text-gray-600 text-sm">{item.brand}</span>
                                        <span className="text-gray-600 text-sm">{item.model}</span>
                                        <span className="text-gray-600 text-sm">{item.color}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">salir</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default ModalGuarda;

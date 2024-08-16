// import React, { useState, useRef } from 'react';
// import Navbar from '../../components/Navbar';

// const Inicio = () => {
//     const [videoStream, setVideoStream] = useState(null);
//     const [photo, setPhoto] = useState(null);
//     const videoRef = useRef(null);
//     const canvasRef = useRef(null);

//     const handleTakePhoto = async () => {
//         try {
//             const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//             setVideoStream(stream);
//             if (videoRef.current) {
//                 videoRef.current.srcObject = stream;
//                 videoRef.current.play();
//             }
//         } catch (error) {
//             console.error('Error accediendo a la cámara:', error);
//         }
//     };

//     const handleCapturePhoto = () => {
//         if (videoRef.current && canvasRef.current) {
//             const canvas = canvasRef.current;
//             const context = canvas.getContext('2d');
//             // Asegúrate de que el tamaño del canvas coincide con el del video
//             canvas.width = videoRef.current.videoWidth;
//             canvas.height = videoRef.current.videoHeight;
//             context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

//             // Convertir la imagen del canvas a una URL de datos
//             const imageData = canvas.toDataURL('image/png');
//             setPhoto(imageData);

//             // Detener la transmisión de la cámara
//             if (videoStream) {
//                 videoStream.getTracks().forEach(track => track.stop());
//                 setVideoStream(null); // Limpia el estado del videoStream
//             }
//         }
//     };

//     return (
//         <div className="min-h-screen bg-gray-100">
//             <Navbar
//                 item1="REGISTRO FACIAL"
//                 item2="REGISTRO PERSONAS"
//                 item3="MAS"
//                 ruta1="/InicioGuardia"
//                 ruta2="/ReconocimientoGuardia"
//                 ruta3="/Mas"
//                 color=""  
//             />
//             <div>
              
//             </div>
//             <div className="max-w-4xl mx-auto p-4 border border-gray-300 rounded-lg shadow-md mt-8 bg-white">
//                 <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
//                     {/* Formulario en vertical */}
//                     <div className="flex-1">
//                         <h2 className="text-2xl font-semibold mb-4 text-center">Formulario de Registro</h2>
//                         <form className="space-y-4">
//                             <div>
//                                 <label htmlFor="full-name" className="block text-sm font-medium text-gray-700">Nombre completo:</label>
//                                 <input type="text" id="full-name" name="full-name" required
//                                     className="mt-1 block w-full bg-white px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
//                             </div>
//                             <div>
//                                 <label htmlFor="id-doc" className="block text-sm font-medium text-gray-700">Documento de identificación:</label>
//                                 <input type="text" id="id-doc" name="id-doc" required
//                                     className="mt-1 block w-full px-3 bg-white py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
//                             </div>
//                             <div>
//                                 <label htmlFor="diligence" className="block text-sm font-medium text-gray-700">Diligencia a realizar:</label>
//                                 <input type="text" id="diligence" name="diligence" required
//                                     className="mt-1 block w-full px-3  bg-white py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
//                             </div>
//                             <div>
//                                 <button type="submit"
//                                     className="w-full px-4 py-2 bg-green-600 text-white font-semibold rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">Registrar</button>
//                             </div>
//                         </form>
//                     </div>

//                     {/* Sección de captura de foto */}
//                     <div className="flex-1">
//                         <div className="flex flex-col space-y-4">
//                             <div className="flex flex-col space-y-4">
//                                 <button type="button" onClick={handleTakePhoto}
//                                     className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Tomar foto</button>
//                                 <button type="button" onClick={handleCapturePhoto}
//                                     className="px-4 py-2 bg-yellow-500 text-white font-semibold rounded-md shadow-sm hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">Capturar foto</button>
//                             </div>
//                             <div className="relative">
//                                 <video ref={videoRef} className="w-full h-auto border border-gray-300 rounded-md mb-2"></video>
//                                 <canvas ref={canvasRef} className="w-full h-auto border border-gray-300 rounded-md mb-2" style={{ display: 'none' }}></canvas>
//                                 {photo && (
//                                     <div className="mt-2 p-4 border border-gray-300 rounded-lg shadow-md bg-gray-50">
//                                         <h3 className="text-lg font-semibold mb-2 text-center">Foto Capturada:</h3>
//                                         <img src={photo} alt="Foto Capturada" className="w-full h-auto border border-gray-300 rounded-md" />
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Inicio;


import React from 'react'

export default function RegistroPersona() {
  return (
    <div>
      <div>
        holaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
      </div>
    </div>
  )
}

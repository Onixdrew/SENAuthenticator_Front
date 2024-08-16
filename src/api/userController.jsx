import axios from 'axios';

const API_URL = "http://127.0.0.1:8000/senauthenticator/inicioSesion/";



export const loginUser = async (numId, contraseña) => {
  try {
    const response = await axios.post(API_URL, {
      numero_documento_usuario: numId,
      password: contraseña,
    }, {
      headers: {
        "Content-Type": "application/json",
      }
    });
    
    return response.data;
  } catch (error) {
    if (error.response) {
      // La solicitud se realizó y el servidor respondió con un código de estado
      // que cae fuera del rango de 2xx
      throw new Error(error.response.data.error);
    } else if (error.request) {
      // La solicitud se realizó pero no se recibió respuesta
      throw new Error('No se recibió respuesta del servidor.');
    } else {
      // Algo sucedió al configurar la solicitud que lanzó un error
      throw new Error(error.message);
    }
  }
};










// const API_URL2 = "http://127.0.0.1:8000/senauthenticator/usuario/";

// export const getAllUsers = async () => {
//   try {
//     const response = await axios.get(API_URL2, {
//       headers: {
//         "Content-Type": "application/json",
//       }
//     });

//     // Axios automáticamente convierte la respuesta a JSON
//     const data = response.data; // Asegúrate de devolver los datos
//     console.log(data);
    
//     return data;
//   } catch (error) {
//     if (error.response) {
//       throw new Error(error.response.data.error);
//     } else if (error.request) {
//       throw new Error('No se recibió respuesta del servidor.');
//     } else {
//       throw new Error(error.message);
//     }
//   }
// };

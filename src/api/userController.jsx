import axios from 'axios';

const API_URL = "http://127.0.0.1:8000/senauthenticator/inicioSesion/";



export const loginUser = async (tipoId, numId, contraseña) => {
  try {
    const response = await axios.post(API_URL, {
      tipo_documento_usuario: tipoId,
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

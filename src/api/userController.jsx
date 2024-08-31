import axios from "axios";
import { useAuth } from "../Context/AuthContext";


// /////////////////////////////////////////// inicioSesion
// SQLite
// const API_URL ="https://backprojecto.onrender.com/api/inicioSesion/";

// Postgrest
const API_URL = "https://senauthenticator.onrender.com/api/inicioSesion/";

export const inicioSesion = async (numId, contraseña) => {
  const {guardarToken} = useAuth();

  // const [Datos, setDatos]=useState();
  try {
    // creo la peticcion http
    const response = await axios.post(
      API_URL,
      {
        numero_documento_usuario: values.numID,
        password: values.password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response) {
      console.log("Usuario Logueado correctamente");

      // Llamo a los hooks del contexto, que lo traigo como parametro desde el componente Login
      guardarToken(response.data);
      return await response.data;
    } else {
      console.log("El usuario no fue encontrado");
    }
  } catch (error) {
    if (error.response) {
      // La solicitud se realizó y el servidor respondió con un código de estado
      // que cae fuera del rango de 2xx
      throw new Error(error.response.data.error);
    } else if (error.request) {
      // La solicitud se realizó pero no se recibió respuesta
      throw new Error("No se recibió respuesta del servidor.");
    } else {
      // Algo sucedió al configurar la solicitud que lanzó un error
      throw new Error(error.message);
    }
  }
};

// SQLite
// const API_URL2 = "https://backprojecto.onrender.com/api/usuario/";

// Postgrest
const API_URL2 = "https://senauthenticator.onrender.com/api/usuario/";

// /////////////////////////////////////////// Register
export const registerUser = async (
  nombre,
  tipoId,
  numId,
  correo,
  contraseña,
  enviarDatosLogin
) => {
  try {
    console.log(nombre, tipoId, numId, correo, contraseña, enviarDatosLogin);

    // Toma el primer nombre para ponerlo de username
    const userName = nombre.split(" ")[0];

    const response = await axios.post(
      API_URL2,
      {
        username: userName,
        first_name: nombre,
        tipo_documento_usuario: tipoId,
        numero_documento_usuario: numId,
        email: correo,
        password: contraseña,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 201 || response.status === 200) {
      alert("Usuario creado correctamente");
      // enviarDatosLogin(response.data);
      return response;
    } else {
      alert(response.data.error || "Ocurrió un error desconocido");
    }
  } catch (error) {
    alert(
      "Error en la solicitud: " + (error.response?.data?.error || error.message)
    );
  }
};

// export const enviarUser = () => {
//   const {getTokenStorage} = useAuth();
//   const datos = getTokenStorage();
//   console.log(datos);

//   return datos;
// };



// /////////////////////////////////////////// obtener todos los user
export const getAllUsers = async () => {
  try {
    const response = await axios.get(API_URL2, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Axios automáticamente convierte la respuesta a JSON
    const data = response.data; // Asegúrate de devolver los datos
    // console.log(data);
    return data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.error);
    } else if (error.request) {
      throw new Error("No se recibió respuesta del servidor.");
    } else {
      throw new Error(error.message);
    }
  }
};

import Swal from "sweetalert2";
import axios from "./axios";
import { toast } from "react-hot-toast";

// /////////////////////////////////////////// inicioSesion
// SQLite
// const API_URL ="https://backprojecto.onrender.com/api/inicioSesion/";

/**
 * La funcion envia los datos del login a la api para el inisio de sesión.
 *
 * @async
 * @param {object} values Datos del usuario.
 * @param {Function} guardarUserLocal Guarda datos del usuario en el localstorage
 * @returns {object} dataUser: Datos del usuario.
 * @returns {void}
 */
export const inicioSesion = async (values, guardarUserLocal) => {
  try {
    // creo la peticcion http
    const response = await axios.post(
      "inicio-sesion/",
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

    if (response.status == 200) {
      // console.log("Usuario Logueado correctamente");

      // se accede al objeto, pero no se puede visualizar en consola
      const dataUser = response.data.user;

      // Llamo a los hooks del contexto, que lo traigo como parametro desde el componente Login
      guardarUserLocal(dataUser);
      return dataUser;
    }

    console.log("El usuario no fue encontrado");
    return;
  } catch (error) {
    // Swal.fire({
    //   title: "Error",
    //   text: error,
    //   icon: "warning",
    //   confirmButtonText: "OK",
    // });

    // toast.error("Error: " + error);

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

// /////////////////////////////////////////// Register
/**
 * La funcion registra a un nuevo usuario
 * @param {Object} data datos del usuario
 * @returns {Object} response: datos de la respuesta del back
 */
export const registerUser = async (data) => {
  try {
    // console.log(data);

    // Toma el primer nombre para ponerlo de username
    const userName = data.nombre.split(" ")[0];

    const response = await axios.post(
      "usuarios/",
      {
        username: userName,
        first_name: data.nombre,
        tipo_documento_usuario: data.tipoID,
        numero_documento_usuario: data.numID,
        email: data.correo,
        password: data.password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 201 || response.status === 200) {
      // Swal.fire({
      //   title: "Usuario creado correctamente",
      //   icon: "success",
      //   confirmButtonText: "OK",
      // });

      toast.success("Usuario creado correctamente");

      return response;
    }
    return(
      
    // alert(
    //   response.data.error || "Ocurrió un error desconocido en el registro"
    // );

    toast.error(
      "Error en la solicitud de registro: " +
        (error.response?.data?.error || error.message)
    )

    );
    
  } catch (error) {
    alert(
      "Error en la solicitud de registro: " +
        (error.response?.data?.error || error.message)
    );
  }
};

// /////////////////////////////////////////// obtener todos los user
export const getAllUsers = async () => {
  try {
    const response = await axios.get("usuarios/", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Axios automáticamente convierte la respuesta a JSON
    const data = response.data; // Asegúrate de devolver los datos
    // console.log(data);
    return data;
  } catch (error) {
    toast.error(
      "Error al obtener los usuarios: " +
        (error.response?.data?.error || error.message)
    );

    if (error.response) {
      throw new Error(error.response.data.error);
    } else if (error.request) {
      throw new Error("No se recibió respuesta del servidor.");
    } else {
      throw new Error(error.message);
    }
  }
};

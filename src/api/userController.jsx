import axios from "./axios";

// /////////////////////////////////////////// inicioSesion
// SQLite
// const API_URL ="https://backprojecto.onrender.com/api/inicioSesion/";

export const inicioSesion = async (values, guardarToken) => {
  // console.log(`Holaaaaaaaaaaaaaaa desde el sesion ${values.numID}`);

  // const [Datos, setDatos]=useState();
  try {
    // creo la peticcion http
    const response = await axios.post("inicioSesion/",
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
      console.log("Usuario Logueado correctamente");

      // se accede al objeto, pero no se puede visualizar en consola
      const userAndToken = response.data;
      console.log(userAndToken);

      // Llamo a los hooks del contexto, que lo traigo como parametro desde el componente Login
      guardarToken(userAndToken);
      return userAndToken;
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

// /////////////////////////////////////////// Register
export const registerUser = async (data) => {
  try {
    // console.log(data);

    // Toma el primer nombre para ponerlo de username
    const userName = data.nombre.split(" ")[0];

    const response = await axios.post(
      "usuario/",
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
      alert("Usuario creado correctamente");
      // enviarDatosLogin(response.data);
      return response;
    } else {
      alert(response.data.error || "Ocurrió un error desconocido en el registro");
    }
  } catch (error) {
    alert(
      "Error en la solicitud de registro: " + (error.response?.data?.error || error.message)
    );
  }
};



// /////////////////////////////////////////// obtener todos los user
export const getAllUsers = async () => {
  try {
    const response = await axios.get("usuario/", {
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

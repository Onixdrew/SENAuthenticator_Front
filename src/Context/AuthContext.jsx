// AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { registerUser } from "../api/userController";

// Crear el contexto
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState("");

  // Verificar el accessToken
  useEffect(() => {
    getTokenStorage();
  }, []);

  // Guardar el token
  function guardarToken(userData) {
    const daata= JSON.stringify(userData)

    console.log(`userrrrrrrrrrrr ${daata}`);

    guardarSesionInfo(userData.user, userData.token, userData.refreshToken);
  }

  // Guardar la información de sesión
  function guardarSesionInfo(userInfo, accessToken, refreshToken) {
    setAccessToken(accessToken);
    localStorage.setItem("token", JSON.stringify(accessToken));
    setIsAuthenticated(true);
    
    setUser(JSON.stringify(userInfo));
  }

  // Obtener el refreshToken del localStorage
  function getRefreshToken() {
    const tokenData = localStorage.getItem("token");
    if (tokenData) {
      const token = JSON.parse(tokenData);
      setAccessToken(token);
      return token;
    }
    return null;
  }

  const register = async (data) => {
    const res = await registerUser(data);

    console.log(res);

    // setUser(res);
  };

  // Obtener el acceso del token
  // function getAccessToken() {
  //   return accessToken;
  // }

  // Obtener el usuario
  // function getUser() {
  //   return user;
  // }

  // Cerrar sesión
  function cerrarSesion() {
    setIsAuthenticated(false);
    setAccessToken("");
    setUser(null);
    localStorage.removeItem("token");
  }

  // Enviar el token al back
  async function getTokenStorage() {
    try {
      const tokenLocal = getRefreshToken();
      if (tokenLocal) {
        const response = await fetch(
          "https://senauthenticator.onrender.com/api/perfil/",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${tokenLocal}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          const data2= JSON.stringify(data)

          console.log(`desde el authhhhhhhhhhh ${data2}`);
          
          setUser(data2);
          return data2;
        } else {
          throw new Error(response.statusText);
        }
      }
    } catch (error) {
      console.log("Error al validar el refreshToken en el back:", error);
      return null;
    }
  }

  // //////////////////////////////////////////////////////////-------FALTA IMPLEMENTAR EN EL BACK
  // se solicita un nuevo accessToken al back
  // async function solicitarNewAccessToken(refreshToken) {
  //   try {
  //     const response = await fetch(
  //       // falta implementar el endpoint en el back
  //       "https://backendsenauthenticator.onrender.com/api/usuario/",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${refreshToken}`,
  //         },
  //       }
  //     );

  //     if (response.ok) {
  //       const data = await response.json();

  //       if (data.error) {
  //         throw new Error(data.error);
  //       }

  //       return data.token;
  //     } else {
  //       throw new Error(response.statusText);
  //     }
  //   } catch (error) {
  //     console.log("Error al validar el refreshToken en el back:", error);
  //     return null;
  //   }
  // }

  // ////////////////////////////////////////////////////////// Traer user......
  // const API_URL2 = "https://backendsenauthenticator.onrender.com/api/usuario/";

  // const getAllUsers = async () => {
  //   try {
  //     const response = await axios.get(API_URL2, {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     // Axios automáticamente convierte la respuesta a JSON
  //     const data = response.data; // Asegúrate de devolver los datos
  //     // console.log(data);
  //     return data;
  //   } catch (error) {
  //     if (error.response) {
  //       throw new Error(error.response.data.error);
  //     } else if (error.request) {
  //       throw new Error("No se recibió respuesta del servidor.");
  //     } else {
  //       throw new Error(error.message);
  //     }
  //   }
  // };

  // //////////////////////////////////////////////////////////-------FALTA IMPLEMENTAR EN EL BACK
  // se solicita datos del user por medio del accessToken
  // async function ObtenerUserInfo(accessToken) {
  //   try {
  //     const response = await fetch(
  //       // falta implementar el endpoint en el back
  //       "https://backendsenauthenticator.onrender.com/api/usuario/",
  //       {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       }
  //     );

  //     if (response.ok) {
  //       const data = await response.json();

  //       if (data.error) {
  //         throw new Error(data.error);
  //       }

  //       return data;
  //     } else {
  //       throw new Error(response.statusText);
  //     }
  //   } catch (error) {
  //     console.log("Error al validar el refreshToken en el back:", error);
  //     return null;
  //   }
  // }

  // //////////////////////////////////////////////////////////
  // Se verifica la existencia de tokens cada vez que se inicie la aplicacion.
  // useEffect(() => {
  //   verificarAccessToken();
  // }, []);

  // async function verificarAccessToken() {
  //   // verifica si sea iniciado sesion con el primer token, el temporal
  //   if (accessToken) {
  //     // si el usuario esta auhenticado
  //     const userInfo = await ObtenerUserInfo(accessToken);

  //     if (userInfo) {
  //       //  se pasan como argumento los resultados de la consultas,pero conservo el refreshToken, ya que este solo cambia cuando el usuario cierra la sesion y se borra el.
  //       // refresToken de mongo
  //       guardarSesionInfo(userInfo, accessToken, getRefreshToken());
  //       return;
  //     }
  //   } else {
  //     // si el usuario no esta autenticado con el accessToken, se verifica el refreshToken de la anterior sesion
  //     // en el localStorage para realizar el login automaticamente, cada vez que se entre a la aplicacion.
  //     const token = getRefreshToken();
  //     if (token) {
  //       // se envia el refreshToken que se encuentra en el gardado en el localStorage del inicion de sesion anterior
  //       //  al back para consultar si existe en mongo, y si existe me crea un nuevo accessToken.
  //       const newAccessToken = await solicitarNewAccessToken(token);
  //       if (newAccessToken) {
  //         // se envia el token resultante al back para obtener los datos del usuario al que le pertenece el token
  //         const userInfo = await ObtenerUserInfo(newAccessToken);
  //         if (userInfo) {
  //           //  se pasan como argumento los resultados de la consultas,pero conservo el refreshToken, ya que este solo cambia cuando el usuario cierra la sesion y se borra el.
  //           // refresToken de mongo
  //           guardarSesionInfo(userInfo, newAccessToken, token);
  //           return;
  //         }
  //       }
  //     }
  //   }
  // }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        accessToken,
        guardarToken,
        getRefreshToken,
        cerrarSesion,
        getTokenStorage,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto
// export const useAuth = () => useContext(AuthContext);

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};

export default AuthProvider;

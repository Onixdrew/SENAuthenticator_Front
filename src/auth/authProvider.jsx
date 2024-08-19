import { useDeferredValue } from "react";
import { useContext, createContext, useState, useEffect } from "react";
import { json } from "react-router-dom";

const AuthContext = createContext({
  isAuthenticated: false,
  getAccessToken: () => {},

  //// getRefreshToken falta por implementar en el back
  getRefreshToken: () => {},

  guardarToken: (userData) => {},
});

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  // Manejo de tokens
  const [accessToken, setAccessToken] = useState("");

  // se solicita un nuevo token al back
  async function solicitarNewAccessToken(refreshToken) {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/senauthenticator/usuario/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${refreshToken}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();

        if (data.error) {
          throw new Error(data.error);
        }

        return data.token;
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.log("Error al validar el refreshToken en el back:", error);
      return null;
    }
  }

  // se solicita datos del user
  async function ObtenerUserInfo(accessToken) {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/senauthenticator/usuario/",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();

        if (data.error) {
          throw new Error(data.error);
        }

        return data;
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.log("Error al validar el refreshToken en el back:", error);
      return null;
    }
  }

  // Se verifica la existencia de tokens
  useEffect(() => {}, []);

  async function verificarToken() {
    // verifica si sea iniciado sesion con el primer token, el temporal
    if (accessToken) {
      // si el usuario esta auhenticado
    } else {
      // si el usuario no esta autenticado con el primer token, se verifica el refreshToken de la anterior sesion
      // en el localStorage para realizar el login automaticamente, cada vez que se entre a la aplicacion.
      const token = getRefreshToken();
      if (token) {
        // se envia el token al back
        const newAccessToken = await solicitarNewAccessToken(token);
        if (newAccessToken) {
          // se envia el token resultante al back para obtener los datos del usuario al que le pertenece el token
          const userInfo = await ObtenerUserInfo(newAccessToken);
          if (userInfo) {
            //  se pasan como argumento los resultados de la consultas
            guardarSesionInfo(userInfo, newAccessToken, token)
          }
        }
      }
    }
  }

  // retornar token para que este accesible en cualquier parte de la aplicacion.
  function getAccessToken() {
    return accessToken;
  }

  // este a un falta por implementar

  // Se verifica si hay un refreshToken almacenado en el localStorage y
  // si lo hay se retorna para usarlo en otra parte el codigo
  function getRefreshToken() {
    const token = localStorage.getItem("token");
    if (token) {
      // este se debe implementar
      const { refreshToken } = JSON.parse(token);
      return refreshToken;
    }

    return null;
  }

  function guardarSesionInfo(userInfo, accessToken, refreshToken) {
    console.log(`Hola dese el guardarSesionInfo: ${accessToken}`);

    // actualiza la variable con el token principal
    setAccessToken(accessToken);

    // guardar el refreshToken en memoria del navegador
    // localStorage.setItem("token", JSON.stringify(refreshToken))

    setIsAuthenticated(true);
    setUser(userInfo)
  }



  // extrae los tokens de la solicitud http del usuario logueado, que vienen del backend. Tambien se guarda el usuario
  function guardarToken(userData) {
    guardarSesionInfo(userData.user, userData.token, userData.refreshToken)
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, getAccessToken, guardarToken, getRefreshToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

// Hook que permite acceder a funciones de useContext en cualquier componente, solo hay que llamarlo

export const useAuth = () => useContext(AuthContext);

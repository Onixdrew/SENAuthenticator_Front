import { useDeferredValue } from "react";
import { useContext, createContext, useState, useEffect } from "react";
import { json } from "react-router-dom";

const AuthContext = createContext({
  isAuthenticated: false,
  getAccessToken: () => {},

  //// getRefreshToken falta por implementar en el back
  getRefreshToken: () => {},

  guardarToken: (userData) => {},
  cerrarSesion: () => {},
});

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(true);

  // Manejo de tokens
  const [accessToken, setAccessToken] = useState("");


  // //////////////////////////////////////////////////////////-------FALTA IMPLEMENTAR EN EL BACK
  // se solicita un nuevo accessToken al back
  async function solicitarNewAccessToken(refreshToken) {
    try {
      const response = await fetch(
        // falta implementar el endpoint en el back
        "https://backendsenauthenticator.onrender.com/api/usuario/",
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


  // //////////////////////////////////////////////////////////-------FALTA IMPLEMENTAR EN EL BACK
  // se solicita datos del user por medio del accessToken
  async function ObtenerUserInfo(accessToken) {
    try {
      const response = await fetch(
        // falta implementar el endpoint en el back
        "https://backendsenauthenticator.onrender.com/api/usuario/",
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


  // //////////////////////////////////////////////////////////
  // Se verifica la existencia de tokens cada vez que se inicie la aplicacion.
  useEffect(() => {
    verificarAccessToken()
  }, []);

  async function verificarAccessToken() {
    // verifica si sea iniciado sesion con el primer token, el temporal
    if (accessToken) {
      // si el usuario no esta auhenticado
      const userInfo = await ObtenerUserInfo(accessToken);
      if (userInfo) {
        //  se pasan como argumento los resultados de la consultas,pero conservo el refreshToken, ya que este solo cambia cuando el usuario cierra la sesion y se borra el.
        // refresToken de mongo
        guardarSesionInfo(userInfo, accessToken, getRefreshToken());
        return;
      }
    } else {
      // si el usuario no esta autenticado con el accessToken, se verifica el refreshToken de la anterior sesion
      // en el localStorage para realizar el login automaticamente, cada vez que se entre a la aplicacion.
      const token = getRefreshToken();
      if (token) {
        // se envia el refreshToken que se encuentra en el gardado en el localStorage del inicion de sesion anterior
        //  al back para consultar si existe en mongo, y si existe me crea un nuevo accessToken.
        const newAccessToken = await solicitarNewAccessToken(token);
        if (newAccessToken) {
          // se envia el token resultante al back para obtener los datos del usuario al que le pertenece el token
          const userInfo = await ObtenerUserInfo(newAccessToken);
          if (userInfo) {
            //  se pasan como argumento los resultados de la consultas,pero conservo el refreshToken, ya que este solo cambia cuando el usuario cierra la sesion y se borra el.
            // refresToken de mongo
            guardarSesionInfo(userInfo, newAccessToken, token)
            return;
          }
        }
      }
    }
  }


  // //////////////////////////////////////////////////////////
  // retornar token para que este accesible en cualquier parte de la aplicacion.
  function getAccessToken() {
    return accessToken;
  }


  // //////////////////////////////////////////////////////////
  // este a un falta por implementar

  // Se verifica si hay un refreshToken almacenado en el localStorage y
  // si lo hay se retorna para usarlo en otra parte el codigo
  function getRefreshToken() {
      // se extrae refreshToken con el nombre que tal cual se le dio a la key cuando se almacenó en el localstorage.
    const tokenData = localStorage.getItem("token");
    if (tokenData) {
      // se convierte el token que esta en string a un objeto
      const token = JSON.parse(tokenData);
      return token;
    }

    return null;
  }


  // //////////////////////////////////////////////////////////
  // guarda el refreshToken en el loclastorage y modifica la varible de authenticacion
  function guardarSesionInfo(userInfo, accessToken, refreshToken) {
    console.log(`Hola dese el guardarSesionInfo este es el token: ${accessToken}`);

    // actualiza la variable con el accessToken 
    setAccessToken(accessToken);

    // guardar el refreshToken en memoria del navegador
    // localStorage.setItem("token", JSON.stringify(refreshToken))

    setIsAuthenticated(true);
    setUser(userInfo)
  }


  // //////////////////////////////////////////////////////////
  // extrae los tokens de la solicitud http del usuario logueado, que vienen del backend. Tambien se guarda el usuario
  function guardarToken(userData) {
    guardarSesionInfo(userData.user, userData.token, userData.refreshToken)
  }


  // //////////////////////////////////////////////////////////
  // se vacian todas las variables incluyendo el localStorage
 function cerrarSesion() {
  setIsAuthenticated(false);
  setAccessToken("");
  setUser(undefined);
  localStorage.removeItem("token")
 }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, getAccessToken, guardarToken, getRefreshToken,cerrarSesion }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

// Hook que permite acceder a funciones de useContext en cualquier componente, solo hay que llamarlo

export const useAuth = () => useContext(AuthContext);

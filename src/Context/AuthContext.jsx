// AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";
// import axios from "../api/axios";
import axios from "axios";
import { registerUser } from "../api/userController";

// Crear el contexto
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState("");

  // Verificar el accessToken
  // Obtener el refreshToken del localStorage y realizar la solicitud al backend
  useEffect(() => {
    // Obtener el Token del localStorage
    const getRefreshToken = () => {
      const tokenData = localStorage.getItem("token");
      if (tokenData) {
        const token = JSON.parse(tokenData);

        console.log(`refresssssssssssss activado ${token}`);

        setAccessToken(token);
        return token;
      }
      return null;
    };
    getRefreshToken();
  }, []);

  useEffect(() => {
    getTokenStorage();
  });

  // Guardar el token
  function guardarToken(userAndToken) {
    // console.log(`userrrrrrrrrrrr ${userAndToken.token}`);

    localStorage.setItem("token", JSON.stringify(userAndToken.token));

    setAccessToken(userAndToken.token);
    setIsAuthenticated(true);

    // se pasa el objeto pero no se puede visualizar en consola, pero si acceder a los datos.
    setUser(userAndToken.user);
  }

  const register = async (data) => {
    const res = await registerUser(data);

    console.log(res);

    // setUser(res);
  };

  // Enviar el token al back
  async function getTokenStorage() {
    try {
      console.log(`tokenLocalllllllll ${accessToken}`);

      if (accessToken) {
        // Configura la instancia de axios para la solicitud
        const response = await axios.get(
          "https://senauthenticator.onrender.com/api/perfil/",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${accessToken}`,
            },
          }
        );

        // Verifica que la respuesta fue exitosa
        if (response.status === 200 || response.status === 201) {
          const data = response.data.user;

          console.log(`desde el authhhhhhhhhhh ${JSON.stringify(data)}`);

          setUser(data);
         

          // error ciclo infinito
          setIsAuthenticated(true);
          return data;
        } else {
          throw new Error(response.statusText);
        }
      }
    } catch (error) {
      console.log("Error al validar el Token en el back:", error);
      setIsAuthenticated(false);
      return null;
    }
  }

  // Cerrar sesión
  function cerrarSesion() {
    setIsAuthenticated(false);
    setAccessToken("");
    setUser(null);
    localStorage.removeItem("token");
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        accessToken,
        guardarToken,

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

// AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";
// import axios from "../api/axios";
import axios from "../api/axios";
import { registerUser } from "../api/userController";
import { json, Navigate, useNavigate } from "react-router-dom";

// Crear el contexto
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState("");

  // Verificar el accessToken
  // Obtener el refreshToken del localStorage y realizar la solicitud al backend
  // useEffect(() => {
  //   // Obtener el Token del localStorage
  //   const getRefreshToken = () => {
  //     const tokenData = localStorage.getItem("token");
  //     if (tokenData == "undefined") {
  //       cerrarSesion();
  //     }

  //     if (tokenData) {
  //       const token = JSON.parse(tokenData);

  //       // console.log(`refresssssssssssss activado ${token}`);

  //       setAccessToken(token);
  //       // setIsAuthenticated(true);
  //       return token;
  //     }
  //     return null;
  //   };
  //   getRefreshToken();
  // }, [accessToken]);

  // useEffect(() => {
  //   getTokenStorage();
  // });



  // Enviar el token al back
  // async function getTokenStorage(accessToken) {
  //   if (accessToken) {
  //     try {
  //     //   console.log(`tokenLocalllllllll ${accessToken}`);
  //     //   console.log(`primero ${isAuthenticated}`);

  //       if (accessToken) {
  //         // Configura la instancia de axios para la solicitud
  //         const response = await axios.get(
  //           // "https://senauthenticator.onrender.com/api/perfil/",
  //           "perfil/",
  //           {
  //             headers: {
  //               "Content-Type": "application/json",
  //               Authorization: `Token ${accessToken}`,
  //             },
  //           }
  //         );

  //         // Verifica que la respuesta fue exitosa
  //         if (response.status == 200 || response.status == 201) {
  //           const data = response.data.user.rol_usuario;

  //           // console.log(`desde el authhhhhhhhhhh ${JSON.stringify(data)}`);

  //           setIsAuthenticated(true);
  //           setUser(data);
  //           // console.log(`segundo ${isAuthenticated}`);

  //           // error ciclo infinito
  //           return data;
  //         } else {
  //           throw new Error(response.statusText);
  //         }
  //       }
  //     } catch (error) {
  //       console.log("Error al validar el Token en el back:", error);
  //       setIsAuthenticated(false);
  //       return null;
  //     }
  //   }
  // }

  // const registerForm = async (data) => {
  //   const res = await registerUser(data);

  //   console.log(res);

  //   // setUser(res);
  // };


  // Guardar el usuario en el localStorage
  function guardarUserLocal(user) {
    // console.log(`userrrrrrrrrrrr ${userAndToken.token}`);

    if (user) {
      const datosUser = {
        userName: user.username,
        rol_usuario: user.rol_usuario,
      };

      localStorage.setItem("user", JSON.stringify(datosUser));

      // setAccessToken(userAndToken.token);
      setIsAuthenticated(true);
      setUser(user);
    }
  }


  // useEffect(() => {
  //   const verificarCookie = async () => {
  //     try {
  //       const response = await axios.get("validarToken/");
  //       if (response.status == 200) {
  //         console.log("Authenticated:", response.data);
  //         setIsAuthenticated(true);
  //       }
  //     } catch (error) {
  //       console.log("User not authenticated", error);
  //     }
  //   };

  //   verifyAuth(); // Verifica el token al recargar la página
  // }, []);

  // Cerrar sesión
  function cerrarSesion() {
    setIsAuthenticated(false);
    setAccessToken("");
    setUser(null);
    localStorage.removeItem("token");

    return <Navigate to="/Login" />;
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        accessToken,
        guardarUserLocal,
        setUser,
        setIsAuthenticated,
        cerrarSesion,
        
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

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

  // useEffect(() => {
    const extraerUserStorege = () => {
      const useStorge = localStorage.getItem("user");

      if (useStorge) {
        const user = JSON.parse(useStorge);
        setUser(user);

        console.log(`refresssssssssssss activado ${useStorge}`);

        return user;
      }
      setIsAuthenticated(false)

      // cerrarSesion()
      return null;
    };
  //   extraerUserStorege()
  // },[]);

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

  useEffect(() => {
    const verificarCookie = async () => {
      try {
        const response = await axios.get("validarToken/");
        if (response.status == 200) {
          console.log("Authenticated:", response.data);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.log("User not authenticated", error);
      }
    };

    verificarCookie(); // Verifica el token al recargar la página
  }, []);

  // Cerrar sesión
  function cerrarSesion() {
    setIsAuthenticated(false);
    setAccessToken("");
    setUser(null);
    localStorage.removeItem("user");

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
        extraerUserStorege
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

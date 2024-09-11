import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "../api/axios";
import { Navigate, useNavigate } from "react-router-dom";
import Loader from "../components/Loader/Loader";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Cambiar estado inicial a `true` porque está validando el token

  useEffect(() => {
    const verificarCookie = async () => {
      try {
        const response = await axios.get("validarToken/");
        if (response.status === 200) {
          const storedUser = localStorage.getItem("user");

          if (storedUser) {
            const user = JSON.parse(storedUser);
            setUser(user);
          }

          setIsAuthenticated(true);
        } else {
          cerrarSesion();
        }
      } catch (error) {
        console.log("User not authenticated", error);
        cerrarSesion(); // Si hay un error, cerrar sesión
      } finally {
        setLoading(false); // Terminar el estado de carga después de intentar validar
      }
    };

    verificarCookie(); // Verifica el token al recargar la página
  }, []);

  const guardarUserLocal = (user) => {
    if (user) {
      const datosUser = {
        username: user.username,
        rol_usuario: user.rol_usuario,
      };
      localStorage.setItem("user", JSON.stringify(datosUser));
      setIsAuthenticated(true);
      setUser(user);
    }
  };

  const cerrarSesion = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("user");
    return <Navigate to="/Login" />;
  };

  // Muestra un componente de carga mientras `loading` sea true
  if (loading) {
    return <div className="text-center mt-10 font-bold"><Loader></Loader></div>;
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};

export default AuthProvider;

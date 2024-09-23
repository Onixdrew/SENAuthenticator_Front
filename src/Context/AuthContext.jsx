import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "../api/axios";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import Loader from "../components/Loader/Loader";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation(); // Obtiene la ruta actual

  useEffect(() => {
    const verificarCookie = async () => {
      try {
        // setLoading(true);
        const response = await axios.get("validarToken/");
        if (response.status === 200) {
          const storedUser = localStorage.getItem("user");

          if (storedUser) {
            const user = JSON.parse(storedUser);
            setIsAuthenticated(true);
            setUser(user);
          } else {
            console.log("No estas logueado");
          }
        } else {
          cerrarSesion();
        }
      } catch (error) {
        console.log("User not authenticated", error);
        cerrarSesion();
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
    localStorage.removeItem("user");
    localStorage.removeItem("lastRoute");
    return <Navigate to="/Login" />;
  };

  // Si loading es true y la ruta no es "/Login" ni "/", se muestra el Loader
  if (loading && location.pathname !== "/" && location.pathname !== "/Login") {
    // && location.pathname !== "/Login"
    return (
      <div className="text-center mt-10 font-bold">
        <Loader />
      </div>
    );
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

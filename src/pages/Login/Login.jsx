import React, { useEffect, useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Swal from "sweetalert2";
import logoSENAuthenticator from "../../../public/img/Logo Reconocimiento Facial - Verde.png";
import logoSena from "../../../public/img/logoVerdeSENA.png";
import { Navigate, useNavigate } from "react-router-dom";
import { inicioSesion } from "../../api/userController";
import Register from "../../components/Register/Register";
import { useAuth } from "../../Context/AuthContext";
import { useForm } from "react-hook-form";

import Loader from "../../components/Loader/Loader";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [errorsLocal, setErrors] = useState({});
  const [errorsBack, setErrorsBack] = useState("");
  const [abrirRegister, setAbrirRegister] = useState(false);
  const [dataRol, setDataRol] = useState(null);

  const {
    accessToken,
    isAuthenticated,
    user,
    setIsAuthenticated,
    setUser,
    guardarUserLocal,
    extraerUserStorege,
    loading,
  } = useAuth();

  const navegar = useNavigate();


  useEffect(() => {
    const checarRolStorage = () => {
      if (isAuthenticated) {
        // const userStorage = extraerUserStorege();

        // console.log(user);
        // console.log(isAuthenticated);
        if (user) {
          switch (user.rol_usuario) {
            case "Instructor":
              return navegar("/inicioInstructor");
            case "Administrador":
              return navegar("/inicioAdmin");

            case "Guardia de seguridad":
              return navegar("/InicioGuardia");

            default:
              Swal.fire({
                title: "Rol no reconocido",
                text: `${dataRol} no es un rol reconocido`,
                icon: "warning",
                confirmButtonText: "OK",
              });
              break;
          }
        }
      }
    };
    checarRolStorage();
  }, [isAuthenticated]);

  const enviarForm = handleSubmit(async (values, event) => {
    event.preventDefault(); // Esto evita que el formulario recargue la página.
    try {
      const data = await inicioSesion(numId, contraseña, Autenticador);
      console.log(data);

      if (data) {
        setUser(data);

        switch (data.rol_usuario) {
          case "Instructor":
            navegar("/inicioInstructor");
            break;
          case "Administrador":
            navegar("/inicioAdmin");
            break;
          case "Guardia de seguridad":
            navegar("/InicioGuardia");
            break;
          default:
            Swal.fire({
              title: "Error",
              text: `${data.user.rol_usuario} no es un rol reconocido`,
              icon: "warning",
              confirmButtonText: "OK",
            });
            break;
        }
      } else {
        console.log("No se obtuvieron datos del inicio de sesión");
      }
      setLoading(false)
    } catch (error) {
      setErrorsBack(error.message);
      console.log(error.message);
    }
  });

  
  useEffect(() => {
    if (errorsBack) {
      Swal.fire({
        title: "Error",
        text: errorsBack,
        icon: "error",
        confirmButtonText: "OK",
      });
      setErrorsBack(""); // Limpiar el mensaje después de mostrarlo
    }
  }, [errorsBack]);

  const cerrarModal = (e) => {
    setAbrirRegister(e);
  };

  return (
    <>

    { loading && <Loader/> }
      {abrirRegister && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white md:max-w-2xl max-w-4xl mx-auto p-8 rounded-lg shadow-lg lg:max-w-6xl max-h-[90vh] overflow-auto">
            <Register cerrarModal={cerrarModal} />
          </div>
        </div>
      )}

      <div
        className={`min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 ${
          abrirRegister ? "opacity-50" : ""
        }`}
      >
        <div className="bg-opacity-70 p-6 rounded-lg max-w-6xl w-full flex flex-wrap [@media(max-width:381px)]:flex-col-reverse justify-between">
          <div className="w-full lg:w-2/3 lg:pr-10 mb-6 lg:mb-0">
            <div className="flex gap-4 mb-6 [@media(max-width:381px)]:justify-center">
              <img
                src={logoSena}
                alt="Escudo"
                className="top-4 left-4 w-16 sm:w-16 md:w-16 lg:w-14 xl:w-16 [@media(max-width:381px)]:w-12"
              />
              <div className="flex items-center">
                <img
                  src={logoSENAuthenticator}
                  alt="Logo"
                  className="mr-3 w-11 sm:w-14 md:w-16 lg:w-11 xl:w-14"
                />
                <h1 className="text-black text-lg [@media(max-width:381px)]:hidden sm:text-3xl md:text-3xl lg:text-2xl font-bold">
                  SENAuthenticator
                </h1>
              </div>
            </div>
            <h1 className="text-black text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Bienvenido!
            </h1>
            <p className="text-black-300 mb-6 text-lg mt-16">
              El reconocimiento facial ofrece una forma segura y cómoda de
              autenticación. Al utilizar las características únicas de cada
              rostro, esta tecnología permite un acceso rápido y preciso.
            </p>
            <p className="inline-block text-black hover:text-blue-400 text-lg">
              Leer más...
            </p>
          </div>
          <div className="w-full lg:w-1/3 bg-white p-6 lg:p-10 rounded-3xl border">
            <h2 className="text-black text-3xl sm:text-4xl lg:text-3xl font-bold mb-8 text-center">
              Iniciar sesión
            </h2>
            <form onSubmit={enviarForm}>
              <div className="mb-6">
                <label
                  className="block text-black-300 mb-2 text-lg"
                  htmlFor="numID"
                >
                  Número identificación
                </label>
                <div className="relative">
                  <input
                    className={`w-full p-3 rounded border bg-white text-black focus:outline-none focus:ring-2 focus:ring-gray-200 ${
                      errors.numID ? "border-red-500" : ""
                    }`}
                    {...register("numID", {
                      required: "El número de identidad es requerido.",
                    })}
                    id="numID"
                    type="number"
                    placeholder="Identificación"
                  />
                  {errors.numID && (
                    <p className="text-red-500 text-sm">
                      {errors.numID.message}
                    </p>
                  )}
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <i className="fas fa-address-book text-black"></i>
                  </div>
                </div>
              </div>
              <div className="mb-8">
                <label
                  className="block text-black-300 mb-2 text-lg"
                  htmlFor="password"
                >
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    className={`w-full p-3 rounded border bg-white text-black focus:outline-none focus:ring-2 focus:ring-gray-200 ${
                      errors.password ? "border-red-500" : ""
                    }`}
                    {...register("password", {
                      required: "La contraseña es requerida.",
                    })}
                    id="password"
                    type="password"
                    placeholder="Contraseña"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm">
                      {errors.password.message}
                    </p>
                  )}
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <i className="fas fa-lock text-black"></i>
                  </div>
                </div>
              </div>
              <button
                className="btn w-full hover:bg-green-700 bg-gradient-to-r bg-[rgb(39,169,0)] text-white font-bold p-3 rounded-full text-lg"
                type="submit"
              >
                Aceptar
              </button>
              <h2 className="text-center my-3">
                No tienes cuenta?
                <div>
                  <button
                    type="button"
                    onClick={() => setAbrirRegister(true)}
                    className="hover:text-green-600"
                  >
                    Regístrate.
                  </button>
                </div>
              </h2>
              <div className="flex justify-around mt-6 text-black text-2xl">
                <a href="#">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#">
                  <i className="fab fa-pinterest-p"></i>
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

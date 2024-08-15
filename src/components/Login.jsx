import { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import logoSENAuthenticator from "../../public/img/Logo Reconocimiento Facial - Verde.png";
import logoSena from "../../public/img/logoVerdeSENA.png";
import { useAuth } from "../auth/authProvider";
import { Navigate, useNavigate } from "react-router-dom";
import { loginUser } from "../api/userController";
import Register from "./Register";

const Login = () => {
  const [numId, setNumId] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [errors, setErrors] = useState({});
  const [errorsBack, setErrorsBack] = useState();
  const [Rol, setRol] = useState("");
  const [abrirRegister, setAbrirRegister] = useState(false);

  // hooks
  const Autenticador = useAuth();
  const navegar = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!numId) newErrors.numId = "El número de identificación es obligatorio.";
    if (!contraseña) newErrors.contraseña = "La contraseña es obligatoria.";
    return newErrors;
  };

  const handleChangeNumId = (e) => {
    setNumId(e.target.value);
    if (e.target.value) {
      setErrors((prevErrors) => ({ ...prevErrors, numId: "" }));
    }
  };

  const handleChangeContraseña = (e) => {
    setContraseña(e.target.value);
    if (e.target.value) {
      setErrors((prevErrors) => ({ ...prevErrors, contraseña: "" }));
    }
  };

  const cerrarModal = (e)=>{
    setAbrirRegister(e)
  }

  const enviarForm = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const data = await loginUser(numId, contraseña);
      console.log(data);

      switch (data.user.rol_usuario) {
        case "Instructor":
          setRol(data.user.rol_usuario);
          navegar("/inicioInstructor");
          break;
        case "Administrador":
          setRol(data.user.rol_usuario);
          navegar("/inicioAdministrador");
          break;
        default:
          alert("Rol no reconocido");
          break;
      }
    } catch (error) {
      setErrorsBack(error.message);
      console.log(error.message);
    }
  };

  return (
    <>
      {abrirRegister && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl  w-full">
            <Register cerrarModal2={cerrarModal} />
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
                  htmlFor="username"
                >
                  Número identificación
                </label>
                <div className="relative">
                  <input
                    className={`w-full p-3 rounded border bg-white text-black focus:outline-none focus:ring-2 focus:ring-gray-200 ${
                      errors.numId ? "border-red-500" : ""
                    }`}
                    id="username"
                    type="number"
                    placeholder="Identificación"
                    value={numId}
                    onChange={handleChangeNumId}
                  />
                  {errors.numId && (
                    <p className="text-red-500 text-sm">{errors.numId}</p>
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
                      errors.contraseña ? "border-red-500" : ""
                    }`}
                    id="password"
                    type="password"
                    placeholder="Contraseña"
                    value={contraseña}
                    onChange={handleChangeContraseña}
                  />
                  {errors.contraseña && (
                    <p className="text-red-500 text-sm">{errors.contraseña}</p>
                  )}
                  {errorsBack && (
                    <p className="text-red-500 text-sm">{errorsBack}</p>
                  )}
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <i className="fas fa-lock text-black"></i>
                  </div>
                </div>
              </div>
              <button
                className="w-full bg-gradient-to-r bg-[rgb(39,169,0)] text-white font-bold p-3 rounded-full text-lg"
                type="submit"
              >
                Entrar
              </button>
              <h2 className="text-center my-3">
                No tienes cuenta? 
                <button
                  type="button"
                  onClick={() => setAbrirRegister(true)}
                  className="hover:text-green-600"
                >
                  Registrate.
                </button>
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

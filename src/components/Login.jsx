import { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Logo from "../../public/img/Logo Reconocimiento Facial - Blanco.png";
import escudo from "../../public/img/logo-sena-naranja-png-2022.png";
import { useAuth } from '../auth/authProvider';
import { Navigate, useNavigate } from 'react-router-dom';

const Login = () => {
  const [tipoId, setTipoId] = useState("");
  const [numId, setNumId] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [errors, setErrors] = useState({});
  const [errorsBack, setErrorsBack] = useState();
  const [Rol, setRol] = useState("");

  // hooks
  const Autenticador = useAuth();
  const navegar = useNavigate();
  

  // Verifica si el usuario ya está autenticado y segun el rol no se permite regresar al login

  // if (Autenticador.isAuthenticated) {
  //   console.log(Rol);
    
  //   return <Navigate to="/inicioInstructor" />
  // }

  const rol2="Instructor"

  // if (Autenticador.isAuthenticated ) {
  //   // console.log(Rol);
  //   // return <Navigate to="/inicioInstructor" />

  //   switch (rol2) {
  //     case "Instructor":
  //       return <Navigate to="/inicioInstructor" />
       
  //     case "Administrador":
  //       return <Navigate to="/inicioAdministrador" />

  //     default:
  //       break;
  //   }
    
  // }

  // const rol3 = "Guarda"



  const validateForm = () => {
    const newErrors = {};
    if (!tipoId) newErrors.tipoId = "Selecciona un tipo de identificación.";
    if (!numId) newErrors.numId = "El número de identificación es obligatorio.";
    if (!contraseña) newErrors.contraseña = "La contraseña es obligatoria.";
    return newErrors;
  };

  const handleChangeTipoId = (e) => {
    setTipoId(e.target.value);
    if (e.target.value) {
      setErrors(prevErrors => ({ ...prevErrors, tipoId: '' }));
    }
  };

  const handleChangeNumId = (e) => {
    setNumId(e.target.value);
    if (e.target.value) {
      setErrors(prevErrors => ({ ...prevErrors, numId: '' }));
    }
  };

  const handleChangeContraseña = (e) => {
    setContraseña(e.target.value);
    if (e.target.value) {
      setErrors(prevErrors => ({ ...prevErrors, contraseña: '' }));
    }
  };

  const enviarForm = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    try {
      const response = await fetch("http://127.0.0.1:8000/senauthenticator/inicioSesion/", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "tipo_documento_usuario": tipoId,
          "numero_documento_usuario": numId,
          "password": contraseña,
        })
      });

      if (response.ok) {
        const data = await response.json();
        // const json = await response.json();
       

        // if (json.body.token) {
        //   Autenticador.saveUser(json);
        // }

        // redirigir a la página según su rol
        switch (data.user.rol_usuario) {
          case "Instructor":
            setRol(data.user.rol_usuario)
          
            navegar("/inicioInstructor");
            break;
          case "Administrador":
            setRol(json.user.rol_usuario)
            navegar("/inicioAdministrador");
            break;
          default:
            alert("Rol no reconocido");
            break;
        }

      } else {
        const errorData = await response.json(); // Leer la respuesta del error
        setErrorsBack(errorData.error);
        console.log(errorData.error);
      }
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 "
      style={{
        backgroundImage: "url('https://img.freepik.com/vector-premium/fondo-estructura-molecular-fondo-pantalla-plantilla-ciencia-o-banner-moleculas-adn_191234-1142.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="bg-purple-800 bg-opacity-70 p-6  rounded-lg shadow-lg max-w-6xl w-full flex flex-wrap [@media(max-width:381px)]:flex-col-reverse justify-between">
        <div className="w-full lg:w-2/3 lg:pr-10 mb-6 lg:mb-0">
          <div className="flex gap-4 mb-6 [@media(max-width:381px)]:justify-center">
            <img src={escudo} alt="Escudo" className=" top-4 left-4 w-16 sm:w-16 md:w-16 lg:w-14 xl:w-16 [@media(max-width:381px)]:w-12" />
            <div className='flex items-center'>
              <img src={Logo} alt="Logo" className="mr-3 w-11 sm:w-14 md:w-16 lg:w-11 xl:w-14 " />
              <h1 className="text-white text-lg [@media(max-width:381px)]:hidden sm:text-3xl md:text-3xl lg:text-2xl font-bold">SENAuthenticator</h1>
            </div>
          </div>
          <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">Bienvenido!</h1>
          <p className="text-purple-300 mb-6 text-lg mt-16">
            El reconocimiento facial ofrece una forma segura y cómoda de autenticación. 
            Al utilizar las características únicas de cada rostro, esta tecnología permite un acceso rápido y preciso.
          </p>
          <p className="inline-block text-white hover:text-blue-400 text-lg">Leer más...</p>
        </div>
        <div className="w-full lg:w-1/3 bg-purple-700 p-6 lg:p-10 rounded-3xl">
          <h2 className="text-white text-3xl sm:text-4xl lg:text-3xl font-bold mb-8 text-center">Iniciar sesión</h2>
          <form onSubmit={enviarForm}>
            <div className="mb-6">
              <label className="block text-purple-300 mb-2 text-lg" htmlFor="selection">Tipo de identificación</label>
              <div className="relative">
                <select
                  className={`w-full p-3 rounded bg-purple-600 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 ${errors.tipoId ? 'border-red-500' : ''}`}
                  id="selection"
                  value={tipoId}
                  onChange={handleChangeTipoId}
                >
                  <option value="">Seleccionar...</option>
                  <option value="Tarjeta de Identidad">Tarjeta de Identidad</option>
                  <option value="Cedula de ciudadania">Cedula de ciudadania</option>
                  <option value="Cedula de extranjeria">Cedula de extranjeria</option>
                </select>
                {errors.tipoId && <p className="text-red-500 text-sm">{errors.tipoId}</p>}
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <i className="fas fa-chevron-down text-white"></i>
                </div>
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-purple-300 mb-2 text-lg" htmlFor="username">Número identificación</label>
              <div className="relative">
                <input
                  className={`w-full p-3 rounded bg-purple-600 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 ${errors.numId ? 'border-red-500' : ''}`}
                  id="username"
                  type="number"
                  placeholder="Identificación"
                  value={numId}
                  onChange={handleChangeNumId}
                />
                {errors.numId && <p className="text-red-500 text-sm">{errors.numId}</p>}
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <i className="fas fa-address-book text-white"></i>
                </div>
              </div>
            </div>
            <div className="mb-8">
              <label className="block text-purple-300 mb-2 text-lg" htmlFor="password">Contraseña</label>
              <div className="relative">
                <input
                  className={`w-full p-3 rounded bg-purple-600 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 ${errors.contraseña ? 'border-red-500' : ''}`}
                  id="password"
                  type="password"
                  placeholder="Contraseña"
                  value={contraseña}
                  onChange={handleChangeContraseña}
                />
                {errors.contraseña && <p className="text-red-500 text-sm">{errors.contraseña}</p>}
                {errorsBack && <p className="text-red-500 text-sm">{errorsBack}</p>}
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <i className="fas fa-lock text-white"></i>
                </div>
              </div>
            </div>
            <button
              className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white p-3 rounded-full text-lg"
              type="submit"
            >
              Entrar
            </button>
            <div className="flex justify-around mt-6 text-white text-2xl">
              <a href="#"><i className="fab fa-facebook-f"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-pinterest-p"></i></a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

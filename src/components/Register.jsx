import React, { useState } from "react";
import { useAuth } from "../auth/authProvider";
import { Navigate, useNavigate } from "react-router-dom";

const Register = () => {
  // confirmar si la contraseña coincide;
  const [passwordError, setPasswordError] = useState("");

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [tipoId, setTipoId] = useState("");
  const [numId, setNumId] = useState("");
  const [genero, setGenero] = useState("");
  const [rol, setRol] = useState("");
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");

  // hooks
  const Autenticador = useAuth();
  const navegar=useNavigate()


  

  const validarContraseña = (e) => {

    if (e.target.value !== contraseña) {
      setPasswordError("La contraseña no coincide");
    } else {
      setPasswordError("");
    }
  };


  // verifica si el usuario ya esta autenticado, y si lo esta
  // no sele permite salir de la ruta, al login porque debe de caducar la autenticacion
  // if (Autenticador.isAuthenticated) {
  //   return <Navigate to="/inicioInstructor" />;
  // }

  const enviarForm = async (e) => {
    e.preventDefault();
    
    try {
      // Accede al primer nombre para asignarlo como username
      const userName = nombre.split(' ')[0];
  
      const response = await fetch("http://127.0.0.1:8000/senauthenticator/usuario/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "username": userName,
          "first_name": nombre,
          "last_name": apellido,
          "tipo_documento_usuario": tipoId,
          "numero_documento_usuario": numId,
          "genero_usuario": genero,
          "email": correo,
          "password": contraseña,
          "rol_usuario": rol,
        }),
      });
  
      const data = await response.json(); // Extrae el cuerpo de la respuesta en formato JSON
  
      if (response.ok || response.status === 201) {
        console.log("Usuario creado correctamente");
        alert( "Usuario creado correctamente");
        navegar("/");
      } else {
        // Muestra el mensaje de error extraído del cuerpo de la respuesta
        console.log(data.error || "Ocurrió un error desconocido");
        alert(data.error || "Ocurrió un error desconocido"); // Muestra el error en una alerta
      }
  
    } catch (error) {
      console.log(error);
      alert("Error en la solicitud: " + error.message); // Muestra el error en una alerta
    }
  };
  

  return (
    <div
      className=" min-h-screen flex items-center justify-center py-12"
   
    >
      <div className="  mx-auto w-[100%] ">
        <div className="bg-white  bg-opacity-90 border border-black shadow-lg rounded-lg p-8 max-w-2xl mx-auto">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 font-serif text-center">
            Crea tu cuenta.
          </h2>
          <form className="space-y-6" onSubmit={enviarForm}>
            <div className="">
              <div className="md:col-span-1">
                <label
                  className="block text-sm font-medium text-blue-800"
                  htmlFor="first-name"
                >
                  Nombres:
                </label>
                <input
                  className="mt-1 block w-full bg-gray-50 border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  id="first-name"
                  type="text"
                  required
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </div>
              <div className="md:col-span-1">
                <label
                  className="block text-sm font-medium text-blue-800"
                  htmlFor="last-name"
                >
                  Apellidos:
                </label>
                <input
                  className="mt-1 block w-full bg-gray-50 border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  id="last-name"
                  type="text"
                  required
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                />
              </div>
              <div className="md:col-span-1">
                <label
                  className="block text-sm font-medium text-blue-800"
                  htmlFor="id-type"
                >
                  Tipo de identificación
                </label>
                <select
                  className="mt-1 block w-full bg-gray-50 border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  id="id-type"
                  required
                  value={tipoId}
                  onChange={(e) => setTipoId(e.target.value)}
                >
                  <option value="">Seleccionar...</option>
                  <option value="Tarjeta de Identidad">
                    Targeta de Identidad
                  </option>
                  <option value="Cedula de ciudadania">Cedula de ciudadania</option>
                  <option value="Cedula de extranjeria">Cedula de extranjeria</option>
                </select>
              </div>
              <div className="md:col-span-1">
                <label
                  className="block text-sm font-medium text-blue-800"
                  htmlFor="id-number"
                >
                  Número de identificación
                </label>
                <input
                  className="mt-1 block w-full bg-gray-50 border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  id="id-number"
                  type="number"
                  required
                  value={numId}
                  onChange={(e) => setNumId(e.target.value)}
                />
              </div>
              <div className="md:col-span-1">
                <label
                  className="block text-sm font-medium text-blue-800"
                  htmlFor="gender"
                >
                  Género
                </label>
                <select
                  className="mt-1 block w-full bg-gray-50 border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  id="gender"
                  required
                  value={genero}
                  onChange={(e) => setGenero(e.target.value)}
                >
                  <option value="">Seleccionar...</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Femenino">Femenino</option>
                </select>
              </div>
              <div className="md:col-span-1">
                <label
                  className="block text-sm font-medium text-blue-800"
                  htmlFor="rol"
                >
                  Rol
                </label>
                <select
                  className="mt-1 block w-full bg-gray-50 border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  id="rol"
                  required
                  value={rol}
                  onChange={(e) => setRol(e.target.value)}
                >
                  <option value="">Seleccionar...</option>
                  <option value="Instructor">Instructor</option>
                  <option value="Aprendiz">Aprendiz</option>
                  <option value="Administrador">Administrador</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label
                  className="block text-sm font-medium text-blue-800"
                  htmlFor="email"
                >
                  Correo
                </label>
                <input
                  className="mt-1 block w-full bg-gray-50 border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  id="email"
                  type="email"
                  required
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                />
              </div>
              <div className="md:col-span-1">
                <label
                  className="block text-sm font-medium text-blue-800"
                  htmlFor="password"
                >
                  Contraseña
                </label>
                <input
                  className="mt-1 block w-full bg-gray-50 border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  id="password"
                  type="password"
                  value={contraseña}
                  onChange={(e) => setContraseña(e.target.value)}
                  required
                />
              </div>
              <div className="md:col-span-1">
                <label
                  className="block text-sm font-medium text-blue-800"
                  htmlFor="confirm-password"
                >
                  Confirmar Contraseña
                </label>
                <input
                  className="mt-1 block w-full bg-gray-50 border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  id="confirm-password"
                  type="password"
                  onChange={validarContraseña}
                  required
                />
                {passwordError && (
                  <p className="text-red-500 text-xs mt-1">{passwordError}</p>
                )}
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                className="bg-indigo-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                type="submit"
              >
                Crear
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

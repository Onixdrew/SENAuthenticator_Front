import React, { useState } from "react";
import { useAuth } from "../auth/authProvider";
import { Navigate, useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Register = ({ cerrarModal2, datosRegister2 }) => {
  const [passwordError, setPasswordError] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [tipoId, setTipoId] = useState("");
  const [numId, setNumId] = useState("");
  const [genero, setGenero] = useState("");
  const [rol, setRol] = useState("");
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");

  const Autenticador = useAuth();
  const navegar = useNavigate();

  const validarContraseña = (e) => {
    if (e.target.value !== contraseña) {
      setPasswordError("La contraseña no coincide");
    } else {
      setPasswordError("");
    }
  };

  const enviarForm = async (e) => {
    e.preventDefault();
    try {
      const userName = nombre.split(" ")[0];
      const response = await fetch(
        "http://127.0.0.1:8000/senauthenticator/usuario/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: userName,
            first_name: nombre,
            last_name: apellido,
            tipo_documento_usuario: tipoId,
            numero_documento_usuario: numId,
            genero_usuario: genero,
            email: correo,
            password: contraseña,
            rol_usuario: rol,
          }),
        }
      );

      const data = await response.json();

      if (response.ok || response.status === 201) {
        alert("Usuario creado correctamente");
        enviarDatosLogin(data)
        // se cierra el modal
        cerrarModalProp(false)
        
      } else {
        alert(data.error || "Ocurrió un error desconocido");
      }
    } catch (error) {
      alert("Error en la solicitud: " + error.message);
    }
  };

  const cerrarModalProp = (cerrarModal) => {
    cerrarModal2(cerrarModal);
  };


  const enviarDatosLogin=(datos)=>{
    datosRegister2(datos);
  };

  return (
    <div className="w-full [@media(max-width:1024px)]:max-w-4xl [@media(max-width:768px)]:max-w-xl  md:max-w-2xl lg:max-w-6xl p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6 font-serif text-center">
          Crea tu cuenta
        </h2>
        <button onClick={() => cerrarModalProp(false)} className="text-xl">
          <i className="fas fa-times text-black hover:text-gray-400"></i>
        </button>
      </div>
      <form className="space-y-6" onSubmit={enviarForm}>
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-y-7  lg:gap-x-10 md:gap-x-10  lg:gap-y-10">
          <div>
            <label className="block text-sm font-medium text-blue-800" htmlFor="first-name">
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
          <div>
            <label className="block text-sm font-medium text-blue-800" htmlFor="last-name">
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
          <div>
            <label className="block text-sm font-medium text-blue-800" htmlFor="id-type">
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
              <option value="Tarjeta de Identidad">Tarjeta de Identidad</option>
              <option value="Cedula de ciudadania">Cédula de ciudadanía</option>
              <option value="Cedula de extranjeria">Cédula de extranjería</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-blue-800" htmlFor="id-number">
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
          <div>
            <label className="block text-sm font-medium text-blue-800" htmlFor="gender">
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
          <div>
            <label className="block text-sm font-medium text-blue-800" htmlFor="rol">
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
          <div>
            <label className="block text-sm font-medium text-blue-800" htmlFor="email">
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
          <div>
            <label className="block text-sm font-medium text-blue-800" htmlFor="password">
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
          <div>
            <label className="block text-sm font-medium text-blue-800" htmlFor="confirm-password">
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
  );
};

export default Register;

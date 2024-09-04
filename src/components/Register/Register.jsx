import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
// import { registerUser } from "../../api/userController";
import { useAuth } from "../../Context/AuthContext";

const Register = ({ cerrarModal2 }) => {
  const [passwordError, setPasswordError] = useState("");
  const [nombre, setNombre] = useState("");
  const [tipoId, setTipoId] = useState("");
  const [numId, setNumId] = useState("");
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");

  const { register } = useAuth();

  const validarContraseña = (e) => {
    if (e.target.value !== contraseña) {
      setPasswordError("La contraseña no coincide");
    } else {
      setPasswordError("");
    }
  };

  const enviarForm = async (e) => {
    e.preventDefault();

    const data = {
      nombre: nombre,
      tipoId: tipoId,
      numId: numId,
      correo: correo,
      contraseña: contraseña,
    };

    const response = await register(data);

    // const response = await registerUser(data,
    //   enviarDatosLogin
    // );
    console.log(`Hola desde el  register:  ${response}`);

    if (response.status === 201 || response.status === 200) {
      // se cierra el modal
      cerrarModalProp(false);
    }
  };

  const cerrarModalProp = (cerrarModal) => {
    cerrarModal2(cerrarModal);
  };

  // const enviarDatosLogin = (datos) => {
  //   datosRegister2(datos);
  // };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white p-6 overflow-auto rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-3xl mx-auto font-semibold text-gray-800 ">
            Registrarse
          </h2>
          <button
            onClick={() => cerrarModalProp(false)}
            className="text-xl text-black hover:text-gray-400"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
        <form className="space-y-6 p-10" onSubmit={enviarForm}>
          <div className="flex flex-col md:gap-y-7 lg:gap-x-10 md:gap-x-10 lg:gap-y-10">
            <div>
              <label
                className="block text-sm font-medium text-gray-600"
                htmlFor="first-name"
              >
                Nombre Completo:
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
              <label
                className="block text-sm font-medium text-gray-600"
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
                  Tarjeta de Identidad
                </option>
                <option value="Cedula de ciudadania">
                  Cédula de ciudadanía
                </option>
                <option value="Cedula de extranjeria">
                  Cédula de extranjería
                </option>
              </select>
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-600"
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

            <div>
              <label
                className="block text-sm font-medium text-gray-600"
                htmlFor="email"
              >
                Correo electrónico
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
              <label
                className="block text-sm font-medium text-gray-600"
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
            <div>
              <label
                className="block text-sm font-medium text-gray-600"
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
              className="bg-[rgb(39,169,0)] text-white px-4 py-2 rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              type="submit"
            >
              Aceptar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;

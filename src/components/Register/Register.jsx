import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useForm } from "react-hook-form";
import { registerUser } from "../../api/userController";
import { toast } from 'react-hot-toast';

const Register = ({ cerrarModal }) => {
  const [passwordError, setPasswordError] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [datosForm, setDatosForm] = useState();

  // hooks de react-hook-form
  const { register, handleSubmit } = useForm();

  const validarContraseña = (e) => {
    if (e.target.value !== contraseña) {
      setPasswordError("La contraseña no coincide");
    } else {
      setPasswordError("");
    }
  };

  const enviarForm = handleSubmit(async (values,e) => {
    e.preventDefault();
    setDatosForm(values);

    // const response = await registerForm(data);
    const response = await registerUser(values);

    if (response.status === 201 || response.status === 200) {
      // se cierra el modal
      cerrarModalProp(false);
    }
  });

  const cerrarModalProp = (valorBool) => {
    cerrarModal(valorBool);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white p-6 overflow-auto rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-3xl mx-auto font-semibold text-gray-800 ">
            Registrarse
          </h2>
          <button
            onClick={() => cerrarModalProp(false)}
            className=" text-black inline-block btn btn-sm btn-outline btn-circle "
          >
            <i className="fas fa-times text-lg  "></i>
          </button>
        </div>
        <form className="space-y-6 p-10 " onSubmit={enviarForm}>
          <div className="flex flex-col  [@media(max-width:767px)]:space-y-6 md:gap-y-7 lg:gap-x-10 md:gap-x-10 lg:gap-y-10">
            <div>
              <label
                className="block text-sm font-medium text-gray-600"
                htmlFor="first_name"
              >
                Nombre Completo:
              </label>
              <input
                className="mt-1 block w-full bg-gray-50 border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                id="first_name"
                type="text"
                required
                {...register("nombre", { required: true })}
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
                {...register("tipoID", { required: true })}
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
                htmlFor="nuemro_documento_usuario"
              >
                Número de identificación
              </label>
              <input
                className="mt-1 block w-full bg-gray-50 border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                id="nuemro_documento_usuario"
                type="number"
                required
                {...register("numID", { required: true })}
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
                {...register("correo", { required: true })}
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
                {...register("password", { required: true })}
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
              className="btn rounded-box bg-[rgb(39,169,0)] text-white px-4 py-2 rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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

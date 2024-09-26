import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

const ModalClave = ({ cerrarModal }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("https://backendsenauthenticator.up.railway.app/api/usuarios/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success('Correo de restablecimiento enviado. Revisa tu bandeja de entrada.', {
          duration: 4000,
          position: "top-center",
        });
        cerrarModal(false); // Cierra el modal después de enviar el correo
      } else {
        toast.error('No se encontró un usuario con ese correo.', {
          duration: 4000,
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error('Error al enviar el correo. Inténtalo más tarde.', {
        duration: 4000,
        position: "top-center",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white md:max-w-md w-full mx-auto p-8 rounded-lg shadow-lg border border-gray-300 relative">
        <button
          onClick={() => cerrarModal(false)}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <i className="fas fa-times text-2xl"></i> {/* Font Awesome X icon */}
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center">¿Olvidaste tu contraseña?</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-lg font-medium mb-2">Correo electrónico</label>
            <input
              className={`w-full p-3 rounded border ${errors.email ? "border-red-500" : "border-gray-300"}`}
              type="email"
              {...register('email', { required: "Este campo es obligatorio" })}
              placeholder="Ingresa tu correo"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full p-3 bg-green-500 text-white rounded-lg hover:bg-green-700 transition duration-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Enviando..." : "Enviar correo"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalClave;

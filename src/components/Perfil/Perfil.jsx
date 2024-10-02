import React, { useEffect, useState  } from "react";
import "./media/perfil.css";
import { useAuth } from "../../Context/AuthContext";
import { useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { FaUserEdit } from 'react-icons/fa';

const Perfil = () => {
  const [avatar, setAvatar] = useState('https://via.placeholder.com/150');
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('johndoe@example.com');
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);
  const [newAvatar, setNewAvatar] = useState(null);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewAvatar(URL.createObjectURL(file));
    }
  };

  const handleSaveAvatar = () => {
    setAvatar(newAvatar);
    setIsEditingAvatar(false);
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-lg max-w-md mx-auto mt-10">
      {/* Avatar Section */}
      <div className="relative">
        <img
          src={avatar}
          alt="Avatar"
          className="w-32 h-32 rounded-full object-cover border-2 border-gray-300"
        />
        <button
          className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full"
          onClick={() => setIsEditingAvatar(true)}
        >
          <FaUserEdit />
        </button>
      </div>

      {/* Edit Avatar Modal */}
      {isEditingAvatar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Cambiar Foto</h2>
            <input
              type="file"
              onChange={handleAvatarChange}
              className="mb-4"
            />
            {newAvatar && (
              <div className="mb-4">
                <img
                  src={newAvatar}
                  alt="New Avatar Preview"
                  className="w-24 h-24 rounded-full object-cover"
                />
              </div>
            )}
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
              onClick={handleSaveAvatar}
            >
              Guardar
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => setIsEditingAvatar(false)}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* User Information */}
      <div className="mt-6">
        <h2 className="text-2xl font-semibold">{name}</h2>
        <p className="text-gray-600">{email}</p>
      </div>
    </div>
  );
};

export default Perfil;

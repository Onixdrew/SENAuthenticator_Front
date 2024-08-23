import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login.jsx";
 // Asegúrate de importar Register aquí

import RutasProtegidas from "./auth/authRoutes.jsx";
import AuthProvider from "./auth/authProvider.jsx";

import "./index.css";
import InicioIntructor from "./pages/Instructor/inicioIntructor.jsx";
import ReportesInstructor from "./pages/Instructor/reportesInstructor.jsx";

///////////////////////////

import GuardiaHome from "./pages/Guarda/GuardaHome.jsx";
import Sobrenosotros from "./pages/Guarda/Sobrenosotros.jsx";
import InicioGuardia from "./pages/Guarda/RegistroPersona.jsx";

// Define las rutas
const router = createBrowserRouter([
  // Ruta Principal
  { path: "/", element: <Login /> },
  
  // Ruta para el registro
  { path: "/volver", element: <Login /> }, // Agrega esta línea para la ruta de registro
  
  // Rutas protegidas
  {
    path: "/",
    element: <RutasProtegidas />,
    children: [
      {
        path: "/inicioInstructor",
        element: <InicioIntructor />,
      },
      {
        path: "/ReportesInstructor",
        element: <ReportesInstructor />,
      },
      // Rutas Guarda de Seguridad
      {
        path: "/InicioGuardia",
        element: <GuardiaHome />,
      },
      {
        path: "/ReconocimientoGuardia",
        element: <InicioGuardia />,
      },
      {
        path: "/Mas",
        element: <Sobrenosotros />,
      }
    ],
  },
]);

// Renderiza la aplicación
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);

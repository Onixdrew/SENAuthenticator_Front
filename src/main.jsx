import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login.jsx";

import RutasProtegidas from "./auth/authRoutes.jsx";
import AuthProvider from "./auth/authProvider.jsx";
import Register from "./components/Register.jsx";

import "./index.css";
import InicioIntructor from "./pages/Instructor/inicioIntructor.jsx";
import ReportesInstructor from "./pages/Instructor/reportesInstructor.jsx";

///////////////////////////

import GuardiaHome from "./pages/Guarda/GuardaHome.jsx"
import Sobrenosotros from "./pages/Guarda/Sobrenosotros.jsx";
import InicioGuardia from "./pages/Guarda/RegistroPersona.jsx";


const router = createBrowserRouter([
  // Ruta Principal
  { path: "/", element: <Login /> },
  

  // se llama al archivo rutasProtegidas donde se verifa que exista el
  // usuario para ceder el permiso a las rutas del children
  {
    path: "/",
    element: <RutasProtegidas />,

    children: [
      {
        path: "/inicioInstructor",
        element: <InicioIntructor></InicioIntructor>,
      },
      
      {
        path: "/ReportesInstructor",
        element: <ReportesInstructor></ReportesInstructor>,

      },
//////////////RUTAS GUARDA DE SEGURIDAD////////
      {
        path: "/InicioGuardia", 
        element: <GuardiaHome></GuardiaHome>,
      },
      
      {
        path: "/ReconocimientoGuardia", 
        element: <InicioGuardia></InicioGuardia>,
      },

      {
        path: "/Mas", 
        element: <Sobrenosotros></Sobrenosotros>
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);

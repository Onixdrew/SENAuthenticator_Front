import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RutasProtegidas from "./auth/authRoutes.jsx";
import AuthProvider from "./auth/authProvider.jsx";

import "./index.css";
import InicioIntructor from "./pages/Instructor/inicioIntructor.jsx";
import ReportesInstructor from "./pages/Instructor/reportesInstructor.jsx";

///////////////////////////

import GuardiaHome from "./pages/Guarda/GuardaHome.jsx";
import Sobrenosotros from "./pages/Guarda/Sobrenosotros.jsx";
import InicioGuardia from "./pages/Guarda/RegistroPersona.jsx";
import Login from "./pages/Login/Login.jsx";
import Graficas from "./pages/Instructor/Graficas/graficas.jsx";

const router = createBrowserRouter([
  // Ruta Principal
  { path: "/", element: <Login /> },

  // se llama al archivo rutasProtegidas donde se verifa que exista el
  // usuario para ceder el permiso a las rutas del children
  {
    path: "/",
    element: <RutasProtegidas />,
    children: [
      //////////////RUTAS Instructor////////

      {
        path: "/inicioInstructor",
        element: <InicioIntructor />,
      },

      {
        path: "/ReportesInstructor",
        element: <ReportesInstructor></ReportesInstructor>,
      },
      {
        path: "/ReportesGraficas",
        element: <Graficas></Graficas>
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
        element: <Sobrenosotros></Sobrenosotros>,
      },


      //////////////RUTAS DE ADMINISTRADOR////////
      {
        path: "/InicioGuardia",
        element: <GuardiaHome></GuardiaHome>,
      },

      {
        path: "/ReconocimientoGuardia",
        element: <InicioGuardia></InicioGuardia>,
      },


   
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

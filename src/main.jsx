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
import InicioAdmin from "./pages/Administrador/inicioAdmin.jsx";
import ReportesAdmin from "./pages/Administrador/reportesAdmin.jsx";
import GraficasAdmin from "./pages/Administrador/Graficas/graficas.jsx";
import GraficasInstructor from "./pages/Instructor/Graficas/graficas.jsx";
import Home from "../../SENAuthenticator_Front/src/pages/Inicio/home.jsx";

const router = createBrowserRouter([
  // Ruta Principal
  { path: "/Login", element: <Login /> },
  { path: "/", element: <Home /> },
  
  

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
        path: "/GraficasInstructor",
        element: <GraficasInstructor></GraficasInstructor>
      },

      //////////////RUTAS Administrador///////////

      {
        path: "/inicioAdmin",
        element: <InicioAdmin></InicioAdmin>
      },

      {
        path: "/ReportesAdmin",
        element: <ReportesAdmin></ReportesAdmin>
      },
      {
        path: "/GraficasAdmin",
        element: <GraficasAdmin></GraficasAdmin>
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

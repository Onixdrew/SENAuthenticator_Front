import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import RutasProtegidas from "./auth/authRoutes.jsx";
import AuthProvider from "./auth/authProvider.jsx";


import InicioIntructor from "./pages/interfaces/Instructor/inicioIntructor.jsx";
import ReportesInstructor from "./pages/interfaces/Instructor/reportesInstructor.jsx";

///////////////////////////

import GuardiaHome from "./pages/interfaces/Guarda/GuardaHome.jsx";
import Sobrenosotros from "./pages/interfaces/Guarda/Sobrenosotros.jsx";
import InicioGuardia from "./pages/interfaces/Guarda/RegistroPersona.jsx";
import Login from "./pages/Login/Login.jsx";
import InicioAdmin from "./pages/interfaces/Administrador/inicioAdmin.jsx";
import ReportesAdmin from "./pages/interfaces/Administrador/reportesAdmin.jsx";
import GraficasAdmin from "./pages/interfaces/Administrador/Graficas/graficas.jsx";
import GraficasInstructor from "./pages/interfaces/Instructor/Graficas/graficas.jsx";

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
        element: <InicioIntructor></InicioIntructor>,
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

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);

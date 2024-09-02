// App.jsx
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RutasProtegidas from "./auth/authRoutes.jsx";


import InicioIntructor from "./pages/interfaces/Instructor/inicioIntructor.jsx";
import ReportesInstructor from "./pages/interfaces/Instructor/reportesInstructor.jsx";
import GraficasInstructor from "./pages/interfaces/Instructor/Graficas/graficas.jsx";

import GuardiaHome from "./pages/interfaces/Guarda/GuardaHome.jsx";
import Sobrenosotros from "./pages/interfaces/Guarda/Sobrenosotros.jsx";
import InicioGuardia from "./pages/interfaces/Guarda/RegistroPersona.jsx";
import Login from "./pages/Login/Login.jsx";
import InicioAdmin from "./pages/interfaces/Administrador/inicioAdmin.jsx";
import ReportesAdmin from "./pages/interfaces/Administrador/reportesAdmin.jsx";
import GraficasAdmin from "./pages/interfaces/Administrador/Graficas/graficas.jsx";
import Home from "./pages/Lobby/home.jsx";
import AuthProvider from "./Context/AuthContext.jsx";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/Login", element: <Login /> },

  {
    path: "/",
    element: <RutasProtegidas />,

    children: [
      // Rutas Instructor
      { path: "/inicioInstructor", element: <InicioIntructor /> },
      { path: "/ReportesInstructor", element: <ReportesInstructor /> },
      { path: "/GraficasInstructor", element: <GraficasInstructor /> },

      // Rutas Administrador
      { path: "/inicioAdmin", element: <InicioAdmin /> },
      { path: "/ReportesAdmin", element: <ReportesAdmin /> },
      { path: "/GraficasAdmin", element: <GraficasAdmin /> },

      // Rutas Guardia de Seguridad
      { path: "/InicioGuardia", element: <GuardiaHome /> },
      { path: "/ReconocimientoGuardia", element: <InicioGuardia /> },
      { path: "/Mas", element: <Sobrenosotros /> },
    ],
  },
]);

const App = () => (
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);

export default App;

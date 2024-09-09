// App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
import RutasProtegidas from "./auth/authRoutes.jsx";

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        {/* Publicas */}
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />

        {/* privadas */}
        <Route element={<RutasProtegidas/>}>
          {/* Guardia */}
          <Route path="/InicioGuardia" element={<GuardiaHome />} />
          <Route path="/ReconocimientoGuardia" element={<InicioGuardia />} />
          <Route path="/Mas" element={<Sobrenosotros />} />

          {/* Instructor */}
          <Route path="/inicioInstructor" element={<InicioIntructor />} />
          <Route path="/ReportesInstructor" element={<ReportesInstructor />} />
          <Route path="/GraficasInstructor" element={<GraficasInstructor />} />

          {/* Administrador */}
          <Route path="/inicioAdmin" element={<InicioAdmin />} />
          <Route path="/ReportesAdmin" element={<ReportesAdmin />} />
          <Route path="/GraficasAdmin" element={<GraficasAdmin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

export default App;

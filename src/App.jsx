import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "./Context/AuthContext.jsx";
import RutasProtegidas from "./auth/authRoutes.jsx";




// Importaciones dinámicas
const Perfil = lazy(() =>
  import("./components/Perfil/Perfil.jsx")
);
const CapturaFacial = lazy(() =>
  import("./components/CapturaFacial/capturaFacial.jsx")
);

const InicioIntructor = lazy(() =>
  import("./pages/interfaces/Instructor/inicioIntructor.jsx")
);
const ReportesInstructor = lazy(() =>
  import("./pages/interfaces/Instructor/reportesInstructor.jsx")
);
const GraficasInstructor = lazy(() =>
  import("./pages/interfaces/Instructor/Graficas/graficas.jsx")
);

const GuardiaHome = lazy(() =>
  import("./pages/interfaces/Guarda/GuardaHome.jsx")
);
const Sobrenosotros = lazy(() =>
  import("./pages/interfaces/Guarda/Sobrenosotros.jsx")
);
const InicioGuardia = lazy(() =>
  import("./pages/interfaces/Guarda/RegistroPersona.jsx")
);
const HistorialUser = lazy(() =>
  import("./pages/interfaces/Guarda/historialUser.jsx")
);


const Login = lazy(() => import("./pages/Login/Login.jsx"));
const InicioAdmin = lazy(() =>
  import("./pages/interfaces/Administrador/inicioAdmin.jsx")
);
const ReportesAdmin = lazy(() =>
  import("./pages/interfaces/Administrador/reportesAdmin.jsx")
);
const GraficasAdmin = lazy(() =>
  import("./pages/interfaces/Administrador/Graficas/graficas.jsx")
);
const Home = lazy(() => import("./pages/Lobby/home.jsx"));

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <Suspense>
        <Routes>
          {/* Publicas */}
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />

          {/* <Route path="/" element={<CapturaFacial />} /> */}

          {/* Privadas */}
          <Route element={<RutasProtegidas />}>
            {/* Guardia */}
            <Route path="/InicioGuardia" element={<GuardiaHome />} />
            <Route path="/ReconocimientoGuardia" element={<InicioGuardia />} />
            <Route path="/Mas" element={<Sobrenosotros />} />
            <Route path="/HistorialUser" element={<HistorialUser />} />

            {/* Instructor */}
            <Route path="/inicioInstructor" element={<InicioIntructor />} />
            <Route
              path="/ReportesInstructor"
              element={<ReportesInstructor />}
            />
            <Route
              path="/GraficasInstructor"
              element={<GraficasInstructor />}
            />

            {/* Administrador */}
            <Route path="/inicioAdmin" element={<InicioAdmin />} />
            <Route path="/ReportesAdmin" element={<ReportesAdmin />} />
            <Route path="/GraficasAdmin" element={<GraficasAdmin />} />

            {/* perfil */}
            <Route path="/perfil" element={<Perfil />} />
          </Route>
        </Routes>
      </Suspense>
    </AuthProvider>
  </BrowserRouter>
);

export default App;

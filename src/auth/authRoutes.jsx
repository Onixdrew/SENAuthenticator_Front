import { Outlet,Navigate } from "react-router-dom";
import { useAuth } from "./authProvider";

const RutasProtegidas = () => {
    const Autenticador= useAuth()
        // si esxiste cede el permiso a las rutas,de lo contrario se redirege login
    return Autenticador.isAuthenticated ? <Outlet/>: <Navigate to='/'/>;
}

export default RutasProtegidas
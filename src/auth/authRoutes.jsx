import { Outlet,Navigate } from "react-router-dom";
import { useAuth } from "./authProvider";

const RutasProtegidas = () => {
    const Autenticador= useAuth()
        // si esxiste cede el permiso, si no se redirege login
    return Autenticador.isAuthenticated ? <Outlet/>: <Navigate to='/'/>;
}

export default RutasProtegidas
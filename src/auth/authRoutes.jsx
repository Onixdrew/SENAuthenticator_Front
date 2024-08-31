import { Outlet,Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";


const RutasProtegidas = () => {
    const {isAuthenticated}= useAuth()
        // si esxiste cede el permiso a las rutas,de lo contrario se redirege login
    return isAuthenticated ? <Outlet/>: <Navigate to='/'/>;
}

export default RutasProtegidas
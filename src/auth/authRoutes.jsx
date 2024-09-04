import { Outlet,Navigate, replace } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";





const RutasProtegidas = () => {
    const {isAuthenticated} = useAuth();
    // const  token = localStorage.getItem('Token');
    
    // si esxiste cede el permiso a las rutas,de lo contrario se redirege login
    return isAuthenticated? <Outlet/>: <Navigate to='/Login' replace/>;

    // Permiso con el token del local.
    // return  token ? <Outlet/>: <Navigate to='/Login'/>;
}

export default RutasProtegidas;
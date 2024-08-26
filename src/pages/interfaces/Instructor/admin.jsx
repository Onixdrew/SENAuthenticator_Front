import React from 'react'
import { useAuth } from '../../auth/authProvider';


const Admin = () => {

  // traer rol de la bd del user para comprobar
  const rol2="Administrador"

  const Autenticador = useAuth();
  
 

  return (
    <>
    {/*  se valida si esta autenticado y si el rol pertenece a esta pagina */}
    {Autenticador.isAuthenticated && rol2 === "Administrador" ? (
        <h1 className='text-2xl  text-green-500'>Bienvenido, Administrador!</h1>
      ) : (
        <p className="text-red-500">Error: No tienes permiso para acceder a esta página.</p>
      )
    }
    
    </>
    

    
  )
}

export default Admin
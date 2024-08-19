import React from 'react'
import Navbar from '../../components/Navbar'
import { useAuth } from '../../auth/authProvider';
import { useNavigate } from 'react-router-dom';

const InicioIntructor = () => {
  return (
    <div >

        <Navbar
        item1="inicio"
        item2="Reportes"
        item3=""
        ruta1=""
        ruta2="/ReportesInstructor"
        ruta3=""
        color="activo"
        ></Navbar>

        <h1 className='text-2xl font-bold text-center mt-10'>Inicio Instructor </h1>
    </div>

  )
}

export default InicioIntructor
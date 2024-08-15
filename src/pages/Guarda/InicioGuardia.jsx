import React from 'react'
import Navbar from '../../components/Navbar'

const inicio = () => {
  return (
    
    <div >
            <Navbar
                item1="Inicio"
                item2="REGISTRO FACIAL"
                item3="MAS"
                ruta1="/InicioGuardia"
                ruta2="/ReconocimientoGuardia"
                ruta3="/Mas"
                color=""  >
            </Navbar>

            <div>
              cosas externas 
            </div>
    </div>

  )
}

export default inicio
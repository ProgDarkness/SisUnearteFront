import { useState } from 'react'
import RegistroCarrera from 'pages/CargaMallaCurricularComps/registroCarrera'
import CargarMalla from 'pages/CargaMallaCurricularComps/cargarMalla'

const CargaMallaCurricular = () => {
  const vistas = {
    cargarMalla: true,
    registrarCarrera: false
  }

  const [vistasInternas, setVistasInternas] = useState(vistas)

  return (
    <>
      {vistasInternas?.cargarMalla && (
        <CargarMalla cambioVista={setVistasInternas} />
      )}
      {vistasInternas?.registrarCarrera && (
        <RegistroCarrera cambioVista={setVistasInternas} />
      )}
    </>
  )
}

export default CargaMallaCurricular

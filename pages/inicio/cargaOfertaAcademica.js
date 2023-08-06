import { InputText } from 'primereact/inputtext'
import { useState } from 'react'
import RegistroCarrera from 'pages/componentesCargaOferta/registroCarrera'
import CargarOferta from 'pages/componentesCargaOferta/cargarOferta'

const CargaOfertaAcademica = () => {
  const vistas = {
    cargarOferta: true,
    registrarCarrera: false
  }

  const [vistasInternas, setVistasInternas] = useState(vistas)

  return (
    <>
      {vistasInternas?.cargarOferta && (
        <CargarOferta cambioVista={setVistasInternas} />
      )}
      {vistasInternas?.registrarCarrera && (
        <RegistroCarrera cambioVista={setVistasInternas} />
      )}
    </>
  )
}

export default CargaOfertaAcademica

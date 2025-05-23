import { useState } from 'react'
import RegOfertaAcademica from 'pages/regOfertaAcademicaComps/initRegOferta'
import RegistrarOferta from 'pages/regOfertaAcademicaComps/segunRegOferta'

const CargaMallaCurricular = () => {
  const vistas = {
    ofertasAcademicas: true,
    registrarOferta: false
  }

  const [vistasInternas, setVistasInternas] = useState(vistas)

  return (
    <>
      {vistasInternas?.registrarOferta && (
        <RegistrarOferta cambioVista={setVistasInternas} />
      )}
      {vistasInternas?.ofertasAcademicas && (
        <RegOfertaAcademica cambioVista={setVistasInternas} />
      )}
    </>
  )
}

export default CargaMallaCurricular

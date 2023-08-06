import AppLayoutMenu from 'components/AppLayoutMenu'
import AppLayout from 'components/AppLayout'
import { useSesion } from 'hooks/useSesion'
import { Card } from 'primereact/card'
import { useState, createContext } from 'react'
import Image from 'next/image'
import imageInicio from '../../public/images/inicio.png'
import InscripcionElectiva from './inscripcionElectiva'
import Postulaciones from './postulaciones'
import CargaOfertaAcademica from './cargaOfertaAcademica'

const VistasContext = createContext({})

export default function index() {
  const { token, error } = useSesion()
  const templateContext = {
    inscripcionElectiva: false,
    inscripcionesRegulares: false,
    postulaciones: false,
    cargaOfertaAcademica: false
  }
  const [mostrarVistas, setMostrarVistas] = useState(templateContext)

  const valuesContext = {
    mostrarVistas,
    setMostrarVistas
  }

  const hasAnyTrue = () => {
    return Object.values(mostrarVistas).some((value) => value === true)
  }

  if (!token && !error) {
    return (
      <AppLayout>
        <div className="w-full h-full -mt-20">
          <Card className="w-[95%] h-full mx-auto text-center bg-[#ae8e8e]">
            <h1 className="text-white font-extrabold text-6xl my-[10%]">
              Cargando...
            </h1>
          </Card>
        </div>
      </AppLayout>
    )
  } else {
    return (
      <VistasContext.Provider value={valuesContext}>
        <AppLayoutMenu>
          <div className="w-full h-full">
            <Card className="w-full h-[80vh] -mt-16 bg-[#ae8e8e] overflow-y-scroll ocultarScroll">
              {!hasAnyTrue() && (
                <div className="w-full h-full">
                  <div className="mx-[15%] mt-4">
                    <Image src={imageInicio} width={850} height={450} />
                  </div>
                </div>
              )}
              {mostrarVistas?.inscripcionElectiva && <InscripcionElectiva />}
              {mostrarVistas?.postulaciones && <Postulaciones />}
              {mostrarVistas?.cargaOfertaAcademica && <CargaOfertaAcademica />}
            </Card>
            {/* eslint-disable-next-line react/no-unknown-property */}
            <style jsx global>{`
              .ocultarScroll::-webkit-scrollbar {
                width: 0;
                height: 0;
              }
              .p-button:enabled:hover,
              .p-button:not(button):not(a):not(.p-disabled):hover {
                background: #88250e;
                color: #ffffff;
                border-color: transparent;
              }
              .p-button:enabled:active,
              .p-button:not(button):not(a):not(.p-disabled):active {
                background: rgb(204 57 23 / 75%);
              }
              .p-button:enabled:focus,
              .p-button:not(button):not(a):not(.p-disabled):focus {
                background: rgb(187 76 23 / 92%);
              }
            `}</style>
          </div>
        </AppLayoutMenu>
      </VistasContext.Provider>
    )
  }
}

export { VistasContext }

import AppLayout from 'components/AppLayout'
import { VistasContext } from 'pages/inicio'
import { useContext } from 'react'

export default function Index({ children, verMenu = true }) {
  const { mostrarVistas, setMostrarVistas } = useContext(VistasContext)

  return (
    <AppLayout>
      <div className="flex flex-row items-stretch w-full h-full">
        <div className="basis-[10rem] -mt-24 bg-[#805e5e] mr-3 p-2">
          <div className="bg-[#ae8e8e9e] h-full w-full rounded-md text-center p-2">
            <h1
              className={`text-white font-medium text-sm rounded-md mt-2 cursor-pointer hover:bg-[#805e5e] ${
                mostrarVistas?.registroPrevio ? 'bg-[#805e5e]' : 'bg-[#ae8e8e]'
              }`}
              onClick={() => {
                const newVistas = {
                  [`registroPrevio`]: !mostrarVistas?.registroPrevio
                }
                setMostrarVistas((prevState) => ({
                  ...prevState,
                  ...newVistas,
                  ...Object.keys(prevState).reduce((acc, key) => {
                    if (key !== 'registroPrevio') acc[key] = false
                    return acc
                  }, {})
                }))
              }}
            >
              Registro Previo
            </h1>
            <h1
              className={`text-white font-medium rounded-md mt-2 cursor-pointer hover:bg-[#805e5e] ${
                mostrarVistas?.postulaciones ? 'bg-[#805e5e]' : 'bg-[#ae8e8e]'
              }`}
              onClick={() => {
                const newVistas = {
                  [`postulaciones`]: !mostrarVistas?.postulaciones
                }
                setMostrarVistas((prevState) => ({
                  ...prevState,
                  ...newVistas,
                  ...Object.keys(prevState).reduce((acc, key) => {
                    if (key !== 'postulaciones') acc[key] = false
                    return acc
                  }, {})
                }))
              }}
            >
              Postulacion
            </h1>
            <h1
              className={`text-white font-medium rounded-md mt-2 cursor-pointer hover:bg-[#805e5e] ${
                mostrarVistas?.gestionDePostulaciones
                  ? 'bg-[#805e5e]'
                  : 'bg-[#ae8e8e]'
              }`}
              onClick={() => {
                const newVistas = {
                  [`gestionDePostulaciones`]:
                    !mostrarVistas?.gestionDePostulaciones
                }
                setMostrarVistas((prevState) => ({
                  ...prevState,
                  ...newVistas,
                  ...Object.keys(prevState).reduce((acc, key) => {
                    if (key !== 'gestionDePostulaciones') acc[key] = false
                    return acc
                  }, {})
                }))
              }}
            >
              Gestion De Postulaciones
            </h1>
            <h1
              className={`text-white font-medium text-sm rounded-md mt-2 cursor-pointer hover:bg-[#805e5e] ${
                mostrarVistas?.cargaMallaCurricular
                  ? 'bg-[#805e5e]'
                  : 'bg-[#ae8e8e]'
              }`}
              onClick={() => {
                const newVistas = {
                  [`cargaMallaCurricular`]: !mostrarVistas?.cargaMallaCurricular
                }
                setMostrarVistas((prevState) => ({
                  ...prevState,
                  ...newVistas,
                  ...Object.keys(prevState).reduce((acc, key) => {
                    if (key !== 'cargaMallaCurricular') acc[key] = false
                    return acc
                  }, {})
                }))
              }}
            >
              Carga de Malla Curricular
            </h1>
            <h1
              className={`text-white font-medium text-sm rounded-md mt-2 cursor-pointer hover:bg-[#805e5e] ${
                mostrarVistas?.regOfertaAcademica
                  ? 'bg-[#805e5e]'
                  : 'bg-[#ae8e8e]'
              }`}
              onClick={() => {
                const newVistas = {
                  [`regOfertaAcademica`]: !mostrarVistas?.regOfertaAcademica
                }
                setMostrarVistas((prevState) => ({
                  ...prevState,
                  ...newVistas,
                  ...Object.keys(prevState).reduce((acc, key) => {
                    if (key !== 'regOfertaAcademica') acc[key] = false
                    return acc
                  }, {})
                }))
              }}
            >
              Registro Oferta Academica
            </h1>
            <h1
              className={`text-white font-medium rounded-md mt-2 cursor-pointer hover:bg-[#805e5e] ${
                mostrarVistas?.inscripcionesRegulares
                  ? 'bg-[#805e5e]'
                  : 'bg-[#ae8e8e]'
              }`}
              onClick={() => {
                const newVistas = {
                  [`inscripcionesRegulares`]:
                    !mostrarVistas?.inscripcionesRegulares
                }
                setMostrarVistas((prevState) => ({
                  ...prevState,
                  ...newVistas,
                  ...Object.keys(prevState).reduce((acc, key) => {
                    if (key !== 'inscripcionesRegulares') acc[key] = false
                    return acc
                  }, {})
                }))
              }}
            >
              Inscripcion Regular
            </h1>
            <h1
              className={`text-white font-medium rounded-md mt-2 cursor-pointer hover:bg-[#805e5e] ${
                mostrarVistas?.inscripcionElectiva
                  ? 'bg-[#805e5e]'
                  : 'bg-[#ae8e8e]'
              }`}
              onClick={() => {
                const newVistas = {
                  [`inscripcionElectiva`]: !mostrarVistas?.inscripcionElectiva
                }
                setMostrarVistas((prevState) => ({
                  ...prevState,
                  ...newVistas,
                  ...Object.keys(prevState).reduce((acc, key) => {
                    if (key !== 'inscripcionElectiva') acc[key] = false
                    return acc
                  }, {})
                }))
              }}
            >
              Inscripcion Electiva
            </h1>
          </div>
        </div>
        <div className="w-full">{children}</div>
      </div>
    </AppLayout>
  )
}

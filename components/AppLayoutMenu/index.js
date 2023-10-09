import AppLayout from 'components/AppLayout'
import { VistasContext } from 'pages/inicio'
import { useContext } from 'react'
import GQLpostulaciones from 'graphql/postulaciones'
import useSWR from 'swr'
import { useSesion } from 'hooks/useSesion'

export default function Index({ children, verMenu = true }) {
  const { idUser } = useSesion()
  const { mostrarVistas, setMostrarVistas } = useContext(VistasContext)

  const { data: permisoPostulacion } = useSWR(
    idUser ? [GQLpostulaciones.GET_PERMISO_POSTULACION, { idUser }] : null
  )

  return (
    <AppLayout>
      <div className="flex flex-row items-stretch w-full h-full">
        <div className="basis-[10rem] -mt-24 bg-[#805e5e] mr-3 p-2">
          <div className="bg-[#ae8e8e9e] h-full w-full rounded-md text-center p-2 overflow-y-auto">
            <h1
              className={`text-white font-medium text-sm rounded-md mt-2 cursor-pointer hover:bg-[#805e5e] ${
                mostrarVistas?.inicio ? 'bg-[#805e5e]' : 'bg-[#ae8e8e]'
              }`}
              onClick={() => {
                const newVistas = {
                  [`inicio`]: !mostrarVistas?.inicio
                }
                setMostrarVistas((prevState) => ({
                  ...prevState,
                  ...newVistas,
                  ...Object.keys(prevState).reduce((acc, key) => {
                    if (key !== 'inicio') acc[key] = false
                    return acc
                  }, {})
                }))
              }}
            >
              Inicio
            </h1>
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
              className={`text-white font-medium text-sm rounded-md mt-2 cursor-pointer hover:bg-[#805e5e] ${
                mostrarVistas?.gestionDePersonal
                  ? 'bg-[#805e5e]'
                  : 'bg-[#ae8e8e]'
              }`}
              onClick={() => {
                const newVistas = {
                  [`gestionDePersonal`]: !mostrarVistas?.gestionDePersonal
                }
                setMostrarVistas((prevState) => ({
                  ...prevState,
                  ...newVistas,
                  ...Object.keys(prevState).reduce((acc, key) => {
                    if (key !== 'gestionDePersonal') acc[key] = false
                    return acc
                  }, {})
                }))
              }}
            >
              Gestión de Personal
            </h1>
            {permisoPostulacion?.obtenerPermisoPostulacion.response && (
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
                Postulación
              </h1>
            )}
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
              Gestión De Postulaciones
            </h1>
            <h1
              className={`text-white font-medium text-sm rounded-md mt-2 cursor-pointer hover:bg-[#805e5e] ${
                mostrarVistas?.cargaDeMaterias ? 'bg-[#805e5e]' : 'bg-[#ae8e8e]'
              }`}
              onClick={() => {
                const newVistas = {
                  [`cargaDeMaterias`]: !mostrarVistas?.cargaDeMaterias
                }
                setMostrarVistas((prevState) => ({
                  ...prevState,
                  ...newVistas,
                  ...Object.keys(prevState).reduce((acc, key) => {
                    if (key !== 'cargaDeMaterias') acc[key] = false
                    return acc
                  }, {})
                }))
              }}
            >
              Carga de Materias
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
              Registro Oferta Académica
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
              Inscripción Regular
            </h1>
            <h1
              className={`text-white font-medium rounded-md mt-2 cursor-pointer hover:bg-[#805e5e] ${
                mostrarVistas?.gestionElectiva ? 'bg-[#805e5e]' : 'bg-[#ae8e8e]'
              }`}
              onClick={() => {
                const newVistas = {
                  [`gestionElectiva`]: !mostrarVistas?.gestionElectiva
                }
                setMostrarVistas((prevState) => ({
                  ...prevState,
                  ...newVistas,
                  ...Object.keys(prevState).reduce((acc, key) => {
                    if (key !== 'gestionElectiva') acc[key] = false
                    return acc
                  }, {})
                }))
              }}
            >
              Gestión de Electivas
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
              Inscripción Electiva
            </h1>
            <h1
              className={`text-white font-medium rounded-md mt-2 cursor-pointer hover:bg-[#805e5e] ${
                mostrarVistas?.informacionDelEstudiante
                  ? 'bg-[#805e5e]'
                  : 'bg-[#ae8e8e]'
              }`}
              onClick={() => {
                const newVistas = {
                  [`informacionDelEstudiante`]:
                    !mostrarVistas?.informacionDelEstudiante
                }
                setMostrarVistas((prevState) => ({
                  ...prevState,
                  ...newVistas,
                  ...Object.keys(prevState).reduce((acc, key) => {
                    if (key !== 'informacionDelEstudiante') acc[key] = false
                    return acc
                  }, {})
                }))
              }}
            >
              Información Del Estudiante
            </h1>
            <h1
              className={`text-white font-medium text-sm rounded-md mt-2 cursor-pointer hover:bg-[#805e5e] ${
                mostrarVistas?.gestionDeNotas ? 'bg-[#805e5e]' : 'bg-[#ae8e8e]'
              }`}
              onClick={() => {
                const newVistas = {
                  [`gestionDeNotas`]: !mostrarVistas?.gestionDeNotas
                }
                setMostrarVistas((prevState) => ({
                  ...prevState,
                  ...newVistas,
                  ...Object.keys(prevState).reduce((acc, key) => {
                    if (key !== 'gestionDeNotas') acc[key] = false
                    return acc
                  }, {})
                }))
              }}
            >
              Gestión de Notas
            </h1>
            <h1
              className={`text-white font-medium rounded-md mt-2 cursor-pointer hover:bg-[#805e5e] ${
                mostrarVistas?.pruebasImportExport
                  ? 'bg-[#805e5e]'
                  : 'bg-[#ae8e8e]'
              }`}
              onClick={() => {
                const newVistas = {
                  [`pruebasImportExport`]: !mostrarVistas?.pruebasImportExport
                }
                setMostrarVistas((prevState) => ({
                  ...prevState,
                  ...newVistas,
                  ...Object.keys(prevState).reduce((acc, key) => {
                    if (key !== 'pruebasImportExport') acc[key] = false
                    return acc
                  }, {})
                }))
              }}
            >
              Reportes
            </h1>
          </div>
        </div>
        <div className="w-full">{children}</div>
      </div>
    </AppLayout>
  )
}

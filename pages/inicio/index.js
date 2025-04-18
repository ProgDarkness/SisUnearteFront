import AppLayoutMenu from 'components/AppLayoutMenu'
import AppLayout from 'components/AppLayout'
import { useSesion } from 'hooks/useSesion'
import { Card } from 'primereact/card'
import { useState, createContext } from 'react'
import Image from 'next/image'
import imageInicio from '../../public/images/inicio.png'
import InscripcionElectiva from '../gestionDeElectiva/inscripcionElectiva'
import Postulaciones from '../postulacionEstudiante/postulaciones'
import CargaMallaCurricular from '../CargaMallaCurricularComps/cargarMallaCurricular'
import request from 'graphql-request'
import GQLConsultasGenerales from 'graphql/consultasGenerales'
import RegistroPrevio from '../informacionDelEstudianteComps/registroprevio'
import RegOfertaAcademica from '../regOfertaAcademicaComps/registroOfertaAcademica'
import GestionDePostulaciones from '../postulacionEstudiante/gestionDePostulaciones'
import InformacionDelEstudiante from '../informacionDelEstudianteComps/informacionDelEstudiante'
import GestionDePersonal from 'pages/gestionDePersonal/gestionDePersonal'
import GestionElectiva from 'pages/gestionDeElectiva/gestionElectiva'
import RegistrarMateria from 'pages/CargaDeMaterias/registrarMateria'
import InscripcionRegular from 'pages/inscripcionRegular/inscripcion'
import ReportesData from 'pages/importExport/reportes'
import GestionDeNotas from 'pages/gestionNotas/registroNotas'
import ImpresionDeNotas from 'pages/gestionNotas/imprimirNotas'
import ConfiguracionSistema from 'pages/ConfiguracionSistema/configuracion'
import Inicio from './inicio'

const VistasContext = createContext({})

export default function index({ data }) {
  const { token, error } = useSesion()
  const templateContext = {
    inscripcionElectiva: false,
    inscripcionesRegulares: false,
    postulaciones: false,
    cargaMallaCurricular: false,
    cargaDeMaterias: false,
    registroPrevio: false,
    regOfertaAcademica: false,
    gestionDePostulaciones: false,
    informacionDelEstudiante: false,
    pruebasImportExport: false,
    gestionDePersonal: false,
    inicio: true,
    gestionElectiva: false,
    gestionDeNotas: false,
    impresionDeNotas: false,
    configuracionSistema: false
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
                    <Image
                      src={imageInicio}
                      width={850}
                      height={450}
                      loading="eager"
                      priority={true}
                    />
                  </div>
                </div>
              )}
              {mostrarVistas?.inicio && <Inicio />}
              {mostrarVistas?.inscripcionElectiva && <InscripcionElectiva />}
              {mostrarVistas?.inscripcionesRegulares && <InscripcionRegular />}
              {mostrarVistas?.postulaciones && (
                <Postulaciones cambioVista={setMostrarVistas} />
              )}
              {mostrarVistas?.cargaMallaCurricular && <CargaMallaCurricular />}
              {mostrarVistas?.cargaDeMaterias && <RegistrarMateria />}
              {mostrarVistas?.registroPrevio && <RegistroPrevio data={data} />}
              {mostrarVistas?.regOfertaAcademica && <RegOfertaAcademica />}
              {mostrarVistas?.gestionDePostulaciones && (
                <GestionDePostulaciones />
              )}
              {mostrarVistas?.gestionElectiva && <GestionElectiva />}
              {mostrarVistas?.informacionDelEstudiante && (
                <InformacionDelEstudiante />
              )}
              {mostrarVistas?.pruebasImportExport && <ReportesData />}
              {mostrarVistas?.gestionDePersonal && <GestionDePersonal />}
              {mostrarVistas?.gestionDeNotas && <GestionDeNotas />}
              {mostrarVistas?.impresionDeNotas && <ImpresionDeNotas />}
              {mostrarVistas?.configuracionSistema && <ConfiguracionSistema />}
            </Card>
            {/* eslint-disable-next-line react/no-unknown-property */}
            <style jsx global>{`
              ::-webkit-scrollbar {
                display: none;
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

              .p-datatable .p-datatable-thead > tr > th {
                text-align: left;
                padding: 0.75rem 0.75rem;
                border: 1px solid #e4e4e4;
                border-width: 0 0 1px 0;
                font-weight: 500;
                color: rgb(255 255 255);
                background: #ae8e8e;
                transition: none;
              }

              .p-datatable .p-datatable-tbody > tr {
                background: #ae8e8e;
                color: rgb(255 255 255 / 92%);
                transition: none;
              }

              .p-dialog .p-dialog-footer {
                border-top: 0 none;
                background: #ae8e8e;
                color: rgb(255 255 255);
                padding: 0.75rem 1.25rem;
                text-align: right;
                border-bottom-right-radius: 4px;
                border-bottom-left-radius: 4px;
              }

              .p-dialog .p-dialog-content {
                background: #ae8e8e;
                color: rgb(255 255 255 / 87%);
                padding: 0 1.25rem 1.25rem 1.25rem;
              }

              .p-dialog .p-dialog-header {
                border-bottom: 0 none;
                background: #ae8e8e;
                color: rgb(255 254 254 / 87%);
                padding: 1.25rem;
                border-top-right-radius: 4px;
                border-top-left-radius: 4px;
              }

              .p-float-label input:focus ~ label,
              .p-float-label .p-inputwrapper-focus ~ label {
                color: #ffffff;
              }

              .p-float-label input:focus ~ label,
              .p-float-label input.p-filled ~ label,
              .p-float-label textarea:focus ~ label,
              .p-float-label textarea.p-filled ~ label,
              .p-float-label .p-inputwrapper-focus ~ label,
              .p-float-label .p-inputwrapper-filled ~ label {
                top: -0.5rem !important;
                border-radius: 1rem;
                background-color: #3f51b5;
                padding: 2px 4px;
                margin-left: -4px;
                margin-top: 0;
              }

              .p-float-label input:focus ~ label,
              .p-float-label input.p-filled ~ label,
              .p-float-label textarea:focus ~ label,
              .p-float-label textarea.p-filled ~ label,
              .p-float-label .p-inputwrapper-focus ~ label,
              .p-float-label .p-inputwrapper-filled ~ label {
                top: -0.5rem !important;
                -webkit-border-radius: 1rem;
                -moz-border-radius: 1rem;
                border-radius: 1rem;
                background-color: #3f51b5;
                padding: 2px 4px;
                margin-left: -4px;
                margin-top: 0;
                color: white;
              }

              .p-divider.p-divider-horizontal:before {
                border-top: solid 1px rgb(255 255 255);
              }
            `}</style>
          </div>
        </AppLayoutMenu>
      </VistasContext.Provider>
    )
  }
}

export { VistasContext }

export async function getStaticProps() {
  const sexos = await request(
    process.env.NEXT_PUBLIC_URL_BACKEND,
    GQLConsultasGenerales.GET_SEXO
  )

  const nacionalidades = await request(
    process.env.NEXT_PUBLIC_URL_BACKEND,
    GQLConsultasGenerales.GET_NACIONALIDADES
  )

  const discapacidades = await request(
    process.env.NEXT_PUBLIC_URL_BACKEND,
    GQLConsultasGenerales.GET_DISCAPACIDADES
  )

  const paises = await request(
    process.env.NEXT_PUBLIC_URL_BACKEND,
    GQLConsultasGenerales.GET_PAISES
  )

  const estados_civiles = await request(
    process.env.NEXT_PUBLIC_URL_BACKEND,
    GQLConsultasGenerales.GET_ESTADOS_CIVILES
  )

  const tipos_zona = await request(
    process.env.NEXT_PUBLIC_URL_BACKEND,
    GQLConsultasGenerales.GET_TIPO_ZONAS
  )

  const tipos_via = await request(
    process.env.NEXT_PUBLIC_URL_BACKEND,
    GQLConsultasGenerales.GET_TIPO_VIAS
  )

  const tipos_vivienda = await request(
    process.env.NEXT_PUBLIC_URL_BACKEND,
    GQLConsultasGenerales.GET_TIPO_VIVIENDA
  )

  const data = {
    sexos,
    nacionalidades,
    discapacidades,
    paises,
    estados_civiles,
    tipos_zona,
    tipos_via,
    tipos_vivienda
  }

  return {
    props: {
      data
    }
  }
}

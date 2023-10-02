/* import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { DataTable } from 'primereact/datatable' */
import { Divider } from 'primereact/divider'
import Image from 'next/image'
import arte1 from 'public/images/imagenInicio3.png'
/* import { useEffect, useState } from 'react'
import GQLpostulaciones from 'graphql/postulaciones'
import GQLUsuarios from 'graphql/usuarios'
import GQLconsultasGenerales from 'graphql/consultasGenerales'
import useSWR from 'swr'
import { useSesion } from 'hooks/useSesion' */

const Inicio = () => {
  /* const { idUser } = useSesion()
  const [nacionalidad, setNacionalidad] = useState(null)
  const [cedula, setCedula] = useState('')
  const [primer_nombre, setPrimer_Nombre] = useState('')
  const [primer_apellido, setPrimer_Apellido] = useState('')
  const [correoElectronico, setCorreoElectronico] = useState('')

  const { data: infoUser } = useSWR(
    idUser ? [GQLUsuarios.GET_INFO_USER_REG, { id_usuario: idUser }] : null
  )

  const { data: infoPostuUsu } = useSWR(
    [idUser ? GQLpostulaciones.GET_POSTULACION_USUARIO : null, { idUser }],
    { refreshInterval: 1000 }
  )

  const { data: tiposNacionalidad } = useSWR(
    GQLconsultasGenerales.GET_NACIONALIDADES
  )

  useEffect(() => {
    if (infoUser?.getInfoUsuario.response) {
      setNacionalidad(infoUser?.getInfoUsuario.response.nacionalidad)
      setCedula(infoUser?.getInfoUsuario.response.ced_usuario)
      setPrimer_Nombre(infoUser?.getInfoUsuario.response.nb_usuario)
      setPrimer_Apellido(infoUser?.getInfoUsuario.response.ape_usuario)
      setCorreoElectronico(infoUser?.getInfoUsuario.response.correoElectronico)
      setCorreoElectronico(infoUser?.getInfoUsuario.response.correo_usuario)
    }
  }, [infoUser]) */

  /* const accionBodyTemplate = (rowData) => {
    return (
      <div className="flex justify-center">
        <Button
          icon="pi pi-pencil"
          className="p-button-help mr-1"
          tooltip="Inscribir"
          onClick={() => {
            setDatosEditarPersonal(rowData)
            setActiveDialogEditarPersonal(true)
          }}
          tooltipOptions={{ position: 'top' }}
        />
      </div>
    )
  } */

  return (
    <div className="flex flex-col">
      <div className="relative rounded-lg">
        <div className="text-center text-white text-4xl mb-12 mt-4 font-semibold">
          <h1>Universidad Nacional Experimental de las Artes</h1>
        </div>
      </div>
      <div>
        <div className="flex flex-row">
          <div className="tab-content justify-center rounded-lg w-3/5 pr-3 pl-3">
            <h1 className="text-3xl text-white text-center mb-6 -mt-3">
              Notas Informativas
            </h1>
            <div className="text-white -mt-2">
              <p>INSCRIPCIONES:</p>
              <p className="pl-4">
                Fecha de Próximas Inscripciones: 12/10/2023
              </p>
              <p className="pl-4">Núcleo: UNEARTE, Bellas Artes, Caracas</p>
              <Divider />
              <p>CORTE DE NOTAS:</p>
              <p className="pl-4">Fecha de Cierre: 07/10/2023</p>
              <p className="pl-4">Fecha de Corte de Notas: 09/10/2023</p>
              <Divider />
              <p>PERIODO:</p>
              <p className="pl-4">2023-2024</p>
            </div>
          </div>

          <div className="tab-content justify-center py-1 px-3 w-2/5">
            <Image
              src={arte1}
              loading="eager"
              fill="true"
              sizes="(max-width: 30vw) 100%"
              priority={true}
              className="rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Inicio

import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { DataTable } from 'primereact/datatable'
import { Divider } from 'primereact/divider'
import { useEffect, useState } from 'react'
import GQLpostulaciones from 'graphql/postulaciones'
import GQLUsuarios from 'graphql/usuarios'
import GQLconsultasGenerales from 'graphql/consultasGenerales'
import useSWR from 'swr'
import { useSesion } from 'hooks/useSesion'

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
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg background pt-5">
        <h1 className="text-3xl font-semibold text-white text-center mr-32 mb-6 -mt-3">
          Notas Informativas
        </h1>

        <div className="grid grid-cols-5 gap-4 mt-4 p-4">
          <p>0</p>
        </div>
      </div>
      <Divider className="col-span-5" />
      <div>
        <div className="flex flex-row">
          <div className="tab-content justify-center rounded-lg shadow-md p-2 w-3/5">
            <p>1</p>
          </div>

          <div className="tab-content justify-center rounded-lg shadow-md py-1 px-3 bg-gray-200 w-2/5">
            <p>2</p>
          </div>
          {/* eslint-disable-next-line react/no-unknown-property */}
          <style jsx global>{`
            .p-disabled,
            .p-component:disabled {
              opacity: 1;
            }
          `}</style>
        </div>
      </div>
    </div>
  )
}

export default Inicio

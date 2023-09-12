import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { Button } from 'primereact/button'
import { useEffect, useRef, useState } from 'react'
import { Dialog } from 'primereact/dialog'
import GQLpostulaciones from 'graphql/postulaciones'
import request from 'graphql-request'
import { Toast } from 'primereact/toast'

const DialogRechazarPostulacion = ({
  activeDialogRechazarPostulacion,
  setActiveDialogRechazarPostulacion,
  listadoPostulados,
  mutatePostulado,
  setReload
}) => {
  const toast = useRef(null)
  const [tpNacionalidad, setTpNacionalidad] = useState(null)
  const [cedulaPostulado, setCedulaPostulado] = useState('')
  const [nombrePostulado, setNombrePostulado] = useState('')
  const [apellidoPostulado, setApellidoPostulado] = useState('')
  const [carreraPostulado, setCarreraPostulado] = useState('')

  const [txtObservacion, setObservacion] = useState(null)

  const rechazarPostulacion = (variables) => {
    return request(
      process.env.NEXT_PUBLIC_URL_BACKEND,
      GQLpostulaciones.RECHAZAR_POSTULACION,
      variables
    )
  }

  useEffect(() => {
    if (listadoPostulados) {
      setTpNacionalidad(listadoPostulados?.nacionalidad.toString())
      setCedulaPostulado(listadoPostulados?.cedula)
      setNombrePostulado(listadoPostulados?.nombre)
      setApellidoPostulado(listadoPostulados?.apellido)
      setCarreraPostulado(listadoPostulados?.carrera)
    }
  }, [listadoPostulados])

  const rechazaPostulacion = () => {
    const InputRechazarPostulacion = {
      observacion: txtObservacion,
      idpostulacion: parseInt(listadoPostulados?.id)
    }
    rechazarPostulacion({ InputRechazarPostulacion }).then(
      ({ rechazarPostulacion: { status, message, type } }) => {
        setReload(false)
        setObservacion('')
        toast.current.show({
          severity: type,
          summary: '¡ Atención !',
          detail: message
        })
        mutatePostulado()
        setActiveDialogRechazarPostulacion(false)
        setTimeout(() => {
          setReload(true)
        }, 50)
      }
    )
  }

  return (
    <Dialog
      visible={activeDialogRechazarPostulacion}
      onHide={() => {
        setActiveDialogRechazarPostulacion(false)
      }}
      style={{ height: '45%' }}
      header="Datos del Postulado"
      resizable={false}
      draggable={false}
      className="m-2 -mt-2"
    >
      <div className="w-full text-center">
        <h1 className="text-3xl font-semibold text-white mb-4">
          Rechazar Postulación
        </h1>
      </div>

      <div className="grid grid-cols-5 gap-4 pt-2">
        <Toast ref={toast} />
        <span className="p-float-label field">
          <InputText
            className="w-full"
            id="tpNacionalidad"
            value={tpNacionalidad}
            onChange={(e) => setTpNacionalidad(e.target.value)}
            autoComplete="off"
            disabled
          />
          <label htmlFor="tpNacionalidad">Nacionalidad</label>
        </span>
        <span className="p-float-label field">
          <InputText
            className="w-full"
            id="cedulaPostulado"
            value={cedulaPostulado}
            onChange={(e) => setCedulaPostulado(e.target.value)}
            autoComplete="off"
            disabled
          />
          <label htmlFor="cedulaPostulado">Cédula de Identidad</label>
        </span>
        <span className="p-float-label field">
          <InputText
            className="w-full"
            id="nombrePostulado"
            value={nombrePostulado}
            onChange={(e) => setNombrePostulado(e.target.value.toUpperCase())}
            autoComplete="off"
            disabled
          />
          <label htmlFor="nombrePostulado">Nombre</label>
        </span>
        <span className="p-float-label field">
          <InputText
            className="w-full"
            id="apellidoPostulado"
            value={apellidoPostulado}
            onChange={(e) => setApellidoPostulado(e.target.value.toUpperCase())}
            autoComplete="off"
            disabled
          />
          <label htmlFor="apellidoPostulado">Apellido</label>
        </span>
        <span className="p-float-label field">
          <InputText
            className="w-full"
            id="carreraPostulado"
            value={carreraPostulado}
            onChange={(e) => setCarreraPostulado(e.target.value.toUpperCase())}
            autoComplete="off"
            disabled
          />
          <label htmlFor="carreraPostulado">Carrera</label>
        </span>
        <span className="p-float-label field col-span-5">
          <InputTextarea
            className="w-full"
            id="txtObservacion"
            value={txtObservacion}
            onChange={(e) => setObservacion(e.target.value)}
            autoComplete="off"
            rows={5}
            cols={30}
          />
          <label htmlFor="txtObservacion">Observación</label>
        </span>
        <div className="flex my-auto col-span-5 justify-center">
          <Button
            label="Guardar"
            icon="pi pi-plus"
            onClick={() => rechazaPostulacion()}
            disabled={!txtObservacion}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2 mt-1"></div>

      {/*  eslint-disable-next-line react/no-unknown-property */}
      <style jsx global>{`
        .p-disabled,
        .p-component:disabled {
          opacity: 1;
        }
      `}</style>
    </Dialog>
  )
}
export default DialogRechazarPostulacion

import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { FileUpload } from 'primereact/fileupload'
import { ConfirmDialog } from 'primereact/confirmdialog'
import GQLpostulaciones from 'graphql/postulaciones'
import { useSesion } from 'hooks/useSesion'
import { useEffect, useRef, useState } from 'react'
import request from 'graphql-request'
import { Toast } from 'primereact/toast'
import { Dialog } from 'primereact/dialog'

const DialogCargarDocumentos = ({
  activeDialogCargarDocumentos,
  setActiveDialogCargarDocumentos,
  datosPostularse,
  mutatePostu
}) => {
  const [datosEstudiantes, setDatosEstudiantes] = useState([])
  const toast = useRef(null)
  const [imagen, setImagen] = useState(null)
  const [confirmPostulacion, setConfirmPostulacion] = useState(false)
  const { idUser } = useSesion()

  const adjuntarArchivo = () => {
    document.querySelector('#file input').click()
  }

  const crearPostulacion = (variables) => {
    return request(
      process.env.NEXT_PUBLIC_URL_BACKEND,
      GQLpostulaciones.SAVE_POSTULACION,
      variables
    )
  }

  const acceptPostu = () => {
    const InputPostulacion = {
      usuario: parseInt(idUser),
      carrera: parseInt(datosPostularse.id_carrera),
      sede: parseInt(datosPostularse.id_sede),
      fepostulacion: new Date().toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }),
      idOferta: datosPostularse?.id_oferta,
      idSeccion: datosPostularse?.id_seccion
    }

    crearPostulacion({ InputPostulacion }).then(
      ({ crearPostulacion: { status, message, type } }) => {
        toast.current.show({
          severity: type,
          summary: 'Info',
          detail: message,
          life: 3000
        })
        mutatePostu()
      }
    )
  }

  const rechazarPostu = () => {
    setConfirmPostulacion(false)
  }

  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })

  const cargarArchivo = async ({ files, options: { props } }) => {
    const archivoBlop = files[0]
    const ultimo_punto = archivoBlop?.name?.lastIndexOf('.')
    const extension = archivoBlop?.name?.slice(
      ultimo_punto,
      archivoBlop?.name?.length
    )
    const extenciones_permitidas = props.accept
    const tamano = archivoBlop.size
    const tamanoPermitido = 3072

    if (extenciones_permitidas.indexOf(extension) === -1) {
      console.log('error de tipo de extension')
    }

    if (tamano / 1024 > tamanoPermitido) {
      console.log('error de tamaño permitido')
    }

    const archivo = await fileToBase64(archivoBlop)

    // mutation

    console.log(archivoBlop)
  }

  const accionBodyTemplate = (rowData) => {
    return (
      <div>
        <FileUpload
          id="file"
          accept=".pdf"
          name="files[]"
          auto
          customUpload
          uploadHandler={cargarArchivo}
          style={{ display: 'none' }}
          maxFileSize={1000000}
        />
        <Button
          icon="pi pi-paperclip"
          tooltip="Adjuntar"
          tooltipOptions={{ position: 'top' }}
          onClick={() => adjuntarArchivo()}
        />
        <Button
          icon="pi pi-minus-circle"
          className="p-button-danger ml-2 mr-2"
          tooltip="Eliminar"
          tooltipOptions={{ position: 'top' }}
        />
        <Button
          icon="pi pi-search"
          className="p-button-info mr-1"
          tooltip="Ver"
          tooltipOptions={{ position: 'top' }}
          /* onClick={() => {
            setDatosVerMalla(rowData)
            setActiveDialogVerMalla(true)
          }} */
        />
      </div>
    )
  }

  useEffect(() => {
    setDatosEstudiantes([
      { tipoDocumento: 'PARTIDA DE NACIMIENTO', estatus: 'Cargado' },
      { tipoDocumento: 'ANVERSO NOTAS CERITIFCADAS', estatus: 'Aprobado' },
      { tipoDocumento: 'REVERSO NOTAS CERITIFCADAS', estatus: 'Rechazado' },
      { tipoDocumento: 'TITULO BACHILLERATO', estatus: 'Cargado' }
    ])
  }, [])

  return (
    <Dialog
      header="Carga de Documentos"
      visible={activeDialogCargarDocumentos}
      onHide={() => setActiveDialogCargarDocumentos(false)}
      style={{ width: '50%' }}
    >
      <ConfirmDialog
        draggable={false}
        resizable={false}
        className="bg-[#805e5e]"
        visible={confirmPostulacion}
        acceptLabel="Si"
        rejectLabel="No"
        onHide={() => setConfirmPostulacion(false)}
        message="Deben estar todos los documentos para que la postulación sea procesada ¿Estas seguro que deseas confirmar la postulación?"
        header="Confirmar"
        icon="pi pi-exclamation-triangle"
        accept={acceptPostu}
        reject={rechazarPostu}
      />
      <Toast ref={toast} />
      <div className="mb-3">
        <p>
          Debe cargar los requisitos en formato PDF con no mas de 3 Mb de peso
          por archivo
        </p>
      </div>
      <DataTable
        value={datosEstudiantes}
        emptyMessage="No hay estudiantes registrados."
      >
        <Column field="tipoDocumento" header="Tipo de Documento" />
        <Column field="estatus" header="Estatus" />
        <Column body={accionBodyTemplate} header="Acción" />
      </DataTable>
      <div className="w-full flex justify-center mt-5">
        <Button
          icon="pi pi-check"
          label="Postularse"
          className="p-button-success"
          onClick={() => {
            setConfirmPostulacion(true)
          }}
        />
      </div>
    </Dialog>
  )
}

export default DialogCargarDocumentos

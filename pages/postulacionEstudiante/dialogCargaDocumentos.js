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

  const onChange = (e) => {
    console.log('file uploaded: ', e.target.files[0])
    const file = e.target.files[0]

    if (file) {
      const reader = new FileReader()
      reader.onload = handleReaderLoaded.bind(this)
      reader.readAsBinaryString(file)
    }
  }

  const handleReaderLoaded = (e) => {
    console.log('file uploaded 2: ', e)
    const binaryString = e.target.result
    setImagen(btoa(binaryString))
    console.log(imagen)
  }

  const accionBodyTemplate = (rowData) => {
    return (
      <div>
        <FileUpload
          id="file"
          accept=".jpg, .jpeg, .png"
          name="files[]"
          customUpload
          /* uploadHandler={(e) => cargarArchivo(e)} */
          onChange={(e) => onChange(e)}
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

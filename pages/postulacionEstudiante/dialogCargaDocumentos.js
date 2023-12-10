import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { FileUpload } from 'primereact/fileupload'
import { ConfirmDialog } from 'primereact/confirmdialog'
import GQLpostulaciones from 'graphql/postulaciones'
import GQLdocumentoFoto from 'graphql/documentoFoto'
import { useSesion } from 'hooks/useSesion'
import { useRef, useState } from 'react'
import GQLconsultasGenerales from 'graphql/consultasGenerales'
import request from 'graphql-request'
import { Toast } from 'primereact/toast'
import { Dialog } from 'primereact/dialog'
import useSWR from 'swr'

const DialogCargarDocumentos = ({
  activeDialogCargarDocumentos,
  setActiveDialogCargarDocumentos,
  datosPostularse,
  mutatePostu
}) => {
  const toast = useRef(null)
  const [confirmPostulacion, setConfirmPostulacion] = useState(false)
  const [datosRowData, setDatosRowData] = useState(null)
  const { idUser, userName, cedUsuario } = useSesion()

  const { data: datosRequisitos } = useSWR(
    GQLconsultasGenerales.GET_TIPO_DOCUMENTO
  )

  const adjuntarArchivo = (rowData) => {
    setDatosRowData(rowData)
    document.querySelector('#file input').click()
  }

  const eliminarArchivo = (variables) => {
    return request(
      process.env.NEXT_PUBLIC_URL_BACKEND,
      GQLdocumentoFoto.ELIMINAR_DOCUMENTO_USUARIO,
      variables
    )
  }

  const buscarArchivo = (variables) => {
    return request(
      process.env.NEXT_PUBLIC_URL_BACKEND,
      GQLdocumentoFoto.BUSCAR_ARCHIVO_USUARIO,
      variables
    )
  }

  const subirArchivo = (variables) => {
    return request(
      process.env.NEXT_PUBLIC_URL_BACKEND,
      GQLdocumentoFoto.CREAR_DOCUMENTO_POSTULACION,
      variables
    )
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

  const deleteArchivo = (rowData) => {
    const inputDatosArchivo = { idUser, id_tp_documento: parseInt(rowData.id) }
    eliminarArchivo({ inputDatosArchivo }).then(
      ({ eliminarArchivoUsuario: { message, status, type } }) => {
        toast.current.show({
          severity: type,
          summary: '¡ Atención !',
          detail: message,
          life: 3000
        })
      }
    )
  }

  const dataURLtoBlob = (dataurl) => {
    const arr = dataurl.split(',')
    const mime = arr[0].match(/:(.*?);/)[1]
    const bstr = atob(arr[1])
    let n = bstr.length
    const u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    return new Blob([u8arr], { type: mime })
  }

  const verArchivo = (rowData) => {
    const inputDatosArchivo = { idUser, id_tp_documento: parseInt(rowData.id) }
    buscarArchivo({ inputDatosArchivo })
      .then(({ obtenerArchivoUsuario: { message, type, response } }) => {
        if (response !== null) {
          const documentoBase64 = response
          const nombreDocumento = `${userName}-${cedUsuario}_${rowData.id}`
          const documentoBlob = dataURLtoBlob(documentoBase64)
          const documento = URL.createObjectURL(documentoBlob)
          const htmlDocumento = `<iframe src="${documento}" width="70%" height="90%"/>`

          const ventana = window?.open()
          ventana.document.write(`
                          <html lang="es">
                              <head>
                                  <title>${nombreDocumento}</title>
                              </head>
                              <body style="text-align: center; height: 98%; width: 99%">
                                  <a download="${nombreDocumento}" href="${documento}" style="display: block;">Descargar ${nombreDocumento}</a><br/>
                                  ${htmlDocumento}
                              </body>
                          </html>`)
        } else {
          toast.current.show({
            severity: type,
            summary: '¡ Atención !',
            detail: message,
            life: 3000
          })
        }
      })
      .catch((e) => {
        if (e.toString()?.includes('TypeError')) {
          toast.current.show({
            severity: 'error',
            summary: '¡ Atención !',
            detail:
              'Error: El navegador no permite ventanas emergentes. Por favor otorgue permisos al sistema para ver Documentos.',
            life: 3000
          })
        } else {
          toast.current.show({
            severity: 'error',
            summary: '¡ Atención !',
            detail: 'Error: ' + e,
            life: 3000
          })
        }
      })
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
    let archivo = null
    const archivoBlop = files[0]
    const ultimo_punto = archivoBlop?.name?.lastIndexOf('.')
    const extension = archivoBlop?.name?.slice(
      ultimo_punto,
      archivoBlop?.name?.length
    )
    const extenciones_permitidas = props.accept
    const tamano = archivoBlop.size
    const tamanoPermitido = 2048
    const id_tp_documento = datosRowData.id

    if (extenciones_permitidas.indexOf(extension) === -1) {
      toast.current.show({
        severity: 'error',
        summary: 'Error',
        detail: 'Error de tipo de extension',
        life: 3000
      })
    } else if (tamano / 1024 > tamanoPermitido) {
      toast.current.show({
        severity: 'error',
        summary: 'Error',
        detail: 'Error de exceso de tamaño permitido',
        life: 3000
      })
    } else {
      archivo = await fileToBase64(archivoBlop)
    }

    // mutation
    if (archivo) {
      const InputDocPostulacion = {
        id_tp_documento,
        archivo,
        extension,
        idUser
      }
      subirArchivo({ InputDocPostulacion }).then(
        ({ crearDocumentoPostulacion: { message, status, type } }) => {
          toast.current.show({
            severity: type,
            summary: '¡ Atención !',
            detail: message,
            life: 3000
          })
        }
      )
    }
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
          onClick={() => adjuntarArchivo(rowData)}
        />
        <Button
          icon="pi pi-minus-circle"
          className="p-button-danger ml-2 mr-2"
          tooltip="Eliminar"
          tooltipOptions={{ position: 'top' }}
          onClick={() => deleteArchivo(rowData)}
        />
        <Button
          icon="pi pi-search"
          className="p-button-info mr-1"
          tooltip="Ver"
          tooltipOptions={{ position: 'top' }}
          onClick={() => verArchivo(rowData)}
        />
      </div>
    )
  }

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
        value={datosRequisitos?.obtenerTipoDocumento.response}
        emptyMessage="No hay documentos habilitados."
      >
        <Column field="nombre" header="Tipo de Documento" />
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

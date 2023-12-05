import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { FileUpload } from 'primereact/fileupload'
import Image from 'next/image'
import usuario from 'public/images/usuario.png'
import { Divider } from 'primereact/divider'
import { useEffect, useRef, useState } from 'react'
import request from 'graphql-request'
import GQLvistaPostulado from 'graphql/vistaPostulado'
import { Toast } from 'primereact/toast'

const { Dialog } = require('primereact/dialog')

const DialogCargarDocumentos = ({
  activeDialogCargarDocumentos,
  setActiveDialogCargarDocumentos
}) => {
  const [datosEstudiantes, setDatosEstudiantes] = useState([])
  const toast = useRef(null)
  const [itemsDatos, setItemsDatos] = useState(null)
  const [imagen, setImagen] = useState(null)

  const insertEstudiante = (variables) => {
    return request(
      process.env.NEXT_PUBLIC_URL_BACKEND,
      GQLvistaPostulado.INSERT_ESTUDIANTES,
      variables
    )
  }

  const adjuntarArchivo = () => {
    document.querySelector('#file input').click()
  }

  /* const HeaderPersonal = () => {
    return (
      <div className="h-8 flex justify-end bg-[#ae8e8e] mt-3">
        <Button
          label="Registrar Personal"
          icon="pi pi-plus"
          onClick={() => setActiveDialogRegPersonal(true)}
        />
      </div>
    )
  } */

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
      <div className="flex justify-center">
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
          className="p-button-danger"
          tooltip="Eliminar"
          tooltipOptions={{ position: 'top' }}
          onClick={() => adjuntarArchivo()}
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

  const subirArchivo = () => {
    const InputInsertarEstudiante = {
      estatus: 1,
      datos: itemsDatos
    }

    insertEstudiante({ InputInsertarEstudiante }).then(
      ({ insertarEstudiante: { status, message, type } }) => {
        toast.current.show({
          severity: type,
          summary: '¡ Atención !',
          detail: message
        })
        setItemsDatos(null)
      }
    )
  }

  return (
    <Dialog
      header="Carga de Documentos"
      visible={activeDialogCargarDocumentos}
      onHide={() => setActiveDialogCargarDocumentos(false)}
      style={{ width: '80%' }}
    >
      <div className="flex flex-col">
        <Toast ref={toast} />
        <div>
          <div className="flex flex-row">
            <div className="tab-content justify-center rounded-lg w-5/6 h-96 pr-3 pl-3 pt-4">
              <Divider className="col-span-5" />
              {/* <Image
                src={usuario}
                loading="eager"
                fill="true"
                sizes="(max-width: 5vw) 5%"
                priority={true}
                className="rounded-lg"
              /> */}
              <div className="col-span-5">
                {/* <HeaderPersonal /> */}
                {/* <DataTable
                  value={datosEstudiantes}
                  emptyMessage="No se encuentra personal registrado."
                  filterDisplay="row"
                  id="filter"
                >
                  <Column
                    field="cedula"
                    filterPlaceholder="Buscar"
                    filter
                    header="Cédula"
                  />
                  <Column
                    field="nombre"
                    filterPlaceholder="Buscar"
                    filter
                    header="Nombre"
                  />
                  <Column field="apellido" header="Apellido" />
                  <Column field="profesion" header="Profesión" />
                  <Column body={accionBodyTemplate} />
                </DataTable> */}
                <DataTable
                  value={datosEstudiantes}
                  emptyMessage="No hay estudiantes registrados."
                >
                  <Column field="tipoDocumento" header="Tipo de Documento" />
                  <Column field="estatus" header="Estatus" />
                  <Column body={accionBodyTemplate} header="Acción" />
                </DataTable>
              </div>
            </div>
          </div>
        </div>
        <input
          type="file"
          name="image"
          id="file"
          accept=".jpg, .jpeg, .png"
          onChange={(e) => onChange(e)}
        />
        <p>base64 string: {imagen}</p>
        <br />
        {imagen != null && <img src={`data:image;base64,${imagen}`} />}
        <span className="p-float-label field">
          <Button
            icon="pi pi-cloud-upload"
            label="Cargar"
            tooltipOptions={{ position: 'top' }}
            onClick={() => subirArchivo()}
            className="ml-2"
            disabled={!itemsDatos}
          />
        </span>
      </div>
      {/* eslint-disable-next-line react/no-unknown-property */}
      <style jsx global>{`
        .p-disabled,
        .p-component:disabled {
          opacity: 0.9;
        }
      `}</style>
    </Dialog>
  )
}

export default DialogCargarDocumentos

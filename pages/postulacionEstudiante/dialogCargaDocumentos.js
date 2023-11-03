import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { FileUpload } from 'primereact/fileupload'
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

  const insertEstudiante = (variables) => {
    return request(
      process.env.NEXT_PUBLIC_URL_BACKEND,
      GQLvistaPostulado.INSERT_ESTUDIANTES,
      variables
    )
  }

  const adjuntarArchivo = () => {
    document.querySelector('#fileUpload input').click()
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

  const accionBodyTemplate = (rowData) => {
    return (
      <div className="flex justify-center">
        <FileUpload
          id="fileUpload"
          accept=".xlsx"
          name="files[]"
          auto
          customUpload
          /* uploadHandler={(e) => cargarArchivo(e)} */
          style={{ display: 'none' }}
          maxFileSize={1000000}
        />
        <Button
          icon="pi pi-paperclip"
          label="Adjuntar"
          tooltipOptions={{ position: 'top' }}
          onClick={() => adjuntarArchivo()}
        />
        <Button
          icon="pi pi-minus-circle"
          className="p-button-danger"
          label="Eliminar"
          tooltipOptions={{ position: 'top' }}
          onClick={() => adjuntarArchivo()}
        />
      </div>
    )
  }

  useEffect(() => {
    setDatosEstudiantes([
      {
        codigoCarrera: 'PARTIDA DE NACIMIENTO'
      }
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
                  <Column field="codigoCarrera" header="Tipo de Documento" />
                  <Column body={accionBodyTemplate} />
                </DataTable>
              </div>
            </div>
          </div>
        </div>
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

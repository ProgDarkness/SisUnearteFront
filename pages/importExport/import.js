import request from 'graphql-request'
import { Button } from 'primereact/button'
import { FileUpload } from 'primereact/fileupload'
import { useRef, useState } from 'react'
import * as XLSX from 'xlsx'
import GQLvistaPostulado from 'graphql/vistaPostulado'
import { Toast } from 'primereact/toast'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'

const Import = ({ cambioVista }) => {
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

  const cargarArchivo = (e) => {
    const file = e.files[0]
    const fileReader = new FileReader()
    fileReader.readAsArrayBuffer(file)

    fileReader.onload = (e) => {
      const bufferArray = e.target.result

      const wb = XLSX.read(bufferArray, { type: 'buffer' })
      const wsname = wb.SheetNames[0]
      const ws = wb.Sheets[wsname]

      const data = XLSX.utils.sheet_to_json(ws, {
        blankrows: false,
        defval: ''
      })
      setItemsDatos(data)
    }
  }

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
    <div className="grid col-span-5 gap-4 mt-2">
      <Toast ref={toast} />
      <div className="col-span-5 flex justify-end">
        <Button
          label="Import"
          className="mr-1"
          onClick={() => {
            const newVistas = {
              [`import`]: true
            }
            cambioVista((prevState) => ({
              ...prevState,
              ...newVistas,
              ...Object.keys(prevState).reduce((acc, key) => {
                if (key !== 'import') acc[key] = false
                return acc
              }, {})
            }))
          }}
        />
        <Button
          label="Export Inscritos"
          className="mr-1"
          onClick={() => {
            const newVistas = {
              [`exportInscrito`]: true
            }
            cambioVista((prevState) => ({
              ...prevState,
              ...newVistas,
              ...Object.keys(prevState).reduce((acc, key) => {
                if (key !== 'exportInscrito') acc[key] = false
                return acc
              }, {})
            }))
          }}
        />
        <Button
          label="Export Postulados"
          onClick={() => {
            const newVistas = {
              [`export`]: true
            }
            cambioVista((prevState) => ({
              ...prevState,
              ...newVistas,
              ...Object.keys(prevState).reduce((acc, key) => {
                if (key !== 'export') acc[key] = false
                return acc
              }, {})
            }))
          }}
        />
      </div>
      <div className="col-span-5 flex justify-between">
        <div />
        <h1 className="text-3xl font-semibold text-white">Import de Data</h1>
        <div />
      </div>
      <div>
        <Button
          icon="pi pi-paperclip"
          label="Adjuntar"
          tooltipOptions={{ position: 'top' }}
          onClick={() => adjuntarArchivo()}
        />
        <Button
          icon="pi pi-cloud-upload"
          label="Cargar"
          tooltipOptions={{ position: 'top' }}
          onClick={() => subirArchivo()}
          className="ml-2"
          disabled={!itemsDatos}
        />
      </div>
      <FileUpload
        id="fileUpload"
        accept=".xlsx"
        name="files[]"
        auto
        customUpload
        uploadHandler={(e) => cargarArchivo(e)}
        style={{ display: 'none' }}
        maxFileSize={1000000}
      />
      <div className="col-span-5">
        <DataTable
          value={itemsDatos}
          emptyMessage="No hay registros adjuntos"
          header="Previsualización"
        >
          <Column field="nacionalidad" header="Nacionalidad" />
          <Column field="cedula" header="Cédula" />
          <Column field="nombre" header="Nombre" />
          <Column field="apellido" header="Apellido" />
          <Column field="sexo" header="Sexo" />
        </DataTable>
      </div>
    </div>
  )
}

export default Import

import { Button } from 'primereact/button'
import { FileUpload } from 'primereact/fileupload'
import { useState } from 'react'
import * as XLSX from 'xlsx'

const Import = ({ cambioVista }) => {
  const [itemsDatos, setItemsDatos] = useState(null)

  console.log(itemsDatos)

  const adjuntarArchivo = () => {
    document.querySelector('#fileUpload input').click()
  }

  const subirArchivo = (e) => {
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

  return (
    <div className="grid col-span-5 gap-4 mt-2">
      <div className="col-span-5 flex justify-between">
        <div />
        <h1 className="text-3xl font-semibold text-white">Import de Data</h1>
        <Button
          label="Ir a Export"
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
      <div>
        <Button
          icon="pi pi-paperclip"
          label="Adjuntar"
          tooltipOptions={{ position: 'top' }}
          onClick={() => adjuntarArchivo()}
        />
      </div>
      <FileUpload
        id="fileUpload"
        accept=".xlsx"
        name="files[]"
        auto
        customUpload
        uploadHandler={(e) => subirArchivo(e)}
        style={{ display: 'none' }}
        maxFileSize={1000000}
      />
    </div>
  )
}

export default Import

import { useEffect, useState } from 'react'
import { Button } from 'primereact/button'
import ExcelJS from 'exceljs'
import useSWR from 'swr'
import GQLconsultasGenerales from 'graphql/vistaPostulado'

const Export = ({ cambioVista }) => {
  const [postulados, setPostulados] = useState([])
  const { data } = useSWR(GQLconsultasGenerales.QUERY_LISTA_REPORTE)

  useEffect(() => {
    setPostulados(data?.obtenerListadoPostuladoCarrera?.response)
  }, [data])

  const exportExcel = async (e) => {
    e.preventDefault()
    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet('Estudiantes_Postulados')
    worksheet.columns = [
      {
        header: 'NACIONALIDAD',
        key: 'nacionalidad',
        width: 30
      },
      { header: 'CEDULA', key: 'cedula', width: 30 },
      { header: 'NOMBRES', key: 'nombre', width: 30 },
      { header: 'APELLIDOS', key: 'apellido', width: 30 },
      { header: 'FECHA DE POSTULACION', key: 'fepostulacion', width: 30 },
      { header: 'CARRERA', key: 'carrera', width: 10 },
      { header: 'PERIODO', key: 'periodo', width: 20 },
      { header: 'TIPO PERIODO', key: 'tperiodo', width: 30 },
      { header: 'ESTATUS', key: 'estatus', width: 20 }
    ]

    // worksheet.getRow(1).font = { name: 'Comic Sans MS', family: 4, size: 12, underline: 'double', bold: true };

    worksheet.getRow(1).height = 25
    worksheet.getRow(1).eachCell({ includeEmpty: false }, function (cell) {
      worksheet.getCell(cell.address).alignment = {
        vertical: 'middle',
        horizontal: 'center'
      }
      worksheet.getCell(cell.address).font = {
        bold: true,
        color: { argb: 'FFFFFF' }
      }
      worksheet.getCell(cell.address).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '007AD9' }
      }
    })
    postulados.forEach((cf, i) => {
      worksheet.addRow({
        nacionalidad: cf.nacionalidad,
        cedula: cf.cedula,
        nombre: cf.nombre,
        apellido: cf.apellido,
        fepostulacion: cf.fepostulacion,
        carrera: cf.carrera,
        periodo: cf.periodo,
        tperiodo: cf.tperiodo,
        estatus: cf.estatus
      })
      /* if (cf.parentesco.includes('TITULAR')) {
        worksheet
          .getRow(i + 2)
          .eachCell({ includeEmpty: false }, function (cell) {
            worksheet.getCell(cell.address).fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: 'C8C8C8' }
            }
            worksheet.getCell(cell.address).font = { bold: true }
            worksheet.getCell(cell.address).border = { top: { style: 'thin' } }
          })
      } */
      // worksheet.getRow(i + 2).getCell('cedula').alignment = { vertical: 'middle', horizontal: 'right' }

      // worksheet.getRow(i + 2).getCell('genero').alignment = { vertical: 'middle', horizontal: 'center' }
      // worksheet.getRow(i + 2).getCell('fecha').alignment = { vertical: 'middle', horizontal: 'center' }
      // worksheet.getRow(i + 2).getCell('edad').alignment = { vertical: 'middle', horizontal: 'center' }
    })
    worksheet.autoFilter = 'A1:G1'

    const buffer = await workbook.xlsx.writeBuffer()
    const documentoBlob = new Blob([buffer], { type: 'xlsx' })
    const documento = URL.createObjectURL(documentoBlob)
    const link = document.createElement('a')
    link.download = 'Reporte_Estudiantes_Postulados.xlsx'
    link.href = documento
    link.click()
  }

  return (
    <div className="grid col-span-5 gap-4 mt-2">
      <div className="col-span-5 flex justify-between">
        <div />
        <h1 className="text-3xl font-semibold text-white">Export de Data</h1>
        <Button
          label="Ir a Import"
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
      </div>
      <div>
        <Button
          type="button"
          icon="pi pi-file-excel"
          onClick={exportExcel}
          className="p-button-success p-mr-2"
          data-pr-tooltip="XLS"
          disabled={postulados?.length === 0}
        />
      </div>
    </div>
  )
}

export default Export

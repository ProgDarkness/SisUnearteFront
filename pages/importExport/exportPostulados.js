import { useEffect, useState } from 'react'
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
import ExcelJS from 'exceljs'
import useSWR from 'swr'
import GQLconsultasPostulados from 'graphql/vistaPostulado'
import GQLconsultasGenerales from 'graphql/consultasGenerales'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import GQLregOfertaAcademica from 'graphql/regOfertaAcademica'

const Export = ({ cambioVista }) => {
  const [postulados, setPostulados] = useState([])
  const [sede, setSedes] = useState(null)
  const [carrera, setCarreras] = useState(null)
  const [periodo, setPeriodos] = useState(null)

  const { data } = useSWR([
    carrera || periodo || sede
      ? GQLconsultasPostulados.QUERY_LISTA_REPORTE
      : null,
    {
      input: {
        periodo: parseInt(periodo),
        carrera: parseInt(carrera),
        sede: parseInt(sede)
      }
    }
  ])

  const { data: sedes } = useSWR(GQLconsultasGenerales.GET_SEDES)
  const { data: carreras } = useSWR(GQLconsultasGenerales.GET_CARRERAS)
  const { data: periodos } = useSWR(GQLregOfertaAcademica.GET_PERIODOS_OFER)

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
      { header: 'CÉDULA', key: 'cedula', width: 30 },
      { header: 'NOMBRES', key: 'nombre', width: 30 },
      { header: 'APELLIDOS', key: 'apellido', width: 30 },
      { header: 'FECHA DE POSTULACIÓN', key: 'fepostulacion', width: 30 },
      { header: 'CARRERA', key: 'carrera', width: 10 },
      { header: 'SEDE', key: 'sede', width: 10 },
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
        sede: cf.sede,
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
      <div className="col-span-5 flex justify-end">
        <Button
          label="Importar"
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
          label="Exportar Inscritos"
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
          label="Exportar Postulados"
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
        <h1 className="text-3xl font-semibold text-white">Exportar de Data</h1>
        <div />
      </div>
      <div className="grid grid-cols-5 gap-5 pt-2">
        <span className="p-float-label field">
          <Dropdown
            className="w-full"
            id="tp_sede"
            value={sede}
            onChange={(e) => setSedes(e.target.value)}
            options={sedes?.obtenerSedes.response}
            showClear
            optionLabel="nombre"
            optionValue="id"
          />
          <label htmlFor="tp_sede">Sede</label>
        </span>
        <span className="p-float-label field">
          <Dropdown
            className="w-full"
            id="tp_carrera"
            value={carrera}
            onChange={(e) => setCarreras(e.target.value)}
            options={carreras?.obtenerCarreras.response}
            showClear
            optionLabel="nombre"
            optionValue="id"
          />
          <label htmlFor="tp_carrera">Carrera</label>
        </span>
        <span className="p-float-label field">
          <Dropdown
            className="w-full"
            id="tp_periodo"
            value={periodo}
            onChange={(e) => setPeriodos(e.target.value)}
            options={periodos?.obtenerPeridosOferta.response}
            showClear
            optionLabel="nombre"
            optionValue="id"
          />
          <label htmlFor="tp_periodo">Periodo</label>
        </span>
        <div className="my-auto">
          <Button
            type="button"
            icon="pi pi-file-excel"
            label="Exportar"
            onClick={exportExcel}
            className="p-button-success p-mr-2"
            data-pr-tooltip="XLS"
            disabled={postulados?.length === 0}
          />
        </div>
      </div>
      <div className="col-span-5">
        <DataTable
          value={data?.obtenerListadoPostuladoCarrera.response}
          emptyMessage="No hay registros adjuntos"
          header="Listado de Postulados"
        >
          <Column field="nacionalidad" header="Nacionalidad" />
          <Column field="cedula" header="Cédula" />
          <Column field="nombre" header="Nombre" />
          <Column field="apellido" header="Apellido" />
          <Column field="periodo" header="Periodo" />
          <Column field="carrera" header="Sexo" />
          <Column field="sede" header="Sede" />
          <Column field="fepostulacion" header="Fecha Postulación" />
        </DataTable>
      </div>
    </div>
  )
}

export default Export

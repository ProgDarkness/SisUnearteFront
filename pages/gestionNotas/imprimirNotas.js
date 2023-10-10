import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { Dropdown } from 'primereact/dropdown'
import { DataTable } from 'primereact/datatable'
import { InputText } from 'primereact/inputtext'
import { useEffect, useState } from 'react'
import DialogInformacionDelEstudiante from 'pages/informacionDelEstudianteComps/dialogInformacionDelEstudiante'

const ImprimirNotas = () => {
  const [datosEstudiantes, setDatosEstudiantes] = useState([])
  const [
    activeDialogInformacionDelEstudiante,
    setActiveDialogInformacionDelEstudiante
  ] = useState(false)

  useEffect(() => {
    setDatosEstudiantes([
      {
        trayecto: 'T0001',
        seccion: '1',
        total: '10'
      },
      {
        trayecto: 'T0002',
        seccion: '2',
        total: '10'
      },
      {
        trayecto: 'T0003',
        seccion: '3',
        total: '10'
      },
      {
        trayecto: 'T0004',
        seccion: '4',
        total: '10'
      },
      {
        trayecto: 'T0005',
        seccion: '5',
        total: '10'
      }
    ])
  }, [])

  const actionbodytemplate = (rowData) => {
    return (
      <div className="flex justify-center">
        <Button
          icon="pi pi-plus"
          className="p-button-info mr-1"
          tooltip="Guardar"
          label="Generar"
          tooltipOptions={{ position: 'top' }}
          onClick={() => {
            setActiveDialogInformacionDelEstudiante(true)
          }}
        />
      </div>
    )
  }

  return (
    <div>
      <DialogInformacionDelEstudiante
        activeDialogInformacionDelEstudiante={
          activeDialogInformacionDelEstudiante
        }
        setActiveDialogInformacionDelEstudiante={
          setActiveDialogInformacionDelEstudiante
        }
      />
      <div className="col-span-5 flex justify-between">
        <div />
        <h1 className="text-3xl font-semibold text-white">
          Impresión de Notas
        </h1>
        <Button
          label="Volver"
          onClick={() => {
            const newVistas = {
              [`cargarMalla`]: true
            }
            /* cambioVista((prevState) => ({
              ...prevState,
              ...newVistas,
              ...Object.keys(prevState).reduce((acc, key) => {
                if (key !== 'cargarMalla') acc[key] = false
                return acc
              }, {})
            })) */
          }}
        />
      </div>
      <div className="col-span-5 grid grid-cols-4 gap-5 pt-2">
        <span className="p-float-label field">
          <Dropdown
            className="w-full"
            id="tp_sede"
            showClear
            /* value={sede}
            onChange={(e) => setSedes(e.target.value)}
            options={sedes?.obtenerSedes.response} */
            optionLabel="nombre"
            optionValue="id"
          />
          <label htmlFor="tp_sede">Trayecto</label>
        </span>
        <span className="p-float-label field">
          <Dropdown
            className="w-full"
            id="tp_sede"
            showClear
            /* value={sede}
            onChange={(e) => setSedes(e.target.value)}
            options={sedes?.obtenerSedes.response} */
            optionLabel="nombre"
            optionValue="id"
          />
          <label htmlFor="tp_sede">Materia</label>
        </span>
        <span className="p-float-label field">
          <Dropdown
            className="w-full"
            id="tp_sede"
            showClear
            /* value={sede}
            onChange={(e) => setSedes(e.target.value)}
            options={sedes?.obtenerSedes.response} */
            optionLabel="nombre"
            optionValue="id"
          />
          <label htmlFor="tp_sede">Sección</label>
        </span>
      </div>
      <div>
        <DataTable
          value={datosEstudiantes}
          emptyMessage="No hay estudiantes registrados."
        >
          <Column field="trayecto" header="Trayecto" />
          <Column field="seccion" header="Sección" />
          <Column field="total" header="Total Estudiantes" />
          <Column body={actionbodytemplate} />
        </DataTable>
      </div>
    </div>
  )
}

export default ImprimirNotas

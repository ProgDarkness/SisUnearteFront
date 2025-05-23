import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { Dropdown } from 'primereact/dropdown'
import { DataTable } from 'primereact/datatable'
import { InputText } from 'primereact/inputtext'
import { useEffect, useState } from 'react'
import DialogInformacionDelEstudiante from 'pages/informacionDelEstudianteComps/dialogInformacionDelEstudiante'

const RegistroNotas = () => {
  const [datosEstudiantes, setDatosEstudiantes] = useState([])
  const [
    activeDialogInformacionDelEstudiante,
    setActiveDialogInformacionDelEstudiante
  ] = useState(false)

  useEffect(() => {
    setDatosEstudiantes([
      {
        nacionalidad: 'V',
        cedula: '15681973',
        nombre: 'Kendrick',
        apellido: 'Lamar'
      },
      {
        nacionalidad: 'V',
        cedula: '23456781',
        nombre: 'Luz',
        apellido: 'Varela'
      },
      {
        nacionalidad: 'V',
        cedula: '17645897',
        nombre: 'Ines',
        apellido: 'Vallejo'
      },
      {
        nacionalidad: 'V',
        cedula: '14238956',
        nombre: 'Hector',
        apellido: 'Becerra'
      },
      {
        nacionalidad: 'V',
        cedula: '15681973',
        nombre: 'Ricardo',
        apellido: 'Alvarado'
      }
    ])
  }, [])

  const bodymateria1 = (rowData) => {
    return (
      <div className="flex justify-center">
        <InputText
          className="w-full"
          id="apellido"
          /* value={apellidoPersonal}
          onChange={(e) => setApellidoPersonal(e.target.value.toUpperCase())} */
          autoComplete="off"
        />
      </div>
    )
  }

  const bodymateria2 = (rowData) => {
    return (
      <div className="flex justify-center">
        <InputText
          className="w-full"
          id="apellido"
          /* value={apellidoPersonal}
          onChange={(e) => setApellidoPersonal(e.target.value.toUpperCase())} */
          autoComplete="off"
        />
      </div>
    )
  }

  const bodymateria3 = (rowData) => {
    return (
      <div className="flex justify-center">
        <InputText
          className="w-full"
          id="apellido"
          /* value={apellidoPersonal}
          onChange={(e) => setApellidoPersonal(e.target.value.toUpperCase())} */
          autoComplete="off"
        />
      </div>
    )
  }

  const actionbodytemplate = (rowData) => {
    return (
      <div className="flex justify-center">
        <Button
          icon="pi pi-plus"
          className="p-button-info mr-1"
          tooltip="Guardar"
          label="Guardar"
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
      <div className="col-span-5 flex justify-center">
        <div />
        <h1 className="text-3xl font-semibold text-white">Registro de Notas</h1>
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
        <span className="p-float-label field">
          <Button
            icon="pi pi-plus"
            className="p-button-info mr-1"
            tooltip="Guardar"
            label="Guardar"
            tooltipOptions={{ position: 'top' }}
            onClick={() => {
              setActiveDialogInformacionDelEstudiante(true)
            }}
          />
        </span>
        <span className="p-float-label field">
          <Button
            icon="pi pi-plus"
            className="p-button-info mr-1"
            tooltip="Guardar"
            label="Hoja de Trabajo"
            tooltipOptions={{ position: 'top' }}
            onClick={() => {
              setActiveDialogInformacionDelEstudiante(true)
            }}
          />
        </span>
      </div>
      <div>
        <DataTable
          value={datosEstudiantes}
          emptyMessage="No hay estudiantes registrados."
        >
          <Column field="nacionalidad" header="Nacionalidad" />
          <Column field="cedula" header="Cédula" />
          <Column field="nombre" header="Nombre" />
          <Column field="apellido" header="Apellido" />
          <Column body={bodymateria1} header="Evaluación 1" />
          <Column body={bodymateria2} header="Evaluación 2" />
          <Column body={bodymateria3} header="Evaluación 3" />
          <Column body={bodymateria3} header="Definitiva" />
        </DataTable>
      </div>
    </div>
  )
}

export default RegistroNotas

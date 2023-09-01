import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { useEffect, useState } from 'react'
import DialogInformacionDelEstudiante from 'pages/informacionDelEstudianteComps/dialogInformacionDelEstudiante'

const InformacionDelEstudiante = () => {
  const [datosEstudiantes, setDatosEstudiantes] = useState([])
  const [
    activeDialogInformacionDelEstudiante,
    setActiveDialogInformacionDelEstudiante
  ] = useState(false)

  useEffect(() => {
    setDatosEstudiantes([
      {
        nacionalidad: 'V',
        cedula: '15.681.973',
        nombre: 'Kendrick',
        apellido: 'Lamar',
        fecha_de_postulacion: '10/08/2023',
        carrera: 'Artes Plasticas',
        trayecto: 'Trayecto 1',
        periodo: 'Basico Comun',
        tipo_de_periodo: 'Pre-Grado',
        estatus: 'Activo'
      }
    ])
  }, [])

  const actionbodytemplate = (rowData) => {
    return (
      <div className="flex justify-center">
        <Button
          icon="pi pi-search"
          className="p-button-info mr-1"
          tooltip="Ver"
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
      <h1 className="text-3xl font-semibold text-white text-center mr-32 mb-6 -mt-3">
        Informacion Del Estudiante
      </h1>
      <div>
        <DataTable
          value={datosEstudiantes}
          emptyMessage="No hay estudiantes registrados."
        >
          <Column field="nacionalidad" header="Nacionalidad" />
          <Column field="cedula" header="Cedula" />
          <Column field="nombre" header="Nombre" />
          <Column field="apellido" header="Apellido" />
          <Column field="carrera" header="Carrera Cursante " />
          <Column field="trayecto" header="Trayecto En Curso " />
          <Column body={actionbodytemplate} />
        </DataTable>
      </div>
    </div>
  )
}

export default InformacionDelEstudiante

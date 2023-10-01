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
        cedula: '15681973',
        nombre: 'Kendrick',
        apellido: 'Lamar',
        carrera: 'ARTES PLASTICAS',
        trayecto: 'Trayecto 1'
      },
      {
        nacionalidad: 'V',
        cedula: '23456781',
        nombre: 'Luz',
        apellido: 'Varela',
        carrera: 'MUSICA CA JAZZ',
        trayecto: 'Trayecto 2'
      },
      {
        nacionalidad: 'V',
        cedula: '17645897',
        nombre: 'Ines',
        apellido: 'Vallejo',
        carrera: 'EDUCACION APL',
        trayecto: 'Trayecto Inicial'
      },
      {
        nacionalidad: 'V',
        cedula: '14238956',
        nombre: 'Hector',
        apellido: 'Becerra',
        carrera: 'ARTES',
        trayecto: 'Trayecto 3'
      },
      {
        nacionalidad: 'V',
        cedula: '15681973',
        nombre: 'Ricardo',
        apellido: 'Alvarado',
        carrera: 'DANZA',
        trayecto: 'Trayecto 2'
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
          <Column field="cedula" header="Cédula" />
          <Column field="nombre" header="Nombre" />
          <Column field="apellido" header="Apellido" />
          <Column field="carrera" header="Carrera En Curso" />
          <Column field="trayecto" header="Trayecto En Curso " />
          <Column body={actionbodytemplate} />
        </DataTable>
      </div>
    </div>
  )
}

export default InformacionDelEstudiante

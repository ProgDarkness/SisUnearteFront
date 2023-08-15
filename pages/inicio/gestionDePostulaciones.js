import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { useEffect, useState } from 'react'
import DialogDatosEstudiantes from 'pages/gestiondepostulaciones/dialogDatosEstudiantes'
import { ConfirmDialog } from 'primereact/confirmdialog'

const GestionDePostulaciones = () => {
  const [datosPostulados, setDatosPostulados] = useState([])
  const [activeDialogVerDatosEstudiantes, setActiveDialogVerDatosEstudiantes] =
    useState(false)
  const [dialogConfirmElminarPostulado, setDialogConfirmElminarPostulado] =
    useState(false)
  const [dialogConfirmConfirmarPostulado, setDialogConfirmConfirmarPostulado] =
    useState(false)

  useEffect(() => {
    setDatosPostulados([
      {
        nacionalidad: 'V',
        cedula: '15.681.973',
        nombre: 'Kendrick',
        apellido: 'Lamar',
        fecha_de_postulacion: '10/08/2023',
        carrera: 'Artes Plasticas',
        periodo: 'Basico Comun',
        tipo_de_periodo: 'Pre-Grado',
        estatus: 'Activo'
      }
    ])
  }, [])

  const acceptElminarPostulado = () => {
    console.log('SI')
  }

  const rejectElminarPostulado = () => {
    console.log('NO')
  }

  const acceptConfirmarPostulado = () => {
    console.log('SI')
  }
  const rejectConfirmarPostulado = () => {
    console.log('NO')
  }

  const actionbodytemplate = (rowData) => {
    return (
      <div className="flex justify-center">
        <Button
          icon="pi pi-search"
          className="p-button-info mr-1"
          tooltip="Ver"
          tooltipOptions={{ position: 'top' }}
          onClick={() => {
            setActiveDialogVerDatosEstudiantes(true)
          }}
        />
        <Button
          icon="pi pi-check"
          className="p-button-success mr-1"
          tooltip="Modificar"
          onClick={() => {
            setDialogConfirmConfirmarPostulado(true)
          }}
          tooltipOptions={{ position: 'top' }}
        />
        <Button
          icon="pi pi-times"
          className="p-button-danger"
          tooltip="Eliminar"
          tooltipOptions={{ position: 'top' }}
          onClick={() => setDialogConfirmElminarPostulado(true)}
        />
      </div>
    )
  }

  return (
    <div className="m-2">
      <DialogDatosEstudiantes
        activeDialogVerDatosEstudiantes={activeDialogVerDatosEstudiantes}
        setActiveDialogVerDatosEstudiantes={setActiveDialogVerDatosEstudiantes}
      />
      <div className="text text-3xl font-semibold text-white flex justify-center ">
        <h1>Gestion De Postulaciones</h1>
      </div>

      <ConfirmDialog
        visible={dialogConfirmConfirmarPostulado}
        onHide={() => setDialogConfirmConfirmarPostulado(false)}
        message="¿Esta seguro que desea aceptar la postulacion?"
        header="Confirmacion"
        icon="pi pi-exclamation-triangle"
        accept={acceptConfirmarPostulado}
        reject={rejectConfirmarPostulado}
        acceptLabel="SI"
        rejectLabel="NO"
      />

      <ConfirmDialog
        visible={dialogConfirmElminarPostulado}
        onHide={() => setDialogConfirmElminarPostulado(false)}
        message="¿Esta seguro que desea rechazar la postulacion?"
        header="Confirmacion"
        icon="pi pi-exclamation-triangle"
        accept={acceptElminarPostulado}
        reject={rejectElminarPostulado}
        acceptLabel="SI"
        rejectLabel="NO"
      />

      <div>
        <DataTable
          value={datosPostulados}
          emptyMessage="No hay carreras registradas."
        >
          <Column
            field="nacionalidad"
            header="Nacionalidad"
            style={{ textAlign: 'center' }}
          />
          <Column field="cedula" header="Cedula" />
          <Column field="nombre" header="Nombre" />
          <Column field="apellido" header="Apellido" />
          <Column field="fecha_de_postulacion" header="Fecha de postulacion" />
          <Column field="carrera" header="Carrera " />
          <Column field="periodo" header="Periodo" />
          <Column field="tipo_de_periodo" header="Tipo de periodo" />
          <Column field="estatus" header="Estatus" />
          <Column body={actionbodytemplate} />
        </DataTable>
      </div>
    </div>
  )
}
export default GestionDePostulaciones

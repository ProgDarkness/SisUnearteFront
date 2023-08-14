import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { useEffect, useState } from 'react'
import DialogEditarMalla from './dialogEditarMalla'
import DialogVerMalla from './dialogVerMalla'
import { ConfirmDialog } from 'primereact/confirmdialog'

const CargarMalla = ({ cambioVista }) => {
  const [mallas, setMallas] = useState(null)
  const [activeDialogVerMalla, setActiveDialogVerMalla] = useState(false)
  const [dialogEditarMalla, setDialogEditarMalla] = useState(false)
  const [datosEditarMalla, setDatosEditarMalla] = useState(null)
  const [datosVerMalla, setDatosVerMalla] = useState(null)
  const [dialogConfirmElminarMalla, setDialogConfirmElminarMalla] =
    useState(false)

  useEffect(() => {
    setMallas([
      {
        carrera: 'Artes Plasticas',
        status_carrera: 'Habilitada'
      },
      {
        carrera: 'Dibujo Artistico',
        status_carrera: 'Deshabilitada'
      }
    ])
  }, [])

  const acceptElminarMalla = () => {
    console.log('SI')
  }

  const rejectElminarMalla = () => {
    console.log('NO')
  }

  const accionBodyTemplate = (rowData) => {
    return (
      <div className="flex justify-center">
        <Button
          icon="pi pi-search"
          className="p-button-info mr-1"
          tooltip="Ver"
          tooltipOptions={{ position: 'top' }}
          onClick={() => {
            setDatosVerMalla(rowData)
            setActiveDialogVerMalla(true)
          }}
        />
        <Button
          icon="pi pi-pencil"
          className="p-button-help mr-1"
          tooltip="Modificar"
          onClick={() => {
            setDatosEditarMalla(rowData)
            setDialogEditarMalla(true)
          }}
          tooltipOptions={{ position: 'top' }}
        />
        <Button
          icon="pi pi-times"
          className="p-button-danger"
          tooltip="Eliminar"
          tooltipOptions={{ position: 'top' }}
          onClick={() => setDialogConfirmElminarMalla(true)}
        />
      </div>
    )
  }

  const bodyStatus = (rowData) => {
    let colorTag = '#cdcdcd'
    if (rowData.status_carrera === 'Habilitada') {
      colorTag = '#84bf93'
    } else {
      colorTag = '#d56c6c'
    }

    return (
      <div className="w-min rounded" style={{ backgroundColor: colorTag }}>
        <h1 className="text-white text-sm font-semibold m-1">
          {rowData.status_carrera.toUpperCase()}
        </h1>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-5 gap-4 m-2 -mt-2">
      <div className="col-span-5 flex justify-between">
        <div />
        <h1 className="text-3xl font-semibold text-white">
          Carga de Malla Curricular
        </h1>
        <Button
          label="Registrar Carrera"
          onClick={() => {
            const newVistas = {
              [`registrarCarrera`]: true
            }
            cambioVista((prevState) => ({
              ...prevState,
              ...newVistas,
              ...Object.keys(prevState).reduce((acc, key) => {
                if (key !== 'registrarCarrera') acc[key] = false
                return acc
              }, {})
            }))
          }}
        />
      </div>
      <ConfirmDialog
        visible={dialogConfirmElminarMalla}
        onHide={() => setDialogConfirmElminarMalla(false)}
        message="¿Esta seguro que desea eliminar la malla curricular?"
        header="Confirmacion"
        icon="pi pi-exclamation-triangle"
        accept={acceptElminarMalla}
        reject={rejectElminarMalla}
        acceptLabel="SI"
        rejectLabel="NO"
      />
      <DialogVerMalla
        setActiveDialogVerMalla={setActiveDialogVerMalla}
        activeDialogVerMalla={activeDialogVerMalla}
        datosVerMalla={datosVerMalla}
        setDatosVerMalla={setDatosVerMalla}
      />
      <DialogEditarMalla
        datosEditarMalla={datosEditarMalla}
        setDatosEditarMalla={setDatosEditarMalla}
        dialogEditarMalla={dialogEditarMalla}
        setDialogEditarMalla={setDialogEditarMalla}
      />
      <div className="col-span-5">
        <DataTable value={mallas} emptyMessage="No hay carreras registradas.">
          <Column field="carrera" header="Carrera" />
          <Column body={bodyStatus} header="Estatus" />
          <Column body={accionBodyTemplate} />
        </DataTable>
      </div>
    </div>
  )
}

export default CargarMalla

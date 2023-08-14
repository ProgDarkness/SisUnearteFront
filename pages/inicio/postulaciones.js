import { Button } from 'primereact/button'
import { useEffect, useState } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import DialogVerMalla from 'pages/CargaMallaCurricularComps/dialogVerMalla'
import { useSesion } from 'hooks/useSesion'
import { ConfirmDialog } from 'primereact/confirmdialog'

const Postulaciones = ({ data }) => {
  const [mallas, setMallas] = useState(null)
  const [activeDialogVerMalla, setActiveDialogVerMalla] = useState(false)
  const [datosVerMalla, setDatosVerMalla] = useState(null)
  const [confirmPostulacion, setConfirmPostulacion] = useState(false)
  const { rolUser } = useSesion()

  const acceptPostu = () => {
    setConfirmPostulacion(true)
  }
  const rechazarPostu = () => {
    setConfirmPostulacion(false)
  }

  useEffect(() => {
    setMallas([
      {
        carrera: 'Artes Plasticas',
        status_carrera: 'Habilitada'
      },
      { carrera: 'Museologia', status_carrera: 'Habilitada' },
      {
        carrera: 'Dibujo Artistico',
        status_carrera: 'Deshabilitada'
      }
    ])
  }, [])

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
        {rolUser === 3 && (
          <Button
            icon="pi pi-check"
            tooltip="Postularse"
            className="p-button-success"
            onClick={() => {
              setConfirmPostulacion(true)
            }}
          />
        )}
      </div>
    )
  }
  return (
    <div>
      <ConfirmDialog
        draggable={false}
        resizable={false}
        className="bg-[#805e5e]"
        visible={confirmPostulacion}
        acceptLabel="Si"
        rejectLabel="No"
        onHide={() => setConfirmPostulacion(false)}
        message="Estas seguro que deseas confirmar la postulación?"
        header="Confirmar"
        icon="pi pi-exclamation-triangle"
        accept={acceptPostu}
        reject={rechazarPostu}
      />

      <DialogVerMalla
        setActiveDialogVerMalla={setActiveDialogVerMalla}
        activeDialogVerMalla={activeDialogVerMalla}
        datosVerMalla={datosVerMalla}
        setDatosVerMalla={setDatosVerMalla}
      />

      <div className="mt-3">
        <div className="col-span-5">
          <DataTable value={mallas} emptyMessage="No hay carreras registradas.">
            <Column field="carrera" header="Carrera" />
            <Column body={accionBodyTemplate} />
          </DataTable>
        </div>
      </div>
    </div>
  )
}

export default Postulaciones

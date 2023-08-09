import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { useEffect, useState } from 'react'

const DialogVerOferta = ({
  activeDialogVerOferta,
  setActiveDialogVerOferta,
  datosVerOferta,
  setDatosVerOferta
}) => {
  const [infoOferta, setInfoOferta] = useState(null)

  useEffect(() => {
    setInfoOferta([
      {
        trayecto: 'Trayecto 1',
        semestre: 'Semestre 1',
        materia: 'Dibujo',
        profesor: 'Juan Manuel'
      },
      {
        trayecto: 'Trayecto 1',
        semestre: 'Semestre 1',
        materia: 'Fotografia',
        profesor: 'Juan Manuel'
      },
      {
        trayecto: 'Trayecto 1',
        semestre: 'Semestre 1',
        materia: 'Actuacion',
        profesor: 'Juan Manuel'
      },
      {
        trayecto: 'Trayecto 1',
        semestre: 'Semestre 1',
        materia: 'Teatro',
        profesor: 'Juan Manuel'
      },
      {
        trayecto: 'Trayecto 1',
        semestre: 'Semestre 2',
        materia: 'Arte',
        profesor: 'Juan Manuel'
      },
      {
        trayecto: 'Trayecto 1',
        semestre: 'Semestre 2',
        materia: 'Fotografia 2',
        profesor: 'Juan Manuel'
      },
      /* ------------------------------------ */
      {
        trayecto: 'Trayecto 2',
        semestre: 'Semestre 1',
        materia: 'Dibujo',
        profesor: 'Juan Manuel'
      },
      {
        trayecto: 'Trayecto 2',
        semestre: 'Semestre 2',
        materia: 'Arte',
        profesor: 'Juan Manuel'
      }
      /* ------------------------------------- */
    ])
  }, [])

  const actionBodyTemplate = () => {
    return (
      <div className="flex justify-center">
        <Button label="Ver Horario" className="p-button-info" />
      </div>
    )
  }

  return (
    <Dialog
      visible={activeDialogVerOferta}
      onHide={() => {
        setActiveDialogVerOferta(false)
        setDatosVerOferta(null)
      }}
      header="Ver Oferta"
      resizable={false}
      draggable={false}
    >
      <div className="grid grid-cols-5 gap-4 m-2">
        <div />
        <span className="p-float-label field">
          <InputText
            className="w-full"
            id="carrera"
            value={datosVerOferta?.carrera}
            disabled
          />
          <label htmlFor="carrera">Carrera</label>
        </span>
        <span className="p-float-label field">
          <InputText
            className="w-full"
            id="status_carrera"
            value={datosVerOferta?.status_carrera}
            disabled
          />
          <label htmlFor="status_carrera">Estatus de la Carrera</label>
        </span>
        <span className="p-float-label field">
          <InputText
            className="w-full"
            id="cant_cupos"
            value={datosVerOferta?.cant_cupos}
            disabled
          />
          <label htmlFor="cant_cupos">Cant. Cupos</label>
        </span>
      </div>
      <div className="col-span-5 mt-3">
        <DataTable
          value={infoOferta}
          emptyMessage="No se encuentran trayectos registrados."
          rowGroupMode="rowspan"
          groupRowsBy={['trayecto', 'semestre']}
        >
          <Column field="trayecto" header="Trayectos" />
          <Column field="semestre" header="Semestres" />
          <Column field="materia" header="Materias" />
          <Column field="profesor" header="Profesores" />
          <Column
            field="semestre"
            body={actionBodyTemplate}
            style={{ width: '8.16rem' }}
          />
        </DataTable>
      </div>

      {/* eslint-disable-next-line react/no-unknown-property */}
      <style jsx global>{`
        .p-disabled,
        .p-component:disabled {
          opacity: 0.9;
        }
      `}</style>
    </Dialog>
  )
}

export default DialogVerOferta

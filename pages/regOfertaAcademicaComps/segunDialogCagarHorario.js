import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { useEffect, useState } from 'react'

const { Dialog } = require('primereact/dialog')

const DialogCargarHorario = ({
  activeDialogCargarHorario,
  setActiveDialogCargarHorario
}) => {
  const [infoHorario, setInfoHorario] = useState(null)

  useEffect(() => {
    setInfoHorario([
      {
        horas: '8:00-8:45',
        lunes: '',
        martes: 'Dibujo / Juan Manuel / Aula 3',
        miercoles: '',
        jueves: 'Fotografia / Juan Manuel / Aula 3',
        viernes: '',
        sabado: '',
        domingo: ''
      },
      {
        horas: '8:45-9:45',
        lunes: '',
        martes: 'Dibujo / Juan Manuel / Aula 3',
        miercoles: '',
        jueves: 'Fotografia / Juan Manuel / Aula 3',
        viernes: '',
        sabado: '',
        domingo: ''
      }
    ])
  }, [])

  const bodyDiaSemana = (rowData, dia) => {
    const [materia, nombre, aula] = rowData[`${dia}`].split(' / ')

    if (materia && nombre && aula) {
      return (
        <div className="text-center">
          <p>{materia}</p>
          <p>{nombre}</p>
          <p>{aula}</p>
        </div>
      )
    } else {
      return (
        <div className='flex justify-center'>
          <Button
            icon="pi pi-plus"
            className='p-button-info'
          />
        </div>
      )
    }
  }

  return (
    <>
      <Dialog
        visible={activeDialogCargarHorario}
        resizable={false}
        draggable={false}
        onHide={() => setActiveDialogCargarHorario(false)}
        header="Carga de Horario"
        style={{ height: '90%', width: '100%' }}
      >
        <DataTable
          value={infoHorario}
          emptyMessage="No existe Horario Registrado."
          showGridlines
        >
          <Column field="horas" header="Horas" />
          <Column
            field="lunes"
            header="Lunes"
            body={(rowData) => bodyDiaSemana(rowData, 'lunes')}
          />
          <Column
            field="martes"
            header="Martes"
            body={(rowData) => bodyDiaSemana(rowData, 'martes')}
          />
          <Column
            field="miercoles"
            header="Miercoles"
            body={(rowData) => bodyDiaSemana(rowData, 'miercoles')}
          />
          <Column
            field="jueves"
            header="Jueves"
            body={(rowData) => bodyDiaSemana(rowData, 'jueves')}
          />
          <Column
            field="viernes"
            header="Viernes"
            body={(rowData) => bodyDiaSemana(rowData, 'viernes')}
          />
          <Column
            field="sabado"
            header="Sabado"
            body={(rowData) => bodyDiaSemana(rowData, 'sabado')}
          />
          <Column
            field="domingo"
            header="Domingo"
            body={(rowData) => bodyDiaSemana(rowData, 'domingo')}
          />
        </DataTable>
      </Dialog>
    </>
  )
}

export default DialogCargarHorario

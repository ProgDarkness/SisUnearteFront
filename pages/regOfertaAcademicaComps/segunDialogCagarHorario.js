import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dropdown } from 'primereact/dropdown'
import { useEffect, useState } from 'react'

const { Dialog } = require('primereact/dialog')

const DialogCargarHorario = ({
  activeDialogCargarHorario,
  setActiveDialogCargarHorario
}) => {
  const [infoHorario, setInfoHorario] = useState(null)
  const [dialogAgregarHorario, setDialogAgregarHorario] = useState(false)
  const [rowDataHorario, setRowDataHorario] = useState(null)
  const [daySelected, setDaySelected] = useState(null)
  const [profesores, setProfesores] = useState(null)
  const [materias, setMaterias] = useState(null)
  const [aulas, setAulas] = useState(null)
  const [secciones, setSecciones] = useState(null)
  const [seccion, setSeccion] = useState(null)

  useEffect(() => {
    setProfesores([
      { cod_profesor: 1, nb_profesor: 'Julian Perez' },
      { cod_profesor: 2, nb_profesor: 'Antonio Guzman' }
    ])
    setMaterias([
      { cod_materia: 1, nb_materia: 'Diseño', cod_profesor: 1 },
      { cod_materia: 2, nb_materia: 'Arte', cod_profesor: 1 },
      { cod_materia: 3, nb_materia: 'Danza', cod_profesor: 2 }
    ])
    setAulas([
      { cod_aula: 1, nb_aula: 'Aula 3' },
      { cod_aula: 2, nb_aula: 'Aula 1' }
    ])
    setSecciones([
      { cod_seccion: 30, nb_seccion: '30412' },
      { cod_seccion: 20, nb_seccion: '30411' }
    ])
    setInfoHorario([
      {
        horas: '8:00-8:45',
        lunes: '',
        martes: 'Dibujo / Juan Manuel / Aula 3 / 30223',
        miercoles: '',
        jueves: 'Fotografia / Juan Manuel / Aula 3 / 30223',
        viernes: '',
        sabado: '',
        domingo: ''
      },
      {
        horas: '8:45-9:45',
        lunes: '',
        martes: 'Dibujo / Juan Manuel / Aula 3 / 30223',
        miercoles: '',
        jueves: 'Fotografia / Juan Manuel / Aula 3 / 30223',
        viernes: '',
        sabado: '',
        domingo: ''
      }
    ])
  }, [])

  function addHorario(nb_materia, nb_profesor, nb_aula, nb_seccion) {
    const concatSave =
      nb_materia + ' / ' + nb_profesor + ' / ' + nb_aula + ' / ' + nb_seccion

    // eslint-disable-next-line array-callback-return
    infoHorario.map((rowHorario, index) => {
      if (rowHorario.horas === rowDataHorario.horas) {
        infoHorario[index][`${daySelected}`] = concatSave
      }
    })
  }

  const bodyDiaSemana = (rowData, dia) => {
    const [materia, profesor, aula, seccion] = rowData[`${dia}`].split(' / ')

    if (materia && profesor && aula) {
      return (
        <div className="text-center">
          <p>{materia}</p>
          <p>{profesor}</p>
          <p>{aula}</p>
          <p>{seccion}</p>
        </div>
      )
    } else {
      return (
        <div className="flex justify-center">
          <Button
            icon="pi pi-plus"
            className="p-button-info"
            onClick={() => {
              setDialogAgregarHorario(true)
              setRowDataHorario(rowData)
              setDaySelected(dia)
            }}
          />
        </div>
      )
    }
  }

  const DialogAgregarHorario = () => {
    const [profesor, setProfesor] = useState(null)
    const [materia, setMateria] = useState(null)
    const [aula, setAula] = useState(null)

    return (
      <Dialog
        visible={dialogAgregarHorario}
        onHide={() => {
          setDialogAgregarHorario(false)
        }}
        header="Agregar Horario"
        resizable={false}
        draggable={false}
        style={{ width: '120vh' }}
      >
        <div className="grid grid-cols-3 gap-4 m-2">
          <span className="p-float-label field">
            <Dropdown
              className="w-full"
              id="profesor"
              value={profesor}
              options={profesores}
              optionLabel="nb_profesor"
              onChange={(e) => setProfesor(e.value)}
            />
            <label htmlFor="profesor">Profesor</label>
          </span>
          <span className="p-float-label field">
            <Dropdown
              className="w-full"
              id="nb_materia"
              value={materia}
              options={materias}
              optionLabel="nb_materia"
              onChange={(e) => setMateria(e.value)}
            />
            <label htmlFor="nb_materia">Materia</label>
          </span>
          <span className="p-float-label field">
            <Dropdown
              className="w-full"
              id="nb_aula"
              value={aula}
              options={aulas}
              optionLabel="nb_aula"
              onChange={(e) => setAula(e.value)}
            />
            <label htmlFor="nb_aula">Aula</label>
          </span>
          <div className="my-auto col-span-3 flex justify-center">
            <Button
              label="Agregar"
              icon="pi pi-plus"
              onClick={() => {
                addHorario(
                  materia.nb_materia,
                  profesor.nb_profesor,
                  aula.nb_aula,
                  seccion.nb_seccion
                )
                setDialogAgregarHorario(false)
              }}
              disabled={!seccion || !materia || !profesor || !aula}
            />
          </div>
        </div>
      </Dialog>
    )
  }

  return (
    <>
      <DialogAgregarHorario />
      <Dialog
        visible={activeDialogCargarHorario}
        resizable={false}
        draggable={false}
        onHide={() => setActiveDialogCargarHorario(false)}
        header="Carga de Horario por Sección"
        style={{ height: '90%', width: '100%' }}
      >
        <div className="mt-3 w-[20%] mb-3">
          <span className="p-float-label field">
            <Dropdown
              className="w-full"
              id="seccion"
              value={seccion}
              options={secciones}
              optionLabel="nb_seccion"
              onChange={(e) => setSeccion(e.value)}
            />
            <label htmlFor="seccion">Sección</label>
          </span>
        </div>
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
            header="Miércoles"
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
            header="Sábado"
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

import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const DialogVerOferta = ({
  activeDialogVerOferta,
  setActiveDialogVerOferta,
  datosVerOferta,
  setDatosVerOferta
}) => {
  const [infoOferta, setInfoOferta] = useState(null)
  const [infoHorario, setInfoHorario] = useState(null)
  const [animacionVerHorario, setAnimacionVerHorario] = useState(false)

  const animation = {
    initial: {
      x: 1700
    },
    animate: {
      x: [1700, 0],
      transition: {
        duration: 1
      }
    },
    exit: {
      x: [0, -1700],
      transition: {
        duration: 0.2
      }
    }
  }

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

  const actionBodyTemplate = () => {
    return (
      <div className="flex justify-center">
        <Button
          label="Ver Horario"
          className="p-button-info"
          onClick={() => setAnimacionVerHorario(!animacionVerHorario)}
        />
      </div>
    )
  }

  const bodyDiaSemana = (rowData, dia) => {
    const [materia, nombre, aula] = rowData[`${dia}`].split(' / ')

    return (
      <div className="text-center">
        <p>{materia}</p>
        <p>{nombre}</p>
        <p>{aula}</p>
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
      style={{ height: '90%' }}
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
        <div className="flex justify-center align-middle">
          {animacionVerHorario && (
            <Button
              label="Volver"
              onClick={() => setAnimacionVerHorario(!animacionVerHorario)}
              icon="pi pi-check"
              iconPos="left"
            />
          )}
        </div>
      </div>
      <AnimatePresence initial={animacionVerHorario}>
        {animacionVerHorario && (
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={animation}
          >
            <div className="col-span-5 mt-3">
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence initial={!animacionVerHorario}>
        {!animacionVerHorario && (
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={animation}
          >
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
          </motion.div>
        )}
      </AnimatePresence>

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

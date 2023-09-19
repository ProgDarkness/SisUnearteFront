/* import { Button } from 'primereact/button' */
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from 'primereact/button'
import GQLregOfertaAcademica from 'graphql/regOfertaAcademica'
import useSWR from 'swr'

const DialogVerOferta = ({
  activeDialogVerOferta,
  setActiveDialogVerOferta,
  datosVerOferta,
  setDatosVerOferta
}) => {
  const [animationVerHorario, setAnimationVerHorario] = useState(false)

  const { data: infoOferta } = useSWR(
    [
      datosVerOferta?.id_carrera
        ? GQLregOfertaAcademica.DETALLES_MALLAS_CARRERA
        : null,
      { carrera: parseInt(datosVerOferta?.id_carrera) }
    ],
    { refreshInterval: 1000 }
  )

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

  /* const bodyDiaSemana = (rowData, dia) => {
    const [materia, nombre, aula] = rowData[`${dia}`].split(' / ')

    return (
      <div className="text-center">
        <p>{materia}</p>
        <p>{nombre}</p>
        <p>{aula}</p>
      </div>
    )
  } */

  return (
    <Dialog
      visible={activeDialogVerOferta}
      onHide={() => {
        setActiveDialogVerOferta(false)
        setDatosVerOferta(null)
      }}
      style={{ height: '90%' }}
      header="Ver Oferta Academica"
      resizable={false}
      draggable={false}
    >
      <div className="grid grid-cols-6 gap-4 m-2 place-content-center">
        <span className="p-float-label field">
          <InputText
            className="w-full"
            id="carrera"
            value={datosVerOferta?.nb_carrera}
            disabled
          />
          <label htmlFor="carrera">Carrera</label>
        </span>
        <div className="flex justify-center align-middle">
          {animationVerHorario && (
            <Button
              label="Volver"
              onClick={() => setAnimationVerHorario(!animationVerHorario)}
              icon="pi pi-check"
              iconPos="left"
            />
          )}
        </div>
      </div>
      {/*  <AnimatePresence initial={animationVerHorario}>
        {animationVerHorario && (
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={animation}
          >
            <div className="col-span-4 mt-3">
              <DataTable
                value={infoOferta}
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
            </div>
          </motion.div>
        )}
      </AnimatePresence> */}
      <AnimatePresence initial={!animationVerHorario}>
        {!animationVerHorario && (
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={animation}
          >
            <div className="col-span-2 mt-3">
              <DataTable
                value={infoOferta?.obtenerDetalleMalla.response}
                emptyMessage="No se encuentran trayectos registrados."
                rowGroupMode="rowspan"
                groupRowsBy={['nb_trayecto']}
              >
                <Column field="nb_trayecto" header="Trayectos" />
                <Column field="nb_materia" header="Materias" />
                <Column field="personal" header="Profesores" />
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

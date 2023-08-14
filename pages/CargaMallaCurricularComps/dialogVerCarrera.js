import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const DialogVerCarrera = ({
  activeDialogVerCarrera,
  setActiveDialogVerCarrera,
  datosVerCarrera,
  setDatosVerCarrera
}) => {
  const [infoCarrera, setInfoCarrera] = useState(null)

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
    setInfoCarrera([
      {
        trayecto: 'Trayecto 1',
        lapso: 'lapso 1',
        materia: 'Dibujo',
        profesor: 'Juan Manuel'
      },
      {
        trayecto: 'Trayecto 1',
        lapso: 'lapso 1',
        materia: 'Fotografia',
        profesor: 'Juan Manuel'
      },
      {
        trayecto: 'Trayecto 1',
        lapso: 'lapso 2',
        materia: 'Arte',
        profesor: 'Juan Manuel'
      },
      {
        trayecto: 'Trayecto 1',
        lapso: 'lapso 2',
        materia: 'Fotografia 2',
        profesor: 'Juan Manuel'
      },
      /* ------------------------------------ */
      {
        trayecto: 'Trayecto 2',
        lapso: 'lapso 1',
        materia: 'Dibujo',
        profesor: 'Juan Manuel'
      },
      {
        trayecto: 'Trayecto 2',
        lapso: 'lapso 2',
        materia: 'Arte',
        profesor: 'Juan Manuel'
      }
      /* ------------------------------------- */
    ])
  }, [])

  return (
    <Dialog
      visible={activeDialogVerCarrera}
      onHide={() => {
        setActiveDialogVerCarrera(false)
        setDatosVerCarrera(null)
      }}
      style={{ height: '90%' }}
      header="Ver Carrera"
      resizable={false}
      draggable={false}
    >
      <div className="grid grid-cols-2 gap-4 m-2">
        <span className="p-float-label field">
          <InputText
            className="w-full"
            id="cod_carrera"
            value={datosVerCarrera?.cod_carrera}
            disabled
          />
          <label htmlFor="cod_carrera">Estatus de la Carrera</label>
        </span>
        <span className="p-float-label field">
          <InputText
            className="w-full"
            id="nb_carrera"
            value={datosVerCarrera?.nb_carrera}
            disabled
          />
          <label htmlFor="nb_carrera">Carrera</label>
        </span>
      </div>
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={animation}
      >
        <div className="col-span-4 mt-3">
          <DataTable
            value={infoCarrera}
            emptyMessage="No se encuentran trayectos registrados."
            rowGroupMode="rowspan"
            groupRowsBy={['trayecto']}
          >
            <Column field="trayecto" header="Trayectos" />
            <Column field="materia" header="Materias" />
          </DataTable>
        </div>
      </motion.div>

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

export default DialogVerCarrera

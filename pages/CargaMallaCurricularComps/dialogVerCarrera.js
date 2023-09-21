import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { motion } from 'framer-motion'
import GQLregMallaCurricular from 'graphql/regMallaCurricular'
import useSWR from 'swr'

const DialogVerCarrera = ({
  activeDialogVerCarrera,
  setActiveDialogVerCarrera,
  datosVerCarrera,
  setDatosVerCarrera
}) => {
  const { data: infoCarrera } = useSWR(
    [
      datosVerCarrera?.id ? GQLregMallaCurricular.VER_DETALLE_CARRERA : null,
      {
        InputCarrera: {
          carrera: parseInt(datosVerCarrera?.id)
        }
      }
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
            value={datosVerCarrera?.estatus || ''}
            disabled
          />
          <label htmlFor="cod_carrera">Estatus de la Carrera</label>
        </span>
        <span className="p-float-label field">
          <InputText
            className="w-full"
            id="nb_carrera"
            value={datosVerCarrera?.nombre || ''}
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
            value={infoCarrera?.obtenerDetalleCarrera.response}
            emptyMessage="No se encuentran trayectos registrados."
            rowGroupMode="rowspan"
            groupRowsBy={['nb_trayecto', 'nb_materia']}
          >
            <Column field="nb_trayecto" header="Trayectos" />
            <Column field="nb_materia" header="Materias" />
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

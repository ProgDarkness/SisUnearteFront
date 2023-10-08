/* import { Button } from 'primereact/button' */
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import GQLregMallaCurricular from 'graphql/regMallaCurricular'
import { motion } from 'framer-motion'
import useSWR from 'swr'

const DialogVerMalla = ({
  activeDialogVerMalla,
  setActiveDialogVerMalla,
  datosVerMalla,
  setDatosVerMalla
}) => {
  const { data: infoMalla } = useSWR(
    [
      datosVerMalla?.id ? GQLregMallaCurricular.VER_DETALLE_CARRERA : null,
      {
        InputCarrera: {
          carrera: parseInt(datosVerMalla?.id)
        }
      }
    ],
    { refreshInterval: 10000 }
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
      visible={activeDialogVerMalla}
      onHide={() => {
        setActiveDialogVerMalla(false)
        setDatosVerMalla(null)
      }}
      style={{ height: '90%' }}
      header="Ver Malla Curricular"
      resizable={false}
      draggable={false}
    >
      <div className="grid grid-cols-2 gap-4 m-2 place-content-center">
        <span className="p-float-label field">
          <InputText
            className="w-full"
            id="carrera"
            value={datosVerMalla?.nombre || ''}
            disabled
          />
          <label htmlFor="carrera">Carrera</label>
        </span>
      </div>
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={animation}
      >
        <div className="col-span-2 mt-3">
          <DataTable
            value={infoMalla?.obtenerDetalleCarrera.response}
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

export default DialogVerMalla

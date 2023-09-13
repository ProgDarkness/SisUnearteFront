/* import { Button } from 'primereact/button' */
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import GQLregOfertaAcademica from 'graphql/regOfertaAcademica'
import { motion } from 'framer-motion'
import useSWR from 'swr'

const DialogVerInfoPostulacion = ({
  activeDialogVerMalla,
  setActiveDialogVerMalla,
  datosVerMalla,
  setDatosVerMalla
}) => {
  const { data: infoMalla } = useSWR(
    [
      GQLregOfertaAcademica.DETALLES_MALLAS_CARRERA,
      { carrera: parseInt(datosVerMalla?.id_carrera) }
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
      visible={activeDialogVerMalla}
      onHide={() => {
        setActiveDialogVerMalla(false)
        setDatosVerMalla(null)
      }}
      style={{ width: '60%' }}
      header="Ver Malla Curricular"
      resizable={false}
      draggable={false}
    >
      <div className="grid grid-cols-2 gap-4 m-2 place-content-center">
        <span className="p-float-label field">
          <InputText
            className="w-full"
            id="carrera"
            value={datosVerMalla?.nb_carrera}
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
            value={infoMalla?.obtenerDetalleMalla.response}
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

export default DialogVerInfoPostulacion

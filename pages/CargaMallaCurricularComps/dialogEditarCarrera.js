import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const DialogEditarCarrera = ({
  activeDialogEditarCarrera,
  setActiveDialogEditarCarrera,
  datosEditarCarrera,
  setDatosEditarCarrera
}) => {
  const [infoCarrera, setInfoCarrera] = useState(null)
  const [dialogAgregarMateria, setDialogAgregarMateria] = useState(false)

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
        semestre: 'Semestre 2',
        materia: 'Arte',
        profesor: 'Juan Manuel'
      }
      /* ------------------------------------- */
    ])
  }, [])

  const DialogAgregarMateria = () => {
    return (
      <Dialog
        visible={dialogAgregarMateria}
        onHide={() => {
          setDialogAgregarMateria(false)
          setActiveDialogEditarCarrera(true)
        }}
        header="Modificar Materia"
        resizable={false}
        draggable={false}
      >
        <div className="grid grid-cols-5 gap-4 m-2">
          <span className="p-float-label field">
            <InputText
              className="w-full"
              id="carrera_materia"
              /* value={datosEditarMateria?.carrera_materia} */
              autoComplete="off"
            />
            <label htmlFor="carrera_materia">Carrera</label>
          </span>
          <span className="p-float-label field">
            <InputText
              className="w-full"
              id="trayecto_materia"
              /* value={datosEditarMateria?.carrera_materia} */
              autoComplete="off"
            />
            <label htmlFor="trayecto_materia">Trayecto</label>
          </span>
          <span className="p-float-label field">
            <InputText
              className="w-full"
              id="lapso_materia"
              /* value={datosEditarMateria?.carrera_materia} */
              autoComplete="off"
            />
            <label htmlFor="lapso_materia">Lapso</label>
          </span>
          <span className="p-float-label field">
            <InputText
              className="w-full"
              id="nb_materia"
              /* value={datosEditarMateria?.carrera_materia} */
              autoComplete="off"
            />
            <label htmlFor="nb_materia">Nombre de la Materia</label>
          </span>
          <div>
            <Button
              label="Agregar"
              icon="pi pi-plus"
              /* onClick={() => setDialogEditarMateria(false)} */
            />
          </div>
        </div>
      </Dialog>
    )
  }

  const actionBodyTemplate = () => {
    return (
      <div className="flex justify-center">
        <Button
          label="Agregar Materia"
          icon="pi pi-plus"
          iconPos="left"
          className="p-button-help text-sm p-1"
          onClick={() => {
            setDialogAgregarMateria(true)
            setActiveDialogEditarCarrera(false)
          }}
        />
      </div>
    )
  }

  const actionBodyTemplateMateria = () => {
    return (
      <div className="flex justify-center">
        <Button
          tooltip="Eliminar Materia"
          icon="pi pi-times"
          iconPos="left"
          className="p-button-danger p-1"
          /* onClick={() => setAnimacionEditarHorario(!animacionEditarHorario)} */
        />
      </div>
    )
  }

  return (
    <>
      <DialogAgregarMateria />
      <Dialog
        visible={activeDialogEditarCarrera}
        onHide={() => {
          setActiveDialogEditarCarrera(false)
          setDatosEditarCarrera(null)
        }}
        style={{ height: '90%' }}
        header="Editar Carrera"
        resizable={false}
        draggable={false}
      >
        <div className="grid grid-cols-4 gap-4 m-2">
          <div />
          <span className="p-float-label field">
            <InputText
              className="w-full"
              id="cod_carrera"
              value={datosEditarCarrera?.cod_carrera}
              disabled
            />
            <label htmlFor="cod_carrera">Estatus de la Carrera</label>
          </span>
          <span className="p-float-label field">
            <InputText
              className="w-full"
              id="nb_carrera"
              value={datosEditarCarrera?.nb_carrera}
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
              groupRowsBy={['trayecto', 'lapso']}
            >
              <Column field="trayecto" header="Trayectos" />
              <Column field="lapso" header="Lapsos" />
              <Column field="materia" header="Materias" />
              <Column
                field="materia"
                body={actionBodyTemplateMateria}
                style={{ width: '8rem' }}
              />
              <Column
                field="lapso"
                body={actionBodyTemplate}
                style={{ width: '8rem' }}
              />
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
    </>
  )
}

export default DialogEditarCarrera

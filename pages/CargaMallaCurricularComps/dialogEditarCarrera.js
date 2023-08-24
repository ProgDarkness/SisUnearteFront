import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ConfirmDialog } from 'primereact/confirmdialog'
import GQLregMallaCurricular from 'graphql/regMallaCurricular'
import GQLconsultasGenerales from 'graphql/consultasGenerales'
import useSWR from 'swr'
import { Dropdown } from 'primereact/dropdown'
import request from 'graphql-request'
import { Toast } from 'primereact/toast'

const DialogEditarCarrera = ({
  activeDialogEditarCarrera,
  setActiveDialogEditarCarrera,
  datosEditarCarrera,
  setDatosEditarCarrera
}) => {
  const [dialogAgregarMateria, setDialogAgregarMateria] = useState(false)
  const [dialogConfirmElminarMateria, setDialogConfirmElminarMateria] =
    useState(false)
  const [datosAggMateria, setDatosAggMateria] = useState(null)
  const toast = useRef(null)

  const { data: infoCarrera, mutate } = useSWR(
    datosEditarCarrera?.id
      ? [
          GQLregMallaCurricular.VER_DETALLE_CARRERA,
          {
            InputCarrera: {
              carrera: parseInt(datosEditarCarrera?.id)
            }
          }
        ]
      : null
  )

  const { data: materias } = useSWR(
    datosEditarCarrera?.id
      ? [
          GQLregMallaCurricular.GET_CARRERAS_POR_MATERIA,
          {
            carrera: parseInt(datosEditarCarrera?.id)
          }
        ]
      : null
  )

  const { data: trayectos } = useSWR(
    datosEditarCarrera?.id
      ? [
          GQLregMallaCurricular.GET_TRAYECTOS_POR_CARRERA,
          {
            carrera: parseInt(datosEditarCarrera?.id)
          }
        ]
      : null
  )

  const { data: carreras } = useSWR(GQLconsultasGenerales.GET_CARRERAS)

  const asignarTrayecto = (variables) => {
    return request(
      process.env.NEXT_PUBLIC_URL_BACKEND,
      GQLregMallaCurricular.ASIGNAR_TRAYECTO,
      variables
    )
  }

  const desasignarTrayecto = (variables) => {
    return request(
      process.env.NEXT_PUBLIC_URL_BACKEND,
      GQLregMallaCurricular.DESASIGNAR_TRAYECTO,
      variables
    )
  }

  const registrarAggTrayecto = (aggMateriaTrayecto, aggMateriaNbMateria) => {
    asignarTrayecto({
      idCarrema: parseInt(datosEditarCarrera?.id),
      idTrayecto: parseInt(aggMateriaTrayecto?.id),
      idMateria: parseInt(aggMateriaNbMateria?.id)
    }).then(({ asignarTrayectoMateria: { status, message, type } }) => {
      setDialogAgregarMateria(false)
      setActiveDialogEditarCarrera(true)
      toast.current.show({
        severity: type,
        summary: 'Info',
        detail: message,
        life: 3000
      })
      mutate()
    })
  }

  const registrarDelTrayecto = (aggMateriaNbMateria) => {
    desasignarTrayecto({
      idCarrema: parseInt(datosEditarCarrera?.id),
      idMateria: parseInt(datosAggMateria.id_materia)
    }).then(({ desasignarTrayectoMateria: { status, message, type } }) => {
      setDialogAgregarMateria(false)
      setActiveDialogEditarCarrera(true)
      toast.current.show({
        severity: type,
        summary: 'Info',
        detail: message,
        life: 3000
      })
      mutate()
    })
  }

  const acceptEliminarMateria = () => {
    registrarDelTrayecto()
    setActiveDialogEditarCarrera(true)
  }

  const rejectEliminarMateria = () => {
    console.log('NO')
    setActiveDialogEditarCarrera(true)
  }

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

  const DialogAgregarMateria = () => {
    const [aggMateriaCarrera, setAggMateriaCarrera] = useState(null)
    const [aggMateriaNbMateria, setAggMateriaNbMateria] = useState(null)
    const [aggMateriaTrayecto, setAggMateriaTrayecto] = useState(null)

    useEffect(() => {
      setAggMateriaCarrera({
        id: datosEditarCarrera?.id,
        nombre: datosEditarCarrera?.nombre
      })
      setAggMateriaTrayecto({
        id: datosAggMateria?.idTrayectoCarrera.toString(),
        nombre: datosAggMateria?.nb_trayecto
      })
    }, [datosAggMateria])

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
        style={{ width: '800px' }}
      >
        <div className="grid grid-cols-3 gap-4 m-2">
          <span className="p-float-label field">
            <Dropdown
              className="w-full"
              id="carrera_materia"
              value={aggMateriaCarrera}
              options={carreras?.obtenerCarreras.response}
              onChange={(e) => setAggMateriaCarrera(e.value)}
              optionLabel="nombre"
              disabled
            />
            <label htmlFor="carrera_materia">Carrera</label>
          </span>
          <span className="p-float-label field">
            <Dropdown
              className="w-full"
              id="trayecto_materia"
              value={aggMateriaTrayecto}
              options={trayectos?.obtenerTrayectosPorCarrera.response}
              onChange={(e) => setAggMateriaTrayecto(e.value)}
              optionLabel="nombre"
              disabled
            />
            <label htmlFor="trayecto_materia">Trayecto</label>
          </span>
          <span className="p-float-label field">
            <Dropdown
              className="w-full"
              id="nb_materia"
              value={aggMateriaNbMateria}
              options={materias?.obtenerMateriasPorCarrera.response}
              onChange={(e) => setAggMateriaNbMateria(e.value)}
              optionLabel="nombre"
            />
            <label htmlFor="nb_materia">Nombre de la Materia</label>
          </span>
          <div className="my-auto col-span-3 flex justify-center">
            <Button
              label="Agregar"
              icon="pi pi-plus"
              onClick={() => {
                registrarAggTrayecto(aggMateriaTrayecto, aggMateriaNbMateria)
              }}
              disabled={
                !aggMateriaCarrera ||
                !aggMateriaTrayecto ||
                !aggMateriaNbMateria
              }
            />
          </div>
          {/* eslint-disable-next-line react/no-unknown-property */}
          <style jsx global>{`
            .p-disabled,
            .p-component:disabled {
              opacity: 0.9;
            }

            #trayecto_materia.p-dropdown .p-dropdown-trigger {
              background: transparent;
              color: rgba(0, 0, 0, 0);
              width: 2.357rem;
              border-top-right-radius: 4px;
              border-bottom-right-radius: 4px;
            }

            #carrera_materia.p-dropdown .p-dropdown-trigger {
              background: transparent;
              color: rgba(0, 0, 0, 0);
              width: 2.357rem;
              border-top-right-radius: 4px;
              border-bottom-right-radius: 4px;
            }
          `}</style>
        </div>
      </Dialog>
    )
  }

  const actionBodyTemplate = (rowData) => {
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
            setDatosAggMateria(rowData)
          }}
        />
      </div>
    )
  }

  const actionBodyTemplateMateria = (rowData) => {
    return (
      <div className="flex justify-center">
        {rowData.id_materia && (
          <Button
            tooltip="Eliminar Materia"
            icon="pi pi-times"
            iconPos="left"
            className="p-button-danger p-1"
            onClick={() => {
              setDialogConfirmElminarMateria(true)
              setDatosAggMateria(rowData)
            }}
          />
        )}
      </div>
    )
  }

  return (
    <>
      <Toast ref={toast} />
      <DialogAgregarMateria />
      <ConfirmDialog
        visible={dialogConfirmElminarMateria}
        onHide={() => setDialogConfirmElminarMateria(false)}
        message="¿Esta seguro que desea eliminar la materia?"
        header="Confirmacion"
        icon="pi pi-exclamation-triangle"
        accept={acceptEliminarMateria}
        reject={rejectEliminarMateria}
        acceptLabel="SI"
        rejectLabel="NO"
      />
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
        <div className="grid grid-cols-3 gap-4 m-2">
          <span className="p-float-label field">
            <InputText
              className="w-full"
              id="cod_carrera"
              value={datosEditarCarrera?.estatus || ''}
              disabled
            />
            <label htmlFor="cod_carrera">Estatus de la Carrera</label>
          </span>
          <span className="p-float-label field">
            <InputText
              className="w-full"
              id="nb_carrera"
              value={datosEditarCarrera?.nombre || ''}
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
              <Column
                field="nb_materia"
                body={actionBodyTemplateMateria}
                style={{ width: '8rem' }}
              />
              <Column
                field="nb_trayecto"
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

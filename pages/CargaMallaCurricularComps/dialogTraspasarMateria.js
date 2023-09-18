import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog'
import { useRef, useState } from 'react'
import GQLregMallaCurricular from 'graphql/regMallaCurricular'
import GQLconsultasGenerales from 'graphql/consultasGenerales'
import useSWR from 'swr'
import { Toast } from 'primereact/toast'
import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import request from 'graphql-request'
import { ConfirmDialog } from 'primereact/confirmdialog'

const DialogTrasMateria = ({ dialogTrasMateria, setDialogTrasMateria }) => {
  const toast = useRef(null)
  const [dialogTraspaso, setDialogTraspaso] = useState(false)
  const [reloadTabla, setReloadTabla] = useState(true)
  const [dialogConfirmElminarTraspaso, setDialogConfirmElminarTraspaso] =
    useState(false)
  const [dataEliminarTraspaso, setDataEliminarTraspaso] = useState(null)

  const { data: materias, mutate } = useSWR(
    GQLregMallaCurricular.GET_MATERIAS,
    { refreshInterval: 1000 }
  )
  const { data: materiasDrop } = useSWR(GQLconsultasGenerales.GET_MATERIAS_ONE)
  const { data: carreras } = useSWR(GQLconsultasGenerales.GET_CARRERAS)

  const traspMateria = (variables) => {
    return request(
      process.env.NEXT_PUBLIC_URL_BACKEND,
      GQLregMallaCurricular.TRASPASAR_MATERIA,
      variables
    )
  }

  const deleteTraspMateria = (variables) => {
    return request(
      process.env.NEXT_PUBLIC_URL_BACKEND,
      GQLregMallaCurricular.ELIMINAR_TRASPASO,
      variables
    )
  }

  const eliminarTrasMateria = (variables) => {
    deleteTraspMateria({
      idcarrema: parseInt(dataEliminarTraspaso?.idcarrema)
    }).then(({ eliminarTraspaso: { status, message, type } }) => {
      toast.current.show({
        severity: type,
        summary: '¡ Atención !',
        detail: message
      })
      mutate()
    })
  }

  const regTraspMateria = (
    carreraTraspaso,
    materiaTraspaso,
    horasSemanales,
    setMateriaTraspaso,
    setCarreraTraspaso,
    setHorasSemanales
  ) => {
    traspMateria({
      idCarrera: parseInt(carreraTraspaso),
      idMateria: parseInt(materiaTraspaso),
      horasSemanales: parseInt(horasSemanales)
    }).then(({ traspasarMateria: { status, message, type } }) => {
      setReloadTabla(false)
      setMateriaTraspaso(null)
      setCarreraTraspaso(null)
      setHorasSemanales('')
      toast.current.show({
        severity: type,
        summary: '¡ Atención !',
        detail: message
      })
      mutate()
      setTimeout(() => {
        setReloadTabla(true)
      }, 1)
    })
  }

  const accionBodyTemplate = (rowData) => {
    return (
      <div className="flex justify-center">
        <Button
          icon="pi pi-times"
          className="p-button-danger"
          tooltip="Eliminar"
          tooltipOptions={{ position: 'top' }}
          onClick={() => {
            setDialogConfirmElminarTraspaso(true)
            setDataEliminarTraspaso(rowData)
          }}
        />
      </div>
    )
  }

  const DialogTraspaso = () => {
    const [materiaTraspaso, setMateriaTraspaso] = useState(null)
    const [carreraTraspaso, setCarreraTraspaso] = useState(null)
    const [horasSemanales, setHorasSemanales] = useState('')

    return (
      <Dialog
        visible={dialogTraspaso}
        onHide={() => setDialogTraspaso(false)}
        header="Traspaso"
        style={{ width: '800px' }}
      >
        <div className="grid grid-cols-3 gap-4 m-2">
          <span className="p-float-label field">
            <Dropdown
              className="w-full"
              id="new_tec_carrera"
              options={materiasDrop?.obtenerMaterias.response}
              optionLabel="nombre"
              optionValue="id"
              filter
              filterBy="nombre"
              value={materiaTraspaso}
              onChange={(e) => setMateriaTraspaso(e.value)}
              autoComplete="off"
            />
            <label htmlFor="new_tec_carrera">Materia</label>
          </span>
          <span className="p-float-label field">
            <Dropdown
              className="w-full"
              id="new_tec_carrera"
              options={carreras?.obtenerCarreras.response}
              optionLabel="nombre"
              optionValue="id"
              filter
              filterBy="nombre"
              value={carreraTraspaso}
              onChange={(e) => setCarreraTraspaso(e.value)}
              autoComplete="off"
            />
            <label htmlFor="new_tec_carrera">Carrera</label>
          </span>
          <span className="p-float-label field">
            <InputText
              className="w-full"
              id="new_uni_cre_carrera"
              value={horasSemanales}
              onChange={(e) => setHorasSemanales(e.target.value)}
              autoComplete="off"
              keyfilter="pint"
              maxLength={2}
            />
            <label htmlFor="new_uni_cre_carrera">Horas Semanales</label>
          </span>
          <div className="flex col-span-3 justify-center">
            <Button
              icon="pi pi-plus"
              label="Traspasar"
              onClick={() =>
                regTraspMateria(
                  carreraTraspaso,
                  materiaTraspaso,
                  horasSemanales,
                  setMateriaTraspaso,
                  setCarreraTraspaso,
                  setHorasSemanales
                )
              }
              disabled={!materiaTraspaso || !carreraTraspaso}
            />
          </div>
        </div>
      </Dialog>
    )
  }

  const acceptEliminarMateria = () => {
    eliminarTrasMateria()
  }

  const rejectEliminarMateria = () => {
    setDialogConfirmElminarTraspaso(false)
  }

  return (
    <>
      <Toast ref={toast} />
      <DialogTraspaso />
      <ConfirmDialog
        visible={dialogConfirmElminarTraspaso}
        onHide={() => setDialogConfirmElminarTraspaso(false)}
        message="¿Esta seguro que desea eliminar el traspaso?"
        header="Confirmación"
        icon="pi pi-exclamation-triangle"
        accept={acceptEliminarMateria}
        reject={rejectEliminarMateria}
        acceptLabel="SI"
        rejectLabel="NO"
      />
      <Dialog
        visible={dialogTrasMateria}
        onHide={() => setDialogTrasMateria(false)}
        header="Materias para Traspaso"
        resizable={false}
        draggable={false}
        style={{ width: '60%' }}
      >
        <div className="flex justify-end">
          <Button
            icon="pi pi-pencil"
            label="Traspasar Materia"
            className="p-button-help mr-1"
            tooltip="Traspasar"
            onClick={() => {
              setDialogTraspaso(true)
            }}
            tooltipOptions={{ position: 'top' }}
          />
        </div>
        {reloadTabla && (
          <DataTable
            value={materias?.obtenerTodasMaterias.response}
            emptyMessage="No se encuentran materias registradas."
            rowGroupMode="rowspan"
            groupRowsBy={['carrera']}
          >
            <Column field="carrera" header="Carrera" />
            <Column field="codigo" header="Código" />
            <Column field="nombre" header="Materia" />
            <Column field="tipo" header="Técnica" />
            <Column
              field="credito"
              header="Unidades de Crédito"
              style={{ width: '10%' }}
            />
            <Column
              field="hora"
              header="Horas Semanales"
              style={{ width: '10%' }}
            />
            <Column body={accionBodyTemplate} />
          </DataTable>
        )}
      </Dialog>
    </>
  )
}

export default DialogTrasMateria

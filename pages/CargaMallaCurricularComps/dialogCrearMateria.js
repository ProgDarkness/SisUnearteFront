import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog'
import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import { useRef, useState } from 'react'
import GQLconsultasGenerales from 'graphql/consultasGenerales'
import GQLregMallaCurricular from 'graphql/regMallaCurricular'
import useSWR from 'swr'
import request from 'graphql-request'
import DialogEditarMateria from './dialogEditarMateria'
import { ConfirmDialog } from 'primereact/confirmdialog'
import { Toast } from 'primereact/toast'

const DialogRegMateria = ({
  dialogRegMateria,
  setDialogRegMateria,
  carreras
}) => {
  const toast = useRef(null)
  const [idCarrera, setIdCarrera] = useState(null)
  const [codMateria, setCodMateria] = useState('')
  const [nombMateria, setNombMateria] = useState('')
  const [idTpMateria, setIdTpMateria] = useState(null)
  const [unCredito, setUnCredito] = useState('')
  const [horasSemanales, setHorasSemanales] = useState('')
  const [datosEditarMateria, setDatosEditarMateria] = useState(null)
  const [dialogEditarMateria, setDialogEditarMateria] = useState(false)
  const [dialogConfirmElminarMateria, setDialogConfirmElminarMateria] =
    useState(false)
  const [dataEliminarMateria, setDataEliminarMateria] = useState(null)

  const { data: tpmateria } = useSWR(GQLconsultasGenerales.GET_TIPO_MATERIA)
  const { data: materias, mutate } = useSWR(GQLregMallaCurricular.GET_MATERIAS)

  const crearMateria = (variables) => {
    return request(
      process.env.NEXT_PUBLIC_URL_BACKEND,
      GQLregMallaCurricular.SAVE_MATERIA,
      variables
    )
  }
  const eliminarMateria = (variables) => {
    return request(
      process.env.NEXT_PUBLIC_URL_BACKEND,
      GQLregMallaCurricular.DELETE_MATERIA,
      variables
    )
  }

  const regMateria = () => {
    const InputCrearMateria = {
      codigo: codMateria,
      nombre: nombMateria,
      credito: parseInt(unCredito),
      tipo: parseInt(idTpMateria),
      hora: parseInt(horasSemanales),
      carrera: parseInt(idCarrera)
    }
    crearMateria({ InputCrearMateria }).then(
      ({ crearMateria: { message } }) => {
        setIdCarrera(null)
        setCodMateria('')
        setNombMateria('')
        setIdTpMateria(null)
        setHorasSemanales('')
        setUnCredito('')
        toast.current.show({
          severity: 'success',
          summary: '¡ Atención !',
          detail: message
        })
        mutate()
      }
    )
  }

  const accionBodyTemplateMaterias = (rowData) => {
    return (
      <div className="flex justify-center">
        <Button
          icon="pi pi-pencil"
          className="p-button-help mr-1"
          tooltip="Modificar"
          onClick={() => {
            setDatosEditarMateria(rowData)
            setDialogEditarMateria(true)
          }}
          tooltipOptions={{ position: 'top' }}
        />
        <Button
          icon="pi pi-times"
          className="p-button-danger"
          tooltip="Eliminar"
          tooltipOptions={{ position: 'top' }}
          onClick={() => {
            setDialogConfirmElminarMateria(true)
            setDataEliminarMateria(rowData)
          }}
        />
      </div>
    )
  }

  const acceptEliminarMateria = () => {
    const InputEliminarMateria = {
      idmateria: parseInt(dataEliminarMateria?.id)
    }
    eliminarMateria({ InputEliminarMateria }).then(
      ({ eliminarMateria: { message } }) => {
        setDataEliminarMateria(null)
        toast.current.show({
          severity: 'error',
          summary: '¡ Atención !',
          detail: message
        })
        mutate()
      }
    )
  }

  const rejectEliminarMateria = () => {
    console.log('NO')
    setDialogRegMateria(true)
  }

  return (
    <>
      <Toast ref={toast} />
      <DialogEditarMateria
        dialogEditarMateria={dialogEditarMateria}
        setDialogEditarMateria={setDialogEditarMateria}
        datosEditarMateria={datosEditarMateria}
        setDialogRegMateria={setDialogRegMateria}
      />
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
        visible={dialogRegMateria}
        onHide={() => setDialogRegMateria(false)}
        header="Materias"
        resizable={false}
        draggable={false}
      >
        <div className="grid grid-cols-5 gap-4 m-2">
          <span className="p-float-label field">
            <Dropdown
              className="w-full"
              id="new_carrera_materia"
              options={carreras?.obtenerTodasCarreras.response}
              onChange={(e) => setIdCarrera(e.value)}
              value={idCarrera}
              optionLabel="nombre"
              optionValue="id"
            />
            <label htmlFor="new_carrera_materia">Carrera de la Materia</label>
          </span>
          <span className="p-float-label field">
            <InputText
              className="w-full"
              id="new_cod_carrera"
              value={codMateria}
              onChange={(e) => setCodMateria(e.target.value.toUpperCase())}
              autoComplete="off"
            />
            <label htmlFor="new_cod_carrera">Codigo de la Materia</label>
          </span>
          <span className="p-float-label field">
            <InputText
              className="w-full"
              id="new_nb_carrera"
              value={nombMateria}
              onChange={(e) => setNombMateria(e.target.value.toUpperCase())}
              autoComplete="off"
            />
            <label htmlFor="new_nb_carrera">Nombre de la Materia</label>
          </span>
          <span className="p-float-label field">
            <Dropdown
              className="w-full"
              id="new_tec_carrera"
              options={tpmateria?.obtenerTipoMateria.response}
              optionLabel="nombre"
              optionValue="id"
              value={idTpMateria}
              onChange={(e) => setIdTpMateria(e.value)}
              autoComplete="off"
            />
            <label htmlFor="new_tec_carrera">Tecnica de la Materia</label>
          </span>
          <span className="p-float-label field">
            <InputText
              className="w-full"
              id="new_uni_cre_carrera"
              value={unCredito}
              onChange={(e) => setUnCredito(e.target.value)}
              autoComplete="off"
              keyfilter="pint"
              maxLength={2}
            />
            <label htmlFor="new_uni_cre_carrera">Unidades de Credito</label>
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
          <div className="flex">
            <Button
              label="Registrar"
              icon="pi pi-plus"
              onClick={regMateria}
              disabled={
                !idCarrera ||
                !codMateria ||
                !nombMateria ||
                !idTpMateria ||
                !unCredito ||
                !horasSemanales
              }
            />
          </div>
        </div>
        <div className="col-span-5">
          <DataTable
            value={materias?.obtenerTodasMaterias.response}
            emptyMessage="No se encuentran materias registradas."
          >
            <Column field="carrera" header="Carrera" />
            <Column field="codigo" header="Codigo" />
            <Column field="nombre" header="Materia" />
            <Column field="tipo" header="Tecnica" />
            <Column field="credito" header="Unidades de Credito" />
            <Column field="hora" header="Horas Semanales" />
            <Column body={accionBodyTemplateMaterias} />
          </DataTable>
        </div>
      </Dialog>
    </>
  )
}

export default DialogRegMateria

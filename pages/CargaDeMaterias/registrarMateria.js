import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
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

const RegistrarMateria = () => {
  const toast = useRef(null)
  const [reload, setReload] = useState(true)
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
  const { data: materias, mutate } = useSWR(
    GQLregMallaCurricular.GET_MATERIAS,
    { refreshInterval: 10000 }
  )

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
      hora: parseInt(horasSemanales)
    }
    crearMateria({ InputCrearMateria }).then(
      ({ crearMateria: { message } }) => {
        setReload(false)
        setCodMateria('')
        setNombMateria('')
        setIdTpMateria(null)
        setHorasSemanales('')
        setUnCredito('')
        setTimeout(() => {
          setReload(true)
        }, 1)
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
    setDialogConfirmElminarMateria(false)
  }

  return (
    <>
      <Toast ref={toast} />
      <DialogEditarMateria
        dialogEditarMateria={dialogEditarMateria}
        setDialogEditarMateria={setDialogEditarMateria}
        datosEditarMateria={datosEditarMateria}
        mutateEditarCarrera={mutate}
      />
      <ConfirmDialog
        visible={dialogConfirmElminarMateria}
        onHide={() => setDialogConfirmElminarMateria(false)}
        message="¿Esta seguro que desea eliminar la materia?"
        header="Confirmación"
        icon="pi pi-exclamation-triangle"
        accept={acceptEliminarMateria}
        reject={rejectEliminarMateria}
        acceptLabel="SI"
        rejectLabel="NO"
      />
      <div className="grid grid-cols-5 gap-4 m-2">
        <div className="col-span-5 flex justify-between">
          <div />
          <h1 className="text-3xl font-semibold text-white">
            Registrar Materia
          </h1>
          <div />
        </div>
        {reload && (
          <span className="p-float-label field">
            <InputText
              className="w-full"
              id="new_cod_carrera"
              value={codMateria}
              onChange={(e) => setCodMateria(e.target.value.toUpperCase())}
              autoComplete="off"
            />
            <label htmlFor="new_cod_carrera">Código de la Materia</label>
          </span>
        )}
        {reload && (
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
        )}
        {reload && (
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
            <label htmlFor="new_tec_carrera">Técnica de la Materia</label>
          </span>
        )}
        {reload && (
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
        )}
        {reload && (
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
        )}
        <div className="flex col-span-5 justify-center">
          <Button
            label="Registrar"
            icon="pi pi-plus"
            onClick={regMateria}
            disabled={
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
          <Column field="codigo" header="Código" />
          <Column field="nombre" header="Materia" />
          <Column field="tipo" header="Técnica" />
          <Column field="credito" header="Unidades de Credito" />
          <Column field="hora" header="Horas Semanales" />
          <Column body={accionBodyTemplateMaterias} />
        </DataTable>
      </div>
    </>
  )
}

export default RegistrarMateria

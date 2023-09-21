import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { InputText } from 'primereact/inputtext'
import { useRef, useState } from 'react'
import DialogAsigElectiva from './dialogAsignarElectiva'
import request from 'graphql-request'
import GQLelectivas from 'graphql/electivas'
import { Toast } from 'primereact/toast'
import useSWR from 'swr'
import { ConfirmDialog } from 'primereact/confirmdialog'

const GestionElectiva = () => {
  const [codElectiva, setCodElectiva] = useState('')
  const [nombElectiva, setNombElectiva] = useState('')
  const [unCredito, setUnCredito] = useState('')
  const [horasSemanales, setHorasSemanales] = useState('')
  const [activeDialogAsigElectiva, setActiveDialogAsigElectiva] =
    useState(false)
  const toast = useRef(null)
  const [datosEliminarElectiva, setDatosEliminarElectiva] = useState(null)
  const [dialogConfirmElminarElectiva, setDialogConfirmElminarElectiva] =
    useState(false)

  const { data: electivas, mutate } = useSWR(GQLelectivas.GET_ELECTIVA, {
    refreshInterval: 1000
  })

  const HeaderCarrera = () => {
    return (
      <div className="h-8 flex justify-end bg-[#ae8e8e] mt-3">
        <Button
          label="Asignar Electiva"
          icon="pi pi-plus"
          className="mr-2"
          onClick={() => setActiveDialogAsigElectiva(true)}
        />
      </div>
    )
  }
  const acceptElminarElectiva = () => {
    delElectiva()
  }

  const rejectElminarElectiva = () => {
    setDialogConfirmElminarElectiva(false)
  }

  const guardarElectiva = (variables) => {
    return request(
      process.env.NEXT_PUBLIC_URL_BACKEND,
      GQLelectivas.SAVE_ELECTIVA,
      variables
    )
  }
  
  const eliminarElectiva = (variables) => {
    return request(
      process.env.NEXT_PUBLIC_URL_BACKEND,
      GQLelectivas.DELETE_ELECTIVA,
      variables
    )
  }
  const delElectiva = () => {
    eliminarElectiva({ idElectiva: datosEliminarElectiva?.id_electiva }).then(
      ({ deleteElectiva: { status, message, type } }) => {
        toast.current.show({
          severity: type,
          summary: '¡ Atención !',
          detail: message
        })
        setDatosEliminarElectiva(null)
        mutate()
      }
    )
  }

  const regElectiva = () => {
    const inputSaveElectiva = {
      co_electiva: codElectiva,
      nb_electiva: nombElectiva,
      nu_credito: parseInt(unCredito),
      hr_semanal: parseInt(horasSemanales)
    }
    guardarElectiva({ inputSaveElectiva }).then(
      ({ saveElectiva: { status, type, message } }) => {
        toast.current.show({
          severity: type,
          summary: '¡ Atención !',
          detail: message
        })
        setCodElectiva('')
        setNombElectiva('')
        setUnCredito('')
        setHorasSemanales('')
        mutate()
      }
    )
  }

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex justify-center">
        <Button
          icon="pi pi-pencil"
          className="p-button-help mr-1"
          tooltip="Modificar"
          onClick={() => {
            /* setDatosEditarCarrera(rowData)
            setDialogEditarCarrera(true) */
          }}
          tooltipOptions={{ position: 'top' }}
        />
        <Button
          icon="pi pi-times"
          className="p-button-danger"
          tooltip="Eliminar"
          tooltipOptions={{ position: 'top' }}
          onClick={() => {
            setDialogConfirmElminarElectiva(true)
            setDatosEliminarElectiva(rowData)
          }}
        />
      </div>
    )
  }

  return (
    <div className="grid grid-cols-5 gap-4">
      <Toast ref={toast} />
      <div className="col-span-5 flex justify-center">
        <h1 className="text-3xl font-semibold text-white">
          Gestión de Electivas
        </h1>
      </div>
      <DialogAsigElectiva
        activeDialogAsigElectiva={activeDialogAsigElectiva}
        setActiveDialogAsigElectiva={setActiveDialogAsigElectiva}
      />
      <ConfirmDialog
        visible={dialogConfirmElminarElectiva}
        onHide={() => setDialogConfirmElminarElectiva(false)}
        message="¿Esta seguro que desea eliminar la electiva?"
        header="Confirmación"
        icon="pi pi-exclamation-triangle"
        accept={acceptElminarElectiva}
        reject={rejectElminarElectiva}
        acceptLabel="SI"
        rejectLabel="NO"
      />
      <span className="p-float-label field">
        <InputText
          className="w-full"
          id="new_cod_carrera"
          value={codElectiva}
          onChange={(e) => setCodElectiva(e.target.value.toUpperCase())}
          autoComplete="off"
        />
        <label htmlFor="new_cod_carrera">Código de la Electiva</label>
      </span>
      <span className="p-float-label field">
        <InputText
          className="w-full"
          id="new_nb_carrera"
          value={nombElectiva}
          onChange={(e) => setNombElectiva(e.target.value.toUpperCase())}
          autoComplete="off"
        />
        <label htmlFor="new_nb_carrera">Nombre de la Electiva</label>
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
        <label htmlFor="new_uni_cre_carrera">Unidades de Crédito</label>
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
      <div className="my-auto">
        <Button
          label="Registrar"
          icon="pi pi-plus"
          onClick={regElectiva}
          disabled={
            !codElectiva || !nombElectiva || !unCredito || !horasSemanales
          }
        />
      </div>
      <div className="col-span-5">
        <HeaderCarrera />
        <DataTable
          value={electivas?.getTodasElectivas.response}
          emptyMessage="No se encuentran electivas registrados."
        >
          <Column field="co_electiva" header="Código" />
          <Column field="nb_electiva" header="Nombre" />
          <Column field="nu_credito" header="Unidades de Credito" />
          <Column field="hr_semanal" header="Horas Semanales" />
          <Column body={actionBodyTemplate} />
        </DataTable>
      </div>
    </div>
  )
}

export default GestionElectiva

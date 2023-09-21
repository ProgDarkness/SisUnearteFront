import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { InputText } from 'primereact/inputtext'
import { useState } from 'react'
import DialogAsigElectiva from './dialogAsignarElectiva'

const GestionElectiva = () => {
  const [codElectiva, setCodElectiva] = useState('')
  const [nombElectiva, setNombElectiva] = useState('')
  const [unCredito, setUnCredito] = useState('')
  const [horasSemanales, setHorasSemanales] = useState('')
  const [activeDialogAsigElectiva, setActiveDialogAsigElectiva] =
    useState(false)

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

  const regElectiva = () => {
    console.log('reg electiva')
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
            /* setDialogConfirmElminarOferta(true)
            setDatosEliminarOferta(rowData) */
          }}
        />
      </div>
    )
  }

  return (
    <div className="grid grid-cols-5 gap-4">
      <div className="col-span-5 flex justify-center">
        <h1 className="text-3xl font-semibold text-white">
          Gestión de Electivas
        </h1>
      </div>
      <DialogAsigElectiva
        activeDialogAsigElectiva={activeDialogAsigElectiva}
        setActiveDialogAsigElectiva={setActiveDialogAsigElectiva}
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
          /* value={carreras?.obtenerTodasCarreras.response} */
          emptyMessage="No se encuentran trayectos registrados."
        >
          <Column field="codigo" header="Código" />
          <Column field="nombre" header="Nombre" />
          <Column field="tipo" header="Unidades de Credito" />
          <Column field="ciclo" header="Horas Semanales" />
          <Column body={actionBodyTemplate} />
        </DataTable>
      </div>
    </div>
  )
}

export default GestionElectiva

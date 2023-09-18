import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { useRef, useState } from 'react'
import DialogVerMalla from './dialogVerMalla'
import { ConfirmDialog } from 'primereact/confirmdialog'
import GQLregMallaCurricular from 'graphql/regMallaCurricular'
import useSWR from 'swr'
import request from 'graphql-request'
import { Toast } from 'primereact/toast'

const CargarMalla = ({ cambioVista }) => {
  const toast = useRef(null)
  const [activeDialogVerMalla, setActiveDialogVerMalla] = useState(false)
  const [datosVerMalla, setDatosVerMalla] = useState(null)
  const [dialogConfirmElminarMalla, setDialogConfirmElminarMalla] =
    useState(false)
  const [datosDesaprovarMalla, setDatosDesaprovarMalla] = useState(null)

  const { data: mallas, mutate } = useSWR(GQLregMallaCurricular.GET_MALLAS, {
    refreshInterval: 1000
  })

  const actualizarEstatusCarrera = (variables) => {
    return request(
      process.env.NEXT_PUBLIC_URL_BACKEND,
      GQLregMallaCurricular.ACTUALIZAR_ESTATUS_CARRERA,
      variables
    )
  }

  const acceptElminarMalla = () => {
    const InputEstatusCarrera = {
      estatus: 4,
      idcarrera: parseInt(datosDesaprovarMalla?.id)
    }
    actualizarEstatusCarrera({ InputEstatusCarrera }).then(
      ({ actualizarEstatusCarrera: { status, message, type } }) => {
        toast.current.show({
          severity: type,
          summary: '¡ Atención !',
          detail: message
        })
        mutate()
      }
    )
  }

  const rejectElminarMalla = () => {
    setDialogConfirmElminarMalla(false)
  }

  const accionBodyTemplate = (rowData) => {
    return (
      <div className="flex justify-center">
        <Button
          icon="pi pi-search"
          className="p-button-info mr-1"
          tooltip="Ver"
          tooltipOptions={{ position: 'top' }}
          onClick={() => {
            setDatosVerMalla(rowData)
            setActiveDialogVerMalla(true)
          }}
        />
        <Button
          icon="pi pi-times"
          className="p-button-danger"
          tooltip="Desaprobar"
          tooltipOptions={{ position: 'top' }}
          onClick={() => {
            setDialogConfirmElminarMalla(true)
            setDatosDesaprovarMalla(rowData)
          }}
        />
      </div>
    )
  }

  const bodyStatus = (rowData) => {
    let colorTag = '#cdcdcd'
    if (rowData.estatus === 'Aprobado') {
      colorTag = '#84bf93'
    } else {
      colorTag = '#d56c6c'
    }

    return (
      <div className="w-min rounded" style={{ backgroundColor: colorTag }}>
        <h1 className="text-white text-sm font-semibold m-1">
          {rowData.estatus.toUpperCase()}
        </h1>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-5 gap-4 m-2 -mt-2">
      <Toast ref={toast} />
      <div className="col-span-5 flex justify-between">
        <div />
        <h1 className="text-3xl font-semibold text-white">
          Carga de Malla Curricular
        </h1>
        <Button
          label="Registrar Carrera"
          onClick={() => {
            const newVistas = {
              [`registrarCarrera`]: true
            }
            cambioVista((prevState) => ({
              ...prevState,
              ...newVistas,
              ...Object.keys(prevState).reduce((acc, key) => {
                if (key !== 'registrarCarrera') acc[key] = false
                return acc
              }, {})
            }))
          }}
        />
      </div>
      <ConfirmDialog
        visible={dialogConfirmElminarMalla}
        onHide={() => setDialogConfirmElminarMalla(false)}
        message="¿Esta seguro que desea desaprobar la malla curricular?"
        header="Confirmación"
        icon="pi pi-exclamation-triangle"
        accept={acceptElminarMalla}
        reject={rejectElminarMalla}
        acceptLabel="SI"
        rejectLabel="NO"
      />
      <DialogVerMalla
        setActiveDialogVerMalla={setActiveDialogVerMalla}
        activeDialogVerMalla={activeDialogVerMalla}
        datosVerMalla={datosVerMalla}
        setDatosVerMalla={setDatosVerMalla}
      />
      <div className="col-span-5">
        <DataTable
          value={mallas?.obtenerTodasMallas.response.mallas}
          emptyMessage="No hay carreras registradas."
        >
          <Column field="codigo" header="Código" />
          <Column field="nombre" header="Nombre" />
          <Column field="tipo" header="Tipo" />
          <Column field="ciclo" header="Tipo de Ciclo" />
          <Column field="titulo" header="Titulo" />
          <Column field="sede" header="Sede" />
          <Column body={bodyStatus} header="Estatus" />
          <Column body={accionBodyTemplate} />
        </DataTable>
      </div>
    </div>
  )
}

export default CargarMalla

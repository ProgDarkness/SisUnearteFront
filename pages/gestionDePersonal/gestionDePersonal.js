import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { useRef, useState } from 'react'
import DialogRegPersonal from './dialogRegPersonal'
import DialogVerDatosPersonal from './dialogVerDatosPersonal'
import DialogEditarPersonal from './dialogEditarPersonal'
import { ConfirmDialog } from 'primereact/confirmdialog'
import GQLpersonal from 'graphql/personal'
import useSWR from 'swr'
import { Toast } from 'primereact/toast'
import request from 'graphql-request'

const GestionDePersonal = () => {
  const toast = useRef(null)
  const [activeDialogRegPersonal, setActiveDialogRegPersonal] = useState(false)
  const [activeDialogVerDatosPersonal, setActiveDialogVerDatosPersonal] =
    useState(false)
  const [activeDialogEditarPersonal, setActiveDialogEditarPersonal] =
    useState(false)
  const [dialogConfirmElminarPersonal, setDialogConfirmElminarPersonal] =
    useState(false)
  const [datosEditarPersonal, setDatosEditarPersonal] = useState(null)
  const [datosVerPersonal, setDatosVerPersonal] = useState(null)
  const [dataEliminarPersonal, setDataEliminarPersonal] = useState(null)

  const { data: todoPersonal, mutate } = useSWR(GQLpersonal.GET_PERSONAL, {
    refreshInterval: 1000
  })

  const eliminarPersonal = (variables) => {
    return request(
      process.env.NEXT_PUBLIC_URL_BACKEND,
      GQLpersonal.DELETE_PERSONAL,
      variables
    )
  }

  const HeaderPersonal = () => {
    return (
      <div className="h-8 flex justify-end bg-[#ae8e8e] mt-3">
        <Button
          label="Registrar Personal"
          icon="pi pi-plus"
          onClick={() => setActiveDialogRegPersonal(true)}
        />
      </div>
    )
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
            setDatosVerPersonal(rowData)
            setActiveDialogVerDatosPersonal(true)
          }}
        />
        <Button
          icon="pi pi-pencil"
          className="p-button-help mr-1"
          tooltip="Modificar"
          onClick={() => {
            setDatosEditarPersonal(rowData)
            setActiveDialogEditarPersonal(true)
          }}
          tooltipOptions={{ position: 'top' }}
        />
        <Button
          icon="pi pi-times"
          className="p-button-danger"
          tooltip="Eliminar"
          tooltipOptions={{ position: 'top' }}
          onClick={() => {
            setDialogConfirmElminarPersonal(true)
            setDataEliminarPersonal(rowData)
          }}
        />
      </div>
    )
  }

  const acceptEliminarPersonal = () => {
    const InputEliminarPersonal = {
      idpersonal: parseInt(dataEliminarPersonal?.id_personal)
    }
    eliminarPersonal({ InputEliminarPersonal }).then(
      ({ eliminarPersonal: { message } }) => {
        setDataEliminarPersonal(null)
        toast.current.show({
          severity: 'error',
          summary: '¡ Atención !',
          detail: message
        })
        mutate()
      }
    )
  }

  const rejectEliminarPersonal = () => {
    setDialogConfirmElminarPersonal(false)
  }

  return (
    <div>
      <Toast ref={toast} />
      <DialogRegPersonal
        activeDialogRegPersonal={activeDialogRegPersonal}
        setActiveDialogRegPersonal={setActiveDialogRegPersonal}
        mutatePersonal={mutate}
      />
      <DialogVerDatosPersonal
        activeDialogVerDatosPersonal={activeDialogVerDatosPersonal}
        setActiveDialogVerDatosPersonal={setActiveDialogVerDatosPersonal}
        datosVerPersonal={datosVerPersonal}
      />
      <DialogEditarPersonal
        activeDialogEditarPersonal={activeDialogEditarPersonal}
        setActiveDialogEditarPersonal={setActiveDialogEditarPersonal}
        datosEditarPersonal={datosEditarPersonal}
        mutatePersonal={mutate}
      />
      <ConfirmDialog
        visible={dialogConfirmElminarPersonal}
        onHide={() => setDialogConfirmElminarPersonal(false)}
        message="¿Esta seguro que desea eliminar el Personal?"
        header="Confirmacion"
        icon="pi pi-exclamation-triangle"
        accept={acceptEliminarPersonal}
        reject={rejectEliminarPersonal}
        acceptLabel="SI"
        rejectLabel="NO"
      />
      <div className="flex justify-center">
        <h1 className="text-3xl font-semibold text-white">
          Gestion de Personal
        </h1>
      </div>
      <div className="col-span-5">
        <HeaderPersonal />
        <DataTable
          value={todoPersonal?.obtenerPersonal.response}
          emptyMessage="No se encuentran trayectos registrados."
          filterDisplay="row"
        >
          <Column
            field="cedula"
            filterPlaceholder="Buscar"
            filter
            header="Cédula"
          />
          <Column
            field="nombre"
            filterPlaceholder="Buscar"
            filter
            header="Nombre"
          />
          <Column
            field="apellido"
            filterPlaceholder="Buscar"
            filter
            header="Apellido"
          />
          <Column
            field="sexo"
            filterPlaceholder="Buscar"
            filter
            header="Sexo"
          />
          <Column
            field="civil"
            filterPlaceholder="Buscar"
            filter
            header="Civil"
          />
          <Column
            field="profesion"
            filterPlaceholder="Buscar"
            filter
            header="Profesión"
          />
          <Column
            field="cargahoraria"
            filterPlaceholder="Buscar"
            filter
            header="Carga Horaria"
          />
          <Column body={accionBodyTemplate} />
        </DataTable>
      </div>
    </div>
  )
}

export default GestionDePersonal

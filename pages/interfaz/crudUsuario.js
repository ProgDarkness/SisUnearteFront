import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import GQLPlantilla from 'graphql/plantilla'
import useSWR from 'swr'
import { Button } from 'primereact/button'
import { Fragment, useRef, useState } from 'react'
import { request } from 'graphql-request'
import { Toast } from 'primereact/toast'
import format from 'date-fns/format'
import { Dialog } from 'primereact/dialog'
import { useRouter } from 'next/router'
import { useSesion } from 'hooks/useSesion'

const DialogCrudUser = ({ active, setActive }) => {
  const router = useRouter()
  const { token } = useSesion()
  const { data, mutate } = useSWR(
    token ? [GQLPlantilla.GET_USUARIOS, {}, token] : null
  )

  const toast = useRef(null)
  const [deleteUsuarioDialog, setDeleteUsuarioDialog] = useState(false)
  const [usuario, setUsuario] = useState(null)

  const bodyFecha = (rowData) => {
    const fecha = new Date(parseInt(rowData?.created_at))
    const formatFecha = format(fecha, 'dd-MM-yyyy')

    return (
      <div>
        <span>{formatFecha}</span>
      </div>
    )
  }
  const bodyRol = (rowData) => {
    let statusColor = ''
    if (rowData.rol === 'Inventario') {
      statusColor = '#3d9edf'
    } else {
      statusColor = '#dcdf50'
    }

    return (
      <span
        className="text-white p-1 font-extrabold rounded-lg"
        style={{ backgroundColor: statusColor }}
      >
        {rowData.rol}
      </span>
    )
  }
  const bodyFechaActualizacion = (rowData) => {
    const fecha = new Date(parseInt(rowData?.updated_at))
    const formatFecha = format(fecha, 'dd-MM-yyyy hh:mm:ss')

    return (
      <div>
        <span>{formatFecha}</span>
      </div>
    )
  }

  const deleteUsuario = (variables) => {
    return request(
      process.env.NEXT_PUBLIC_URL_BACKEND,
      GQLPlantilla.DELETE_USUARIOS,
      variables,
      { authorization: `Bearer ${token}` }
    )
  }

  const cambiarEstatusUsuario = (variables) => {
    return request(
      process.env.NEXT_PUBLIC_URL_BACKEND,
      GQLPlantilla.CAMBIAR_ESTATUS,
      variables,
      { authorization: `Bearer ${token}` }
    )
  }

  const confirmDeleteUsuario = (rowData) => {
    setUsuario(rowData)
    setDeleteUsuarioDialog(true)
  }

  const cambiarEstatus = (rowData) => {
    cambiarEstatusUsuario({ input: { id_usuario: rowData?.id_usuario } }).then(
      () => {
        toast.current.show({
          severity: 'success',
          summary: '',
          detail: 'Usuario Modificado Exitosamente.',
          life: 3000
        })
        mutate()
      }
    )
  }

  const eliminarUsuario = (rowData) => {
    deleteUsuario({ input: { id_usuario: rowData?.id_usuario } }).then(() => {
      toast.current.show({
        severity: 'success',
        summary: '',
        detail: 'Usuario Eliminado Exitosamente.',
        life: 3000
      })
      mutate()
      setDeleteUsuarioDialog(false)
    })
  }
  const hideDeleteUsuarioDialog = () => {
    setDeleteUsuarioDialog(false)
  }
  const deleteUsuarioDialogFooter = (
    <Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteUsuarioDialog}
      />
      <Button
        label="Sí"
        icon="pi pi-check"
        className="p-button-success"
        onClick={() => eliminarUsuario(usuario)}
      />
    </Fragment>
  )

  const bodyStatus = (rowData) => {
    return <div>{rowData.bl_status ? 'Activo' : 'Inactivo'}</div>
  }

  const actionBodyTemplate = (rowData) => {
    return (
      <Fragment>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mr-2"
          onClick={() => cambiarEstatus(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => confirmDeleteUsuario(rowData)}
        />
      </Fragment>
    )
  }

  const header1 = () => {
    return (
      <div className="flex justify-center">
        <h1 className="text-3xl text-[#ffffff]">Gestion de Usuarios</h1>
      </div>
    )
  }

  const header2 = () => {
    return (
      <div className="w-full flex flex-row">
        <div className="flex justify-start w-[50%]">
          <h1 className="text-4xl text-[#8fa691]">Usuarios Registrados</h1>
        </div>
        <div className="flex justify-end w-[50%]">
          <Button
            icon="pi pi-plus"
            className="p-button-success"
            label="Registrar Usuario"
            onClick={() => router.push('/interfaz/registrarUsuario')}
          />
        </div>
      </div>
    )
  }

  return (
    <>
      <Dialog
        visible={active}
        header={header1}
        onHide={() => setActive(false)}
        contentStyle={{
          backgroundColor: '#8FA691',
          borderBottom: 'solid 4px #F9FADC',
          borderLeft: 'solid 4px #F9FADC',
          borderRight: 'solid 4px #F9FADC',
          overflowY: 'scroll'
        }}
        headerStyle={{
          backgroundColor: '#8FA691',
          borderTop: 'solid 4px #F9FADC',
          borderLeft: 'solid 4px #F9FADC',
          borderRight: 'solid 4px #F9FADC'
        }}
        resizable={false}
        draggable={false}
        maximized={true}
        contentClassName="ocultarScroll"
      >
        <Toast ref={toast} />
        <div className="flex justify-center">
          <div className="w-[98%]">
            <DataTable
              sortField="id_usuario"
              sortOrder={1}
              value={data?.getUsuarios}
              responsiveLayout="scroll"
              emptyMessage="No hay usuarios registrados."
              filterDisplay="row"
              id="filter"
              header={header2}
            >
              <Column field="id_usuario" header="ID" sortable />
              <Column
                field="ced_usuario"
                header="Cedula"
                filterPlaceholder="Buscar"
                filter
                style={{ width: '12%' }}
              />
              <Column field="nomb_usuario" header="Nombre" />
              <Column field="ape_usuario" header="Apellido" />
              <Column field="user_name" header="Nombre De Usuario" />
              <Column body={(rowData) => bodyRol(rowData)} header="Rol" />
              <Column
                body={(rowData) => bodyStatus(rowData)}
                header="Estatus"
              />
              <Column
                body={(rowData) => bodyFecha(rowData)}
                header="Fecha De Creacion"
              />
              <Column
                body={(rowData) => bodyFechaActualizacion(rowData)}
                header="Fecha De Actualizacion"
              />
              <Column body={actionBodyTemplate} header="Acciones" />
            </DataTable>
          </div>
        </div>
        <Dialog
          visible={deleteUsuarioDialog}
          style={{ width: '450px' }}
          header="Confirmar"
          modal
          footer={deleteUsuarioDialogFooter}
          onHide={hideDeleteUsuarioDialog}
        >
          <div className="confirmation-content">
            <i
              className="pi pi-exclamation-triangle mr-3"
              style={{ fontSize: '2rem' }}
            />

            <span>¿Desea eliminar el Usuario?</span>
          </div>
        </Dialog>
      </Dialog>
      {/*  eslint-disable-next-line react/no-unknown-property */}
      <style jsx global>{`
        #filter .p-column-filter-menu-button,
        .p-column-filter-clear-button {
          display: none;
        }
        .ocultarScroll::-webkit-scrollbar {
          width: 0;
          height: 0;
        }
      `}</style>
    </>
  )
}

export default DialogCrudUser

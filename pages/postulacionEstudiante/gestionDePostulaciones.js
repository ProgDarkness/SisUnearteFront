import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { useRef, useState } from 'react'
import DialogDatosEstudiantes from 'pages/postulacionEstudiante/dialogDatosEstudiantes'
import DialogRechazarPostulacion from './dialogRechazarPostulacion'
import { ConfirmDialog } from 'primereact/confirmdialog'
import GQLvistaPostulado from 'graphql/vistaPostulado'
import GQLpostulaciones from 'graphql/postulaciones'
import useSWR from 'swr'
import request from 'graphql-request'
import { Toast } from 'primereact/toast'
import { useSesion } from 'hooks/useSesion'

const GestionDePostulaciones = () => {
  const { data: listadoPostulados, mutate } = useSWR(
    GQLvistaPostulado.QUERY_LISTA_REPORTE,
    { refreshInterval: 1000 }
  )
  const [reload, setReload] = useState(true)
  const toast = useRef(null)
  const { idUser } = useSesion()
  const [activeDialogVerDatosEstudiantes, setActiveDialogVerDatosEstudiantes] =
    useState(false)
  const [dialogConfirmElminarPostulado, setDialogConfirmElminarPostulado] =
    useState(false)
  const [dialogConfirmConfirmarPostulado, setDialogConfirmConfirmarPostulado] =
    useState(false)
  const [activeDialogRechazarPostulacion, setActiveDialogRechazarPostulacion] =
    useState(false)
  const [datosVerPostulado, setDatosVerPostulado] = useState(null)
  const [rowDataRechazar, setRowDataRechazar] = useState(null)
  const [dataAprobarPostulacion, setDataAprobarPostulacion] = useState(null)

  const aprobarPostulacion = (variables) => {
    return request(
      process.env.NEXT_PUBLIC_URL_BACKEND,
      GQLpostulaciones.APROBAR_POSTULACION,
      variables
    )
  }

  const acceptElminarPostulado = () => {
    console.log('SI')
  }

  const rejectElminarPostulado = () => {
    console.log('NO')
  }

  const acceptConfirmarPostulado = () => {
    const InputAprobarPostulacion = {
      usuario: idUser,
      idpostulacion: parseInt(dataAprobarPostulacion?.id)
    }
    aprobarPostulacion({ InputAprobarPostulacion }).then(
      ({ aprobarPostulacion: { status, message, type } }) => {
        setReload(false)
        toast.current.show({
          severity: type,
          summary: '¡ Atención !',
          detail: message
        })
        mutate()
        setTimeout(() => {
          setReload(true)
        }, 50)
      }
    )
  }

  const rejectConfirmarPostulado = () => {
    setDialogConfirmConfirmarPostulado(false)
  }

  const bodyEstatus = (rowData) => {
    let colorTag = ''
    if (rowData.estatus === 'Pendiente por ser revisado') {
      colorTag = '#229ec3'
    } else if (rowData.estatus === 'Rechazado') {
      colorTag = '#c32222'
    } else if (rowData.estatus === 'Aprobado') {
      colorTag = '#10b142'
    }

    return (
      <div
        className="rounded-lg p-2 text-center"
        style={{ backgroundColor: colorTag }}
      >
        {rowData.estatus}
      </div>
    )
  }

  const actionbodytemplate = (rowData) => {
    return (
      <div className="flex justify-center">
        <Button
          icon="pi pi-search"
          className="p-button-info mr-1"
          tooltip="Ver"
          tooltipOptions={{ position: 'top' }}
          onClick={() => {
            setDatosVerPostulado(rowData)
            setActiveDialogVerDatosEstudiantes(true)
          }}
        />
        {rowData.estatus === 'Pendiente por ser revisado' && (
          <>
            <Button
              icon="pi pi-check"
              className="p-button-success mr-1"
              tooltip="Confirmar"
              onClick={() => {
                setDataAprobarPostulacion(rowData)
                setDialogConfirmConfirmarPostulado(true)
              }}
              tooltipOptions={{ position: 'top' }}
            />
            <Button
              icon="pi pi-times"
              className="p-button-danger"
              tooltip="Rechazar"
              tooltipOptions={{ position: 'top' }}
              onClick={() => {
                setActiveDialogRechazarPostulacion(true)
                setRowDataRechazar(rowData)
                /* setDialogConfirmElminarPostulado(true) */
              }}
            />
          </>
        )}
      </div>
    )
  }

  const bodyCedula = (rowData) => {
    return (
      <div>
        {rowData.nacionalidad}-{rowData.cedula}
      </div>
    )
  }

  const bodyNombre = (rowData) => {
    return (
      <div>
        {rowData.nombre} {rowData.apellido}
      </div>
    )
  }

  return (
    <div>
      <Toast ref={toast} />
      <DialogDatosEstudiantes
        activeDialogVerDatosEstudiantes={activeDialogVerDatosEstudiantes}
        setActiveDialogVerDatosEstudiantes={setActiveDialogVerDatosEstudiantes}
        datosVerPostulado={datosVerPostulado}
      />
      <DialogRechazarPostulacion
        activeDialogRechazarPostulacion={activeDialogRechazarPostulacion}
        setActiveDialogRechazarPostulacion={setActiveDialogRechazarPostulacion}
        listadoPostulados={rowDataRechazar}
        mutatePostulado={mutate}
        setReload={setReload}
      />
      <div className="text-3xl font-semibold text-white text-center mr-32 mb-6 -mt-3">
        <h1>Gestión De Postulaciones</h1>
      </div>

      <ConfirmDialog
        visible={dialogConfirmConfirmarPostulado}
        onHide={() => setDialogConfirmConfirmarPostulado(false)}
        message="¿Esta seguro que desea aceptar la postulacion?"
        header="Confirmación"
        icon="pi pi-exclamation-triangle"
        accept={acceptConfirmarPostulado}
        reject={rejectConfirmarPostulado}
        acceptLabel="SI"
        rejectLabel="NO"
      />

      <ConfirmDialog
        visible={dialogConfirmElminarPostulado}
        onHide={() => setDialogConfirmElminarPostulado(false)}
        message="¿Esta seguro que desea rechazar la postulación?"
        header="Confirmación"
        icon="pi pi-exclamation-triangle"
        accept={acceptElminarPostulado}
        reject={rejectElminarPostulado}
        acceptLabel="SI"
        rejectLabel="NO"
      />

      <div>
        {reload && (
          <DataTable
            value={listadoPostulados?.obtenerListadoPostuladoCarrera.response}
            emptyMessage="No hay carreras registradas."
            filterDisplay="row"
            id="filter"
          >
            <Column
              field="carrera"
              filterPlaceholder="Buscar"
              filter
              header="Carrera"
              alignHeader="center"
              align="center"
            />
            <Column
              field="sede"
              filterPlaceholder="Buscar"
              filter
              header="Sede"
              alignHeader="center"
              align="center"
            />
            <Column
              field="cedula"
              filterPlaceholder="Buscar"
              filter
              body={bodyCedula}
              header="Cédula"
              alignHeader="center"
              align="center"
            />
            <Column
              field="nombre"
              filterPlaceholder="Buscar"
              filter
              body={bodyNombre}
              header="Nombre"
              alignHeader="center"
              align="center"
            />
            <Column
              field="fepostulacion"
              header="Fecha de postulación"
              alignHeader="center"
              align="center"
            />
            <Column
              field="periodo"
              header="Periodo"
              alignHeader="center"
              align="center"
            />
            <Column
              field="estatus"
              body={bodyEstatus}
              header="Estatus"
              alignHeader="center"
              align="center"
            />
            <Column body={actionbodytemplate} />
          </DataTable>
        )}
      </div>
      {/*  eslint-disable-next-line react/no-unknown-property */}
      <style jsx global>{`
        #filter .p-column-filter-menu-button,
        .p-column-filter-clear-button {
          display: none;
        }
      `}</style>
    </div>
  )
}
export default GestionDePostulaciones

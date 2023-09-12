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

const GestionDePostulaciones = () => {
  const { data: listadoPostulados, mutate } = useSWR(
    GQLvistaPostulado.QUERY_LISTA_REPORTE
  )
  const toast = useRef(null)
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
    console.log(listadoPostulados)
    const InputAprobarPostulacion = {
      idpostulacion: parseInt(listadoPostulados?.id_postulacion)
    }
    aprobarPostulacion({ InputAprobarPostulacion }).then(
      ({ aprobarPostulacion: { message } }) => {
        toast.current.show({
          severity: 'error',
          summary: '¡ Atención !',
          detail: message
        })
        mutate()
      }
    )
  }
  const rejectConfirmarPostulado = () => {
    console.log('NO')
  }

  const bodyEstatus = (rowData) => {
    let colorTag = ''
    if (rowData.estatus === 'Pendiente por ser revisado') {
      colorTag = '#114555'
    } else {
      colorTag = '#nb45tg'
    }

    return (
      <div className="rounded-lg p-1" style={{ backgroundColor: colorTag }}>
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
        <Button
          icon="pi pi-check"
          className="p-button-success mr-1"
          tooltip="Confirmar"
          onClick={() => {
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
      />
      <div className="text-3xl font-semibold text-white text-center mr-32 mb-6 -mt-3">
        <h1>Gestion De Postulaciones</h1>
      </div>

      <ConfirmDialog
        visible={dialogConfirmConfirmarPostulado}
        onHide={() => setDialogConfirmConfirmarPostulado(false)}
        message="¿Esta seguro que desea aceptar la postulacion?"
        header="Confirmacion"
        icon="pi pi-exclamation-triangle"
        accept={acceptConfirmarPostulado}
        reject={rejectConfirmarPostulado}
        acceptLabel="SI"
        rejectLabel="NO"
      />

      <ConfirmDialog
        visible={dialogConfirmElminarPostulado}
        onHide={() => setDialogConfirmElminarPostulado(false)}
        message="¿Esta seguro que desea rechazar la postulacion?"
        header="Confirmacion"
        icon="pi pi-exclamation-triangle"
        accept={acceptElminarPostulado}
        reject={rejectElminarPostulado}
        acceptLabel="SI"
        rejectLabel="NO"
      />

      <div>
        <DataTable
          value={listadoPostulados?.obtenerListadoPostuladoCarrera.response}
          emptyMessage="No hay carreras registradas."
        >
          <Column
            field="nacionalidad"
            header="Nacionalidad"
            style={{ textAlign: 'center' }}
          />
          <Column field="cedula" header="Cedula" />
          <Column field="nombre" header="Nombre" />
          <Column field="apellido" header="Apellido" />
          <Column field="fepostulacion" header="Fecha de postulacion" />
          <Column field="carrera" header="Carrera " />
          <Column field="periodo" header="Periodo" />
          <Column field="sede" header="Sede" />
          <Column field="estado" header="Estado" />
          <Column field="estatus" body={bodyEstatus} header="Estatus" />
          <Column body={actionbodytemplate} />
        </DataTable>
      </div>
    </div>
  )
}
export default GestionDePostulaciones

import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { useRef, useState } from 'react'
import { ConfirmDialog } from 'primereact/confirmdialog'
import GQLregOfertaAcademica from 'graphql/regOfertaAcademica'
import DialogVerOferta from './initDialogVerOferta'
import DialogEditarOferta from './initDialogEditarOferta'
import useSWR from 'swr'
import request from 'graphql-request'
import { Toast } from 'primereact/toast'

const RegOfertaAcademica = ({ cambioVista }) => {
  const toast = useRef(null)
  const [activeDialogVerOferta, setActiveDialogVerOferta] = useState(false)
  const [datosVerOferta, setDatosVerOferta] = useState(null)
  const [dialogEditarOferta, setDialogEditarOferta] = useState(false)
  const [datosEditarOferta, setDatosEditarOferta] = useState(null)
  const [datosCerrarOferta, setDatosCerrarOferta] = useState(null)
  const [dialogConfirmCerrarOferta, setDialogConfirmCerrarOferta] =
    useState(false)

  const { data: ofertas, mutate } = useSWR([
    GQLregOfertaAcademica.OBTENER_OFERTAS,
    { idStatus: 1 }
  ])

  const statusOferta = (variables) => {
    return request(
      process.env.NEXT_PUBLIC_URL_BACKEND,
      GQLregOfertaAcademica.CAMBIAR_STATUS_OFERTA,
      variables
    )
  }

  const cambiarStatusOferta = () => {
    statusOferta({ idOferta: parseInt(datosCerrarOferta?.id_oferta) }).then(
      ({ cambiarStatusOferta: { status, message, type } }) => {
        toast.current.show({
          severity: type,
          summary: '¡ Atención !',
          detail: message
        })
        mutate()
      }
    )
  }

  const acceptCerrarOferta = () => {
    cambiarStatusOferta()
  }

  const rejectCerrarOferta = () => {
    setDialogConfirmCerrarOferta(false)
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
            setDatosVerOferta(rowData)
            setActiveDialogVerOferta(true)
          }}
        />
        <Button
          icon="pi pi-pencil"
          className="p-button-help mr-1"
          tooltip="Modificar"
          onClick={() => {
            setDatosEditarOferta(rowData)
            setDialogEditarOferta(true)
          }}
          tooltipOptions={{ position: 'top' }}
        />
        <Button
          icon="pi pi-times"
          className="p-button-danger"
          tooltip="Cerrar"
          tooltipOptions={{ position: 'top' }}
          onClick={() => {
            setDatosCerrarOferta(rowData)
            setDialogConfirmCerrarOferta(true)
          }}
        />
      </div>
    )
  }

  const bodyStatus = (rowData) => {
    let colorTag = '#cdcdcd'
    if (rowData.status_carrera !== 'Abierto') {
      colorTag = '#84bf93'
    } else {
      colorTag = '#d56c6c'
    }

    return (
      <div className="w-min rounded" style={{ backgroundColor: colorTag }}>
        <h1 className="text-white text-sm font-semibold m-1">
          {rowData.nb_estatus_oferta.toUpperCase()}
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
          Registro de Oferta Academica
        </h1>
        <Button
          label="Registrar Oferta"
          onClick={() => {
            const newVistas = {
              [`registrarOferta`]: true
            }
            cambioVista((prevState) => ({
              ...prevState,
              ...newVistas,
              ...Object.keys(prevState).reduce((acc, key) => {
                if (key !== 'registrarOferta') acc[key] = false
                return acc
              }, {})
            }))
          }}
        />
      </div>
      <ConfirmDialog
        visible={dialogConfirmCerrarOferta}
        onHide={() => setDialogConfirmCerrarOferta(false)}
        message="¿Esta seguro que desea cerrar la oferta?"
        header="Confirmacion"
        icon="pi pi-exclamation-triangle"
        accept={acceptCerrarOferta}
        reject={rejectCerrarOferta}
        acceptLabel="SI"
        rejectLabel="NO"
      />
      <DialogVerOferta
        setActiveDialogVerOferta={setActiveDialogVerOferta}
        activeDialogVerOferta={activeDialogVerOferta}
        datosVerOferta={datosVerOferta}
        setDatosVerOferta={setDatosVerOferta}
      />
      <DialogEditarOferta
        datosEditarOferta={datosEditarOferta}
        setDatosEditarOferta={setDatosEditarOferta}
        dialogEditarOferta={dialogEditarOferta}
        setDialogEditarOferta={setDialogEditarOferta}
      />
      <div className="col-span-5">
        <DataTable
          value={ofertas?.obtenerOfertaAcademica.response}
          emptyMessage="No hay Ofertas Academicas Registradas."
        >
          <Column field="co_oferta" header="Codigo" />
          <Column field="nb_carrera" header="Carrera" />
          <Column field="nu_cupos" header="Cant. Cupos" />
          <Column field="nb_sede" header="Sede" />
          <Column body={bodyStatus} header="Estatus" />
          <Column body={accionBodyTemplate} />
        </DataTable>
      </div>
    </div>
  )
}

export default RegOfertaAcademica

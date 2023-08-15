import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { useEffect, useState } from 'react'
import { ConfirmDialog } from 'primereact/confirmdialog'
import DialogVerOferta from './initDialogVerOferta'
import DialogEditarOferta from './initDialogEditarOferta'

const RegOfertaAcademica = ({ cambioVista }) => {
  const [ofertas, setOfertas] = useState(null)
  const [activeDialogVerOferta, setActiveDialogVerOferta] = useState(false)
  const [datosVerOferta, setDatosVerOferta] = useState(null)
  const [dialogEditarOferta, setDialogEditarOferta] = useState(false)
  const [datosEditarOferta, setDatosEditarOferta] = useState(null)
  const [dialogConfirmElminarOferta, setDialogConfirmElminarOferta] =
    useState(false)

  useEffect(() => {
    setOfertas([
      {
        carrera: 'Artes Plasticas',
        status_carrera: 'Habilitada'
      },
      {
        carrera: 'Dibujo Artistico',
        status_carrera: 'Deshabilitada'
      }
    ])
  }, [])

  const acceptElminarOferta = () => {
    console.log('SI')
  }

  const rejectElminarOferta = () => {
    console.log('NO')
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
          tooltip="Eliminar"
          tooltipOptions={{ position: 'top' }}
          onClick={() => setDialogConfirmElminarOferta(true)}
        />
      </div>
    )
  }

  const bodyStatus = (rowData) => {
    let colorTag = '#cdcdcd'
    if (rowData.status_carrera === 'Habilitada') {
      colorTag = '#84bf93'
    } else {
      colorTag = '#d56c6c'
    }

    return (
      <div className="w-min rounded" style={{ backgroundColor: colorTag }}>
        <h1 className="text-white text-sm font-semibold m-1">
          {rowData.status_carrera.toUpperCase()}
        </h1>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-5 gap-4 m-2 -mt-2">
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
        visible={dialogConfirmElminarOferta}
        onHide={() => setDialogConfirmElminarOferta(false)}
        message="¿Esta seguro que desea eliminar la oferta academica?"
        header="Confirmacion"
        icon="pi pi-exclamation-triangle"
        accept={acceptElminarOferta}
        reject={rejectElminarOferta}
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
          value={ofertas}
          emptyMessage="No hay Ofertas Academicas Registradas."
        >
          <Column field="carrera" header="Carrera" />
          <Column body={bodyStatus} header="Estatus" />
          <Column body={accionBodyTemplate} />
        </DataTable>
      </div>
    </div>
  )
}

export default RegOfertaAcademica

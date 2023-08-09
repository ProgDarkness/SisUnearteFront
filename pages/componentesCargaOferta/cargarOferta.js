import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { useEffect, useState } from 'react'
import DialogEditarOferta from './dialogEditarOferta'
import DialogVerOferta from './dialogVerOferta'

const CargarOferta = ({ cambioVista }) => {
  const [ofertas, setOfertas] = useState(null)
  const [activeDialogVerOferta, setActiveDialogVerOferta] = useState(false)
  const [dialogEditarOferta, setDialogEditarOferta] = useState(false)
  const [datosEditarOferta, setDatosEditarOferta] = useState(null)
  const [datosVerOferta, setDatosVerOferta] = useState(null)

  useEffect(() => {
    setOfertas([
      {
        carrera: 'Artes Plasticas',
        status_carrera: 'Habilitada',
        cant_cupos: 100
      },
      { carrera: 'Museologia', status_carrera: 'Habilitada', cant_cupos: 100 },
      {
        carrera: 'Dibujo Artistico',
        status_carrera: 'Deshabilitada',
        cant_cupos: 0
      }
    ])
  }, [])

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
          tooltipOptions={{ position: 'top' }}
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
          Carga de Oferta Academica
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
        <DataTable value={ofertas} emptyMessage="No hay carreras registradas.">
          <Column field="carrera" header="Carrera" />
          <Column body={bodyStatus} header="Estatus" />
          <Column field="cant_cupos" header="Cant. Cupos" />
          <Column body={accionBodyTemplate} />
        </DataTable>
      </div>
    </div>
  )
}

export default CargarOferta

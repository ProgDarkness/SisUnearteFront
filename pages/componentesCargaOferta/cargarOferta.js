import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog'
import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import { useEffect, useState } from 'react'

const CargarOferta = ({ cambioVista }) => {
  const [ofertas, setOfertas] = useState(null)
  const [verOferta, setDialogVerOferta] = useState(false)
  const [editarOferta, setDialogEditarOferta] = useState(false)
  const [datosEditarOferta, setDatosEditarOferta] = useState(null)
  const [opcionStatusOferta, setOpcionStatusOferta] = useState(null)

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
    setOpcionStatusOferta([{ name: 'Habilitada' }, { name: 'Desahabilitar' }])
  }, [])

  const DialogVerOferta = () => {
    return (
      <Dialog
        visible={verOferta}
        onHide={() => setDialogVerOferta(false)}
        header="Trayectos"
        resizable={false}
        draggable={false}
      >
        <div className="grid grid-cols-3 gap-4 m-2">
          <span className="p-float-label field">
            <InputText
              className="w-full"
              id="cod_carrera"
              /* value={datosEstudiante?.cedula} */
              autoComplete="off"
            />
            <label htmlFor="cod_carrera">Nombre de Trayecto</label>
          </span>
          <span className="p-float-label field">
            <InputText
              className="w-full"
              id="cod_carrera"
              /* value={datosEstudiante?.cedula} */
              autoComplete="off"
            />
            <label htmlFor="cod_carrera">Nombre de Semestre</label>
          </span>
        </div>
      </Dialog>
    )
  }

  const DialogEditarOferta = () => {
    return (
      <Dialog
        visible={editarOferta}
        onHide={() => setDialogEditarOferta(false)}
        header="Trayectos"
        resizable={false}
        draggable={false}
      >
        <div className="grid grid-cols-3 gap-4 m-2">
          <span className="p-float-label field">
            <InputText
              className="w-full"
              id="cod_carrera_ed"
              value={datosEditarOferta?.carrera}
              autoComplete="off"
            />
            <label htmlFor="cod_carrera_ed">Carrera</label>
          </span>
          <span className="p-float-label field">
            <Dropdown
              options={opcionStatusOferta}
              className="w-full"
              optionLabel="name"
              optionValue="name"
              id="status_oferta"
              value={datosEditarOferta?.status_carrera}
              onChange={(e) =>
                setDatosEditarOferta({
                  ...datosEditarOferta,
                  status_carrera: e.value
                })
              }
              autoComplete="off"
            />
            <label htmlFor="status_oferta">Estatus</label>
          </span>
          <span className="p-float-label field">
            <InputText
              className="w-full"
              id="cant_cupos"
              value={datosEditarOferta?.cant_cupos}
              autoComplete="off"
            />
            <label htmlFor="cant_cupos">Cant. Cupos</label>
          </span>
          <div className="col-span-3 flex justify-center">
            <Button
              label="Modificar"
              icon="pi pi-plus"
              onClick={() => setDialogEditarOferta(false)}
            />
          </div>
        </div>
      </Dialog>
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
          onClick={() => setDialogVerOferta(true)}
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
      <DialogVerOferta />
      <DialogEditarOferta />
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

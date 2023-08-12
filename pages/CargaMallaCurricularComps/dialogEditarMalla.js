import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import { useState, useEffect } from 'react'

const DialogEditarMalla = ({
  datosEditarMalla,
  setDatosEditarMalla,
  dialogEditarMalla,
  setDialogEditarMalla
}) => {
  const [opcionStatusMalla, setOpcionStatusMalla] = useState(null)
  const [opcionCarreras, setOpcionCarreras] = useState(null)

  useEffect(() => {
    setOpcionCarreras([
      {
        name: 'Artes Plasticas',
        code: 1
      },
      { name: 'Museologia', code: 2 },
      {
        name: 'Dibujo Artistico',
        code: 3
      }
    ])
    setOpcionStatusMalla([{ name: 'Habilitada' }, { name: 'Desahabilitar' }])
  }, [])

  return (
    <Dialog
      visible={dialogEditarMalla}
      onHide={() => {
        setDatosEditarMalla(null)
        setDialogEditarMalla(false)
      }}
      header="Modificar Malla"
      resizable={false}
      draggable={false}
    >
      <div className="grid grid-cols-3 gap-4 m-2">
        <span className="p-float-label field">
          <Dropdown
            options={opcionCarreras}
            className="w-full"
            optionLabel="name"
            optionValue="name"
            id="cod_carrera_ed"
            value={datosEditarMalla?.carrera}
            onChange={(e) =>
              setDatosEditarMalla({
                ...datosEditarMalla,
                carrera: e.value
              })
            }
            autoComplete="off"
          />
          <label htmlFor="cod_carrera_ed">Carrera</label>
        </span>
        <span className="p-float-label field">
          <Dropdown
            options={opcionStatusMalla}
            className="w-full"
            optionLabel="name"
            optionValue="name"
            id="status_malla"
            value={datosEditarMalla?.status_carrera}
            onChange={(e) =>
              setDatosEditarMalla({
                ...datosEditarMalla,
                status_carrera: e.value
              })
            }
            autoComplete="off"
          />
          <label htmlFor="status_malla">Estatus</label>
        </span>
        <span className="p-float-label field">
          <InputText
            className="w-full"
            id="cant_cupos"
            value={datosEditarMalla?.cant_cupos}
            autoComplete="off"
            keyfilter="pint"
            maxLength={3}
            onChange={(e) =>
              setDatosEditarMalla({
                ...datosEditarMalla,
                cant_cupos: e.target.value
              })
            }
          />
          <label htmlFor="cant_cupos">Cant. Cupos</label>
        </span>
        <div className="col-span-3 flex justify-center">
          <Button
            label="Modificar"
            icon="pi pi-plus"
            onClick={() => setDialogEditarMalla(false)}
          />
        </div>
      </div>
    </Dialog>
  )
}

export default DialogEditarMalla

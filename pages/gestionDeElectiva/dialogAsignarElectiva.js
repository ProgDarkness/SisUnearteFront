const { Dialog } = require('primereact/dialog')
const { Dropdown } = require('primereact/dropdown')
const { useState } = require('react')

const DialogAsigElectiva = ({
  activeDialogAsigElectiva,
  setActiveDialogAsigElectiva
}) => {
  const [carrera, setCarrera] = useState(null)
  const [electiva, setElectiva] = useState(null)
  const [trayecto, setTrayecto] = useState(null)

  return (
    <>
      <Dialog
        visible={activeDialogAsigElectiva}
        header="Asignar Electiva"
        onHide={() => setActiveDialogAsigElectiva(false)}
      >
        <div className="grid grid-cols-3 gap-4 p-2">
          <span className="p-float-label field">
            <Dropdown
              className="w-full"
              id="electiva_carrera"
              value={carrera}
              onChange={(e) => setCarrera(e.value)}
              options={[]}
              optionLabel="nombre"
            />
            <label htmlFor="electiva_carrera">Carrera</label>
          </span>
          <span className="p-float-label field">
            <Dropdown
              className="w-full"
              id="electiva_trayecto"
              value={trayecto}
              onChange={(e) => setTrayecto(e.value)}
              options={[]}
              optionLabel="nombre"
            />
            <label htmlFor="electiva_trayecto">Trayecto</label>
          </span>
          <span className="p-float-label field">
            <Dropdown
              className="w-full"
              id="electiva"
              value={electiva}
              onChange={(e) => setElectiva(e.value)}
              options={[]}
              optionLabel="nombre"
            />
            <label htmlFor="electiva">Electiva</label>
          </span>
        </div>
      </Dialog>
    </>
  )
}

export default DialogAsigElectiva

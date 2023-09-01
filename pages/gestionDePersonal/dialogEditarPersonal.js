import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'

const { Dialog } = require('primereact/dialog')

const DialogEditarPersonal = ({
  activeDialogEditarPersonal,
  setActiveDialogEditarPersonal,
  datosEditarPersonal
}) => {
  console.log(datosEditarPersonal)
  return (
    <Dialog
      header="Registrar Pesonal"
      visible={activeDialogEditarPersonal}
      onHide={() => setActiveDialogEditarPersonal(false)}
    >
      <div className="grid grid-cols-4 gap-4">
        <span className="p-float-label field">
          <InputText
            className="w-full"
            id="cod_carrera"
            /* value={datosVerCarrera?.cod_carrera} */
            /* disabled */
          />
          <label htmlFor="cod_carrera">Tipo de Personal</label>
        </span>
        <span className="p-float-label field">
          <InputText
            className="w-full"
            id="cod_carrera"
            /* value={datosVerCarrera?.cod_carrera} */
            /* disabled */
          />
          <label htmlFor="cod_carrera">Usuario del Personal</label>
        </span>
        <span className="p-float-label field">
          <InputText
            className="w-full"
            id="cod_carrera"
            /* value={datosVerCarrera?.cod_carrera} */
            /* disabled */
          />
          <label htmlFor="cod_carrera">Profesion</label>
        </span>
        <div className="flex my-auto">
          <Button
            label="Guardar"
            icon="pi pi-plus"
            /* onClick={() => setDialogConfirmRegPeriodo(true)}
            disabled={validateForm()} */
          />
        </div>
        <span className="p-float-label field col-span-2">
          <InputText
            className="w-full"
            id="cod_carrera"
            /* value={datosVerCarrera?.cod_carrera} */
            /* disabled */
          />
          <label htmlFor="cod_carrera">Cantidad de horas Semanales</label>
        </span>
      </div>
    </Dialog>
  )
}

export default DialogEditarPersonal

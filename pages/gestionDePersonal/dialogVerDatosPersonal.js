import { InputText } from 'primereact/inputtext'

const { Dialog } = require('primereact/dialog')

const DialogVerDatosPersonal = ({
  activeDialogVerDatosPersonal,
  setActiveDialogVerDatosPersonal,
  datosVerPersonal
}) => {
  console.log(datosVerPersonal)
  return (
    <Dialog
      header="Datos del Pesonal"
      visible={activeDialogVerDatosPersonal}
      onHide={() => setActiveDialogVerDatosPersonal(false)}
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
          <label htmlFor="cod_carrera">Nacionalidad</label>
        </span>
        <span className="p-float-label field">
          <InputText
            className="w-full"
            id="cod_carrera"
            /* value={datosVerCarrera?.cod_carrera} */
            /* disabled */
          />
          <label htmlFor="cod_carrera">Cedula</label>
        </span>
        <span className="p-float-label field">
          <InputText
            className="w-full"
            id="cod_carrera"
            /* value={datosVerCarrera?.cod_carrera} */
            /* disabled */
          />
          <label htmlFor="cod_carrera">Nombre</label>
        </span>
        <span className="p-float-label field">
          <InputText
            className="w-full"
            id="cod_carrera"
            /* value={datosVerCarrera?.cod_carrera} */
            /* disabled */
          />
          <label htmlFor="cod_carrera">Apellido</label>
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
        <span className="p-float-label field col-span-2">
          <InputText
            className="w-full"
            id="cod_carrera"
            /* value={datosVerCarrera?.cod_carrera} */
            /* disabled */
            /* 14982532 titulo */
          />
          <label htmlFor="cod_carrera">Cantidad de horas Semanales</label>
        </span>
      </div>
    </Dialog>
  )
}

export default DialogVerDatosPersonal

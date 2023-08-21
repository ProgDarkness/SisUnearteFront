import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'

const DialogEditarMateria = ({
  dialogEditarMateria,
  setDialogEditarMateria,
  datosEditarMateria,
  setDialogRegMateria
}) => {
  return (
    <Dialog
      visible={dialogEditarMateria}
      onHide={() => {
        setDialogEditarMateria(false)
        setDialogRegMateria(true)
      }}
      header="Modificar Materia"
      resizable={false}
      draggable={false}
    >
      <div className="grid grid-cols-5 gap-4 m-2">
        <span className="p-float-label field">
          <InputText
            className="w-full"
            id="new_carrera_materia"
            value={datosEditarMateria?.carrera_materia}
            autoComplete="off"
          />
          <label htmlFor="new_carrera_materia">Carrera</label>
        </span>
        <span className="p-float-label field">
          <InputText
            className="w-full"
            id="new_cod_carrera"
            value={datosEditarMateria?.cod_materia}
            autoComplete="off"
          />
          <label htmlFor="new_cod_carrera">Codigo</label>
        </span>
        <span className="p-float-label field">
          <InputText
            className="w-full"
            id="new_nb_carrera"
            value={datosEditarMateria?.nb_materia}
            autoComplete="off"
          />
          <label htmlFor="new_nb_carrera">Materia</label>
        </span>
        <span className="p-float-label field">
          <InputText
            className="w-full"
            id="new_tec_materia"
            value={datosEditarMateria?.tec_materia}
            autoComplete="off"
          />
          <label htmlFor="new_tec_materia">Tecnica</label>
        </span>
        <span className="p-float-label field">
          <InputText
            className="w-full"
            id="new_uni_cre_materia"
            value={datosEditarMateria?.cant_uni_cre}
            autoComplete="off"
          />
          <label htmlFor="new_uni_cre_materia">Unida de Credito</label>
        </span>
        <div className="col-span-5 flex justify-center">
          <Button
            label="Modificar"
            icon="pi pi-plus"
            onClick={() => {
              setDialogEditarMateria(false)
              setDialogRegMateria(true)
            }}
          />
        </div>
      </div>
    </Dialog>
  )
}

export default DialogEditarMateria

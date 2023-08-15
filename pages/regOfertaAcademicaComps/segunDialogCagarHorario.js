const { Dialog } = require('primereact/dialog')

const DialogCargarHorario = ({
  activeDialogCargarHorario,
  setActiveDialogCargarHorario
}) => {
  return (
    <>
      <Dialog
        visible={activeDialogCargarHorario}
        resizable={false}
        draggable={false}
        onHide={() => setActiveDialogCargarHorario(false)}
        header="Carga de Horario"
      >

      </Dialog>
    </>
  )
}

export default DialogCargarHorario

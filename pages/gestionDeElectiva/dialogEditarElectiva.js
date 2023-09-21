import { Dialog } from 'primereact/dialog'

const DialogEditarElectiva = ({
  activeDialogEditarElectiva,
  setActiveDialogEditarElectiva,
  datosEditarElectiva
}) => {
  console.log(datosEditarElectiva)
  return (
    <>
      <Dialog
        visible={activeDialogEditarElectiva}
        onHide={() => setActiveDialogEditarElectiva(false)}
      >
        <h1>Editar</h1>
      </Dialog>
    </>
  )
}

export default DialogEditarElectiva

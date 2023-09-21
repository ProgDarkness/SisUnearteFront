import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { useEffect, useRef, useState } from 'react'
import GQLelectivas from 'graphql/electivas'
import request from 'graphql-request'
import { Toast } from 'primereact/toast'

const DialogEditarElectiva = ({
  activeDialogEditarElectiva,
  setActiveDialogEditarElectiva,
  datosEditarElectiva,
  mutateElectiva
}) => {
  const [codElectiva, setCodElectiva] = useState('')
  const [nombElectiva, setNombElectiva] = useState('')
  const [unCredito, setUnCredito] = useState('')
  const [horasSemanales, setHorasSemanales] = useState('')
  const toast = useRef(null)

  useEffect(() => {
    setCodElectiva(datosEditarElectiva?.co_electiva)
    setNombElectiva(datosEditarElectiva?.nb_electiva)
    setUnCredito(datosEditarElectiva?.nu_credito)
    setHorasSemanales(datosEditarElectiva?.hr_semanal)
  }, [datosEditarElectiva])

  const editarElectiva = (variables) => {
    return request(
      process.env.NEXT_PUBLIC_URL_BACKEND,
      GQLelectivas.UPDATE_ELECTIVA,
      variables
    )
  }

  const editElectiva = () => {
    const inputSaveElectiva = {
      id_electiva: datosEditarElectiva?.id_electiva,
      co_electiva: codElectiva,
      nb_electiva: nombElectiva,
      nu_credito: parseInt(unCredito),
      hr_semanal: parseInt(horasSemanales)
    }
    editarElectiva({ inputSaveElectiva }).then(
      ({ updateElectiva: { status, type, message } }) => {
        toast.current.show({
          severity: type,
          summary: '¡ Atención !',
          detail: message
        })
        setCodElectiva('')
        setNombElectiva('')
        setUnCredito('')
        setHorasSemanales('')
        mutateElectiva()
      }
    )
  }

  return (
    <>
      <Toast ref={toast} />
      <Dialog
        header="Editar electiva"
        visible={activeDialogEditarElectiva}
        onHide={() => setActiveDialogEditarElectiva(false)}
      >
        <div className="grid grid-cols-4 gap-4 p-2">
          <span className="p-float-label field">
            <InputText
              className="w-full"
              id="new_cod_carrera"
              value={codElectiva}
              onChange={(e) => setCodElectiva(e.target.value.toUpperCase())}
              autoComplete="off"
            />
            <label htmlFor="new_cod_carrera">Código de la Electiva</label>
          </span>
          <span className="p-float-label field">
            <InputText
              className="w-full"
              id="new_nb_carrera"
              value={nombElectiva}
              onChange={(e) => setNombElectiva(e.target.value.toUpperCase())}
              autoComplete="off"
            />
            <label htmlFor="new_nb_carrera">Nombre de la Electiva</label>
          </span>
          <span className="p-float-label field">
            <InputText
              className="w-full"
              id="new_uni_cre_carrera"
              value={unCredito}
              onChange={(e) => setUnCredito(e.target.value)}
              autoComplete="off"
              keyfilter="pint"
              maxLength={2}
            />
            <label htmlFor="new_uni_cre_carrera">Unidades de Crédito</label>
          </span>
          <span className="p-float-label field">
            <InputText
              className="w-full"
              id="new_uni_cre_carrera"
              value={horasSemanales}
              onChange={(e) => setHorasSemanales(e.target.value)}
              autoComplete="off"
              keyfilter="pint"
              maxLength={2}
            />
            <label htmlFor="new_uni_cre_carrera">Horas Semanales</label>
          </span>
          <div className="my-auto flex justify-center col-span-4">
            <Button
              label="Guardar"
              icon="pi pi-plus"
              onClick={editElectiva}
              disabled={
                !codElectiva || !nombElectiva || !unCredito || !horasSemanales
              }
            />
          </div>
        </div>
      </Dialog>
    </>
  )
}

export default DialogEditarElectiva

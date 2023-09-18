import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import { useState, useEffect, useRef } from 'react'
import useSWR from 'swr'
import GQLconsultasGenerales from 'graphql/consultasGenerales'
import GQLregMallaCurricular from 'graphql/regMallaCurricular'
import request from 'graphql-request'
import { Toast } from 'primereact/toast'

const DialogEditarMateria = ({
  dialogEditarMateria,
  setDialogEditarMateria,
  datosEditarMateria,
  mutateEditarCarrera
}) => {
  const toast = useRef(null)
  const [idTpMateria, setIdTpMateria] = useState(null)
  const [codMateria, setCodMateria] = useState('')
  const [nombMateria, setNombMateria] = useState('')
  const [unCredito, setUnCredito] = useState('')
  const [horasSemanales, setHorasSemanales] = useState('')

  const { data: tpmateria } = useSWR(GQLconsultasGenerales.GET_TIPO_MATERIA)

  const actualizarMateria = (variables) => {
    return request(
      process.env.NEXT_PUBLIC_URL_BACKEND,
      GQLregMallaCurricular.ACTUALIZAR_MATERIA,
      variables
    )
  }

  const actualizarMat = () => {
    const InputActualizarMateria = {
      codigo: codMateria,
      nombre: nombMateria,
      credito: parseInt(unCredito),
      tipo: parseInt(idTpMateria),
      hora: parseInt(horasSemanales),
      idmateria: parseInt(datosEditarMateria?.id)
    }

    actualizarMateria({ InputActualizarMateria }).then(
      ({ actualizarMateria: { status, message, type } }) => {
        toast.current.show({
          severity: type,
          summary: '¡ Atención !',
          detail: message
        })
        mutateEditarCarrera()
        setTimeout(() => {
          setDialogEditarMateria(false)
        }, 1000)
      }
    )
  }

  useEffect(() => {
    setUnCredito(datosEditarMateria?.credito)
    setNombMateria(datosEditarMateria?.nombre)
    setCodMateria(datosEditarMateria?.codigo)
    setIdTpMateria(datosEditarMateria?.idtipo.toString())
    setHorasSemanales(datosEditarMateria?.hora)
  }, [datosEditarMateria, dialogEditarMateria])

  return (
    <Dialog
      visible={dialogEditarMateria}
      onHide={() => {
        setDialogEditarMateria(false)
      }}
      header="Modificar Materia"
      resizable={false}
      draggable={false}
    >
      <Toast ref={toast} />
      <div className="grid grid-cols-5 gap-4 m-2">
        <span className="p-float-label field">
          <InputText
            className="w-full"
            id="new_cod_carrera"
            value={codMateria}
            onChange={(e) => setCodMateria(e.target.value.toUpperCase())}
            autoComplete="off"
          />
          <label htmlFor="new_cod_carrera">Código</label>
        </span>
        <span className="p-float-label field">
          <InputText
            className="w-full"
            id="new_nb_carrera"
            value={nombMateria}
            onChange={(e) => setNombMateria(e.target.value.toUpperCase())}
            autoComplete="off"
          />
          <label htmlFor="new_nb_carrera">Materia</label>
        </span>
        <span className="p-float-label field">
          <Dropdown
            className="w-full"
            id="new_tec_carrera"
            options={tpmateria?.obtenerTipoMateria.response}
            optionLabel="nombre"
            optionValue="id"
            value={idTpMateria}
            onChange={(e) => setIdTpMateria(e.value)}
            autoComplete="off"
          />
          <label htmlFor="new_tec_materia">Técnica</label>
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
        <span className="p-float-label field">
          <InputText
            className="w-full"
            id="new_uni_cre_materia"
            value={unCredito}
            onChange={(e) => setUnCredito(e.target.value)}
            autoComplete="off"
            keyfilter="pint"
            maxLength={2}
          />
          <label htmlFor="new_uni_cre_materia">Unida de Credito</label>
        </span>
        <div className="col-span-5 flex justify-center">
          <Button label="Modificar" icon="pi pi-plus" onClick={actualizarMat} />
        </div>
      </div>
      {/* eslint-disable-next-line react/no-unknown-property */}
      <style jsx global>{`
        .p-disabled,
        .p-component:disabled {
          opacity: 1;
        }
      `}</style>
    </Dialog>
  )
}

export default DialogEditarMateria

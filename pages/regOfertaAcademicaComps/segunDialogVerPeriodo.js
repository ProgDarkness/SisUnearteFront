import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import format from 'date-fns/format'

const DialogVerPeriodo = ({
  activeDialogVerPeriodo,
  setActiveDialogVerPeriodo,
  verDatosPeriodo
}) => {
  function formatFechas(fecha) {
    const formatFecha = verDatosPeriodo?.fei
      ? format(new Date(parseInt(fecha)), 'dd/MM/yyyy')
      : null

    return formatFecha
  }

  const modDatosPeriodo = { ...verDatosPeriodo }
  modDatosPeriodo.fei = formatFechas(verDatosPeriodo?.fei)
  modDatosPeriodo.fef = formatFechas(verDatosPeriodo?.fef)
  modDatosPeriodo.feacta = formatFechas(verDatosPeriodo?.feacta)
  modDatosPeriodo.fedoc = formatFechas(verDatosPeriodo?.fedoc)
  modDatosPeriodo.fepregrado = formatFechas(verDatosPeriodo?.fepregrado)
  modDatosPeriodo.femodificacion = formatFechas(verDatosPeriodo?.femodificacion)
  modDatosPeriodo.feipre = formatFechas(verDatosPeriodo?.feipre)
  modDatosPeriodo.fefpre = formatFechas(verDatosPeriodo?.fefpre)
  modDatosPeriodo.feinsc = formatFechas(verDatosPeriodo?.feinsc)
  modDatosPeriodo.fefinsc = formatFechas(verDatosPeriodo?.fefinsc)
  modDatosPeriodo.feioferta = formatFechas(verDatosPeriodo?.feioferta)
  modDatosPeriodo.fefoferta = formatFechas(verDatosPeriodo?.fefoferta)
  modDatosPeriodo.feiretiro = formatFechas(verDatosPeriodo?.feiretiro)
  modDatosPeriodo.fefretiro = formatFechas(verDatosPeriodo?.fefretiro)
  modDatosPeriodo.feinota = formatFechas(verDatosPeriodo?.feinota)
  modDatosPeriodo.fefnota = formatFechas(verDatosPeriodo?.fefnota)

  return (
    <Dialog
      header="Ver Periodo"
      visible={activeDialogVerPeriodo}
      onHide={() => setActiveDialogVerPeriodo(false)}
      draggable={false}
      resizable={false}
    >
      <div className="grid grid-cols-6 gap-4 mt-3">
        <span className="p-float-label field">
          <InputText
            className="w-full"
            id="cod_periodo"
            value={verDatosPeriodo?.codigo}
            autoComplete="off"
            disabled
          />
          <label htmlFor="cod_periodo">Codigo Periodo</label>
        </span>
        <span className="p-float-label field">
          <InputText
            className="w-full"
            id="nb_periodo"
            value={verDatosPeriodo?.mensaje}
            autoComplete="off"
            disabled
          />
          <label htmlFor="nb_periodo">Nombre Periodo</label>
        </span>
        <span className="p-float-label field">
          <InputText
            className="w-full"
            id="tp_periodo"
            value={verDatosPeriodo?.periodo}
            autoComplete="off"
            disabled
          />
          <label htmlFor="tp_periodo">Tipo Periodo</label>
        </span>
        <span className="p-float-label field">
          <InputText
            className="w-full"
            id="anio_periodo"
            value={verDatosPeriodo?.anio}
            autoComplete="off"
            disabled
          />
          <label htmlFor="anio_periodo">Año del Periodo</label>
        </span>
        <span className="p-float-label field">
          <InputText
            className="w-full"
            id="mes_inicio"
            value={verDatosPeriodo?.mesi}
            autoComplete="off"
            disabled
          />
          <label htmlFor="mes_inicio">Mes de Inicio</label>
        </span>
        <span className="p-float-label field">
          <InputText
            className="w-full"
            id="mes_fin"
            value={verDatosPeriodo?.mesf}
            autoComplete="off"
            disabled
          />
          <label htmlFor="mes_fin">Mes de Finalizacion</label>
        </span>
        <span className="p-float-label field">
          <InputText
            className="w-full"
            id="num_semanas"
            value={verDatosPeriodo?.semana}
            autoComplete="off"
            disabled
          />
          <label htmlFor="num_semanas">Numero de Semanas</label>
        </span>
        <span className="p-float-label field">
          <InputText
            className="w-full"
            id="fe_incio"
            value={modDatosPeriodo?.fei}
            autoComplete="off"
            disabled
          />
          <label htmlFor="fe_incio">Fecha de Inicio</label>
        </span>
        <span className="p-float-label field col-span-2">
          <InputText
            className="w-full"
            id="fe_fin"
            value={modDatosPeriodo?.fef}
            autoComplete="off"
            disabled
          />
          <label htmlFor="fe_fin">Fecha de Finalizacion</label>
        </span>
        <span className="p-float-label field col-span-2">
          <InputText
            className="w-full"
            id="fe_entregaActa"
            value={modDatosPeriodo?.feacta}
            autoComplete="off"
            disabled
          />
          <label htmlFor="fe_entregaActa">Fecha de Entrega de Acta</label>
        </span>
        <span className="p-float-label field col-span-2">
          <InputText
            className="w-full"
            id="fe_soli_doc"
            value={modDatosPeriodo?.fedoc}
            autoComplete="off"
            disabled
          />
          <label htmlFor="fe_soli_doc">Fecha de solicitud de documentos</label>
        </span>
        <span className="p-float-label field col-span-2">
          <InputText
            className="w-full"
            id="fe_soli_pre_grado"
            value={modDatosPeriodo?.fepregrado}
            autoComplete="off"
            disabled
          />
          <label htmlFor="fe_soli_pre_grado">
            Fecha de solicitud de pre-grado
          </label>
        </span>
        <span className="p-float-label field col-span-2">
          <InputText
            className="w-full"
            id="fe_retiro"
            value={modDatosPeriodo?.feiretiro}
            autoComplete="off"
            disabled
          />
          <label htmlFor="fe_retiro">Fecha de retiro</label>
        </span>
        <span className="p-float-label field col-span-2">
          <InputText
            className="w-full"
            id="fe_modificacion"
            value={modDatosPeriodo?.femodificacion}
            autoComplete="off"
            disabled
          />
          <label htmlFor="fe_modificacion">Fecha de modificacion</label>
        </span>
        <span className="p-float-label field col-span-2">
          <InputText
            className="w-full"
            id="fe_ini_pre_inscri"
            value={modDatosPeriodo?.feipre}
            autoComplete="off"
            disabled
          />
          <label htmlFor="fe_ini_pre_inscri">
            Fecha de Inicio de Preinscripciones
          </label>
        </span>
        <span className="p-float-label field col-span-2">
          <InputText
            className="w-full"
            id="fe_ini_inscri"
            value={modDatosPeriodo?.feinsc}
            autoComplete="off"
            disabled
          />
          <label htmlFor="fe_ini_inscri">Fecha de Inicio de Inscripcion</label>
        </span>
        <span className="p-float-label field col-span-2">
          <InputText
            className="w-full"
            id="fe_fin_inscri"
            value={modDatosPeriodo?.fefinsc}
            autoComplete="off"
            disabled
          />
          <label htmlFor="fe_fin_inscri">
            Fecha de Finalizacion de Inscripcion
          </label>
        </span>
        <span className="p-float-label field col-span-2">
          <InputText
            className="w-full"
            id="fe_ini_oferta"
            value={modDatosPeriodo?.feioferta}
            autoComplete="off"
            disabled
          />
          <label htmlFor="fe_ini_oferta">Fecha de Inicio de Oferta</label>
        </span>
        <span className="p-float-label field col-span-2">
          <InputText
            className="w-full"
            id="fe_fin_oferta"
            value={modDatosPeriodo?.fefoferta}
            autoComplete="off"
            disabled
          />
          <label htmlFor="fe_fin_oferta">Fecha de Fin de Oferta</label>
        </span>
        <span className="p-float-label field col-span-2">
          <InputText
            className="w-full"
            id="fe_ini_retiro"
            value={modDatosPeriodo?.feiretiro}
            autoComplete="off"
            disabled
          />
          <label htmlFor="fe_ini_retiro">Fecha de Inicio de Retiro</label>
        </span>
        <span className="p-float-label field col-span-2">
          <InputText
            className="w-full"
            id="fe_fin_retiro"
            value={modDatosPeriodo?.fefretiro}
            autoComplete="off"
            disabled
          />
          <label htmlFor="fe_fin_retiro">Fecha de Finalizacion de Retiro</label>
        </span>
        <span className="p-float-label field">
          <InputText
            className="w-full"
            id="fe_ini_notas"
            value={modDatosPeriodo?.feinota}
            autoComplete="off"
            disabled
          />
          <label htmlFor="fe_ini_notas">Fecha de inicio de notas</label>
        </span>
        <span className="p-float-label field">
          <InputText
            className="w-full"
            id="fe_fin_notas"
            value={modDatosPeriodo?.fefnota}
            autoComplete="off"
            disabled
          />
          <label htmlFor="fe_fin_notas">Fecha de fin de notas</label>
        </span>
      </div>
    </Dialog>
  )
}

export default DialogVerPeriodo

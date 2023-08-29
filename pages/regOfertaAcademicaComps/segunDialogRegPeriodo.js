import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { useRef, useState } from 'react'
import DialogEditarPeriodo from './segunDialogEditarPeriodo'
import DialogVerPeriodo from './segunDialogVerPeriodo'
import { InputMask } from 'primereact/inputmask'
import { Dropdown } from 'primereact/dropdown'
import { Toast } from 'primereact/toast'
import { useSesion } from 'hooks/useSesion'
import format from 'date-fns/format'
import request from 'graphql-request'
import GQLregOfertaAcademica from 'graphql/regOfertaAcademica'
import GQLconsultasGenerales from 'graphql/consultasGenerales'
import useSWR from 'swr'

const DialogRegPeriodo = ({
  activeDialogRegPerido,
  setActiveDialogRegPerido
}) => {
  const { idUser } = useSesion()
  const [reload, setReload] = useState(true)
  const [activeDialogEditarPeriodo, setActiveDialogEditarPeriodo] =
    useState(false)
  const [activeDialogVerPeriodo, setActiveDialogVerPeriodo] = useState(false)
  const [codPeriodo, setCodPeriodo] = useState('')
  const [nombPeriodo, setNombPeriodo] = useState('')
  const [tipoPeriodo, setTipoPeriodo] = useState(null)
  const [anioPeriodo, setAnioPeriodo] = useState('')
  const [mesInicio, setMesInicio] = useState('')
  const [mesFin, setMesFin] = useState('')
  const [nuSemanas, setNuSemanas] = useState('')
  const [feIni, setFeIni] = useState(null)
  const [feFin, setFeFin] = useState(null)
  const [feEntregaActa, setFeEntregaActa] = useState(null)
  const [feSoliDoc, setFeSoliDoc] = useState(null)
  const [feSoliPreGrado, setFeSoliPreGrado] = useState(null)
  const [feRetiro, setFeRetiro] = useState(null)
  const [feModificacion, setFeModificacion] = useState(null)
  const [feIniPreInscri, setFeIniPreInscri] = useState(null)
  const [feIniInscri, setFeIniInscri] = useState(null)
  const [feFinInscri, setFeFinInscri] = useState(null)
  const [feIniOferta, setFeIniOferta] = useState(null)
  const [feFinOferta, setFeFinOferta] = useState(null)
  const [feIniRetiro, setFeIniRetiro] = useState(null)
  const [feFinRetiro, setFeFinRetiro] = useState(null)
  const [feIniNotas, setFeIniNotas] = useState(null)
  const [feFinNotas, setFeFinNotas] = useState(null)
  const toast = useRef(null)

  const { data: meses } = useSWR(GQLconsultasGenerales.GET_MESES)
  const { data: periodosInfo } = useSWR(
    GQLregOfertaAcademica.GET_TODOS_PERIODOS
  )

  console.log(periodosInfo)

  const savePeriodo = (variables) => {
    return request(
      process.env.NEXT_PUBLIC_URL_BACKEND,
      GQLregOfertaAcademica.SAVE_PERIODO,
      variables
    )
  }

  function validateForm() {
    if (
      !codPeriodo ||
      !nombPeriodo ||
      !tipoPeriodo ||
      !anioPeriodo ||
      !mesInicio ||
      !mesFin ||
      !nuSemanas ||
      !feIni ||
      feIni.includes('_') ||
      !feFin ||
      feFin.includes('_') ||
      !feEntregaActa ||
      feEntregaActa.includes('_') ||
      !feSoliDoc ||
      feSoliDoc.includes('_') ||
      !feSoliPreGrado ||
      feSoliPreGrado.includes('_') ||
      !feRetiro ||
      feRetiro.includes('_') ||
      !feModificacion ||
      feModificacion.includes('_') ||
      !feIniPreInscri ||
      feIniPreInscri.includes('_') ||
      !feIniInscri ||
      feIniInscri.includes('_') ||
      !feFinInscri ||
      feFinInscri.includes('_') ||
      !feIniOferta ||
      feIniOferta.includes('_') ||
      !feFinOferta ||
      feFinOferta.includes('_') ||
      !feIniRetiro ||
      feIniRetiro.includes('_') ||
      !feFinRetiro ||
      feFinRetiro.includes('_') ||
      !feIniNotas ||
      feIniNotas.includes('_') ||
      !feFinNotas ||
      feFinNotas.includes('_')
    ) {
      return true
    } else {
      return false
    }
  }

  function validateDate(fecha, setfecha) {
    if (fecha) {
      const [day, month, year] = fecha?.split('/')
      const dateObject = new Date(year, month - 1, day)
      dateObject.setHours(new Date().getHours())
      dateObject.setMinutes(new Date().getMinutes())
      dateObject.setSeconds(new Date().getSeconds())
      dateObject.setMilliseconds(new Date().getMilliseconds())

      const ahora = new Date()
      ahora.setDate(new Date().getDate() + 3)
      const limite = new Date()
      limite.setFullYear(ahora.getFullYear() + 3)

      if (new Date(year, month, 0).getDate() < day) {
        setfecha(null)
        setfecha('')
        toast.current.show({
          severity: 'error',
          summary: '¡ Atención !',
          detail: 'Fecha Invalida'
        })
      }

      if (!(parseInt(month) <= 12)) {
        setfecha(null)
        setfecha('')
        toast.current.show({
          severity: 'error',
          summary: '¡ Atención !',
          detail: 'Fecha Invalida'
        })
      }

      if (!(dateObject >= ahora && dateObject <= limite)) {
        setfecha(null)
        setfecha('')
        toast.current.show({
          severity: 'error',
          summary: '¡ Atención !',
          detail: 'Fecha Invalida'
        })
      }
    }
  }

  function formatFecha(fecha) {
    const [day, month, year] = fecha?.split('/')
    const dateObject = new Date(year, month - 1, day)

    return format(dateObject, 'yyyy-MM-dd')
  }

  const optionTipoPeriodo = [{ nombre: 'regular', id: '1' }]

  const accionBodyTemplate = (rowData) => {
    return (
      <div className="flex justify-center">
        <Button
          icon="pi pi-search"
          className="p-button-info mr-1"
          tooltip="Ver"
          tooltipOptions={{ position: 'top' }}
          onClick={() => {
            setActiveDialogVerPeriodo(true)
          }}
        />
        <Button
          icon="pi pi-pencil"
          className="p-button-help mr-1"
          tooltip="Modificar"
          onClick={() => {
            setActiveDialogEditarPeriodo(true)
          }}
          tooltipOptions={{ position: 'top' }}
        />
        <Button
          icon="pi pi-times"
          className="p-button-danger"
          tooltip="Eliminar"
          tooltipOptions={{ position: 'top' }}
          /* onClick={() => setDialogConfirmElminarOferta(true)} */
        />
      </div>
    )
  }

  const bodyFeI = (rowData) => {
    const fechaFormat = format(new Date(parseInt(rowData.fei)), 'dd/MM/yyyy')

    return <div>{fechaFormat}</div>
  }

  const bodyFeF = (rowData) => {
    const fechaFormat = format(new Date(parseInt(rowData.fef)), 'dd/MM/yyyy')

    return <div>{fechaFormat}</div>
  }

  function limpiarInpust() {
    setReload(false)
    setCodPeriodo('')
    setNombPeriodo('')
    setTipoPeriodo(null)
    setAnioPeriodo('')
    setMesInicio('')
    setMesFin('')
    setNuSemanas('')
    setFeIni(null)
    setFeFin(null)
    setFeEntregaActa(null)
    setFeSoliDoc(null)
    setFeSoliPreGrado(null)
    setFeRetiro(null)
    setFeModificacion(null)
    setFeIniPreInscri(null)
    setFeIniInscri(null)
    setFeFinInscri(null)
    setFeIniOferta(null)
    setFeFinOferta(null)
    setFeIniRetiro(null)
    setFeFinRetiro(null)
    setFeIniNotas(null)
    setFeFinNotas(null)
    setTimeout(() => {
      setReload(true)
    }, 1)
  }

  const guardarPeriodo = () => {
    const InputPeriodo = {
      codigo: codPeriodo,
      tipo: parseInt(tipoPeriodo.id),
      anio: parseInt(anioPeriodo),
      mesinicio: parseInt(mesInicio),
      mesfin: parseInt(mesFin),
      nusemana: parseInt(nuSemanas),
      personal: parseInt(idUser),
      mensaje: nombPeriodo,
      feinicio: formatFecha(feIni),
      fefin: formatFecha(feFin),
      feentregaacta: formatFecha(feEntregaActa),
      fesolicdocumento: formatFecha(feSoliDoc),
      fesolicgrado: formatFecha(feSoliPreGrado),
      feretiro: formatFecha(feRetiro),
      femodificacion: formatFecha(feModificacion),
      feiniciopreinscripcion: formatFecha(feIniPreInscri),
      fefinpreinscripcion: formatFecha(feIniInscri),
      feinicioinscripcion: formatFecha(feIniInscri),
      fefininscripcion: formatFecha(feFinInscri),
      feiniciooferta: formatFecha(feIniOferta),
      fefinoferta: formatFecha(feFinOferta),
      feinicioretiro: formatFecha(feIniRetiro),
      fefinretiro: formatFecha(feFinRetiro),
      feinicionotas: formatFecha(feIniNotas),
      fefinnotas: formatFecha(feFinNotas)
    }

    savePeriodo({ InputPeriodo }).then(
      ({ crearPeriodo: { status, message, type } }) => {
        toast.current.show({
          severity: type,
          summary: '¡ Atención !',
          detail: message
        })
        limpiarInpust()
      }
    )
  }

  function validarAnioPeriodo(anio, setanio) {
    const anioActual = new Date().getFullYear()
    const anioLimite = new Date().getFullYear() + 3

    if (anio) {
      if (!(anio >= anioActual && anio <= anioLimite)) {
        setanio('')
        toast.current.show({
          severity: 'error',
          summary: '¡ Atención !',
          detail: 'Año Invalido'
        })
      }
    }
  }

  function validarMeses(mes, setmes) {
    if (mesInicio && mesFin) {
      if (parseInt(mesInicio) < parseInt(mesFin)) {
        const cantMeses = parseInt(mesFin) - parseInt(mesInicio)

        setNuSemanas(cantMeses * 4)
      } else {
        setReload(false)
        setMesFin('')
        setMesInicio('')
        setNuSemanas('')
        setTimeout(() => {
          setReload(true)
        }, 1)
        toast.current.show({
          severity: 'error',
          summary: '¡ Atención !',
          detail: 'El mes de finalizacion debe ser mayor al mes de inicio'
        })
      }
    } else {
      if (nuSemanas) {
        setReload(false)
        setNuSemanas('')
        setTimeout(() => {
          setReload(true)
        }, 1)
      }
    }

    if (mes) {
      if (!(parseInt(mes) >= 1 && parseInt(mes) <= 12)) {
        setReload(false)
        setmes('')
        setNuSemanas('')
        setTimeout(() => {
          setReload(true)
        }, 1)
        toast.current.show({
          severity: 'error',
          summary: '¡ Atención !',
          detail: 'Mes Invalido'
        })
      }
    }
  }

  return (
    <>
      <DialogEditarPeriodo
        activeDialogEditarPeriodo={activeDialogEditarPeriodo}
        setActiveDialogEditarPeriodo={setActiveDialogEditarPeriodo}
      />
      <DialogVerPeriodo
        activeDialogVerPeriodo={activeDialogVerPeriodo}
        setActiveDialogVerPeriodo={setActiveDialogVerPeriodo}
      />
      <Dialog
        header="Registrar Periodo"
        visible={activeDialogRegPerido}
        onHide={() => {
          setActiveDialogRegPerido(false)
          limpiarInpust()
        }}
        draggable={false}
        resizable={false}
      >
        <Toast ref={toast} />
        <div className="grid grid-cols-6 gap-4 mt-3">
          <span className="p-float-label field">
            {reload && (
              <InputText
                className="w-full"
                id="cod_periodo"
                value={codPeriodo}
                autoComplete="off"
                onChange={(e) => setCodPeriodo(e.target.value)}
              />
            )}
            <label htmlFor="cod_periodo">Codigo Periodo</label>
          </span>
          <span className="p-float-label field">
            {reload && (
              <InputText
                className="w-full"
                id="nb_periodo"
                value={nombPeriodo}
                autoComplete="off"
                onChange={(e) => setNombPeriodo(e.target.value)}
              />
            )}
            <label htmlFor="nb_periodo">Descripcion Periodo</label>
          </span>
          <span className="p-float-label field">
            <Dropdown
              className="w-full"
              id="tp_periodo"
              options={optionTipoPeriodo}
              value={tipoPeriodo}
              optionLabel="nombre"
              onChange={(e) => setTipoPeriodo(e.value)}
            />
            <label htmlFor="tp_periodo">Tipo Periodo</label>
          </span>
          <span className="p-float-label field">
            {reload && (
              <InputText
                className="w-full"
                id="anio_periodo"
                keyfilter="pint"
                maxLength={4}
                value={anioPeriodo}
                autoComplete="off"
                onChange={(e) => setAnioPeriodo(e.target.value)}
                onBlur={() => validarAnioPeriodo(anioPeriodo, setAnioPeriodo)}
              />
            )}
            <label htmlFor="anio_periodo">Año del Periodo</label>
          </span>
          <span className="p-float-label field">
            {reload && (
              <Dropdown
                className="w-full"
                id="mes_inicio"
                options={meses?.obtenerMes.response}
                optionLabel="nombre"
                optionValue="id"
                value={mesInicio}
                onChange={(e) => setMesInicio(e.target.value)}
                onBlur={() => validarMeses(mesInicio, setMesInicio)}
              />
            )}
            <label htmlFor="mes_inicio">Mes de Inicio</label>
          </span>
          <span className="p-float-label field">
            {reload && (
              <Dropdown
                className="w-full"
                id="mes_fin"
                options={meses?.obtenerMes.response}
                optionLabel="nombre"
                optionValue="id"
                value={mesFin}
                onChange={(e) => setMesFin(e.target.value)}
                onBlur={() => validarMeses(mesFin, setMesFin)}
              />
            )}
            <label htmlFor="mes_fin">Mes de Finalizacion</label>
          </span>
          <span className="p-float-label field">
            {reload && (
              <InputText
                className="w-full"
                id="num_semanas"
                keyfilter="pint"
                maxLength={3}
                value={nuSemanas}
                autoComplete="off"
                onChange={(e) => setNuSemanas(e.target.value)}
                disabled
              />
            )}
            <label htmlFor="num_semanas">Numero de Semanas</label>
          </span>
          <span className="p-float-label field">
            <InputMask
              mask="99/99/9999"
              className="w-full"
              id="fe_incio"
              value={feIni}
              autoComplete="off"
              onChange={(e) => setFeIni(e.target.value)}
              onBlur={() => validateDate(feIni, setFeIni)}
            />
            <label htmlFor="fe_incio">Fecha de Inicio</label>
          </span>
          <span className="p-float-label field col-span-2">
            <InputMask
              mask="99/99/9999"
              className="w-full"
              id="fe_fin"
              value={feFin}
              autoComplete="off"
              onChange={(e) => setFeFin(e.target.value)}
              onBlur={() => validateDate(feFin, setFeFin)}
            />
            <label htmlFor="fe_fin">Fecha de Finalizacion</label>
          </span>
          <span className="p-float-label field col-span-2">
            <InputMask
              mask="99/99/9999"
              className="w-full"
              id="fe_entregaActa"
              value={feEntregaActa}
              autoComplete="off"
              onChange={(e) => setFeEntregaActa(e.target.value)}
              onBlur={() => validateDate(feEntregaActa, setFeEntregaActa)}
            />
            <label htmlFor="fe_entregaActa">Fecha de Entrega de Acta</label>
          </span>
          <span className="p-float-label field col-span-2">
            <InputMask
              mask="99/99/9999"
              className="w-full"
              id="fe_soli_doc"
              value={feSoliDoc}
              autoComplete="off"
              onChange={(e) => setFeSoliDoc(e.target.value)}
              onBlur={() => validateDate(feSoliDoc, setFeSoliDoc)}
            />
            <label htmlFor="fe_soli_doc">
              Fecha de solicitud de documentos
            </label>
          </span>
          <span className="p-float-label field col-span-2">
            <InputMask
              mask="99/99/9999"
              className="w-full"
              id="fe_soli_pre_grado"
              value={feSoliPreGrado}
              autoComplete="off"
              onChange={(e) => setFeSoliPreGrado(e.target.value)}
              onBlur={() => validateDate(feSoliPreGrado, setFeSoliPreGrado)}
            />
            <label htmlFor="fe_soli_pre_grado">
              Fecha de solicitud de pre-grado
            </label>
          </span>
          <span className="p-float-label field col-span-2">
            <InputMask
              mask="99/99/9999"
              className="w-full"
              id="fe_retiro"
              value={feRetiro}
              autoComplete="off"
              onChange={(e) => setFeRetiro(e.target.value)}
              onBlur={() => validateDate(feRetiro, setFeRetiro)}
            />
            <label htmlFor="fe_retiro">Fecha de retiro</label>
          </span>
          <span className="p-float-label field col-span-2">
            <InputMask
              mask="99/99/9999"
              className="w-full"
              id="fe_modificacion"
              value={feModificacion}
              autoComplete="off"
              onChange={(e) => setFeModificacion(e.target.value)}
              onBlur={() => validateDate(feModificacion, setFeModificacion)}
            />
            <label htmlFor="fe_modificacion">Fecha de modificacion</label>
          </span>
          <span className="p-float-label field col-span-2">
            <InputMask
              mask="99/99/9999"
              className="w-full"
              id="fe_ini_pre_inscri"
              value={feIniPreInscri}
              autoComplete="off"
              onChange={(e) => setFeIniPreInscri(e.target.value)}
              onBlur={() => validateDate(feIniPreInscri, setFeIniPreInscri)}
            />
            <label htmlFor="fe_ini_pre_inscri">
              Fecha de Inicio de Preinscripciones
            </label>
          </span>
          <span className="p-float-label field col-span-2">
            <InputMask
              mask="99/99/9999"
              className="w-full"
              id="fe_ini_inscri"
              value={feIniInscri}
              autoComplete="off"
              onChange={(e) => setFeIniInscri(e.target.value)}
              onBlur={() => validateDate(feIniInscri, setFeIniInscri)}
            />
            <label htmlFor="fe_ini_inscri">
              Fecha de Inicio de Inscripcion
            </label>
          </span>
          <span className="p-float-label field col-span-2">
            <InputMask
              mask="99/99/9999"
              className="w-full"
              id="fe_fin_inscri"
              value={feFinInscri}
              autoComplete="off"
              onChange={(e) => setFeFinInscri(e.target.value)}
              onBlur={() => validateDate(feFinInscri, setFeFinInscri)}
            />
            <label htmlFor="fe_fin_inscri">
              Fecha de Finalizacion de Inscripcion
            </label>
          </span>
          <span className="p-float-label field col-span-2">
            <InputMask
              mask="99/99/9999"
              className="w-full"
              id="fe_ini_oferta"
              value={feIniOferta}
              autoComplete="off"
              onChange={(e) => setFeIniOferta(e.target.value)}
              onBlur={() => validateDate(feIniOferta, setFeIniOferta)}
            />
            <label htmlFor="fe_ini_oferta">Fecha de Inicio de Oferta</label>
          </span>
          <span className="p-float-label field col-span-2">
            <InputMask
              mask="99/99/9999"
              className="w-full"
              id="fe_fin_oferta"
              value={feFinOferta}
              autoComplete="off"
              onChange={(e) => setFeFinOferta(e.target.value)}
              onBlur={() => validateDate(feFinOferta, setFeFinOferta)}
            />
            <label htmlFor="fe_fin_oferta">Fecha de Fin de Oferta</label>
          </span>
          <span className="p-float-label field col-span-2">
            <InputMask
              mask="99/99/9999"
              className="w-full"
              id="fe_ini_retiro"
              value={feIniRetiro}
              autoComplete="off"
              onChange={(e) => setFeIniRetiro(e.target.value)}
              onBlur={() => validateDate(feIniRetiro, setFeIniRetiro)}
            />
            <label htmlFor="fe_ini_retiro">Fecha de Inicio de Retiro</label>
          </span>
          <span className="p-float-label field col-span-2">
            <InputMask
              mask="99/99/9999"
              className="w-full"
              id="fe_fin_retiro"
              value={feFinRetiro}
              autoComplete="off"
              onChange={(e) => setFeFinRetiro(e.target.value)}
              onBlur={() => validateDate(feFinRetiro, setFeFinRetiro)}
            />
            <label htmlFor="fe_fin_retiro">
              Fecha de Finalizacion de Retiro
            </label>
          </span>
          <span className="p-float-label field">
            <InputMask
              mask="99/99/9999"
              className="w-full"
              id="fe_ini_notas"
              value={feIniNotas}
              autoComplete="off"
              onChange={(e) => setFeIniNotas(e.target.value)}
              onBlur={() => validateDate(feIniNotas, setFeIniNotas)}
            />
            <label htmlFor="fe_ini_notas">Fecha de inicio de notas</label>
          </span>
          <span className="p-float-label field">
            <InputMask
              mask="99/99/9999"
              className="w-full"
              id="fe_fin_notas"
              value={feFinNotas}
              autoComplete="off"
              onChange={(e) => setFeFinNotas(e.target.value)}
              onBlur={() => validateDate(feFinNotas, setFeFinNotas)}
            />
            <label htmlFor="fe_fin_notas">Fecha de fin de notas</label>
          </span>
          <div className="col-span-6 flex justify-center my-auto">
            <Button
              label="Registrar"
              icon="pi pi-plus"
              onClick={guardarPeriodo}
              disabled={validateForm()}
            />
          </div>
        </div>
        <div className="mt-4">
          <h1 className="text-2xl font-semibold ml-4">Periodos</h1>
          <DataTable
            value={periodosInfo?.obtenerPeriodos.response}
            emptyMessage="No se encuentran periodos registrados."
          >
            <Column field="codigo" header="Codigo Periodo" />
            <Column field="mensaje" header="Descripción Periodo" />
            <Column field="periodo" header="Tipo Periodo" />
            <Column field="anio" header="Año del Periodo" />
            <Column field="fei" body={bodyFeI} header="Fecha Inicio" />
            <Column field="fef" body={bodyFeF} header="Fecha Fin" />
            <Column body={accionBodyTemplate} />
          </DataTable>
        </div>
        {/* eslint-disable-next-line react/no-unknown-property */}
        <style jsx global>{`
          .p-disabled,
          .p-component:disabled {
            opacity: 1;
          }
        `}</style>
      </Dialog>
    </>
  )
}

export default DialogRegPeriodo

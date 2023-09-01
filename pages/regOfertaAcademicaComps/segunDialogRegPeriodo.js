import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { useRef, useState } from 'react'
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
import { ConfirmDialog } from 'primereact/confirmdialog'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'

const DialogRegPeriodo = ({
  activeDialogRegPerido,
  setActiveDialogRegPerido
}) => {
  const { idUser } = useSesion()
  const [reload, setReload] = useState(true)
  const [activeDialogVerPeriodo, setActiveDialogVerPeriodo] = useState(false)
  const [editarId, setEditarId] = useState(null)
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
  const [verDatosPeriodo, setVerDatosPeriodo] = useState(null)
  const [dialogConfirmElminarPeriodo, setDialogConfirmElminarPeriodo] =
    useState(false)
  const [dialogConfirmRegPeriodo, setDialogConfirmRegPeriodo] = useState(false)
  const [dataEliminarPeriodo, setDataEliminarPeriodo] = useState(null)
  const { data: meses } = useSWR(GQLconsultasGenerales.GET_MESES)
  const { data: periodosInfo, mutate } = useSWR(
    GQLregOfertaAcademica.GET_TODOS_PERIODOS
  )
  

  /* 
    {
    "id": "4",
    "codigo": "1",
    "periodo": "Regular",
    "idperiodo": 1,
    "anio": 2024,
    "mesi": "Enero",
    "idmesi": 1,
    "mesf": "Marzo",
    "idmesf": 3,
    "semana": 3,
    "personal": "Ana",
    "mensaje": "Hola",
    "fei": "16/08/2023",
    "fef": "16/08/2023",
    "feacta": "16/08/2023",
    "fedoc": "16/08/2023",
    "fepregrado": "16/08/2023",
    "feretiro": "16/08/2023",
    "femodificacion": "16/08/2023",
    "feipre": "16/08/2023",
    "fefpre": "16/08/2023",
    "feinsc": "16/08/2023",
    "fefinsc": "16/08/2023",
    "feioferta": "16/08/2023",
    "fefoferta": "16/08/2023",
    "feiretiro": "16/08/2023",
    "fefretiro": "16/08/2023",
    "feinota": "16/08/2023",
    "fefnota": "16/08/2023",
    "estatus": "Inactivo"
    }
  */

  const funCargEditar = (rowData) => {
    if (rowData) {
      const mainDiv = document.querySelector('#main')
      mainDiv.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
      setEditarId(rowData?.id)
      setCodPeriodo(rowData?.codigo)
      setNombPeriodo(rowData?.mensaje)
      setTipoPeriodo(rowData.idperiodo.toString())
      setAnioPeriodo(rowData?.anio)
      setMesInicio(rowData.idmesi.toString())
      setMesFin(rowData.idmesf.toString())
      setNuSemanas(rowData?.semana)
      setFeIni(rowData?.fei)
      setFeFin(rowData?.fef)
      setFeEntregaActa(rowData?.feacta)
      setFeSoliDoc(rowData?.fedoc)
      setFeSoliPreGrado(rowData?.fepregrado)
      setFeRetiro(rowData?.feretiro)
      setFeModificacion(rowData?.femodificacion)
      setFeIniPreInscri(rowData?.feipre)
      setFeIniInscri(rowData?.feinsc)
      setFeFinInscri(rowData?.fefinsc)
      setFeIniOferta(rowData?.feioferta)
      setFeFinOferta(rowData?.fefoferta)
      setFeIniRetiro(rowData?.feiretiro)
      setFeFinRetiro(rowData?.fefretiro)
      setFeIniNotas(rowData?.feinota)
      setFeFinNotas(rowData?.fefnota)
    }
  }

  const savePeriodo = (variables) => {
    return request(
      process.env.NEXT_PUBLIC_URL_BACKEND,
      GQLregOfertaAcademica.SAVE_PERIODO,
      variables
    )
  }

  const updatePeriodo = (variables) => {
    return request(
      process.env.NEXT_PUBLIC_URL_BACKEND,
      GQLregOfertaAcademica.UPDATE_PERIODO,
      variables
    )
  }

  const eliminarPeriodo = (variables) => {
    return request(
      process.env.NEXT_PUBLIC_URL_BACKEND,
      GQLregOfertaAcademica.ELMINAR_PERIODO,
      variables
    )
  }

  const actualizarPeriodo = () => {
    const InputActualizarPeriodo = {
      codigo: codPeriodo,
      tipo: parseInt(tipoPeriodo),
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
      fefinnotas: formatFecha(feFinNotas),
      idperiodo: parseInt(editarId)
    }
    updatePeriodo({ InputActualizarPeriodo }).then(
      ({ actualizarPeriodo: { status, message, type } }) => {
        toast.current.show({
          severity: type,
          summary: '¡ Atención !',
          detail: message
        })
        mutate()
        limpiarInpust()
      }
    )
  }

  const regEliminarPeriodo = () => {
    const InputEliminarPeriodo = {
      idperiodo: parseInt(dataEliminarPeriodo?.id)
    }
    eliminarPeriodo({ InputEliminarPeriodo }).then(
      ({ eliminarPeriodo: { status, message, type } }) => {
        toast.current.show({
          severity: type,
          summary: '¡ Atención !',
          detail: message
        })
        mutate()
      }
    )
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

  const acceptElminarPeriodo = () => {
    regEliminarPeriodo()
  }

  const acceptRegPeriodo = () => {
    if (editarId) {
      actualizarPeriodo()
    } else {
      guardarPeriodo()
    }
  }

  const rejectElminarPeriodo = () => {
    setDialogConfirmElminarPeriodo(false)
  }

  const rejectRegPeriodo = () => {
    setDialogConfirmRegPeriodo(false)
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
            setVerDatosPeriodo(rowData)
          }}
        />
        <Button
          icon="pi pi-pencil"
          className="p-button-help mr-1"
          tooltip="Modificar"
          onClick={() => funCargEditar(rowData)}
          tooltipOptions={{ position: 'top' }}
        />
        <Button
          icon="pi pi-times"
          className="p-button-danger"
          tooltip="Eliminar"
          tooltipOptions={{ position: 'top' }}
          onClick={() => {
            setDialogConfirmElminarPeriodo(true)
            setDataEliminarPeriodo(rowData)
          }}
        />
      </div>
    )
  }

  function limpiarInpust() {
    setEditarId(null)
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
      tipo: parseInt(tipoPeriodo),
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
      <ConfirmDialog
        visible={dialogConfirmElminarPeriodo}
        onHide={() => setDialogConfirmElminarPeriodo(false)}
        message="¿Esta seguro que desea eliminar la carrera?"
        header="Confirmacion"
        icon="pi pi-exclamation-triangle"
        accept={acceptElminarPeriodo}
        reject={rejectElminarPeriodo}
        acceptLabel="SI"
        rejectLabel="NO"
      />
      <ConfirmDialog
        visible={dialogConfirmRegPeriodo}
        onHide={() => setDialogConfirmRegPeriodo(false)}
        message={
          <p className="text-center">
            <FontAwesomeIcon size="3x" icon={faTriangleExclamation} /> <br />
            ¡ Atención ! <br /> los datos registrados deben ser correctos <br />{' '}
            por favor verifique antes de confirmar el registro, <br /> luego no
            podran ser modificados
          </p>
        }
        header="Confirmacion"
        accept={acceptRegPeriodo}
        reject={rejectRegPeriodo}
        acceptLabel="SI"
        rejectLabel="NO"
      />
      <DialogVerPeriodo
        activeDialogVerPeriodo={activeDialogVerPeriodo}
        setActiveDialogVerPeriodo={setActiveDialogVerPeriodo}
        verDatosPeriodo={verDatosPeriodo}
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
        contentStyle={{ overflowY: 'hidden' }}
      >
        <Toast ref={toast} />
        <div
          id="main"
          className="grid grid-cols-6 gap-4 mt-3 overflow-y-auto pt-2"
          style={{ maxHeight: '70vh'}}
        >
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
              optionValue="id"
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
              label={editarId ? 'Guardar' : 'Registrar'}
              icon="pi pi-plus"
              onClick={() => setDialogConfirmRegPeriodo(true)}
              disabled={validateForm()}
            />
            {editarId && (
              <Button
                label="Cancelar"
                icon="pi pi-times"
                className="p-button-danger ml-1"
                onClick={() => limpiarInpust()}
              />
            )}
          </div>
          <div className="mt-4 col-span-6">
            <h1 className="text-2xl font-semibold ml-4">Periodos</h1>
            <DataTable
              value={periodosInfo?.obtenerPeriodos.response}
              emptyMessage="No se encuentran periodos registrados."
            >
              <Column field="codigo" header="Codigo Periodo" />
              <Column field="mensaje" header="Descripción Periodo" />
              <Column field="periodo" header="Tipo Periodo" />
              <Column field="anio" header="Año del Periodo" />
              <Column field="fei" header="Fecha Inicio" />
              <Column field="fef" header="Fecha Fin" />
              <Column body={accionBodyTemplate} />
            </DataTable>
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
    </>
  )
}

export default DialogRegPeriodo

import AppLayout from 'components/AppLayout'
import { InputText } from 'primereact/inputtext'
import { useState, useRef, useEffect } from 'react'
import { Button } from 'primereact/button'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faAddressCard } from '@fortawesome/free-solid-svg-icons'
import GQLPlantilla from 'graphql/plantilla'
import GQLConsultasGenerales from 'graphql/consultasGenerales'
import request from 'graphql-request'
import { Dropdown } from 'primereact/dropdown'
import { Toast } from 'primereact/toast'
import useSWR from 'swr'

export default function RecuperarCuenta() {
  const toast = useRef()
  const [idUsuario, setId] = useState('')
  const [cedula, setCedula] = useState('')
  const [nacionalidad, setNacionalidad] = useState(null)
  const [nbUsuario, setUsuario] = useState('')
  const [primerNombre, setPrimerNombre] = useState('')
  const [segundoNombre, setSegundoNombre] = useState('')
  const [primerApellido, setPrimerApellido] = useState('')
  const [segundoApellido, setSegundoApellido] = useState('')
  const [correoUsuario, setCorreo] = useState('')
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [errorFrom, setErrorFrom] = useState(false)

  const { data: nacionalidadOpcion } = useSWR(
    [GQLConsultasGenerales.GET_NACIONALIDADES, {}] || null
  )

  const onEnter = (e) => {
    if (e.keyCode === 13 || e.charCode === 13) {
      document.querySelector('#Regis').click()
    }
  }

  const saveRecuperaDatos = (variables) => {
    return request(
      process.env.NEXT_PUBLIC_URL_BACKEND,
      GQLPlantilla.SAVE_RECUPERA_CUENTA,
      variables
    )
  }

  const registra = () => {
    setSubmitting(true)
    if (idUsuario && nbUsuario && correoUsuario) {
      const InputRecuperaUser = {
        idUsuario: parseInt(idUsuario),
        correoUsuario,
        nbUsuario
      }
      saveRecuperaDatos({ input: InputRecuperaUser }).then(
        ({ saveRecuperaDatos: { status, message, type } }) => {
          if (status === 200) {
            toast.current.show({
              severity: type,
              summary: 'Success',
              detail: message,
              life: 3000
            })
            setUsuario('')
            setCedula('')
            setNacionalidad(null)
            setSubmitting(false)
          }
        }
      )
    } else {
      setErrorFrom(true)
      setSubmitting(false)
      toast.current.show({
        severity: 'error',
        summary: 'Error',
        detail: 'Se necesita llenar todos los campos',
        life: 3000
      })
    }
  }

  const { data } = useSWR([
    nacionalidad || cedula ? GQLPlantilla.OBTENER_USUARIO_REGISTRADO : null,
    {
      input: {
        nacionalidad: parseInt(nacionalidad),
        cedula: cedula.toString()
      }
    }
  ])

  console.log(idUsuario)

  useEffect(() => {
    if (data?.obtenerUsuarioRecuperaCuenta.response) {
      setId(data?.obtenerUsuarioRecuperaCuenta.response.id)
      setPrimerNombre(data?.obtenerUsuarioRecuperaCuenta.response.primer_nombre)
      setSegundoNombre(
        data?.obtenerUsuarioRecuperaCuenta.response.segundo_nombre
      )
      setPrimerApellido(
        data?.obtenerUsuarioRecuperaCuenta.response.primer_apellido
      )
      setSegundoApellido(
        data?.obtenerUsuarioRecuperaCuenta.response.segundo_apellido
      )
      setCorreo(data?.obtenerUsuarioRecuperaCuenta.response.correo)
    }
  }, [data])

  return (
    <AppLayout>
      <Toast ref={toast} />
      <div className="p-card px-8 py-4 -mt-20 bg-[#ae8e8e] shadow-2xl border-[#F9FADC] border-2">
        <h6 className="text-center text-white mb-5 text-2xl font-bold">
          Recuperar Cuenta
        </h6>
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-full ">
            <div className="p-inputgroup">
              <span
                className={`p-inputgroup-addon ${
                  errorFrom && nacionalidad === null
                    ? 'border-red-600 bg-red-300'
                    : ''
                }`}
              >
                <FontAwesomeIcon icon={faAddressCard} />
              </span>
              <Dropdown
                value={nacionalidad}
                placeholder="NACIONALIDAD"
                optionLabel="codigo"
                optionValue="id"
                options={nacionalidadOpcion?.obtenerNacionalidades.response}
                onChange={({ target: { value } }) => {
                  setNacionalidad(value)
                }}
                className={`${
                  errorFrom && nacionalidad === null
                    ? 'border-red-600 bg-red-300'
                    : ''
                }`}
              />
            </div>
          </div>
          <div className="rounded-full ">
            <div className="p-inputgroup">
              <span
                className={`p-inputgroup-addon ${
                  errorFrom && (cedula?.length < 1 || cedula === '')
                    ? 'border-red-600 bg-red-300'
                    : ''
                }`}
              >
                <FontAwesomeIcon icon={faAddressCard} />
              </span>
              <InputText
                value={cedula}
                placeholder="CEDULA"
                onChange={({ target: { value } }) => {
                  setCedula(value ? parseInt(value) : null)
                }}
                keyfilter="pint"
                maxLength={8}
                className={`${
                  errorFrom && (cedula?.length < 1 || cedula === '')
                    ? 'border-red-600 bg-red-300'
                    : ''
                }`}
              />
            </div>
          </div>
          <div>
            <div className="p-inputgroup">
              <span
                className={`p-inputgroup-addon ${
                  errorFrom && (primerNombre?.length < 1 || primerNombre === '')
                    ? 'border-red-600 bg-red-300'
                    : ''
                }`}
              >
                <FontAwesomeIcon icon={faAddressCard} />
              </span>
              <InputText
                value={primerNombre}
                readOnly
                placeholder="PRIMER NOMBRE"
                onChange={({ target: { value } }) => {
                  setPrimerNombre(value)
                }}
                className={`${
                  errorFrom && (primerNombre?.length < 1 || primerNombre === '')
                    ? 'border-red-600 bg-red-300 '
                    : ''
                }`}
                onKeyDown={onEnter}
              />
            </div>
          </div>
          <div>
            <div className="p-inputgroup">
              <span
                className={`p-inputgroup-addon ${
                  errorFrom &&
                  (segundoNombre?.length < 1 || segundoNombre === '')
                    ? 'border-red-600 bg-red-300'
                    : ''
                }`}
              >
                <FontAwesomeIcon icon={faAddressCard} />
              </span>
              <InputText
                value={segundoNombre}
                readOnly
                placeholder="SEGUNDO NOMBRE"
                onChange={({ target: { value } }) => {
                  setSegundoNombre(value)
                }}
                className={`${
                  errorFrom &&
                  (segundoNombre?.length < 1 || segundoNombre === '')
                    ? 'border-red-600 bg-red-300 '
                    : ''
                }`}
                onKeyDown={onEnter}
              />
            </div>
          </div>
          <div>
            <div className="p-inputgroup">
              <span
                className={`p-inputgroup-addon ${
                  errorFrom &&
                  (primerApellido?.length < 1 || primerApellido === '')
                    ? 'border-red-600 bg-red-300'
                    : ''
                }`}
              >
                <FontAwesomeIcon icon={faAddressCard} />
              </span>
              <InputText
                value={primerApellido}
                readOnly
                placeholder="PRIMER APELLIDO"
                onChange={({ target: { value } }) => {
                  setPrimerApellido(value)
                }}
                className={`${
                  errorFrom &&
                  (primerApellido?.length < 1 || primerApellido === '')
                    ? 'border-red-600 bg-red-300 '
                    : ''
                }`}
                onKeyDown={onEnter}
              />
            </div>
          </div>
          <div>
            <div className="p-inputgroup">
              <span
                className={`p-inputgroup-addon ${
                  errorFrom &&
                  (segundoApellido?.length < 1 || segundoApellido === '')
                    ? 'border-red-600 bg-red-300'
                    : ''
                }`}
              >
                <FontAwesomeIcon icon={faAddressCard} />
              </span>
              <InputText
                value={segundoApellido}
                readOnly
                placeholder="SEGUNDO APELLIDO"
                onChange={({ target: { value } }) => {
                  setSegundoApellido(value)
                }}
                className={`${
                  errorFrom &&
                  (segundoApellido?.length < 1 || segundoApellido === '')
                    ? 'border-red-600 bg-red-300 '
                    : ''
                }`}
                onKeyDown={onEnter}
              />
            </div>
          </div>
          <div>
            <div className="p-inputgroup">
              <span
                className={`p-inputgroup-addon ${
                  errorFrom &&
                  (correoUsuario?.length < 1 || correoUsuario === '')
                    ? 'border-red-600 bg-red-300'
                    : ''
                }`}
              >
                <FontAwesomeIcon icon={faAddressCard} />
              </span>
              <InputText
                value={correoUsuario}
                placeholder="CORREO"
                onChange={({ target: { value } }) => {
                  setCorreo(value)
                }}
                className={`${
                  errorFrom &&
                  (correoUsuario?.length < 1 || correoUsuario === '')
                    ? 'border-red-600 bg-red-300 '
                    : ''
                }`}
                onKeyDown={onEnter}
              />
            </div>
          </div>
          <div className="rounded-full ">
            <div className="p-inputgroup">
              <span
                className={`p-inputgroup-addon ${
                  errorFrom && (nbUsuario?.length < 1 || nbUsuario === '')
                    ? 'border-red-600 bg-red-300'
                    : ''
                }`}
              >
                <FontAwesomeIcon icon={faUser} />
              </span>
              <InputText
                value={nbUsuario}
                placeholder="NOMBRE USUARIO"
                onChange={({ target: { value } }) => {
                  setUsuario(value)
                }}
                className={`${
                  errorFrom && (nbUsuario?.length < 1 || nbUsuario === '')
                    ? 'border-red-600 bg-red-300 '
                    : ''
                }`}
              />
            </div>
          </div>
          <Button label="Volver" onClick={() => router.back()} />
          <Button
            label="Registrar"
            id="Regis"
            onClick={registra}
            disabled={submitting}
          />
        </div>
        {/* eslint-disable-next-line react/no-unknown-property */}
        <style jsx global>{`
          .p-dropdown .p-dropdown-label.p-placeholder {
            color: rgba(0, 0, 0, 0.45);
          }
        `}</style>
      </div>
    </AppLayout>
  )
}

import AppLayout from 'components/AppLayout'
import { InputText } from 'primereact/inputtext'
import { useState, useRef } from 'react'
import { Button } from 'primereact/button'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUser,
  faKey,
  faUserGear,
  faAddressCard,
  faSignature
} from '@fortawesome/free-solid-svg-icons'
import GQLPlantilla from 'graphql/plantilla'
import GQLConsultasGenerales from 'graphql/consultasGenerales'
import request from 'graphql-request'
import { Dropdown } from 'primereact/dropdown'
import { Toast } from 'primereact/toast'
import useSWR from 'swr'
import CryptoJS from 'crypto-js'
import { useSesion } from 'hooks/useSesion'

export default function RegistrarUsuario() {
  const { token } = useSesion()
  const toast = useRef()
  const [clave, setClave] = useState('')
  const [nombre, setNombre] = useState('')
  const [usuario, setUsuario] = useState('')
  const [rol, setRol] = useState(!token ? 3 : null)
  const [apellido, setApellido] = useState('')
  const [cedula, setCedula] = useState('')
  const [nacionalidad, setNacionalidad] = useState(null)
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [errorFrom, setErrorFrom] = useState(false)

  const { data } = useSWR(token ? [GQLPlantilla.GET_ROLES, {}, token] : null)

  const { data: nacionalidadOpcion } = useSWR(
    [GQLConsultasGenerales.GET_NACIONALIDADES, {}] || null
  )

  const saveUsuario = (variables) => {
    return request(
      process.env.NEXT_PUBLIC_URL_BACKEND,
      GQLPlantilla.SAVE_USUARIO,
      variables,
      { authorization: `Bearer ${token}` }
    )
  }

  const onEnter = (e) => {
    if (e.keyCode === 13 || e.charCode === 13) {
      document.querySelector('#Regis').click()
    }
  }

  const registra = () => {
    setSubmitting(true)
    if (
      cedula &&
      apellido &&
      nombre &&
      usuario &&
      clave &&
      rol &&
      nacionalidad
    ) {
      const usuarioInput = {
        cedula,
        nombre,
        apellido,
        usuario,
        clave: CryptoJS.AES.encrypt(
          clave,
          process.env.NEXT_PUBLIC_SECRET_KEY
        ).toString(),
        id_rol: rol,
        nacionalidad: parseInt(nacionalidad)
      }
      saveUsuario({ input: usuarioInput }).then(
        ({ saveUsuario: { status, message, type } }) => {
          if (status === 200) {
            toast.current.show({
              severity: type,
              summary: 'Success',
              detail: message,
              life: 3000
            })
            setSubmitting(false)
            if (!token) {
              setTimeout(() => {
                router.push('/')
              }, 2500)
            }
          } else if (status === 401) {
            toast.current.show({
              severity: type,
              summary: 'Error',
              detail: message,
              life: 3000
            })
            setUsuario('')
            setSubmitting(false)
          } else if (status === 402 || status === 403) {
            toast.current.show({
              severity: type,
              summary: 'Error',
              detail: message,
              life: 3000
            })
            setCedula('')
            setSubmitting(false)
          } else {
            toast.current.show({
              severity: type,
              summary: 'Error',
              detail: message,
              life: 3000
            })
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

  return (
    <AppLayout>
      <Toast ref={toast} />
      <div className="p-card px-8 py-4 -mt-20 bg-[#ae8e8e] shadow-2xl border-[#F9FADC] border-2">
        <h6 className="text-center text-white mb-5 text-2xl font-bold">
          Registrar Usuario
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
          <div className="rounded-full ">
            <div className="p-inputgroup">
              <span
                className={`p-inputgroup-addon ${
                  errorFrom && (nombre?.length < 1 || nombre === '')
                    ? 'border-red-600 bg-red-300'
                    : ''
                }`}
              >
                <FontAwesomeIcon icon={faSignature} />
              </span>
              <InputText
                value={nombre}
                placeholder="NOMBRE"
                onChange={({ target: { value } }) => {
                  setNombre(value.toUpperCase())
                }}
                className={`${
                  errorFrom && (nombre?.length < 1 || nombre === '')
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
                  errorFrom && (apellido?.length < 1 || apellido === '')
                    ? 'border-red-600 bg-red-300'
                    : ''
                }`}
              >
                <FontAwesomeIcon icon={faSignature} />
              </span>
              <InputText
                value={apellido}
                placeholder="APELLIDO"
                onChange={({ target: { value } }) => {
                  setApellido(value.toUpperCase())
                }}
                className={`${
                  errorFrom && (apellido?.length < 1 || apellido === '')
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
                  errorFrom && (usuario?.length < 1 || usuario === '')
                    ? 'border-red-600 bg-red-300'
                    : ''
                }`}
              >
                <FontAwesomeIcon icon={faUser} />
              </span>
              <InputText
                value={usuario}
                placeholder="NOMBRE USUARIO"
                onChange={({ target: { value } }) => {
                  setUsuario(value)
                }}
                className={`${
                  errorFrom && (usuario?.length < 1 || usuario === '')
                    ? 'border-red-600 bg-red-300 '
                    : ''
                }`}
              />
            </div>
          </div>
          <div>
            <div className="p-inputgroup">
              <span
                className={`p-inputgroup-addon ${
                  errorFrom && (clave?.length < 1 || clave === '')
                    ? 'border-red-600 bg-red-300'
                    : ''
                }`}
              >
                <FontAwesomeIcon icon={faKey} />
              </span>
              <InputText
                value={clave}
                placeholder="CONTRASEÑA"
                onChange={({ target: { value } }) => {
                  setClave(value)
                }}
                type="password"
                className={`${
                  errorFrom && (clave?.length < 1 || clave === '')
                    ? 'border-red-600 bg-red-300 '
                    : ''
                }`}
                onKeyDown={onEnter}
              />
            </div>
          </div>
          {token && (
            <div className="col-span-2">
              <div className="p-inputgroup">
                <span
                  className={`p-inputgroup-addon${
                    errorFrom && rol === null ? 'border-red-600 bg-red-300' : ''
                  }`}
                >
                  <FontAwesomeIcon icon={faUserGear} />
                </span>
                <Dropdown
                  value={rol}
                  options={data?.getRoles}
                  onChange={({ target: { value } }) => {
                    setRol(value)
                  }}
                  optionLabel="nb_rol"
                  optionValue="id_rol"
                  placeholder="Selecciona Rol"
                  className={`${
                    errorFrom && rol === null
                      ? 'border-red-600 bg-red-300 '
                      : ''
                  }`}
                />
              </div>
            </div>
          )}
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

import React, { useRef, useState, useEffect } from 'react'
import AppLayout from 'components/AppLayout'
import { useRouter } from 'next/router'
import { request } from 'graphql-request'
import GQLLogin from 'graphql/login'
import { Toast } from 'primereact/toast'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Card } from 'primereact/card'
import { Divider } from 'primereact/divider'
import CryptoJS from 'crypto-js'
import Image from 'next/image'
import imagenBienvenida from 'public/images/bienvenidae.png'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// import the icons you need
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons'

export default function Index() {
  const router = useRouter()
  const toast = useRef(null)
  const userData = { usuario: null, clave: null }
  const [inputLogin, setInputLogin] = useState(userData)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    sessionStorage.clear()
  }, [])

  const login = (variables) => {
    return request(
      process.env.NEXT_PUBLIC_URL_BACKEND,
      GQLLogin.LOGIN,
      variables
    )
  }

  const registrarse = () => {
    router.push('/usuarios/registrarUsuario')
  }

  const entrar = () => {
    if (inputLogin.usuario && inputLogin.clave) {
      inputLogin.clave = CryptoJS.AES.encrypt(
        inputLogin.clave,
        process.env.NEXT_PUBLIC_SECRET_KEY
      ).toString()

      login({ input: inputLogin }).then(({ login }) => {
        const loginJson = JSON.parse(
          CryptoJS.AES.decrypt(
            login,
            process.env.NEXT_PUBLIC_SECRET_KEY
          ).toString(CryptoJS.enc.Utf8)
        )

        const { status, message, type } = loginJson

        if (status === 200) {
          const {
            response: { token }
          } = loginJson

          setSubmitting(false)
          toast.current.show({
            severity: type,
            summary: 'Info',
            detail: message,
            life: 3000
          })
          sessionStorage.clear()
          sessionStorage.setItem('token', token)
          router.push('/inicio')
        } else {
          setSubmitting(false)
          toast.current.show({
            severity: type,
            summary: 'Error',
            detail: message,
            life: 2000
          })
          sessionStorage.clear()
          router.reload()
        }
      })
    } else {
      toast.current.show({
        severity: 'warn',
        summary: 'Atención!',
        detail: 'Debe llenar los campos Usuario y Contraseña',
        life: 3000
      })
    }
  }

  if (submitting) {
    return (
      <AppLayout verHeader={false}>
        <h6>Cargando</h6>
      </AppLayout>
    )
  }

  const onEnter = (e) => {
    if (e.keyCode === 13 || e.charCode === 13) {
      document.querySelector('#Entrar').click()
    }
  }

  return (
    <AppLayout marca={true} verFooter={true}>
      <Toast ref={toast} />
      <Card className="w-full h-[80vh] mx-auto text-center bg-[#ae8e8e] -mt-16">
        <div className="flex flex-row">
          <div className="basis-1/3 h-[70vh] mx-[3%]">
            <div className="grid grid-cols-1 content-center h-full">
              <div className="text-center">
                <h1 className="text-4xl font-extrabold text-white">
                  Inicio de Sesión
                </h1>
              </div>
              <div className="grid grid-cols-1 gap-4 w-full">
                <i className="fa-regular fa-user"></i>
                <div className="rounded-full">
                  <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                      <FontAwesomeIcon icon={faUser} />
                    </span>
                    <InputText
                      placeholder="USUARIO"
                      onChange={({ target: { value } }) => {
                        setInputLogin((ps) => ({
                          ...ps,
                          usuario: value
                        }))
                      }}
                    />
                  </div>
                </div>
                <div>
                  <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                      <FontAwesomeIcon icon={faKey} />
                    </span>
                    <InputText
                      placeholder="CONTRASEÑA"
                      onChange={({ target: { value } }) => {
                        setInputLogin((ps) => ({
                          ...ps,
                          clave: value
                        }))
                      }}
                      type="password"
                      onKeyPress={onEnter}
                    />
                  </div>
                </div>
                <div className="flex w-full justify-center">
                  <Button
                    id="Entrar"
                    className="rounded-full w-32 bg-[#4a9a66]"
                    label="Entrar"
                    onClick={entrar}
                  />
                  <Button
                    className="rounded-full w-32 bg-[#4a9a66] ml-2"
                    label="Registrarse"
                    onClick={registrarse}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="h-[70vh] basis-1/7 ml-10">
            <Divider layout="vertical" type="solid" />
          </div>
          <div className="h-[70vh] basis-1/2 flex justify-center">
            <div className="w-[94vh] h-[70vh] ml-[10%]">
              <Image
                src={imagenBienvenida}
                fill="true"
                alt="UNEARTE"
                loading="eager"
                priority={true}
              />
            </div>
          </div>
        </div>
      </Card>

      {/* eslint-disable-next-line react/no-unknown-property */}
      <style jsx global>{`
        .p-card-title {
          font-size: 3.75rem /* 60px */;
          line-height: 1;
          font-weight: 600;
          font-family: ui-sans-serif, system-ui, -apple-system,
            BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
            'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
            'Segoe UI Symbol', 'Noto Color Emoji';
          color: #ffffff;
        }
        .p-button:enabled:hover,
        .p-button:not(button):not(a):not(.p-disabled):hover {
          background: #88250e;
          color: #ffffff;
          border-color: transparent;
        }
        .p-button:enabled:active,
        .p-button:not(button):not(a):not(.p-disabled):active {
          background: rgb(204 57 23 / 75%);
        }
        .p-button:enabled:focus,
        .p-button:not(button):not(a):not(.p-disabled):focus {
          background: rgb(187 76 23 / 92%);
        }
        .p-divider.p-divider-vertical:before {
          border-left: 1px rgb(255 255 255);
          border-left-style: solid;
        }
      `}</style>
    </AppLayout>
  )
}

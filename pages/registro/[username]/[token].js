import AppLayout from 'components/AppLayout'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKey } from '@fortawesome/free-solid-svg-icons'
import CryptoJS from 'crypto-js'
import { useEffect, useRef, useState } from 'react'
import GQLusuarios from 'graphql/usuarios'
import request from 'graphql-request'
import { useRouter } from 'next/router'
import { Toast } from 'primereact/toast'
import { Password } from 'primereact/password'

const CrearClave = () => {
  const toast = useRef()
  const router = useRouter()
  const { username, token } = router.query
  const [habilitarBoton, setHabilitarBoton] = useState(false)
  const [clave, setClave] = useState('')
  const [claveConfir, setClaveConfir] = useState('')

  useEffect(() => {
    if (clave !== '' && clave.length < 6) {
      setHabilitarBoton(false)
    } else {
      setHabilitarBoton(true)
    }
    if (clave !== '' && claveConfir !== '' && clave !== claveConfir) {
      setHabilitarBoton(false)
    } else {
      setHabilitarBoton(true)
    }
    if (clave === '' || claveConfir === '') setHabilitarBoton(false)
  }, [clave, claveConfir])

  const onEnter = (e) => {
    if (e.keyCode === 13 || e.charCode === 13) {
      document.querySelector('#Regis').click()
    }
  }

  const crearClave = (variables) => {
    return request(
      process.env.NEXT_PUBLIC_URL_BACKEND,
      GQLusuarios.CREAR_CLAVE,
      variables
    )
  }

  const crear = () => {
    setHabilitarBoton(false)
    const input = { token, usuario: username }
    input.clave = CryptoJS.AES.encrypt(
      clave,
      process.env.NEXT_PUBLIC_SECRET_KEY
    ).toString()

    crearClave({ input }).then(({ crearClave: { status, message, type } }) => {
      toast.current.show({
        severity: type,
        summary: status === 200 ? 'Información' : 'Error',
        detail: message,
        life: 8000
      })
      setClave('')
      setClaveConfir('')
      setHabilitarBoton(true)
      if (status === 500) {
        setTimeout(() => router.push('/registro'), 8000)
      } else if (status === 200) {
        setTimeout(() => router.push('/'), 5000)
      }
    })
  }

  return (
    <AppLayout>
      <div className="p-card px-8 py-4 -mt-20 bg-[#ae8e8e] shadow-2xl border-[#F9FADC] border-2">
        <h6 className="text-center text-white mb-5 text-2xl font-bold">
          Registrar Clave
        </h6>
        <Toast ref={toast} />
        <div className="grid grid-cols-2 gap-4">
          <div className="p-inputgroup">
            <span
              className={`p-inputgroup-addon ${
                habilitarBoton && (clave?.length < 1 || clave === '')
                  ? 'border-red-600 bg-red-300'
                  : ''
              }`}
            >
              <FontAwesomeIcon icon={faKey} />
            </span>
            <Password
              value={clave}
              placeholder="CONTRASEÑA"
              onChange={({ target: { value } }) => {
                setClave(value)
              }}
              toggleMask
              weakLabel="Facil"
              mediumLabel="Media"
              strongLabel="Dificil"
              className={`${
                habilitarBoton && (clave?.length < 1 || clave === '')
                  ? 'border-red-600 bg-red-300 '
                  : ''
              }`}
            />
          </div>
          <div>
            <div className="p-inputgroup">
              <span
                className={`p-inputgroup-addon ${
                  habilitarBoton &&
                  (claveConfir?.length < 1 || claveConfir === '')
                    ? 'border-red-600 bg-red-300'
                    : ''
                }`}
              >
                <FontAwesomeIcon icon={faKey} />
              </span>
              <Password
                value={claveConfir}
                placeholder="CONFIRMAR CONTRASEÑA"
                onChange={({ target: { value } }) => {
                  setClaveConfir(value)
                }}
                feedback={false}
                className={`${
                  habilitarBoton &&
                  (claveConfir?.length < 1 || claveConfir === '')
                    ? 'border-red-600 bg-red-300 '
                    : ''
                }`}
                toggleMask
                onKeyDown={onEnter}
              />
            </div>
          </div>
          <div className="col-span-2 flex justify-center">
            <Button
              label="Registrar"
              id="Regis"
              onClick={crear}
              disabled={!habilitarBoton || clave.length < 6}
            />
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

export default CrearClave

import { useEffect, useState } from 'react'
import useSWR from 'swr'
import GQLLogin from 'graphql/login'
import CryptoJS from 'crypto-js'

export const useSesion = () => {
  const [token, setToken] = useState(null)
  const { data, error } = useSWR(token ? [GQLLogin.USER, {}, token] : null)
  const [usuario, setUsuario] = useState(null)

  useEffect(() => {
    setToken(sessionStorage.getItem('token'))
  }, [])

  useEffect(() => {
    if (data?.user) {
      const userJson = JSON.parse(
        CryptoJS.AES.decrypt(
          data.user,
          process.env.NEXT_PUBLIC_SECRET_KEY
        ).toString(CryptoJS.enc.Utf8)
      )
      setUsuario(userJson)
      sessionStorage.setItem('token', userJson.token)
      setToken(userJson.token)
    }
  }, [data])

  return {
    error,
    token,
    idUser: usuario?.id_usuario,
    userName: usuario?.user_name,
    statusUser: usuario?.bl_status,
    rolUser: usuario?.id_rol,
    nacionalidadUser: usuario?.nacionalidad,
    cedUsuario: usuario?.ced_usuario,
    nbUsuario: usuario?.nb_usuario,
    apUsuario: usuario?.ape_usuario
  }
}

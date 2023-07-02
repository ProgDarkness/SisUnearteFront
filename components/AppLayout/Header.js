import Image from 'next/image'
import styles from 'styles/Header.module.css'
/* import logo from 'public/Intranet2.0/LogoHeader.png'
import titulo from 'public/Intranet2.0/TituloHeader.png' */
import logo from 'public/images/logoUneartee.png'
import { useRouter } from 'next/router'
import { useSWRConfig } from 'swr'
import { Button } from 'primereact/button'
import { useState } from 'react'
import DialogCrudUser from 'pages/interfaz/crudUsuario'

export default function Header({ verMenu }) {
  const router = useRouter()
  const raiz = router.route
  const { cache } = useSWRConfig()
  const hoy = new Date()
  const [dialogUserCrud, setDialogUserCrud] = useState(false)

  const dias = [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado'
  ]
  const meses = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
  ]

  const Salir = (e) => {
    e.preventDefault()
    sessionStorage.clear()
    cache.clear()
    router.push('/')
  }

  return (
    <header id="header-principal" className={styles.header}>
      <DialogCrudUser active={dialogUserCrud} setActive={setDialogUserCrud} />
      <div className="w-full text-right">
        <span className="text-white mr-3 font-bold text-xs md:text-base">{`${
          dias[hoy.getDay()]
        } ${hoy.getDate()} de ${
          meses[hoy.getMonth()]
        } de ${hoy.getFullYear()}`}</span>
      </div>

      <div className="mx-3 text-center flex justify-start">
        <div className="inline-block w-[9.5rem] -mt-11 -ml-5">
          <Image src={logo} layout="responsive" alt="Logo" />
        </div>
      </div>

      {raiz !== '/' && (
        <div className="flex flex-row justify-end -mt-9 mr-2">
          <Button
            icon="pi pi-users"
            className="p-button-rounded p-button-warning "
            tooltip="Usuarios"
            tooltipOptions={{ position: 'left' }}
            onClick={() => setDialogUserCrud(true)}
          />
          <Button
            icon="pi pi-sign-out"
            className="p-button-rounded p-button-danger ml-2"
            tooltip="Salir"
            onClick={(e) => Salir(e)}
            tooltipOptions={{ position: 'left' }}
          />
        </div>
      )}
    </header>
  )
}

import React from 'react'
import styles from 'styles/Footer.module.css'
/* import { Button } from 'primereact/button' */
/* import { useRouter } from 'next/router' */

export default function Footer({ verFooter }) {
  /* const router = useRouter() */

  return (
    <footer
      className={`${styles.footer} text-center`}
      style={verFooter ? { display: 'block' } : { display: 'none' }}
    >
      {/* <div className="w-full flex justify-start p-3 -mt-5">
        <Button label="Ver Ejemplos" onClick={() => router.push('/ejemplos')} />
      </div> */}
    </footer>
  )
}

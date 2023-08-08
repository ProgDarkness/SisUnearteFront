import { useState } from 'react'
import RegistroCarrera from 'pages/componentesCargaOferta/registroCarrera'
import CargarOferta from 'pages/componentesCargaOferta/cargarOferta'

const CargaOfertaAcademica = () => {
  const vistas = {
    cargarOferta: true,
    registrarCarrera: false
  }

  const [vistasInternas, setVistasInternas] = useState(vistas)

  return (
    <>
      {vistasInternas?.cargarOferta && (
        <CargarOferta cambioVista={setVistasInternas} />
      )}
      {vistasInternas?.registrarCarrera && (
        <RegistroCarrera cambioVista={setVistasInternas} />
      )}
      {/*  eslint-disable-next-line react/no-unknown-property */}
      <style jsx global>{`
        .p-datatable .p-datatable-thead > tr > th {
          text-align: left;
          padding: 0.75rem 0.75rem;
          border: 1px solid #e4e4e4;
          border-width: 0 0 1px 0;
          font-weight: 500;
          color: rgb(255 255 255);
          background: #ae8e8e;
          transition: none;
        }

        .p-datatable .p-datatable-tbody > tr {
          background: #ae8e8e;
          color: rgb(255 255 255 / 92%);
          transition: none;
        }

        .p-dialog .p-dialog-content {
          background: #ae8e8e;
          color: rgb(255 255 255 / 87%);
          padding: 0 1.25rem 1.25rem 1.25rem;
        }

        .p-dialog .p-dialog-header {
          border-bottom: 0 none;
          background: #ae8e8e;
          color: rgb(255 254 254 / 87%);
          padding: 1.25rem;
          border-top-right-radius: 4px;
          border-top-left-radius: 4px;
        }

        .p-float-label input:focus ~ label,
        .p-float-label .p-inputwrapper-focus ~ label {
          color: #ffffff;
        }

        .p-float-label input:focus ~ label,
        .p-float-label input.p-filled ~ label,
        .p-float-label textarea:focus ~ label,
        .p-float-label textarea.p-filled ~ label,
        .p-float-label .p-inputwrapper-focus ~ label,
        .p-float-label .p-inputwrapper-filled ~ label {
          top: -0.5rem !important;
          border-radius: 1rem;
          background-color: #3f51b5;
          padding: 2px 4px;
          margin-left: -4px;
          margin-top: 0;
        }

        .p-float-label input:focus ~ label,
        .p-float-label input.p-filled ~ label,
        .p-float-label textarea:focus ~ label,
        .p-float-label textarea.p-filled ~ label,
        .p-float-label .p-inputwrapper-focus ~ label,
        .p-float-label .p-inputwrapper-filled ~ label {
          top: -0.5rem !important;
          -webkit-border-radius: 1rem;
          -moz-border-radius: 1rem;
          border-radius: 1rem;
          background-color: #3f51b5;
          padding: 2px 4px;
          margin-left: -4px;
          margin-top: 0;
          color: white;
        }

        .p-divider.p-divider-horizontal:before {
          border-top: solid 1px rgb(255 255 255);
        }
      `}</style>
    </>
  )
}

export default CargaOfertaAcademica

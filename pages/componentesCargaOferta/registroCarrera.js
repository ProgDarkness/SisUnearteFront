import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import React, { useState } from 'react'

const RegistroCarrera = ({ cambioVista }) => {
  const [products, setProducts] = useState([])
  const [dialogRegTrayecto, setDialogRegTrayecto] = useState(false)

  const headerTrayectos = () => {
    return (
      <div className="h-8 flex justify-end bg-[#ae8e8e]">
        <Button
          label="Registrar Materias"
          icon="pi pi-plus"
          className="mr-2"
          onClick={() => setDialogRegTrayecto(true)}
        />
        <Button
          label="Registrar Trayecto"
          icon="pi pi-plus"
          onClick={() => setDialogRegTrayecto(true)}
        />
      </div>
    )
  }

  return (
    <div className="grid grid-cols-5 gap-4 m-2 -mt-2">
      <Dialog
        visible={dialogRegTrayecto}
        onHide={() => setDialogRegTrayecto(false)}
        header="Trayectos"
        resizable={false}
        draggable={false}
      >
        <div className="grid grid-cols-3 gap-4 m-2">
          <span className="p-float-label field">
            <InputText
              className="w-full"
              id="cod_carrera"
              /* value={datosEstudiante?.cedula} */
              autoComplete="off"
            />
            <label htmlFor="cod_carrera">Nombre de Trayecto</label>
          </span>
          <span className="p-float-label field">
            <InputText
              className="w-full"
              id="cod_carrera"
              /* value={datosEstudiante?.cedula} */
              autoComplete="off"
            />
            <label htmlFor="cod_carrera">Nombre de Semestre</label>
          </span>
          <Button
            label="Registrar"
            icon="pi pi-plus"
            onClick={() => setDialogRegTrayecto(false)}
          />
        </div>
      </Dialog>
      <div className="col-span-5 flex justify-between">
        <div />
        <h1 className="text-3xl font-semibold text-white">Nueva Carrera</h1>
        <Button
          label="Volver"
          onClick={() => {
            const newVistas = {
              [`cargarOferta`]: true
            }
            cambioVista((prevState) => ({
              ...prevState,
              ...newVistas,
              ...Object.keys(prevState).reduce((acc, key) => {
                if (key !== 'cargarOferta') acc[key] = false
                return acc
              }, {})
            }))
          }}
        />
      </div>
      <span className="p-float-label field">
        <InputText
          className="w-full"
          id="cod_carrera"
          /* value={datosEstudiante?.cedula} */
          autoComplete="off"
        />
        <label htmlFor="cod_carrera">Código de Carrera</label>
      </span>
      <span className="p-float-label field">
        <InputText
          className="w-full"
          id="nb_carrera"
          /* value={datosEstudiante?.cedula} */
          autoComplete="off"
        />
        <label htmlFor="nb_carrera">Nombre de la Carrera</label>
      </span>
      <span className="p-float-label field">
        <InputText
          className="w-full"
          id="tp_carrera"
          /* value={datosEstudiante?.cedula} */
          autoComplete="off"
        />
        <label htmlFor="tp_carrera">Tipo de Carrera</label>
      </span>
      <span className="p-float-label field">
        <InputText
          className="w-full"
          id="tp_ciclos"
          /* value={datosEstudiante?.cedula} */
          autoComplete="off"
        />
        <label htmlFor="tp_ciclos">Tipo de Ciclos</label>
      </span>
      <div className="col-span-5">
        <DataTable value={products} header={headerTrayectos}>
          <Column field="code" header="Nombre de Trayecto" />
          <Column field="name" header="Nombre Semestre" />
          <Column />
        </DataTable>
      </div>

      {/*  eslint-disable-next-line react/no-unknown-property */}
      <style jsx global>{`
        .p-datatable .p-datatable-header {
          background: #ae8e8e;
          color: rgba(0, 0, 0, 0.87);
          border: 1px solid #cbcbcb;
          border-width: 0 0 1px 0;
          padding: 0.75rem 0.75rem;
          font-weight: 500;
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
    </div>
  )
}

export default RegistroCarrera

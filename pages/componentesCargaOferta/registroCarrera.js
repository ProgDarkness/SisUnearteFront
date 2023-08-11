import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import React, { useEffect, useState } from 'react'

const RegistroCarrera = ({ cambioVista }) => {
  const [products, setProducts] = useState([])
  const [dialogRegTrayecto, setDialogRegTrayecto] = useState(false)

  useEffect(() => {
    setProducts([])
  }, [])

  const HeaderTrayectos = () => {
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
        <HeaderTrayectos />
        <DataTable
          value={products}
          emptyMessage="No se encuentran trayectos registrados."
        >
          <Column field="code" header="Nombre de Trayecto" />
          <Column field="name" header="Nombre Semestre" />
          <Column />
        </DataTable>
      </div>
    </div>
  )
}

export default RegistroCarrera

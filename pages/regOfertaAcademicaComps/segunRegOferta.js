import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import React, { useEffect, useState } from 'react'
import DialogVerRegOferta from './segunDialogVerRegOferta'
import DialogEditarRegOferta from './segunDialogEditarRegOferta'
import { ConfirmDialog } from 'primereact/confirmdialog'
import DialogRegOferta from './segunDialogRegOferta'

const RegistroOferta = ({ cambioVista }) => {
  const [carreras, setCarreras] = useState([])
  const [dialogVerCarrera, setDialogVerCarrera] = useState(false)
  const [datosVerCarrera, setDatosVerCarrera] = useState(null)
  const [dialogEditarCarrera, setDialogEditarCarrera] = useState(false)
  const [datosEditarCarrera, setDatosEditarCarrera] = useState(null)
  const [dialogRegOferta, setDialogRegOferta] = useState(false)
  const [dialogConfirmElminarOferta, setDialogConfirmElminarOferta] =
    useState(false)

  useEffect(() => {
    setCarreras([
      {
        cod_oferta: 'OF-ART-20',
        cod_carrera: 'ART20-1',
        nb_carrera: 'Arte',
        tp_carrera: 'Pre-Grado',
        tp_ciclo: 'Anual'
      }
    ])
  }, [])

  const acceptEliminarOferta = () => {
    console.log('SI')
  }

  const rejectEliminarOferta = () => {
    console.log('NO')
  }

  const HeaderTrayectos = () => {
    return (
      <div className="h-8 flex justify-end bg-[#ae8e8e] mt-3">
        <Button
          label="Registrar Oferta"
          icon="pi pi-plus"
          className="mr-2"
          onClick={() => setDialogRegOferta(true)}
        />
      </div>
    )
  }

  const accionBodyTemplate = (rowData) => {
    return (
      <div className="flex justify-center">
        <Button
          icon="pi pi-search"
          className="p-button-info mr-1"
          tooltip="Ver"
          tooltipOptions={{ position: 'top' }}
          onClick={() => {
            setDatosVerCarrera(rowData)
            setDialogVerCarrera(true)
          }}
        />
        <Button
          icon="pi pi-pencil"
          className="p-button-help mr-1"
          tooltip="Modificar"
          onClick={() => {
            setDatosEditarCarrera(rowData)
            setDialogEditarCarrera(true)
          }}
          tooltipOptions={{ position: 'top' }}
        />
        <Button
          icon="pi pi-times"
          className="p-button-danger"
          tooltip="Eliminar"
          tooltipOptions={{ position: 'top' }}
          onClick={() => setDialogConfirmElminarOferta(true)}
        />
      </div>
    )
  }

  return (
    <>
      <DialogRegOferta
        dialogRegOferta={dialogRegOferta}
        setDialogRegOferta={setDialogRegOferta}
      />
      <ConfirmDialog
        visible={dialogConfirmElminarOferta}
        onHide={() => setDialogConfirmElminarOferta(false)}
        message="¿Esta seguro que desea eliminar la Oferta?"
        header="Confirmacion"
        icon="pi pi-exclamation-triangle"
        accept={acceptEliminarOferta}
        reject={rejectEliminarOferta}
        acceptLabel="SI"
        rejectLabel="NO"
      />
      <DialogVerRegOferta
        activeDialogVerCarrera={dialogVerCarrera}
        setActiveDialogVerCarrera={setDialogVerCarrera}
        datosVerCarrera={datosVerCarrera}
        setDatosVerCarrera={setDatosVerCarrera}
      />
      <DialogEditarRegOferta
        activeDialogEditarCarrera={dialogEditarCarrera}
        setActiveDialogEditarCarrera={setDialogEditarCarrera}
        datosEditarCarrera={datosEditarCarrera}
        setDatosEditarCarrera={setDatosEditarCarrera}
      />
      <div className="grid grid-cols-5 gap-4 m-2 -mt-2">
        <div className="col-span-5 flex justify-between">
          <div />
          <h1 className="text-3xl font-semibold text-white">
            Nueva Oferta Academica
          </h1>
          <Button
            label="Volver"
            onClick={() => {
              const newVistas = {
                [`ofertasAcademicas`]: true
              }
              cambioVista((prevState) => ({
                ...prevState,
                ...newVistas,
                ...Object.keys(prevState).reduce((acc, key) => {
                  if (key !== 'ofertasAcademicas') acc[key] = false
                  return acc
                }, {})
              }))
            }}
          />
        </div>
        <div className="col-span-5">
          <HeaderTrayectos />
          <DataTable
            value={carreras}
            emptyMessage="No se encuentran trayectos registrados."
          >
            <Column field="cod_oferta" header="Codigo de Oferta" />
            <Column field="cod_carrera" header="Codigo de Carrera" />
            <Column field="nb_carrera" header="Nombre de Carrera" />
            <Column field="tp_carrera" header="Tipo de Carrera" />
            <Column field="tp_ciclo" header="Tipo de Ciclo" />
            <Column body={accionBodyTemplate} />
          </DataTable>
        </div>
      </div>
    </>
  )
}

export default RegistroOferta

import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import React, { useEffect, useState } from 'react'
import DialogVerRegOferta from './dialogVerRegOferta'
import DialogEditarRegOferta from './dialogEditarRegOferta'
import { ConfirmDialog } from 'primereact/confirmdialog'

const RegistroOferta = ({ cambioVista }) => {
  const [carreras, setCarreras] = useState([])
  const [Ofertas, setOfertas] = useState([])
  const [dialogVerCarrera, setDialogVerCarrera] = useState(false)
  const [datosVerCarrera, setDatosVerCarrera] = useState(null)
  const [dialogEditarCarrera, setDialogEditarCarrera] = useState(false)
  const [datosEditarCarrera, setDatosEditarCarrera] = useState(null)
  const [dialogEditarOferta, setDialogEditarOferta] = useState(false)
  const [datosEditarOferta, setDatosEditarOferta] = useState(null)
  const [dialogRegOferta, setDialogRegOferta] = useState(false)
  const [dialogConfirmElminarCarrera, setDialogConfirmElminarCarrera] =
    useState(false)
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
    setOfertas([
      {
        carrera_Oferta: 'Arte',
        cod_Oferta: 'ACT20-1',
        nb_Oferta: 'Actuacion',
        tec_Oferta: 'Taller',
        cant_uni_cre: 12
      }
    ])
  }, [])

  const acceptElminarCarrera = () => {
    console.log('SI')
  }

  const rejectElminarCarrera = () => {
    console.log('NO')
  }

  const acceptEliminarOferta = () => {
    console.log('SI')
    setDialogRegOferta(true)
  }

  const rejectEliminarOferta = () => {
    console.log('NO')
    setDialogRegOferta(true)
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
          onClick={() => setDialogConfirmElminarCarrera(true)}
        />
      </div>
    )
  }

  const accionBodyTemplateOfertas = (rowData) => {
    return (
      <div className="flex justify-center">
        <Button
          icon="pi pi-pencil"
          className="p-button-help mr-1"
          tooltip="Modificar"
          onClick={() => {
            setDatosEditarOferta(rowData)
            setDialogRegOferta(false)
            setDialogEditarOferta(true)
          }}
          tooltipOptions={{ position: 'top' }}
        />
        <Button
          icon="pi pi-times"
          className="p-button-danger"
          tooltip="Eliminar"
          tooltipOptions={{ position: 'top' }}
          onClick={() => {
            setDialogRegOferta(false)
            setDialogConfirmElminarOferta(true)
          }}
        />
      </div>
    )
  }

  const DialogEditarOferta = () => {
    return (
      <Dialog
        visible={dialogEditarOferta}
        onHide={() => {
          setDialogEditarOferta(false)
          setDialogRegOferta(true)
        }}
        header="Modificar Oferta"
        resizable={false}
        draggable={false}
      >
        <div className="grid grid-cols-5 gap-4 m-2">
          <span className="p-float-label field">
            <InputText
              className="w-full"
              id="new_carrera_Oferta"
              value={datosEditarOferta?.carrera_Oferta}
              autoComplete="off"
            />
            <label htmlFor="new_carrera_Oferta">Carrera</label>
          </span>
          <span className="p-float-label field">
            <InputText
              className="w-full"
              id="new_cod_carrera"
              value={datosEditarOferta?.cod_Oferta}
              autoComplete="off"
            />
            <label htmlFor="new_cod_carrera">Codigo</label>
          </span>
          <span className="p-float-label field">
            <InputText
              className="w-full"
              id="new_nb_carrera"
              value={datosEditarOferta?.nb_Oferta}
              autoComplete="off"
            />
            <label htmlFor="new_nb_carrera">Oferta</label>
          </span>
          <span className="p-float-label field">
            <InputText
              className="w-full"
              id="new_tec_Oferta"
              value={datosEditarOferta?.tec_Oferta}
              autoComplete="off"
            />
            <label htmlFor="new_tec_Oferta">Tecnica</label>
          </span>
          <span className="p-float-label field">
            <InputText
              className="w-full"
              id="new_uni_cre_Oferta"
              value={datosEditarOferta?.cant_uni_cre}
              autoComplete="off"
            />
            <label htmlFor="new_uni_cre_Oferta">Unida de Credito</label>
          </span>
          <div className="col-span-5 flex justify-center">
            <Button
              label="Modificar"
              icon="pi pi-plus"
              onClick={() => {
                setDialogEditarOferta(false)
                setDialogRegOferta(true)
              }}
            />
          </div>
        </div>
      </Dialog>
    )
  }

  const DialogRegOferta = () => {
    return (
      <Dialog
        visible={dialogRegOferta}
        onHide={() => setDialogRegOferta(false)}
        header="Registro de la Oferta"
        resizable={false}
        draggable={false}
      >
        <div className="grid grid-cols-5 gap-4 m-2">
          <span className="p-float-label field">
            <InputText
              className="w-full"
              id="new_cod_carrera"
              /* value={datosEstudiante?.cedula} */
              autoComplete="off"
            />
            <label htmlFor="new_cod_carrera">Codigo de la Oferta</label>
          </span>
          <span className="p-float-label field">
            <InputText
              className="w-full"
              id="new_carrera_Oferta"
              /* value={datosEstudiante?.cedula} */
              autoComplete="off"
            />
            <label htmlFor="new_carrera_Oferta">Carrera de la Oferta</label>
          </span>
          <span className="p-float-label field">
            <InputText
              className="w-full"
              id="new_tec_carrera"
              /* value={datosEstudiante?.cedula} */
              autoComplete="off"
            />
            <label htmlFor="new_tec_carrera">Cant. Cupos</label>
          </span>
          <span className="p-float-label field">
            <InputText
              className="w-full"
              id="new_tec_carrera"
              /* value={datosEstudiante?.cedula} */
              autoComplete="off"
            />
            <label htmlFor="new_tec_carrera">Seccion</label>
          </span>
          <span className="p-float-label field">
            <InputText
              className="w-full"
              id="new_tec_carrera"
              /* value={datosEstudiante?.cedula} */
              autoComplete="off"
            />
            <label htmlFor="new_tec_carrera">Periodo</label>
          </span>
          <div>
            <Button
              label="Registrar"
              icon="pi pi-plus"
              onClick={() => setDialogRegOferta(false)}
            />
          </div>
        </div>
        <div className="col-span-5">
          <DataTable
            value={Ofertas}
            emptyMessage="No se encuentran Ofertas registradas."
          >
            <Column field="carrera_Oferta" header="Carrera" />
            <Column field="cod_Oferta" header="Codigo" />
            <Column field="nb_Oferta" header="Oferta" />
            <Column field="tec_Oferta" header="Tecnica" />
            <Column field="cant_uni_cre" header="Unidades de Credito" />
            <Column body={accionBodyTemplateOfertas} />
          </DataTable>
        </div>
      </Dialog>
    )
  }

  return (
    <div className="grid grid-cols-5 gap-4 m-2 -mt-2">
      <DialogRegOferta />
      <DialogEditarOferta />
      <ConfirmDialog
        visible={dialogConfirmElminarCarrera}
        onHide={() => setDialogConfirmElminarCarrera(false)}
        message="¿Esta seguro que desea eliminar la carrera?"
        header="Confirmacion"
        icon="pi pi-exclamation-triangle"
        accept={acceptElminarCarrera}
        reject={rejectElminarCarrera}
        acceptLabel="SI"
        rejectLabel="NO"
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
  )
}

export default RegistroOferta

import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import React, { useEffect, useState } from 'react'
import DialogVerCarrera from './dialogVerCarrera'
import DialogEditarCarrera from './dialogEditarCarrera'
import { ConfirmDialog } from 'primereact/confirmdialog'
import request from 'graphql-request'
import GQLregMallaCurricular from 'graphql/regMallaCurricular'

const RegistroCarrera = ({ cambioVista }) => {
  const [codCarrera, setCodCarrera] = useState('')
  const [nombCarrera, setNombCarrera] = useState('')
  const [tpCiclos, setTpCiclos] = useState(null)
  const [tituloCarrera, setTituloCarrera] = useState('')
  const [cantTrayectos, setCantTrayectos] = useState('')
  const [carreras, setCarreras] = useState([])
  const [materias, setMaterias] = useState([])
  const [dialogVerCarrera, setDialogVerCarrera] = useState(false)
  const [datosVerCarrera, setDatosVerCarrera] = useState(null)
  const [dialogEditarCarrera, setDialogEditarCarrera] = useState(false)
  const [datosEditarCarrera, setDatosEditarCarrera] = useState(null)
  const [dialogEditarMateria, setDialogEditarMateria] = useState(false)
  const [datosEditarMateria, setDatosEditarMateria] = useState(null)
  const [dialogRegMateria, setDialogRegMateria] = useState(false)
  const [dialogConfirmElminarCarrera, setDialogConfirmElminarCarrera] =
    useState(false)
  const [dialogConfirmElminarMateria, setDialogConfirmElminarMateria] =
    useState(false)

  const crearCarrera = (variables) => {
    return request(
      process.env.NEXT_PUBLIC_URL_BACKEND,
      GQLregMallaCurricular.SAVE_CARRERA,
      variables
    )
  }

  useEffect(() => {
    setCarreras([
      {
        cod_carrera: 'ART20-1',
        nb_carrera: 'Arte',
        tp_carrera: 'Pre-Grado',
        tp_ciclo: 'Anual'
      }
    ])
    setMaterias([
      {
        carrera_materia: 'Arte',
        cod_materia: 'ACT20-1',
        nb_materia: 'Actuacion',
        tec_materia: 'Taller',
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

  const acceptEliminarMateria = () => {
    console.log('SI')
    setDialogRegMateria(true)
  }

  const rejectEliminarMateria = () => {
    console.log('NO')
    setDialogRegMateria(true)
  }

  const HeaderTrayectos = () => {
    return (
      <div className="h-8 flex justify-end bg-[#ae8e8e] mt-3">
        <Button
          label="Registrar Materias"
          icon="pi pi-plus"
          className="mr-2"
          onClick={() => setDialogRegMateria(true)}
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

  const accionBodyTemplateMaterias = (rowData) => {
    return (
      <div className="flex justify-center">
        <Button
          icon="pi pi-pencil"
          className="p-button-help mr-1"
          tooltip="Modificar"
          onClick={() => {
            setDatosEditarMateria(rowData)
            setDialogRegMateria(false)
            setDialogEditarMateria(true)
          }}
          tooltipOptions={{ position: 'top' }}
        />
        <Button
          icon="pi pi-times"
          className="p-button-danger"
          tooltip="Eliminar"
          tooltipOptions={{ position: 'top' }}
          onClick={() => {
            setDialogRegMateria(false)
            setDialogConfirmElminarMateria(true)
          }}
        />
      </div>
    )
  }

  const DialogEditarMateria = () => {
    return (
      <Dialog
        visible={dialogEditarMateria}
        onHide={() => {
          setDialogEditarMateria(false)
          setDialogRegMateria(true)
        }}
        header="Modificar Materia"
        resizable={false}
        draggable={false}
      >
        <div className="grid grid-cols-5 gap-4 m-2">
          <span className="p-float-label field">
            <InputText
              className="w-full"
              id="new_carrera_materia"
              value={datosEditarMateria?.carrera_materia}
              autoComplete="off"
            />
            <label htmlFor="new_carrera_materia">Carrera</label>
          </span>
          <span className="p-float-label field">
            <InputText
              className="w-full"
              id="new_cod_carrera"
              value={datosEditarMateria?.cod_materia}
              autoComplete="off"
            />
            <label htmlFor="new_cod_carrera">Codigo</label>
          </span>
          <span className="p-float-label field">
            <InputText
              className="w-full"
              id="new_nb_carrera"
              value={datosEditarMateria?.nb_materia}
              autoComplete="off"
            />
            <label htmlFor="new_nb_carrera">Materia</label>
          </span>
          <span className="p-float-label field">
            <InputText
              className="w-full"
              id="new_tec_materia"
              value={datosEditarMateria?.tec_materia}
              autoComplete="off"
            />
            <label htmlFor="new_tec_materia">Tecnica</label>
          </span>
          <span className="p-float-label field">
            <InputText
              className="w-full"
              id="new_uni_cre_materia"
              value={datosEditarMateria?.cant_uni_cre}
              autoComplete="off"
            />
            <label htmlFor="new_uni_cre_materia">Unida de Credito</label>
          </span>
          <div className="col-span-5 flex justify-center">
            <Button
              label="Modificar"
              icon="pi pi-plus"
              onClick={() => {
                setDialogEditarMateria(false)
                setDialogRegMateria(true)
              }}
            />
          </div>
        </div>
      </Dialog>
    )
  }

  const DialogRegMateria = () => {
    return (
      <Dialog
        visible={dialogRegMateria}
        onHide={() => setDialogRegMateria(false)}
        header="Materias"
        resizable={false}
        draggable={false}
      >
        <div className="grid grid-cols-5 gap-4 m-2">
          <span className="p-float-label field">
            <InputText
              className="w-full"
              id="new_carrera_materia"
              /* value={datosEstudiante?.cedula} */
              autoComplete="off"
            />
            <label htmlFor="new_carrera_materia">Carrera de la Materia</label>
          </span>
          <span className="p-float-label field">
            <InputText
              className="w-full"
              id="new_cod_carrera"
              /* value={datosEstudiante?.cedula} */
              autoComplete="off"
            />
            <label htmlFor="new_cod_carrera">Codigo de la Materia</label>
          </span>
          <span className="p-float-label field">
            <InputText
              className="w-full"
              id="new_nb_carrera"
              /* value={datosEstudiante?.cedula} */
              autoComplete="off"
            />
            <label htmlFor="new_nb_carrera">Nombre de la Materia</label>
          </span>
          <span className="p-float-label field">
            <InputText
              className="w-full"
              id="new_tec_carrera"
              /* value={datosEstudiante?.cedula} */
              autoComplete="off"
            />
            <label htmlFor="new_tec_carrera">Tecnica de la Materia</label>
          </span>
          <span className="p-float-label field">
            <InputText
              className="w-full"
              id="new_uni_cre_carrera"
              /* value={datosEstudiante?.cedula} */
              autoComplete="off"
            />
            <label htmlFor="new_uni_cre_carrera">Unidades de Credito</label>
          </span>
          <div className="col-span-5 flex justify-center">
            <Button
              label="Registrar"
              icon="pi pi-plus"
              onClick={() => setDialogRegMateria(false)}
            />
          </div>
        </div>
        <div className="col-span-5">
          <DataTable
            value={materias}
            emptyMessage="No se encuentran materias registradas."
          >
            <Column field="carrera_materia" header="Carrera" />
            <Column field="cod_materia" header="Codigo" />
            <Column field="nb_materia" header="Materia" />
            <Column field="tec_materia" header="Tecnica" />
            <Column field="cant_uni_cre" header="Unidades de Credito" />
            <Column body={accionBodyTemplateMaterias} />
          </DataTable>
        </div>
      </Dialog>
    )
  }

  return (
    <div className="grid grid-cols-5 gap-4 m-2 -mt-2">
      <DialogRegMateria />
      <DialogEditarMateria />
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
        visible={dialogConfirmElminarMateria}
        onHide={() => setDialogConfirmElminarMateria(false)}
        message="¿Esta seguro que desea eliminar la materia?"
        header="Confirmacion"
        icon="pi pi-exclamation-triangle"
        accept={acceptEliminarMateria}
        reject={rejectEliminarMateria}
        acceptLabel="SI"
        rejectLabel="NO"
      />
      <DialogVerCarrera
        activeDialogVerCarrera={dialogVerCarrera}
        setActiveDialogVerCarrera={setDialogVerCarrera}
        datosVerCarrera={datosVerCarrera}
        setDatosVerCarrera={setDatosVerCarrera}
      />
      <DialogEditarCarrera
        activeDialogEditarCarrera={dialogEditarCarrera}
        setActiveDialogEditarCarrera={setDialogEditarCarrera}
        datosEditarCarrera={datosEditarCarrera}
        setDatosEditarCarrera={setDatosEditarCarrera}
      />
      <div className="col-span-5 flex justify-between">
        <div />
        <h1 className="text-3xl font-semibold text-white">Nueva Carrera</h1>
        <Button
          label="Volver"
          onClick={() => {
            const newVistas = {
              [`cargarMalla`]: true
            }
            cambioVista((prevState) => ({
              ...prevState,
              ...newVistas,
              ...Object.keys(prevState).reduce((acc, key) => {
                if (key !== 'cargarMalla') acc[key] = false
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
          value={codCarrera}
          onChange={(e) => setCodCarrera(e.target.value)}
          autoComplete="off"
        />
        <label htmlFor="cod_carrera">Código de Carrera</label>
      </span>
      <span className="p-float-label field">
        <InputText
          className="w-full"
          id="nb_carrera"
          value={nombCarrera}
          autoComplete="off"
        />
        <label htmlFor="nb_carrera">Nombre de la Carrera</label>
      </span>
      <span className="p-float-label field">
        <InputText
          className="w-full"
          id="tp_carrera"
          value={tituloCarrera}
          onChange={(e) => setTituloCarrera(e.target.value)}
          autoComplete="off"
        />
        <label htmlFor="tp_carrera">Titulo de Carrera</label>
      </span>
      <span className="p-float-label field">
        <InputText
          className="w-full"
          id="tp_ciclos"
          value={tpCiclos}
          onChange={(e) => setTpCiclos(e.target.value)}
          autoComplete="off"
        />
        <label htmlFor="tp_ciclos">Tipo de Ciclos</label>
      </span>
      <div>
        <Button
          icon="pi pi-plus"
          label="Registrar"
          /* onClick={() => {
              setDatosEditarMalla(rowData)
              setDialogEditarMalla(true)
            }} */
        />
      </div>
      <div className="col-span-5">
        <HeaderTrayectos />
        <DataTable
          value={carreras}
          emptyMessage="No se encuentran trayectos registrados."
        >
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

export default RegistroCarrera

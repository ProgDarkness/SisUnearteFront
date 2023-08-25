import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { InputText } from 'primereact/inputtext'
import React, { useRef, useState } from 'react'
import DialogVerCarrera from './dialogVerCarrera'
import DialogEditarCarrera from './dialogEditarCarrera'
import { ConfirmDialog } from 'primereact/confirmdialog'
import request from 'graphql-request'
import GQLregMallaCurricular from 'graphql/regMallaCurricular'
import GQLconsultasGenerales from 'graphql/consultasGenerales'
import { Toast } from 'primereact/toast'
import { Dropdown } from 'primereact/dropdown'
import useSWR from 'swr'
import DialogRegMateria from './dialogCrearMateria'

const RegistroCarrera = ({ cambioVista }) => {
  const toast = useRef(null)
  const [codCarrera, setCodCarrera] = useState('')
  const [sedeCarrera, setSedeCarrera] = useState(null)
  const [nombCarrera, setNombCarrera] = useState('')
  const [tpCiclos, setTpCiclos] = useState(null)
  const [tituloCarrera, setTituloCarrera] = useState('')
  const [cantTrayectos, setCantTrayectos] = useState('')
  const [tipoCarrera, setTipoCarrera] = useState(null)
  const [dialogVerCarrera, setDialogVerCarrera] = useState(false)
  const [datosVerCarrera, setDatosVerCarrera] = useState(null)
  const [dialogEditarCarrera, setDialogEditarCarrera] = useState(false)
  const [datosEditarCarrera, setDatosEditarCarrera] = useState(null)
  const [dialogRegMateria, setDialogRegMateria] = useState(false)
  const [dialogConfirmElminarCarrera, setDialogConfirmElminarCarrera] =
    useState(false)
  const [dataEliminarCarrera, setDataEliminarCarrera] = useState(null)
  const [dataAprobarCarrera, setDataAprobarCarrera] = useState(null)
  const [dialogConfirmAprobarCarrera, setDialogConfirmAprobarCarrera] =
    useState(false)

  const { data: tiposCarreras } = useSWR(GQLconsultasGenerales.GET_TIPO_CARRERA)
  const { data: tiposCiclos } = useSWR(GQLconsultasGenerales.GET_TIPO_CICLOS)
  const { data: tiposTitulo } = useSWR(GQLconsultasGenerales.GET_TIPO_TITULO)
  const { data: carreras, mutate } = useSWR(GQLregMallaCurricular.GET_CARRERAS)
  const { data: sedes } = useSWR(GQLconsultasGenerales.GET_SEDES)

  const crearCarrera = (variables) => {
    return request(
      process.env.NEXT_PUBLIC_URL_BACKEND,
      GQLregMallaCurricular.SAVE_CARRERA,
      variables
    )
  }
  const actualizarEstatusCarrera = (variables) => {
    return request(
      process.env.NEXT_PUBLIC_URL_BACKEND,
      GQLregMallaCurricular.ACTUALIZAR_ESTATUS_CARRERA,
      variables
    )
  }

  const acceptAprobarCarrera = () => {
    const InputEstatusCarrera = {
      estatus: 3,
      idcarrera: parseInt(dataAprobarCarrera?.id)
    }
    actualizarEstatusCarrera({ InputEstatusCarrera }).then(
      ({ actualizarEstatusCarrera: { status, message, type } }) => {
        toast.current.show({
          severity: type,
          summary: '¡ Atención !',
          detail: message
        })
        mutate()
      }
    )
  }

  const rejectAprobarCarrera = () => {
    setDialogConfirmAprobarCarrera(false)
  }

  const eliminarCarrera = (variables) => {
    return request(
      process.env.NEXT_PUBLIC_URL_BACKEND,
      GQLregMallaCurricular.DELETE_CARRERA,
      variables
    )
  }

  const registrarCarrera = () => {
    const InputCrearCarrera = {
      codigo: codCarrera,
      nombre: nombCarrera,
      tipo: parseInt(tipoCarrera),
      ciclo: parseInt(tpCiclos),
      titulo: parseInt(tituloCarrera),
      cantTrayectos: parseInt(cantTrayectos),
      sede: parseInt(sedeCarrera)
    }
    crearCarrera({ InputCrearCarrera }).then(
      ({ crearCarrera: { status, message, type } }) => {
        setCodCarrera('')
        setNombCarrera('')
        setTipoCarrera(null)
        setTpCiclos(null)
        setTituloCarrera('')
        setCantTrayectos(null)
        setSedeCarrera(null)
        toast.current.show({
          severity: type,
          summary: '¡ Atención !',
          detail: message
        })
        mutate()
      }
    )
  }

  const acceptElminarCarrera = () => {
    const InputEliminarCarrera = {
      idcarrera: parseInt(dataEliminarCarrera?.id)
    }
    eliminarCarrera({ InputEliminarCarrera }).then(
      ({ eliminarCarrera: { message } }) => {
        setDataEliminarCarrera(null)
        toast.current.show({
          severity: 'error',
          summary: '¡ Atención !',
          detail: message
        })
        mutate()
      }
    )
  }

  const rejectElminarCarrera = () => {
    setDialogConfirmElminarCarrera(false)
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
          onClick={() => {
            setDialogConfirmElminarCarrera(true)
            setDataEliminarCarrera(rowData)
          }}
        />
        <Button
          icon="pi pi-check"
          className="p-button-success ml-1"
          tooltip="Aprobar"
          tooltipOptions={{ position: 'top' }}
          onClick={() => {
            setDialogConfirmAprobarCarrera(true)
            setDataAprobarCarrera(rowData)
          }}
        />
      </div>
    )
  }

  return (
    <div className="grid grid-cols-5 gap-4 m-2 -mt-2">
      <Toast ref={toast} />
      <DialogRegMateria
        dialogRegMateria={dialogRegMateria}
        setDialogRegMateria={setDialogRegMateria}
        carreras={carreras}
      />
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
        visible={dialogConfirmAprobarCarrera}
        onHide={() => setDialogConfirmAprobarCarrera(false)}
        message="¿Esta seguro que desea aprobar la carrera?"
        header="Confirmacion"
        icon="pi pi-exclamation-triangle"
        accept={acceptAprobarCarrera}
        reject={rejectAprobarCarrera}
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
          onChange={(e) => setCodCarrera(e.target.value.toUpperCase())}
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
          onChange={(e) => setNombCarrera(e.target.value.toUpperCase())}
        />
        <label htmlFor="nb_carrera">Nombre de la Carrera</label>
      </span>
      <span className="p-float-label field">
        <Dropdown
          className="w-full"
          id="tp_carrera"
          options={tiposTitulo?.obtenerTipoTitulo.response}
          value={tituloCarrera}
          onChange={(e) => setTituloCarrera(e.value)}
          optionLabel="nombre"
          optionValue="id"
        />
        <label htmlFor="tp_carrera">Titulo de Carrera</label>
      </span>
      <span className="p-float-label field">
        <Dropdown
          className="w-full"
          id="tp_ciclos"
          value={tpCiclos}
          options={tiposCiclos?.obtenerCiclos.response}
          onChange={(e) => setTpCiclos(e.target.value)}
          optionLabel="nombre"
          optionValue="id"
        />
        <label htmlFor="tp_ciclos">Tipo de Ciclos</label>
      </span>
      <div>
        <Button
          icon="pi pi-plus"
          label="Registrar"
          onClick={registrarCarrera}
          disabled={
            !codCarrera ||
            !nombCarrera ||
            !tituloCarrera ||
            !tpCiclos ||
            !cantTrayectos ||
            !tipoCarrera ||
            !sedeCarrera
          }
        />
      </div>
      <span className="p-float-label field">
        <Dropdown
          className="w-full"
          id="cant_trayecto"
          value={cantTrayectos}
          onChange={(e) => setCantTrayectos(e.target.value)}
          optionLabel="label"
          optionValue="value"
          options={[
            { label: '1', value: 1 },
            { label: '2', value: 2 },
            { label: '3', value: 3 },
            { label: '4', value: 4 }
          ]}
        />
        <label htmlFor="cant_trayecto">Cantidad de trayectos</label>
      </span>
      <span className="p-float-label field">
        <Dropdown
          className="w-full"
          id="tp_carrera"
          value={tipoCarrera}
          onChange={(e) => setTipoCarrera(e.target.value)}
          options={tiposCarreras?.obtenerTipoCarrera.response}
          optionLabel="nombre"
          optionValue="id"
        />
        <label htmlFor="tp_carrera">Tipo de carrera</label>
      </span>
      <span className="p-float-label field">
        <Dropdown
          className="w-full"
          id="tp_carrera"
          value={sedeCarrera}
          onChange={(e) => setSedeCarrera(e.target.value)}
          options={sedes?.obtenerSedes.response}
          optionLabel="nombre"
          optionValue="id"
        />
        <label htmlFor="tp_carrera">Sede de la Carrera</label>
      </span>
      <div className="col-span-5">
        <HeaderTrayectos />
        <DataTable
          value={carreras?.obtenerTodasCarreras.response}
          emptyMessage="No se encuentran trayectos registrados."
        >
          <Column field="codigo" header="Codigo" />
          <Column field="nombre" header="Nombre" />
          <Column field="tipo" header="Tipo" />
          <Column field="ciclo" header="Tipo de Ciclo" />
          <Column field="titulo" header="Titulo" />
          <Column field="sede" header="Sede" />
          <Column body={accionBodyTemplate} />
        </DataTable>
      </div>
    </div>
  )
}

export default RegistroCarrera

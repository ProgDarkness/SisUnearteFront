import useSWR from 'swr'
import { Dialog } from 'primereact/dialog'
import { Dropdown } from 'primereact/dropdown'
import { useEffect, useRef, useState } from 'react'
import GQLregMallaCurricular from 'graphql/regMallaCurricular'
import GQLregOfertaAcademica from 'graphql/regOfertaAcademica'
import GQLelectivas from 'graphql/electivas'
import { Button } from 'primereact/button'
import request from 'graphql-request'
import { Toast } from 'primereact/toast'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { ConfirmDialog } from 'primereact/confirmdialog'

const DialogAsigElectiva = ({
  activeDialogAsigElectiva,
  setActiveDialogAsigElectiva
}) => {
  const toast = useRef(null)
  const [carrera, setCarrera] = useState(null)
  const [electiva, setElectiva] = useState(null)
  const [trayecto, setTrayecto] = useState(null)
  const [profesor, setProfesor] = useState(null)
  const [sede, setSede] = useState(null)
  const [
    dialogConfirmEliminarAsigElectiva,
    setDialogConfirmEliminarAsigElectiva
  ] = useState(false)
  const [datosEliminarAsigElec, setDatosEliminarAsigElec] = useState(null)

  const { data: carreras } = useSWR(
    [GQLregOfertaAcademica.OBTENER_OFERTAS, { idStatus: 1 }],
    { refreshInterval: 10000 }
  )

  const { data: electivasAsig, mutate } = useSWR(
    GQLelectivas.GET_ASIG_ELECTIVAS
  )

  const { data: electivas, mutate: mutateElect } = useSWR(
    GQLelectivas.GET_ELECTIVAS_DROPDOWN
  )

  const { data: trayectos } = useSWR([
    carrera ? GQLregMallaCurricular.GET_TRAYECTOS_POR_CARRERA : null,
    { carrera: parseInt(carrera) }
  ])

  const { data: profesores } = useSWR(GQLregOfertaAcademica.GET_PROFESORES)

  const { data: sedes } = useSWR(
    carrera
      ? [
          GQLregMallaCurricular.GET_SEDE_CARRERA_MATERIA,
          { carrera: parseInt(carrera) }
        ]
      : null
  )

  useEffect(() => {
    mutateElect()
  }, [activeDialogAsigElectiva])

  const asignarElectiva = (variables) => {
    return request(
      process.env.NEXT_PUBLIC_URL_BACKEND,
      GQLelectivas.ASIGNAR_ELECTIVA,
      variables
    )
  }

  const deleteAsignarElectiva = (variables) => {
    return request(
      process.env.NEXT_PUBLIC_URL_BACKEND,
      GQLelectivas.DELETE_ASIG_ELECTIVA,
      variables
    )
  }

  const eliminarAsignarElectiva = () => {
    deleteAsignarElectiva({
      idAsigElectiva: datosEliminarAsigElec?.id_carrelec
    }).then(({ deleteAsignarElectiva: { status, message, type } }) => {
      toast.current.show({
        severity: type,
        summary: '¡ Atención !',
        detail: message
      })
      mutate()
      setDatosEliminarAsigElec(null)
    })
  }

  const acceptEliminarAsigElectiva = () => {
    eliminarAsignarElectiva()
  }

  const rejectEliminarElectiva = () => {
    setDialogConfirmEliminarAsigElectiva(false)
  }

  const regAsigElectiva = () => {
    const inputAsigElectiva = {
      idCarrera: parseInt(carrera),
      idTrayecto: parseInt(trayecto),
      idElectiva: parseInt(electiva),
      idPersonal: parseInt(profesor),
      idSede: parseInt(sede)
    }

    asignarElectiva({ inputAsigElectiva }).then(
      ({ asignarElectiva: { status, message, type } }) => {
        toast.current.show({
          severity: type,
          summary: '¡ Atención !',
          detail: message
        })
        setCarrera(null)
        setElectiva(null)
        setTrayecto(null)
        setSede(null)
        setProfesor(null)
        mutate()
      }
    )
  }

  const accionBodyTemplate = (rowData) => {
    return (
      <div>
        <Button
          icon="pi pi-times"
          className="p-button-danger"
          onClick={() => {
            setDialogConfirmEliminarAsigElectiva(true)
            setDatosEliminarAsigElec(rowData)
          }}
        />
      </div>
    )
  }

  return (
    <>
      <Toast ref={toast} />
      <ConfirmDialog
        visible={dialogConfirmEliminarAsigElectiva}
        onHide={() => setDialogConfirmEliminarAsigElectiva(false)}
        message="¿Esta seguro que desea eliminar la electiva?"
        header="Confirmación"
        icon="pi pi-exclamation-triangle"
        accept={acceptEliminarAsigElectiva}
        reject={rejectEliminarElectiva}
        acceptLabel="SI"
        rejectLabel="NO"
      />
      <Dialog
        visible={activeDialogAsigElectiva}
        header="Asignar Electiva"
        onHide={() => {
          setActiveDialogAsigElectiva(false)
          setCarrera(null)
          setElectiva(null)
          setTrayecto(null)
        }}
        style={{ width: '70%' }}
      >
        <div className="grid grid-cols-3 gap-4 p-2">
          <span className="p-float-label field">
            <Dropdown
              className="w-full"
              id="electiva_carrera"
              value={carrera}
              onChange={(e) => setCarrera(e.value)}
              options={carreras?.obtenerOfertaAcademica.response}
              optionLabel="nb_carrera"
              optionValue="id_carrera"
            />
            <label htmlFor="electiva_carrera">Carrera</label>
          </span>
          <span className="p-float-label field">
            <Dropdown
              className="w-full"
              id="sede_carrera"
              value={sede}
              onChange={(e) => setSede(e.value)}
              options={sedes?.obtenerSedesPorCarrera.response}
              optionLabel="nombre"
              optionValue="id"
            />
            <label htmlFor="sede_carrera">Sede</label>
          </span>
          <span className="p-float-label field">
            <Dropdown
              className="w-full"
              id="electiva_trayecto"
              value={trayecto}
              onChange={(e) => setTrayecto(e.value)}
              options={trayectos?.obtenerTrayectosPorCarrera.response}
              optionLabel="nombre"
              optionValue="id"
            />
            <label htmlFor="electiva_trayecto">Trayecto</label>
          </span>
          <span className="p-float-label field">
            <Dropdown
              className="w-full"
              id="electiva"
              value={electiva}
              onChange={(e) => setElectiva(e.value)}
              options={electivas?.getTodasElectivasDropDown.response}
              optionLabel="nombre"
              optionValue="id"
            />
            <label htmlFor="electiva">Electiva</label>
          </span>
          <span className="p-float-label field">
            <Dropdown
              className="w-full"
              id="profesor"
              value={profesor}
              onChange={(e) => setProfesor(e.value)}
              options={profesores?.obtenerPersonalOferta.response}
              optionLabel="nombre"
              optionValue="id"
            />
            <label htmlFor="electiva">Profesor</label>
          </span>
          <div className="col-span-3 flex justify-center">
            <Button
              label="Asignar"
              icon="pi pi-plus"
              onClick={regAsigElectiva}
            />
          </div>
          <div className="col-span-3">
            <DataTable value={electivasAsig?.getElectivasAsignadas.response}>
              <Column field="nb_sede" header="Sede" />
              <Column field="nb_carrera" header="Carrera" />
              <Column field="nb_trayecto" header="Trayecto" />
              <Column field="nb_electiva" header="Electiva" />
              <Column field="nb_personal" header="Profesor" />
              <Column body={accionBodyTemplate} />
            </DataTable>
          </div>
        </div>
      </Dialog>
    </>
  )
}

export default DialogAsigElectiva

import { Dropdown } from 'primereact/dropdown'
import useSWR from 'swr'
import GQLconsultasGenerales from 'graphql/consultasGenerales'
import GQLregMallaCurricular from 'graphql/regMallaCurricular'
import { useEffect, useRef, useState } from 'react'
import { Button } from 'primereact/button'
import request from 'graphql-request'
import { Dialog } from 'primereact/dialog'
import { Toast } from 'primereact/toast'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import DialogRegistrarSede from './dialogRegistrarSede'

const DialogAsigSede = ({ dialogAsigSede, setDialogAsigSede }) => {
  const toast = useRef(null)
  const [sedeCarrera, setSedeCarrera] = useState(null)
  const [carrera, setCarrera] = useState(null)
  const { data: sedes } = useSWR(GQLconsultasGenerales.GET_SEDES)
  const { data: carreras, mutate: mutateCarreras } = useSWR(
    GQLconsultasGenerales.GET_CARRERAS
  )
  const { data: sedesCarreras, mutate } = useSWR(
    GQLregMallaCurricular.GET_SEDES_CARRERAS,
    { refreshInterval: 1000 }
  )
  const [dialogRegSede, setDialogRegSede] = useState(false)

  useEffect(() => {
    mutate()
    mutateCarreras()
  }, [dialogAsigSede])

  const asignarSede = (variables) => {
    return request(
      process.env.NEXT_PUBLIC_URL_BACKEND,
      GQLregMallaCurricular.ASIGNAR_SEDE_CARRERA,
      variables
    )
  }

  const eliminarSedeCarrera = (variables) => {
    return request(
      process.env.NEXT_PUBLIC_URL_BACKEND,
      GQLregMallaCurricular.ELIMINAR_SEDE_CARRERA,
      variables
    )
  }

  const registrarAsignarSede = () => {
    asignarSede({
      idCarrera: parseInt(carrera),
      idSede: parseInt(sedeCarrera)
    }).then(({ asignarSedeCarrera: { status, message, type } }) => {
      toast.current.show({
        severity: type,
        summary: '¡ Atención !',
        detail: message
      })
      setSedeCarrera(null)
      setCarrera(null)
      mutate()
    })
  }

  const eliminarSede = (rowData) => {
    eliminarSedeCarrera({
      idSedeCarrera: parseInt(rowData?.id_scarrera),
      idCarrera: parseInt(rowData?.id_carrera)
    }).then(({ eliminarSedeCarrera: { status, message, type } }) => {
      toast.current.show({
        severity: type,
        summary: '¡ Atención !',
        detail: message
      })
      mutate()
    })
  }

  const HeaderSedes = () => {
    return (
      <div className="h-8 flex justify-end bg-[#ae8e8e] mt-3">
        <Button
          label="Registrar Sedes"
          icon="pi pi-plus"
          className="mr-2"
          onClick={() => setDialogRegSede(true)}
        />
      </div>
    )
  }

  const accionBodyTemplate = (rowData) => {
    return (
      <div>
        <Button
          icon="pi pi-times"
          className="p-button-danger"
          tooltip="Eliminar"
          tooltipOptions={{ position: 'top' }}
          onClick={() => eliminarSede(rowData)}
        />
      </div>
    )
  }

  return (
    <>
      <DialogRegistrarSede
        dialogRegSede={dialogRegSede}
        setDialogRegSede={setDialogRegSede}
      />
      <Dialog
        visible={dialogAsigSede}
        onHide={() => {
          setDialogAsigSede(false)
        }}
        header="Asignar Sedes"
        resizable={false}
        draggable={false}
        style={{ width: '800px' }}
      >
        <Toast ref={toast} />
        <div className="grid grid-cols-3 gap-4 m-2">
          <span className="p-float-label field">
            <Dropdown
              className="w-full"
              id="tp_carrera"
              value={carrera}
              onChange={(e) => setCarrera(e.target.value)}
              options={carreras?.obtenerCarreras.response}
              optionLabel="nombre"
              optionValue="id"
            />
            <label htmlFor="tp_carrera">Carrera</label>
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
          <div className="my-auto">
            <Button
              icon="pi pi-plus"
              label="Asignar"
              onClick={registrarAsignarSede}
              disabled={!sedeCarrera || !carrera}
            />
          </div>
          <div className="col-span-3">
            <HeaderSedes />
            <DataTable value={sedesCarreras?.obtenerSedeCarreras}>
              <Column field="nb_carrera" header="Carrera" />
              <Column field="nb_sede" header="Sede" />
              <Column body={accionBodyTemplate} />
            </DataTable>
          </div>
        </div>
      </Dialog>
    </>
  )
}

export default DialogAsigSede

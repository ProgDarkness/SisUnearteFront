import { Button } from 'primereact/button'
import { useRef, useState } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Toast } from 'primereact/toast'
import { Divider } from 'primereact/divider'
import DialogVerInfoPostulacion from 'pages/postulacionEstudiante/dialogVerInfoPostulacion'
import GQLpostulaciones from 'graphql/postulaciones'
import { useSesion } from 'hooks/useSesion'
import { ConfirmDialog } from 'primereact/confirmdialog'
import useSWR from 'swr'
import request from 'graphql-request'

const Postulaciones = ({ cambioVista }) => {
  const [activeDialogVerMalla, setActiveDialogVerMalla] = useState(false)
  const [datosVerMalla, setDatosVerMalla] = useState(null)
  const [datosPostularse, setDatosPostularse] = useState(null)
  const [confirmPostulacion, setConfirmPostulacion] = useState(false)
  const { rolUser, idUser } = useSesion()
  const toast = useRef(null)
  const { data: carreraSedes } = useSWR(
    GQLpostulaciones.GET_OFERTAS_ACADEMICAS,
    { refreshInterval: 1000 }
  )
  const { data: infoPostuUsu, mutate } = useSWR(
    [idUser ? GQLpostulaciones.GET_POSTULACION_USUARIO : null, { idUser }],
    { refreshInterval: 1000 }
  )

  const crearPostulacion = (variables) => {
    return request(
      process.env.NEXT_PUBLIC_URL_BACKEND,
      GQLpostulaciones.SAVE_POSTULACION,
      variables
    )
  }

  const acceptPostu = () => {
    const InputPostulacion = {
      usuario: parseInt(idUser),
      carrera: parseInt(datosPostularse.id_carrera),
      sede: parseInt(datosPostularse.id_sede),
      fepostulacion: new Date().toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }),
      idOferta: datosPostularse?.id_oferta/* ,
      idSeccion: datosPostularse?.id_seccion */
    }

    crearPostulacion({ InputPostulacion }).then(
      ({ crearPostulacion: { status, message, type } }) => {
        toast.current.show({
          severity: type,
          summary: 'Info',
          detail: message,
          life: 3000
        })
        mutate()
      }
    )
  }
  const rechazarPostu = () => {
    setConfirmPostulacion(false)
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
            setDatosVerMalla(rowData)
            setActiveDialogVerMalla(true)
          }}
        />
        {rolUser === 3 && (
          <Button
            icon="pi pi-check"
            tooltip="Postularse"
            className="p-button-success"
            onClick={() => {
              setDatosPostularse(rowData)
              setConfirmPostulacion(true)
            }}
          />
        )}
      </div>
    )
  }
  return (
    <div className="flex flex-col">
      <Toast ref={toast} />
      <ConfirmDialog
        draggable={false}
        resizable={false}
        className="bg-[#805e5e]"
        visible={confirmPostulacion}
        acceptLabel="Si"
        rejectLabel="No"
        onHide={() => setConfirmPostulacion(false)}
        message="Estas seguro que deseas confirmar la postulación?"
        header="Confirmar"
        icon="pi pi-exclamation-triangle"
        accept={acceptPostu}
        reject={rechazarPostu}
      />

      <DialogVerInfoPostulacion
        setActiveDialogVerMalla={setActiveDialogVerMalla}
        activeDialogVerMalla={activeDialogVerMalla}
        datosVerMalla={datosVerMalla}
        setDatosVerMalla={setDatosVerMalla}
      />
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg background pt-5">
        <div className="w-full text-center col-span-5">
          <h1 className="text-3xl font-semibold text-white text-center mr-10 mb-0 -mt-0">
            Postulaciones Activas
          </h1>
        </div>
        <div className="col-span-5">
          <DataTable
            value={infoPostuUsu?.obtenerPostulacionUsuario.response}
            emptyMessage="No se encuentran trayectos registrados."
          >
            <Column field="periodo" header="Periodo" />
            <Column field="carrera" header="Carrera" />
            <Column field="sede" header="Sede" />
            <Column field="estatus" header="Estatus" />
          </DataTable>
        </div>
      </div>
      <Divider className="col-span-5" />
      <div>
        <div className="mt-3">
          <div className="w-full text-center col-span-5">
            <h1 className="text-3xl font-semibold text-white text-center mr-10 mb-0 -mt-0">
              Postularse
            </h1>
          </div>
          <div className="col-span-5">
            <DataTable
              value={carreraSedes?.obtenerOfertaPostu.response}
              emptyMessage="No hay carreras registradas."
              filterDisplay="row"
              id="filter"
            >
              <Column
                filter
                filterPlaceholder="Buscar"
                field="nb_sede"
                header="Sede"
              />
              <Column
                filter
                filterPlaceholder="Buscar"
                field="nb_carrera"
                header="Carrera"
              />
              <Column body={accionBodyTemplate} />
            </DataTable>
          </div>
        </div>
        {/* eslint-disable-next-line react/no-unknown-property */}
        <style jsx global>{`
          #filter .p-column-filter-menu-button,
          .p-column-filter-clear-button {
            display: none;
          }
        `}</style>
      </div>
    </div>
  )
}

export default Postulaciones

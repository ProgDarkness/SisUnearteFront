import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { ConfirmDialog } from 'primereact/confirmdialog'
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import GQLregMallaCurricular from 'graphql/regMallaCurricular'
import GQLregOfertaAcademica from 'graphql/regOfertaAcademica'
import { Dropdown } from 'primereact/dropdown'
/* import DialogCargarHorario from './segunDialogCagarHorario' */

const DialogRegOferta = ({ dialogRegOferta, setDialogRegOferta }) => {
  const [infoCarrera, setInfoCarrera] = useState(null)
  const [carreraOferta, setCarreraOferta] = useState(null)
  const [dialogConfirmElminarMateria, setDialogConfirmElminarMateria] =
    useState(false)
  const [dialogAgregarMateria, setDialogAgregarMateria] = useState(false)
  const [dialogAgregarprofesor, setDialogAgregarprofesor] = useState(false)
  /* const [activeDialogCargarHorario, setActiveDialogCargarHorario] =
    useState(false) */

  const { data: mallas } = useSWR(GQLregMallaCurricular.GET_MALLAS)
  const { data: detallesMallas } = useSWR(
    carreraOferta?.id
      ? [
          GQLregOfertaAcademica.DETALLES_MALLAS_CARRERA,
          { carrera: parseInt(carreraOferta?.id) }
        ]
      : null
  )

  console.log(detallesMallas?.obtenerDetalleMalla.response)

  const acceptEliminarMateria = () => {
    console.log('SI')
  }

  const rejectEliminarMateria = () => {
    console.log('NO')
  }

  useEffect(() => {
    setInfoCarrera([
      {
        trayecto: 'Trayecto 1',
        lapso: 'lapso 1',
        materia: 'Dibujo',
        profesor: 'Juan Manuel'
      },
      {
        trayecto: 'Trayecto 1',
        lapso: 'lapso 1',
        materia: 'Fotografia',
        profesor: 'Juan Manuel'
      },
      {
        trayecto: 'Trayecto 1',
        lapso: 'lapso 2',
        materia: 'Arte',
        profesor: 'Juan Manuel'
      },
      {
        trayecto: 'Trayecto 1',
        lapso: 'lapso 2',
        materia: 'Fotografia 2',
        profesor: 'Juan Manuel'
      },
      /* ------------------------------------ */
      {
        trayecto: 'Trayecto 2',
        lapso: 'lapso 1',
        materia: 'Dibujo',
        profesor: 'Juan Manuel'
      },
      {
        trayecto: 'Trayecto 2',
        lapso: 'lapso 2',
        materia: 'Arte',
        profesor: 'Juan Manuel'
      }
      /* ------------------------------------- */
    ])
  }, [])

  const DialogAgregarMateria = () => {
    return (
      <Dialog
        visible={dialogAgregarMateria}
        onHide={() => {
          setDialogAgregarMateria(false)
          setDialogRegOferta(true)
        }}
        header="Agregar Materia"
        resizable={false}
        draggable={false}
      >
        <div className="grid grid-cols-3 gap-4 m-2">
          <span className="p-float-label field">
            <InputText
              className="w-full"
              id="carrera_materia"
              /* value={datosEditarMateria?.carrera_materia} */
            />
            <label htmlFor="carrera_materia">Carrera</label>
          </span>
          <span className="p-float-label field">
            <InputText
              className="w-full"
              id="trayecto_materia"
              /* value={datosEditarMateria?.carrera_materia} */
              autoComplete="off"
            />
            <label htmlFor="trayecto_materia">Trayecto</label>
          </span>
          <span className="p-float-label field">
            <InputText
              className="w-full"
              id="nb_materia"
              /* value={datosEditarMateria?.carrera_materia} */
              autoComplete="off"
            />
            <label htmlFor="nb_materia">Nombre de la Materia</label>
          </span>
          <div className="my-auto col-span-3 flex justify-center">
            <Button
              label="Agregar"
              icon="pi pi-plus"
              onClick={() => {
                setDialogAgregarMateria(false)
                setDialogRegOferta(true)
              }}
            />
          </div>
        </div>
      </Dialog>
    )
  }

  const DialogAgregarProfesor = () => {
    return (
      <Dialog
        visible={dialogAgregarprofesor}
        onHide={() => {
          setDialogAgregarprofesor(false)
          setDialogRegOferta(true)
        }}
        header="Agregar profesor"
        resizable={false}
        draggable={false}
      >
        <div className="grid grid-cols-4 gap-4 m-2">
          <span className="p-float-label field">
            <InputText
              className="w-full"
              id="carrera_profesor"
              /* value={datosEditarprofesor?.carrera_profesor} */
              autoComplete="off"
            />
            <label htmlFor="carrera_profesor">Carrera</label>
          </span>
          <span className="p-float-label field">
            <InputText
              className="w-full"
              id="trayecto_profesor"
              /* value={datosEditarprofesor?.carrera_profesor} */
              autoComplete="off"
            />
            <label htmlFor="trayecto_profesor">Trayecto</label>
          </span>
          <span className="p-float-label field">
            <InputText
              className="w-full"
              id="nb_materia"
              /* value={datosEditarprofesor?.carrera_profesor} */
              autoComplete="off"
            />
            <label htmlFor="nb_materia">Materia</label>
          </span>
          <span className="p-float-label field">
            <InputText
              className="w-full"
              id="nb_profesor"
              /* value={datosEditarprofesor?.carrera_profesor} */
              autoComplete="off"
            />
            <label htmlFor="nb_profesor">Profesor</label>
          </span>
          <div className="my-auto col-span-4 flex justify-center">
            <Button
              label="Agregar"
              icon="pi pi-plus"
              onClick={() => {
                setDialogAgregarprofesor(false)
                setDialogRegOferta(true)
              }}
            />
          </div>
        </div>
      </Dialog>
    )
  }

  const actionBodyTemplateMateria = () => {
    return (
      <div className="flex justify-center">
        <Button
          tooltip="Asignar Profesor"
          icon="pi pi-plus"
          iconPos="left"
          className="p-button-info p-1"
          onClick={() => {
            setDialogAgregarprofesor(true)
          }}
        />
        <Button
          tooltip="Eliminar Materia"
          icon="pi pi-times"
          iconPos="left"
          className="p-button-danger p-1 ml-2"
          onClick={() => setDialogConfirmElminarMateria(true)}
        />
      </div>
    )
  }

  const actionBodyTemplate = () => {
    return (
      <div className="flex flex-col justify-center">
        {/* <Button
          label="Agregar Horario"
          icon="pi pi-plus"
          iconPos="left"
          className="p-button-info text-sm p-1"
          onClick={() => {
            setActiveDialogCargarHorario(true)
          }}
        /> */}
        <Button
          label="Agregar Materia"
          icon="pi pi-plus"
          iconPos="left"
          className="p-button-help text-sm p-1 mt-2"
          onClick={() => {
            setDialogAgregarMateria(true)
          }}
        />
      </div>
    )
  }

  return (
    <>
      <DialogAgregarMateria />
      <DialogAgregarProfesor />
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
      {/* <DialogCargarHorario
        activeDialogCargarHorario={activeDialogCargarHorario}
        setActiveDialogCargarHorario={setActiveDialogCargarHorario}
      /> */}

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
            <Dropdown
              className="w-full"
              id="new_carrera_Oferta"
              value={carreraOferta}
              options={mallas?.obtenerTodasMallas.response}
              onChange={(e) => setCarreraOferta(e.value)}
              optionLabel="nombre"
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
            <label htmlFor="new_tec_carrera">Periodo</label>
          </span>
          <div className="flex align-middle">
            <Button
              label="Registrar"
              icon="pi pi-plus"
              /* onClick={() => setDialogRegOferta(false)} */
            />
          </div>
        </div>
        <div className="col-span-5">
          <DataTable
            value={detallesMallas?.obtenerDetalleMalla.response}
            emptyMessage="No se encuentran trayectos registrados."
            rowGroupMode="rowspan"
            groupRowsBy={['nb_trayecto']}
          >
            <Column field="nb_trayecto" header="Trayectos" />
            <Column field="nb_materia" header="Materias" />
            <Column field="personal" header="Profesor" />
            <Column
              field="materia"
              body={actionBodyTemplateMateria}
              style={{ width: '8rem' }}
            />
            <Column
              field="trayecto"
              body={actionBodyTemplate}
              style={{ width: '8rem' }}
            />
          </DataTable>
        </div>
      </Dialog>
    </>
  )
}

export default DialogRegOferta

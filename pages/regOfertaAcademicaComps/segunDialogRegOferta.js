import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { ConfirmDialog } from 'primereact/confirmdialog'
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { useState } from 'react'
import useSWR from 'swr'
import GQLregMallaCurricular from 'graphql/regMallaCurricular'
import GQLregOfertaAcademica from 'graphql/regOfertaAcademica'
import { Dropdown } from 'primereact/dropdown'
/* import DialogCargarHorario from './segunDialogCagarHorario' */

const DialogRegOferta = ({ dialogRegOferta, setDialogRegOferta }) => {
  const [codOferta, setCodOferta] = useState('')
  const [cantidadCupos, setCantidadCupos] = useState('')
  const [carreraOferta, setCarreraOferta] = useState(null)
  const [periodoOfer, setPeriodoOfer] = useState(null)
  const [dataAsigProf, setDataAsigProf] = useState(null)
  const [dataAggMateria, setDataAggMateria] = useState(null)
  const [dataEliminarMateriaOfer, setDataEliminarMateriaOfer] = useState(null)
  const [dialogConfirmElminarMateria, setDialogConfirmElminarMateria] =
    useState(false)
  const [dialogAgregarMateria, setDialogAgregarMateria] = useState(false)
  const [dialogAgregarprofesor, setDialogAgregarprofesor] = useState(false)
  /* const [activeDialogCargarHorario, setActiveDialogCargarHorario] =
    useState(false) */

  /* 16883642 */

  const { data: mallas } = useSWR(GQLregMallaCurricular.GET_MALLAS)

  const { data: periodos } = useSWR(GQLregOfertaAcademica.GET_PERIODOS_OFER)

  const { data: detallesMallas } = useSWR(
    carreraOferta?.id
      ? [
          GQLregOfertaAcademica.DETALLES_MALLAS_CARRERA,
          { carrera: parseInt(carreraOferta?.id) }
        ]
      : null
  )

  const acceptEliminarMateria = () => {
    console.log('SI')
  }

  const rejectEliminarMateria = () => {
    setDataEliminarMateriaOfer(null)
  }

  const DialogAgregarMateria = () => {
    return (
      <Dialog
        visible={dialogAgregarMateria}
        onHide={() => {
          setDialogAgregarMateria(false)
          setDialogRegOferta(true)
          setDataAggMateria(null)
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
              value={carreraOferta?.nombre}
            />
            <label htmlFor="carrera_materia">Carrera</label>
          </span>
          <span className="p-float-label field">
            <InputText
              className="w-full"
              id="trayecto_materia"
              value={dataAggMateria?.nb_trayecto}
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
          setDataAsigProf(null)
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
              value={carreraOferta?.nombre}
              autoComplete="off"
            />
            <label htmlFor="carrera_profesor">Carrera</label>
          </span>
          <span className="p-float-label field">
            <InputText
              className="w-full"
              id="trayecto_profesor"
              value={dataAsigProf?.nb_trayecto}
              autoComplete="off"
            />
            <label htmlFor="trayecto_profesor">Trayecto</label>
          </span>
          <span className="p-float-label field">
            <InputText
              className="w-full"
              id="nb_materia"
              value={dataAsigProf?.nb_materia}
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

  const actionBodyTemplateMateria = (rowData) => {
    return (
      <div className="flex justify-center">
        <Button
          tooltip="Asignar Profesor"
          icon="pi pi-plus"
          iconPos="left"
          className="p-button-info p-1"
          onClick={() => {
            setDataAsigProf(rowData)
            setDialogAgregarprofesor(true)
          }}
        />
        <Button
          tooltip="Eliminar Materia"
          icon="pi pi-times"
          iconPos="left"
          className="p-button-danger p-1 ml-2"
          onClick={() => {
            setDataEliminarMateriaOfer(rowData)
            setDialogConfirmElminarMateria(true)
          }}
        />
      </div>
    )
  }

  const actionBodyTemplate = (rowData) => {
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
            setDataAggMateria(rowData)
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
              value={codOferta}
              onChange={(e) => setCodOferta(e.value)}
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
              value={cantidadCupos}
              onChange={(e) => setCantidadCupos(e.value)}
              autoComplete="off"
            />
            <label htmlFor="new_tec_carrera">Cant. Cupos</label>
          </span>
          <span className="p-float-label field">
            <Dropdown
              className="w-full"
              id="new_tec_carrera"
              options={periodos?.obtenerPeridosOferta.response}
              value={periodoOfer}
              onChange={(e) => setPeriodoOfer(e.value)}
              optionLabel="nombre"
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

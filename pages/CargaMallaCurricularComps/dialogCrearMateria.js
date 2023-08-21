import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog'
import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import { useEffect, useState } from 'react'
import GQLconsultasGenerales from 'graphql/consultasGenerales'
import GQLregMallaCurricular from 'graphql/regMallaCurricular'
import useSWR from 'swr'
import request from 'graphql-request'
import DialogEditarMateria from './dialogEditarMateria'
import { ConfirmDialog } from 'primereact/confirmdialog'

const DialogRegMateria = ({
  dialogRegMateria,
  setDialogRegMateria,
  carreras
}) => {
  const [idCarrera, setIdCarrera] = useState(null)
  const [codMateria, setCodMateria] = useState('')
  const [nombMateria, setNombMateria] = useState('')
  const [idTpMateria, setIdTpMateria] = useState(null)
  const [idSede, setIdSede] = useState(null)
  const [unCredito, setUnCredito] = useState('')
  const [horasSemanales, setHorasSemanales] = useState('')
  const [datosEditarMateria, setDatosEditarMateria] = useState(null)
  const [dialogEditarMateria, setDialogEditarMateria] = useState(false)
  const [dialogConfirmElminarMateria, setDialogConfirmElminarMateria] =
    useState(false)

  const { data: tpmateria } = useSWR(GQLconsultasGenerales.GET_TIPO_MATERIA)
  const { data: materias } = useSWR(GQLregMallaCurricular.GET_MATERIAS)
  console.log()
  const { data: sedeMateria } = useSWR(
    idCarrera
      ? [
          GQLregMallaCurricular.GET_SEDE_CARRERA_MATERIA,
          { carrera: parseInt(idCarrera) }
        ]
      : null
  )

  const crearMateria = (variables) => {
    return request(
      process.env.NEXT_PUBLIC_URL_BACKEND,
      GQLregMallaCurricular.SAVE_CARRERA,
      variables
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

  const acceptEliminarMateria = () => {
    console.log('SI')
    setDialogRegMateria(true)
  }

  const rejectEliminarMateria = () => {
    console.log('NO')
    setDialogRegMateria(true)
  }

  return (
    <>
      <DialogEditarMateria
        dialogEditarMateria={dialogEditarMateria}
        setDialogEditarMateria={setDialogEditarMateria}
        datosEditarMateria={datosEditarMateria}
        setDialogRegMateria={setDialogRegMateria}
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
      <Dialog
        visible={dialogRegMateria}
        onHide={() => setDialogRegMateria(false)}
        header="Materias"
        resizable={false}
        draggable={false}
      >
        <div className="grid grid-cols-5 gap-4 m-2">
          <span className="p-float-label field">
            <Dropdown
              className="w-full"
              id="new_carrera_materia"
              options={carreras?.obtenerTodasCarreras.response}
              onChange={(e) => setIdCarrera(e.value)}
              value={idCarrera}
              optionLabel="nombre"
              optionValue="id"
            />
            <label htmlFor="new_carrera_materia">Carrera de la Materia</label>
          </span>
          <span className="p-float-label field">
            <InputText
              className="w-full"
              id="new_cod_carrera"
              value={codMateria}
              onChange={(e) => setCodMateria(e.target.value)}
              autoComplete="off"
            />
            <label htmlFor="new_cod_carrera">Codigo de la Materia</label>
          </span>
          <span className="p-float-label field">
            <InputText
              className="w-full"
              id="new_nb_carrera"
              value={nombMateria}
              onChange={(e) => setNombMateria(e.target.value)}
              autoComplete="off"
            />
            <label htmlFor="new_nb_carrera">Nombre de la Materia</label>
          </span>
          <span className="p-float-label field">
            <Dropdown
              className="w-full"
              id="new_tec_carrera"
              options={tpmateria?.obtenerTipoMateria.response}
              optionLabel="nombre"
              optionValue="id"
              value={idTpMateria}
              onChange={(e) => setIdTpMateria(e.value)}
              autoComplete="off"
            />
            <label htmlFor="new_tec_carrera">Tecnica de la Materia</label>
          </span>
          <span className="p-float-label field">
            <InputText
              className="w-full"
              id="new_uni_cre_carrera"
              value={unCredito}
              onChange={(e) => setUnCredito(e.target.value)}
              autoComplete="off"
              keyfilter="pint"
              maxLength={2}
            />
            <label htmlFor="new_uni_cre_carrera">Unidades de Credito</label>
          </span>
          <span className="p-float-label field">
            <InputText
              className="w-full"
              id="new_uni_cre_carrera"
              value={horasSemanales}
              onChange={(e) => setHorasSemanales(e.target.value)}
              autoComplete="off"
              keyfilter="pint"
              maxLength={2}
            />
            <label htmlFor="new_uni_cre_carrera">Horas Semanales</label>
          </span>
          <span className="p-float-label field">
            <Dropdown
              className="w-full"
              id="new_sede_carrera"
              options={sedeMateria?.obtenerSedesPorCarrera.response}
              optionLabel="nombre"
              optionValue="id"
              value={idSede}
              onChange={(e) => setIdSede(e.value)}
              autoComplete="off"
            />
            <label htmlFor="new_sede_carrera">Sede</label>
          </span>
          <div className="flex">
            <Button
              label="Registrar"
              icon="pi pi-plus"
              onClick={() => setDialogRegMateria(false)}
              disabled={
                !idCarrera ||
                !codMateria ||
                !nombMateria ||
                !idTpMateria ||
                !unCredito ||
                !horasSemanales ||
                !idSede
              }
            />
          </div>
        </div>
        <div className="col-span-5">
          <DataTable
            value={materias?.obtenerTodasMaterias.response}
            emptyMessage="No se encuentran materias registradas."
          >
            <Column field="carrera_materia" header="Carrera" />
            <Column field="codigo" header="Codigo" />
            <Column field="nombre" header="Materia" />
            <Column field="tec_materia" header="Tecnica" />
            <Column field="credito" header="Unidades de Credito" />
            <Column field="hora" header="Horas Semanales" />
            <Column body={accionBodyTemplateMaterias} />
          </DataTable>
        </div>
      </Dialog>
    </>
  )
}

export default DialogRegMateria

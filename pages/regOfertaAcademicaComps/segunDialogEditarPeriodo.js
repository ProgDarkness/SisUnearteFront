import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'

const DialogEditarPeriodo = ({
  activeDialogEditarPeriodo,
  setActiveDialogEditarPeriodo,
  editarDatosPeriodo
}) => {
  return (
    <Dialog
      header="Editar Periodo"
      visible={activeDialogEditarPeriodo}
      onHide={() => setActiveDialogEditarPeriodo(false)}
      draggable={false}
      resizable={false}
    >
      <div className="grid grid-cols-8 gap-4 mt-3">
        <span className="p-float-label field">
          <InputText
            className="w-full"
            id="cod_periodo"
            /* value={datosEditarMateria?.carrera_materia} */
            autoComplete="off"
          />
          <label htmlFor="cod_periodo">Codigo Periodo</label>
        </span>
        <span className="p-float-label field">
          <InputText
            className="w-full"
            id="nb_periodo"
            /* value={datosEditarMateria?.carrera_materia} */
            autoComplete="off"
          />
          <label htmlFor="nb_periodo">Nombre Periodo</label>
        </span>
        <span className="p-float-label field">
          <InputText
            className="w-full"
            id="tp_periodo"
            /* value={datosEditarMateria?.carrera_materia} */
            autoComplete="off"
          />
          <label htmlFor="tp_periodo">Tipo Periodo</label>
        </span>
        <span className="p-float-label field">
          <InputText
            className="w-full"
            id="anio_periodo"
            /* value={datosEditarMateria?.carrera_materia} */
            autoComplete="off"
          />
          <label htmlFor="anio_periodo">Año del Periodo</label>
        </span>
        <span className="p-float-label field">
          <InputText
            className="w-full"
            id="mes_inicio"
            /* value={datosEditarMateria?.carrera_materia} */
            autoComplete="off"
          />
          <label htmlFor="mes_inicio">Mes de Inicio</label>
        </span>
        <span className="p-float-label field">
          <InputText
            className="w-full"
            id="mes_fin"
            /* value={datosEditarMateria?.carrera_materia} */
            autoComplete="off"
          />
          <label htmlFor="mes_fin">Mes de Finalizacion</label>
        </span>
        <span className="p-float-label field">
          <InputText
            className="w-full"
            id="num_semanas"
            /* value={datosEditarMateria?.carrera_materia} */
            autoComplete="off"
          />
          <label htmlFor="num_semanas">Numerto de Semanas</label>
        </span>
        <span className="p-float-label field">
          <InputText
            className="w-full"
            id="fe_incio"
            /* value={editarDatosPeriodo?.fei} */
            autoComplete="off"
          />
          <label htmlFor="fe_incio">Fecha de Inicio</label>
        </span>
        <span className="p-float-label field">
          <InputText
            className="w-full"
            id="fe_fin"
            /* value={datosEditarMateria?.carrera_materia} */
            autoComplete="off"
          />
          <label htmlFor="fe_fin">Fecha de Finalizacion</label>
        </span>
        <span className="p-float-label field">
          <InputText
            className="w-full"
            id="fe_entregaActa"
            /* value={datosEditarMateria?.carrera_materia} */
            autoComplete="off"
          />
          <label htmlFor="fe_entregaActa">Fecha de Entrega de Acta</label>
        </span>
        <span className="p-float-label field col-span-2">
          <InputText
            className="w-full"
            id="fe_soli_doc"
            /* value={datosEditarMateria?.carrera_materia} */
            autoComplete="off"
          />
          <label htmlFor="fe_soli_doc">Fecha de solicitud de documentos</label>
        </span>
        <span className="p-float-label field col-span-2">
          <InputText
            className="w-full"
            id="fe_soli_pre_grado"
            /* value={datosEditarMateria?.carrera_materia} */
            autoComplete="off"
          />
          <label htmlFor="fe_soli_pre_grado">
            Fecha de solicitud de pre-grado
          </label>
        </span>
        <span className="p-float-label field">
          <InputText
            className="w-full"
            id="fe_retiro"
            /* value={datosEditarMateria?.carrera_materia} */
            autoComplete="off"
          />
          <label htmlFor="fe_retiro">Fecha de retiro</label>
        </span>
        <span className="p-float-label field">
          <InputText
            className="w-full"
            id="fe_modificacion"
            /* value={datosEditarMateria?.carrera_materia} */
            autoComplete="off"
          />
          <label htmlFor="fe_modificacion">Fecha de modificacion</label>
        </span>
        <span className="p-float-label field col-span-2">
          <InputText
            className="w-full"
            id="fe_ini_pre_inscri"
            /* value={datosEditarMateria?.carrera_materia} */
            autoComplete="off"
          />
          <label htmlFor="fe_ini_pre_inscri">
            Fecha de Inicio de Preinscripciones
          </label>
        </span>
        <span className="p-float-label field col-span-2">
          <InputText
            className="w-full"
            id="fe_ini_inscri"
            /* value={datosEditarMateria?.carrera_materia} */
            autoComplete="off"
          />
          <label htmlFor="fe_ini_inscri">Fecha de Inicio de Inscripcion</label>
        </span>
        <span className="p-float-label field col-span-2">
          <InputText
            className="w-full"
            id="fe_fin_inscri"
            /* value={datosEditarMateria?.carrera_materia} */
            autoComplete="off"
          />
          <label htmlFor="fe_fin_inscri">
            Fecha de Finalizacion de Inscripcion
          </label>
        </span>
        <span className="p-float-label field">
          <InputText
            className="w-full"
            id="fe_ini_oferta"
            /* value={datosEditarMateria?.carrera_materia} */
            autoComplete="off"
          />
          <label htmlFor="fe_ini_oferta">Fecha de Inicio de Oferta</label>
        </span>
        <span className="p-float-label field">
          <InputText
            className="w-full"
            id="fe_fin_oferta"
            /* value={datosEditarMateria?.carrera_materia} */
            autoComplete="off"
          />
          <label htmlFor="fe_fin_oferta">Fecha de Fin de Oferta</label>
        </span>
        <span className="p-float-label field">
          <InputText
            className="w-full"
            id="fe_ini_retiro"
            /* value={datosEditarMateria?.carrera_materia} */
            autoComplete="off"
          />
          <label htmlFor="fe_ini_retiro">Fecha de Inicio de Retiro</label>
        </span>
        <span className="p-float-label field col-span-2">
          <InputText
            className="w-full"
            id="fe_fin_retiro"
            /* value={datosEditarMateria?.carrera_materia} */
            autoComplete="off"
          />
          <label htmlFor="fe_fin_retiro">Fecha de Finalizacion de Retiro</label>
        </span>
        <span className="p-float-label field">
          <InputText
            className="w-full"
            id="fe_ini_notas"
            /* value={datosEditarMateria?.carrera_materia} */
            autoComplete="off"
          />
          <label htmlFor="fe_ini_notas">Fecha de inicio de notas</label>
        </span>
        <span className="p-float-label field">
          <InputText
            className="w-full"
            id="fe_fin_notas"
            /* value={datosEditarMateria?.carrera_materia} */
            autoComplete="off"
          />
          <label htmlFor="fe_fin_notas">Fecha de fin de notas</label>
        </span>
        <span className="p-float-label field">
          <InputText
            className="w-full"
            id="estatus_periodo"
            /* value={datosEditarMateria?.carrera_materia} */
            autoComplete="off"
          />
          <label htmlFor="estatus_periodo">Estatus del periodo</label>
        </span>
        <div className="my-auto ">
          <Button
            label="Registrar"
            icon="pi pi-plus"
            /* onClick={() => {
                setDialogAgregarMateria(false)
                setDialogRegOferta(true)
              }} */
          />
        </div>
      </div>
    </Dialog>
  )
}

export default DialogEditarPeriodo

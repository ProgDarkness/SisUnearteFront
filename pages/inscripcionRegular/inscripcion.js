import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Divider } from 'primereact/divider'
import { InputText } from 'primereact/inputtext'

const InscripcionRegular = () => {
  const actionBodyTemplate = (/* rowData */) => {
    return (
      <div className="flex justify-center">
        <Button
          icon="pi pi-pencil"
          className="p-button-help mr-1"
          tooltip="Modificar"
          tooltipOptions={{ position: 'top' }}
          /*  onClick={() => {
            setDatosEditarElectiva(rowData)
            setActiveDialogEditarElectiva(true)
          }} */
        />
        <Button
          icon="pi pi-times"
          className="p-button-danger"
          tooltip="Eliminar"
          tooltipOptions={{ position: 'top' }}
          /*  onClick={() => {
            setDialogConfirmElminarElectiva(true)
            setDatosEliminarElectiva(rowData)
          }} */
        />
      </div>
    )
  }

  return (
    <div>
      <div>
        <div className="mt-3 grid grid-cols-3 gap-4">
          <div className="w-full text-center col-span-3">
            <h1 className="text-3xl font-semibold text-white text-center mr-10 mb-0 -mt-0">
              Inscripción Regular
            </h1>
          </div>
          <span className="p-float-label field">
            <InputText
              className="w-full"
              id="new_cod_carrera"
              /* value={codElectiva}
          onChange={(e) => setCodElectiva(e.target.value.toUpperCase())} */
              autoComplete="off"
            />
            <label htmlFor="new_cod_carrera">Periodo</label>
          </span>
          <span className="p-float-label field">
            <InputText
              className="w-full"
              id="new_nb_carrera"
              /* value={nombElectiva}
          onChange={(e) => setNombElectiva(e.target.value.toUpperCase())} */
              autoComplete="off"
            />
            <label htmlFor="new_nb_carrera">Carrera</label>
          </span>
          <span className="p-float-label field">
            <InputText
              className="w-full"
              id="new_uni_cre_carrera"
              /* value={unCredito} */
              /* onChange={(e) => setUnCredito(e.target.value)} */
              autoComplete="off"
              keyfilter="pint"
              maxLength={2}
            />
            <label htmlFor="new_uni_cre_carrera">Trayecto</label>
          </span>

          <div className="col-span-3">
            <DataTable
              /* value={carreraSedes?.obtenerOfertaPostu.response} */
              emptyMessage="No se encuentran materias registradas."
            >
              <Column field="periodo" header="Código" />
              <Column field="carrera" header="Materia" />
              <Column field="sede" header="Tipo" />
              <Column field="estatus" header="Crédito" />
              <Column field="estatus" header="Horas Semanales" />
              <Column body={actionBodyTemplate} />
            </DataTable>
          </div>
        </div>
        <Divider className="col-span-5" />
        <div className="col-span-5">
          <h1 className="text-3xl font-semibold text-white text-center mr-10 mb-0 -mt-0">
            Materias a Inscribir
          </h1>
          <div className="flex flex-row">
            <div className="basis-4/5">
              <DataTable
                /* value={infoPostuUsu?.obtenerPostulacionUsuario.response} */
                emptyMessage="No se encuentran materias registradas."
              >
                <Column field="periodo" header="Código" />
                <Column field="carrera" header="Materia" />
                <Column field="sede" header="Tipo" />
                <Column field="estatus" header="Crédito" />
                <Column field="estatus" header="Horas Semanales" />
              </DataTable>
            </div>
            <div className="basis-1/5 flex justify-center align-middle">
              <div className="my-auto">
                <Button
                  label="Confirmar"
                  icon="pi pi-plus"
                  /* onClick={regElectiva} */
                  disabled
                />
              </div>
            </div>
          </div>
        </div>

        {/* eslint-disable-next-line react/no-unknown-property */}
        <style jsx global>{`
            .p-disabled,
            .p-component:disabled {
              opacity: 0.9;
            }
          }
        `}</style>
      </div>
    </div>
  )
}

export default InscripcionRegular

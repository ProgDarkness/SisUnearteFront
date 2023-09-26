import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import { Divider } from 'primereact/divider'

const InscripcionElectiva = () => {
  return (
    <div className="grid grid-cols-5 gap-4 m-2 -mt-2">
      <div className="col-span-5 text-center">
        <h1 className="text-3xl font-semibold text-white">
          Inscripción de Materia Electiva
        </h1>
      </div>
      <span className="p-float-label field">
        <InputText
          className="w-full"
          id="carrera"
          /* value={datosEstudiante?.cedula} */
          autoComplete="off"
        />
        <label htmlFor="carrera">Carrera</label>
      </span>
      <span className="p-float-label field">
        <InputText
          className="w-full"
          id="trayecto"
          /* value={datosEstudiante?.trayecto} */
          autoComplete="off"
        />
        <label htmlFor="trayecto">Trayecto</label>
      </span>
      <span className="p-float-label field">
        <InputText
          className="w-full"
          id="periodo"
          /* value={datosEstudiante?.turno} */
          autoComplete="off"
        />
        <label htmlFor="periodo">Periodo</label>
      </span>
      <span className="p-float-label field">
        <Dropdown
          className="w-full"
          id="electiva"
          /* options={electivas} */
          /* value={datosEstudiante?.electiva} */
          onChange={(e) => {
            /* setDatosEstudiante({ ...datosEstudiante, electiva: e.value }) */
          }}
          optionLabel="name"
        />
        <label htmlFor="electiva">Seleccione la Electiva</label>
      </span>
      <div className="col-span-2" />
      {/* {datosEstudiante?.electiva?.name && ( */}
      <div className="grid grid-cols-5 gap-4 col-span-5">
        <Divider className="col-span-5" type="solid" />
        <div className="col-span-5">
          <h4 className="text-2xl font-semibold text-white">
            Información de la Electiva:{' '}
            {/* {datosEstudiante?.electiva?.name} */}
          </h4>
        </div>
        <span className="p-float-label field">
          <InputText
            className="w-full"
            id="codigo"
            /* value={datosEstudiante?.electiva?.dias} */
            autoComplete="off"
          />
          <label htmlFor="codigo">Código</label>
        </span>
        <span className="p-float-label field">
          <InputText
            className="w-full"
            id="trayecto"
            /* value={datosEstudiante?.electiva?.turno} */
            autoComplete="off"
          />
          <label htmlFor="trayecto">Electiva</label>
        </span>
        <span className="p-float-label field">
          <InputText
            className="w-full"
            id="NombresProfesor"
            /* value={datosEstudiante?.electiva?.profesor} */
            autoComplete="off"
          />
          <label htmlFor="NombresProfesor">Nombre del Profesor</label>
        </span>
        <span className="p-float-label field">
          <InputText
            className="w-full"
            id="trayecto"
            /* value={datosEstudiante?.electiva?.horas} */
            autoComplete="off"
          />
          <label htmlFor="trayecto">Horas</label>
        </span>
        <span className="p-float-label field">
          <InputText
            className="w-full"
            id="unidades"
            /* value={datosEstudiante?.electiva?.telefono} */
            autoComplete="off"
          />
          <label htmlFor="unidades">Unidades de Crédito</label>
        </span>
      </div>
      {/* )} */}
      {/*  eslint-disable-next-line react/no-unknown-property */}
      <style jsx global>{`
        .p-float-label input:focus ~ label,
        .p-float-label .p-inputwrapper-focus ~ label {
          color: #ffffff;
        }

        .p-float-label input:focus ~ label,
        .p-float-label input.p-filled ~ label,
        .p-float-label textarea:focus ~ label,
        .p-float-label textarea.p-filled ~ label,
        .p-float-label .p-inputwrapper-focus ~ label,
        .p-float-label .p-inputwrapper-filled ~ label {
          top: -0.5rem !important;
          border-radius: 1rem;
          background-color: #3f51b5;
          padding: 2px 4px;
          margin-left: -4px;
          margin-top: 0;
        }

        .p-float-label input:focus ~ label,
        .p-float-label input.p-filled ~ label,
        .p-float-label textarea:focus ~ label,
        .p-float-label textarea.p-filled ~ label,
        .p-float-label .p-inputwrapper-focus ~ label,
        .p-float-label .p-inputwrapper-filled ~ label {
          top: -0.5rem !important;
          -webkit-border-radius: 1rem;
          -moz-border-radius: 1rem;
          border-radius: 1rem;
          background-color: #3f51b5;
          padding: 2px 4px;
          margin-left: -4px;
          margin-top: 0;
          color: white;
        }

        .p-divider.p-divider-horizontal:before {
          border-top: solid 1px rgb(255 255 255);
        }
      `}</style>
    </div>
  )
}

export default InscripcionElectiva

import { InputText } from 'primereact/inputtext'
import { useEffect, useState } from 'react'
import { Dropdown } from 'primereact/dropdown'
import { Divider } from 'primereact/divider'

const InscripcionElectiva = () => {
  const [datosEstudiante, setDatosEstudiante] = useState({
    cedula: '',
    nombreCompleto: '',
    seccion: '',
    trayecto: '',
    turno: '',
    semestre: '',
    electiva: null
  })

  const electivas = [
    {
      code: 1,
      name: 'Estudios Ambientales',
      profesor: 'Gilberto Mares',
      dias: 'Lunes y Jueves',
      turno: 'Nocturno',
      horas: '8:00 - 9:00',
      correo: 'gmares@gmail.com',
      telefono: '0418674321'
    },
    {
      code: 2,
      name: 'Electrónica',
      profesor: 'Antonio Velazques',
      dias: 'Martes y Viernes',
      turno: 'Nocturno',
      horas: '8:00 - 9:00',
      correo: 'avelazques@gmail.com',
      telefono: '0418674321'
    },
    {
      code: 3,
      name: 'Ofimática',
      profesor: 'Jesus Perez',
      dias: 'Lunes y Jueves',
      turno: 'Nocturno',
      horas: '8:00 - 9:00',
      correo: 'jperez@gmail.com',
      telefono: '0418674321'
    },
    {
      code: 5,
      name: 'Computación',
      profesor: 'Maria Zambrano',
      dias: 'Jueves y Viernes',
      turno: 'Nocturno',
      horas: '8:00 - 9:00',
      correo: 'mzambrano@gmail.com',
      telefono: '0418674321'
    }
  ]

  useEffect(() => {
    setDatosEstudiante({
      ...datosEstudiante,
      cedula: '29377621',
      nombreCompleto: 'Daniel José Manzano Mejías',
      seccion: '30121',
      trayecto: '2',
      turno: 'Nocturno',
      semestre: '1'
    })
  }, [])

  return (
    <div className="grid grid-cols-5 gap-4 m-2 -mt-2">
      <div className="col-span-5 text-center">
        <h1 className="text-3xl font-semibold text-white">
          Inscripcion de Materia Electiva
        </h1>
      </div>
      <span className="p-float-label field">
        <InputText
          className="w-full"
          id="cedula"
          value={datosEstudiante?.cedula}
          autoComplete="off"
        />
        <label htmlFor="cedula">Cédula</label>
      </span>
      <span className="p-float-label field col-span-2">
        <InputText
          className="w-full"
          id="NombresApellidos"
          value={datosEstudiante?.nombreCompleto}
          autoComplete="off"
        />
        <label htmlFor="NombresApellidos">Nombres y Apellidos</label>
      </span>
      <span className="p-float-label field">
        <InputText
          className="w-full"
          id="seccion"
          value={datosEstudiante?.seccion}
          autoComplete="off"
        />
        <label htmlFor="seccion">Sección</label>
      </span>
      <span className="p-float-label field">
        <InputText
          className="w-full"
          id="trayecto"
          value={datosEstudiante?.trayecto}
          autoComplete="off"
        />
        <label htmlFor="trayecto">Trayecto</label>
      </span>
      <span className="p-float-label field">
        <InputText
          className="w-full"
          id="turno"
          value={datosEstudiante?.turno}
          autoComplete="off"
        />
        <label htmlFor="turno">Turno</label>
      </span>
      <span className="p-float-label field">
        <InputText
          className="w-full"
          id="semestre"
          value={datosEstudiante?.semestre}
          autoComplete="off"
        />
        <label htmlFor="semestre">Semestre</label>
      </span>
      <span className="p-float-label field">
        <Dropdown
          className="w-full"
          id="electiva"
          options={electivas}
          value={datosEstudiante?.electiva}
          onChange={(e) => {
            setDatosEstudiante({ ...datosEstudiante, electiva: e.value })
          }}
          optionLabel="name"
        />
        <label htmlFor="electiva">Seleccione la Electiva</label>
      </span>
      <div className="col-span-2" />
      {datosEstudiante?.electiva?.name && (
        <div className="grid grid-cols-5 gap-4 col-span-5">
          <Divider className="col-span-5" type="solid" />
          <div className="col-span-5">
            <h4 className="text-2xl font-semibold text-white">
              Información de la Electiva: {datosEstudiante?.electiva?.name}
            </h4>
          </div>
          <span className="p-float-label field">
            <InputText
              className="w-full"
              id="NombresApellidos"
              value={datosEstudiante?.electiva?.profesor}
              autoComplete="off"
            />
            <label htmlFor="NombresApellidos">Nombre del Profesor</label>
          </span>
          <span className="p-float-label field">
            <InputText
              className="w-full"
              id="trayecto"
              value={datosEstudiante?.electiva?.dias}
              autoComplete="off"
            />
            <label htmlFor="trayecto">Dias</label>
          </span>
          <span className="p-float-label field">
            <InputText
              className="w-full"
              id="trayecto"
              value={datosEstudiante?.electiva?.turno}
              autoComplete="off"
            />
            <label htmlFor="trayecto">Turno</label>
          </span>
          <span className="p-float-label field">
            <InputText
              className="w-full"
              id="trayecto"
              value={datosEstudiante?.electiva?.horas}
              autoComplete="off"
            />
            <label htmlFor="trayecto">Horas</label>
          </span>
          <span className="p-float-label field">
            <InputText
              className="w-full"
              id="trayecto"
              value={datosEstudiante?.electiva?.correo}
              autoComplete="off"
            />
            <label htmlFor="trayecto">Correo</label>
          </span>
          <span className="p-float-label field">
            <InputText
              className="w-full"
              id="trayecto"
              value={datosEstudiante?.electiva?.telefono}
              autoComplete="off"
            />
            <label htmlFor="trayecto">Telefono</label>
          </span>
        </div>
      )}
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

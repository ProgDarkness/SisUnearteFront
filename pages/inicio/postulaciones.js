import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import { Button } from 'primereact/button'
import { useEffect, useState } from 'react'

const Postulaciones = () => {
  const [nacionalidad, setNacionalidad] = useState(null)
  const [cedula, setCedula] = useState('')

  useEffect(() => {
    setNacionalidad({ name: 'V' })
    setCedula('12586742')
  }, [])

  const optionsNacionalidad = [{ name: 'V' }, { name: 'E' }]

  return (
    <div className="grid grid-cols-5 gap-4 m-2 -mt-2">
      <div className="col-span-5 text-center">
        <h1 className="text-3xl font-semibold text-white">Postulaciones</h1>
      </div>
      <span className="p-float-label field">
        <Dropdown
          className="w-full"
          id="nacionalidad"
          options={optionsNacionalidad}
          value={nacionalidad}
          onChange={(e) => {
            setNacionalidad(e.value)
          }}
          optionLabel="name"
        />
        <label htmlFor="nacionalidad">Nacionalidad</label>
      </span>

      <span className="p-float-label field">
        <InputText
          className="w-full"
          id="cedula"
          value={cedula}
          onChange={(e) => setCedula(e.target.value)}
          autoComplete="off"
        />
        <label htmlFor="cedula">Cédula</label>
      </span>
      <span className="p-float-label field">
        <InputText
          className="w-full"
          id="nombre"
          /* value={} */
          autoComplete="off"
        />
        <label htmlFor="nombre">Nombre</label>
      </span>
      <span className="p-float-label field">
        <InputText
          className="w-full"
          id="segundo_Nombre"
          /* value={} */
          autoComplete="off"
        />
        <label htmlFor="segundo_Nombre">Segundo Nombre</label>
      </span>
      <span className="p-float-label field">
        <InputText
          className="w-full"
          id="apellido"
          /* value={} */
          autoComplete="off"
        />
        <label htmlFor="apellido">Apellido</label>
      </span>
      <span className="p-float-label field">
        <InputText
          className="w-full"
          id="segundo_Apellido"
          /* value={} */
          autoComplete="off"
        />
        <label htmlFor="segundo_Apellido">Segundo Apellido</label>
      </span>
      <span className="p-float-label field">
        <Dropdown
          className="w-full"
          id="sexo"
          /* options={} */
          /* value={} */
          /*  onChange={(e) => {
            setDatosEstudiante({ ...datosEstudiante, electiva: e.value })
          }} */
          optionLabel="name"
        />
        <label htmlFor="sexo">Sexo</label>
      </span>
      <span className="p-float-label field">
        <InputText
          className="w-full"
          id="fechanaci"
          /* value={} */
          autoComplete="off"
        />
        <label htmlFor="fechanaci">Fecha de nacimiento</label>
      </span>
      <span className="p-float-label field">
        <Dropdown
          className="w-full"
          id="discapacidad"
          /* options={} */
          /* value={} */
          /*  onChange={(e) => {
            setDatosEstudiante({ ...datosEstudiante, electiva: e.value })
          }} */
          optionLabel="name"
        />
        <label htmlFor="discapacidad">Discapacidad</label>
      </span>
      <span className="p-float-label field">
        <InputText
          className="w-full"
          id="direccion"
          /* value={} */
          autoComplete="off"
        />
        <label htmlFor="direccion">Dirección</label>
      </span>
      <span className="p-float-label field">
        <Dropdown
          className="w-full"
          id="estado"
          /* options={} */
          /* value={} */
          /*  onChange={(e) => {
            setDatosEstudiante({ ...datosEstudiante, electiva: e.value })
          }} */
          optionLabel="name"
        />
        <label htmlFor="estado">Estado</label>
      </span>
      <span className="p-float-label field">
        <Dropdown
          className="w-full"
          id="municipio"
          /* options={} */
          /* value={} */
          /*  onChange={(e) => {
            setDatosEstudiante({ ...datosEstudiante, electiva: e.value })
          }} */
          optionLabel="name"
        />
        <label htmlFor="municipio">Municipio</label>
      </span>
      <span className="p-float-label field">
        <Dropdown
          className="w-full"
          id="parroquia"
          /* options={} */
          /* value={} */
          /*  onChange={(e) => {
            setDatosEstudiante({ ...datosEstudiante, electiva: e.value })
          }} */
          optionLabel="name"
        />
        <label htmlFor="parroquia">Parroquia</label>
      </span>

      <Button
        label="Postularse" /* onClick={registra} */ /* disabled={submitting} */
      />

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

export default Postulaciones

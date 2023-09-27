import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import { Divider } from 'primereact/divider'
import useSWR from 'swr'
import GQLelectivas from 'graphql/electivas'
import { useRef, useState } from 'react'
import { Button } from 'primereact/button'
import { Toast } from 'primereact/toast'

const InscripcionElectiva = () => {
  const toast = useRef(null)
  const [carreraEstudiante, setCarreraEstudiante] = useState('ARTE')
  const [trayectoEstudiante, setTrayectoEstudiante] =
    useState('TRAYECTO INICIAL')
  const [periodoEstudiante, setPeriodoEstudiante] = useState('2023-2024')
  const [selectedElectiva, setSelectedElectiva] = useState(null)
  const { data: electivasAsig } = useSWR(GQLelectivas.GET_ASIG_ELECTIVAS)
  const [disabledButtom, setDisabledButtom] = useState(false)

  const inscribirElectiva = () => {
    setTimeout(() => {
      toast.current.show({
        severity: 'success',
        summary: '¡ Atención !',
        detail: 'La electiva se a inscrito exitosamente'
      })
      setDisabledButtom(true)
    }, 800)
  }

  return (
    <div className="grid grid-cols-5 gap-4 m-2 -mt-2">
      <Toast ref={toast} />
      <div className="col-span-5 text-center">
        <h1 className="text-3xl font-semibold text-white">
          Inscripción de Materia Electiva
        </h1>
      </div>
      <span className="p-float-label field">
        <InputText
          className="w-full"
          id="carrera"
          value={carreraEstudiante}
          autoComplete="off"
        />
        <label htmlFor="carrera">Carrera</label>
      </span>
      <span className="p-float-label field">
        <InputText
          className="w-full"
          id="trayecto"
          value={trayectoEstudiante}
          autoComplete="off"
        />
        <label htmlFor="trayecto">Trayecto</label>
      </span>
      <span className="p-float-label field">
        <InputText
          className="w-full"
          id="periodo"
          value={periodoEstudiante}
          autoComplete="off"
        />
        <label htmlFor="periodo">Periodo</label>
      </span>
      <span className="p-float-label field">
        <Dropdown
          className="w-full"
          id="electiva"
          options={electivasAsig?.getElectivasAsignadas.response}
          value={selectedElectiva}
          onChange={(e) => setSelectedElectiva(e.value)}
          optionLabel="nb_electiva"
        />
        <label htmlFor="electiva">Seleccione la Electiva</label>
      </span>
      <div className="col-span-2" />
      {selectedElectiva?.nb_electiva && (
        <div className="grid grid-cols-5 gap-4 col-span-5">
          <Divider className="col-span-5" type="solid" />
          <div className="col-span-5">
            <h4 className="text-2xl font-semibold text-white">
              Información de la Electiva: {selectedElectiva?.nb_electiva}
            </h4>
          </div>
          <span className="p-float-label field">
            <InputText
              className="w-full"
              id="codigo"
              value={selectedElectiva?.co_electiva}
              autoComplete="off"
            />
            <label htmlFor="codigo">Código</label>
          </span>
          <span className="p-float-label field">
            <InputText
              className="w-full"
              id="nb_electiva"
              value={selectedElectiva?.nb_electiva}
              autoComplete="off"
            />
            <label htmlFor="nb_electiva">Electiva</label>
          </span>
          <span className="p-float-label field">
            <InputText
              className="w-full"
              id="NombresProfesor"
              value={selectedElectiva?.nb_personal}
              autoComplete="off"
            />
            <label htmlFor="NombresProfesor">Nombre del Profesor</label>
          </span>
          <span className="p-float-label field">
            <InputText
              className="w-full"
              id="trayecto"
              value={selectedElectiva?.hr_semanal}
              autoComplete="off"
            />
            <label htmlFor="trayecto">Horas Semanales</label>
          </span>
          <span className="p-float-label field">
            <InputText
              className="w-full"
              id="unidades"
              value={selectedElectiva?.nu_credito}
              autoComplete="off"
            />
            <label htmlFor="unidades">Unidades de Crédito</label>
          </span>
          <div className="col-span-5 flex justify-center">
            <Button
              label="Inscribirse"
              onClick={inscribirElectiva}
              disabled={disabledButtom}
            />
          </div>
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

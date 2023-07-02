import { InputText } from 'primereact/inputtext'
import { useRef, useState } from 'react'
import { Button } from 'primereact/button'
import GQLpersonaLocacion from 'graphql/personaLocacion'
import request from 'graphql-request'
import { Toast } from 'primereact/toast'

export default function PersonaLocacion() {
  const toast = useRef(null)
  const [nombreInput, setNombreInput] = useState('')
  const [apellidoInput, setApellidoInput] = useState('')
  const [cedulaInput, setCedulaInput] = useState('')
  const [ciudadInput, setCiudadInput] = useState('')

  const insertPersonaLocacion = (variables) => {
    return request(
      process.env.NEXT_PUBLIC_URL_BACKEND,
      GQLpersonaLocacion.SAVE_PERSONA_LOCACION,
      variables
    )
  }

  const guardarPersonaLocacion = () => {
    if (
      nombreInput !== '' &&
      apellidoInput !== '' &&
      cedulaInput !== '' &&
      ciudadInput !== ''
    ) {
      insertPersonaLocacion({
        nombre: nombreInput,
        apellido: apellidoInput,
        cedula: parseInt(cedulaInput),
        ciudad: ciudadInput
      }).then(({ savePersonasLocacion: { type, message } }) => {
        toast.current.show({
          severity: type,
          summary: 'Confirmacion',
          detail: message,
          life: 3000
        })
      })
    } else {
      alert('Todos los campos son obligatorios')
    }
  }

  return (
    <div className="flex flex-col">
      <Toast ref={toast} />
      <h1 className="text-3xl font-bold flex justify-center w-full">
        Personas Locacion
      </h1>
      <div className="flex justify-center w-full">
        <InputText
          value={nombreInput}
          className="h-[25%]"
          placeholder="Nombre"
          onChange={(e) => setNombreInput(e.target.value)}
        />
      </div>
      <div className="flex justify-center w-full mt-1">
        <InputText
          value={apellidoInput}
          className="h-[25%]"
          placeholder="Apellido"
          onChange={(e) => setApellidoInput(e.target.value)}
        />
      </div>
      <div className="flex justify-center w-full mt-1">
        <InputText
          value={cedulaInput}
          className="h-[25%]"
          placeholder="Cedula"
          onChange={(e) => setCedulaInput(e.target.value)}
        />
      </div>
      <div className="flex justify-center w-full mt-1">
        <InputText
          value={ciudadInput}
          className="h-[25%]"
          placeholder="Ciudad"
          onChange={(e) => setCiudadInput(e.target.value)}
        />
      </div>
      <div className="flex justify-center w-full mt-1">
        <Button label="Guardar" onClick={guardarPersonaLocacion} />
      </div>
    </div>
  )
}

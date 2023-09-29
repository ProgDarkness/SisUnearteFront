import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Divider } from 'primereact/divider'
import { InputText } from 'primereact/inputtext'
import { Toast } from 'primereact/toast'
import { useEffect, useRef, useState } from 'react'

const InscripcionRegular = () => {
  const toast = useRef(null)
  const [detallesMalla, setDetallesMalla] = useState([])
  const [periodo, setPeriodo] = useState('')
  const [carrera, setCarrera] = useState('')
  const [sede, setSede] = useState('')
  const [trayecto, setTrayecto] = useState('')
  const [materiasInscribir, setMateriasInscribir] = useState([])
  const [inscrito, setInscrito] = useState(false)

  useEffect(() => {
    setPeriodo('2023-2024')
    setCarrera('Artes Audiovisuales CT')
    setSede('Caracas')
    setTrayecto('Trayecto Inicial')
    setDetallesMalla([
      {
        codMateria: 'AAJ1-DM2',
        materia: 'ANÁLISIS AUDITIVO Y DE LA FORMA MUSICAL POPULAR',
        profesor: 'EDUARDO LÓPEZ',
        cantCreditos: '14',
        horasSemanales: '12'
      },
      {
        codMateria: 'AAN-002',
        materia: 'TUTORES AUDIOVISUALES PARA NIÑOS',
        profesor: 'LAURA GOLDBERG',
        cantCreditos: '25',
        horasSemanales: '18'
      },
      {
        codMateria: 'AAP-002',
        materia: 'ARTE Y PENSAMIENTO VISUAL',
        profesor: 'ANDRÉS HIDALGO',
        cantCreditos: '11',
        horasSemanales: '12'
      },
      {
        codMateria: 'AAS1-DM4',
        materia: 'AUDIO PERCEPTIVA Y ANÁLISIS MUSICAL I',
        profesor: 'ORLANDO RODRIGUEZ',
        cantCreditos: '26',
        horasSemanales: '14'
      },
      {
        codMateria: 'ACC-002',
        materia: 'CANTO CORAL',
        profesor: 'ALESSANDRA TURCI',
        cantCreditos: '14',
        horasSemanales: '12'
      }
    ])
  }, [])

  function aggMateria(rowData) {
    setMateriasInscribir([...materiasInscribir, rowData])
  }

  function delMateria(rowData) {
    const newData = materiasInscribir.filter(
      (materia) => materia.codMateria !== rowData.codMateria
    )
    setMateriasInscribir([...newData])
  }

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex justify-center">
        <Button
          icon="pi pi-check"
          className="p-button-success mr-1"
          tooltip="Inscribir"
          tooltipOptions={{ position: 'top' }}
          onClick={() => {
            aggMateria(rowData)
          }}
        />
        <Button
          icon="pi pi-times"
          className="p-button-danger"
          tooltip="Eliminar"
          tooltipOptions={{ position: 'top' }}
          onClick={() => {
            delMateria(rowData)
          }}
        />
      </div>
    )
  }

  const inscribirEstudiante = () => {
    setTimeout(() => {
      toast.current.show({
        severity: 'success',
        summary: '¡ Atención !',
        detail: 'Te has Inscrito Exitosamente',
        life: 3000
      })
      setInscrito(true)
    }, 800)
  }

  return (
    <div className="mt-3 grid grid-cols-4 gap-4">
      <Toast ref={toast} />
      <div className="w-full text-center col-span-4">
        <h1 className="text-3xl font-semibold text-white text-center mr-10 mb-0 -mt-5">
          Inscripción Regular
        </h1>
      </div>
      <span className="p-float-label field">
        <InputText className="w-full" id="periodo" value={periodo} />
        <label htmlFor="periodo">Periodo</label>
      </span>
      <span className="p-float-label field">
        <InputText className="w-full" id="carrera" value={carrera} />
        <label htmlFor="carrera">Carrera</label>
      </span>
      <span className="p-float-label field">
        <InputText className="w-full" id="sede" value={sede} />
        <label htmlFor="sede">Sede</label>
      </span>
      <span className="p-float-label field">
        <InputText className="w-full" id="trayecto" value={trayecto} />
        <label htmlFor="trayecto">Trayecto</label>
      </span>

      {!inscrito && (
        <>
          <div className="w-full text-center col-span-4">
            <h1 className="text-2xl font-semibold text-white text-center mr-10 mb-0 -mt-0">
              Malla Curricular
            </h1>
          </div>
          <div className="col-span-4">
            <DataTable
              value={detallesMalla}
              emptyMessage="No se encuentran materias registradas."
              size="small"
            >
              <Column field="codMateria" header="Código" />
              <Column field="materia" header="Materia" />
              <Column field="profesor" header="Profesor" />
              <Column field="cantCreditos" header="Crédito" />
              <Column field="horasSemanales" header="Horas Semanales" />
              <Column body={actionBodyTemplate} />
            </DataTable>
          </div>
        </>
      )}
      <Divider className="col-span-4" />
      <div className="col-span-4">
        <h1 className="text-3xl font-semibold text-white text-center mr-10 mb-0 -mt-0">
          {!inscrito ? 'Materias a Inscribir' : 'Materias Inscritas'}
        </h1>
        <div className="flex flex-row">
          <div className={!inscrito ? 'basis-4/5' : 'basis-full'}>
            <DataTable
              value={materiasInscribir}
              emptyMessage="Seleccione las materias a inscribir de la malla curricular."
              size="small"
            >
              <Column field="codMateria" header="Código" />
              <Column field="materia" header="Materia" />
              <Column field="profesor" header="Profesor" />
              <Column field="cantCreditos" header="Crédito" />
              <Column field="horasSemanales" header="Horas Semanales" />
            </DataTable>
          </div>
          {!inscrito && (
            <div className="basis-1/5 flex justify-center align-middle">
              <div className="my-auto">
                <Button
                  label="Confirmar"
                  icon="pi pi-plus"
                  onClick={inscribirEstudiante}
                  disabled={materiasInscribir.length <= 2}
                />
              </div>
            </div>
          )}
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

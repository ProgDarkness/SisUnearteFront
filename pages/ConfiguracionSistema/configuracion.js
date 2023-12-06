import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { Dropdown } from 'primereact/dropdown'
import { DataTable } from 'primereact/datatable'
import { InputText } from 'primereact/inputtext'
import { useEffect, useState } from 'react'
import GQLconsultasGenerales from 'graphql/consultasGenerales'

import DialogInformacionDelEstudiante from 'pages/informacionDelEstudianteComps/dialogInformacionDelEstudiante'
import useSWR from 'swr'

const ConfiguracionSistema = () => {
  const [datosEstudiantes, setDatosEstudiantes] = useState([])
  const [
    activeDialogInformacionDelEstudiante,
    setActiveDialogInformacionDelEstudiante
  ] = useState(false)

  const { data: tiposDocumentos } = useSWR(
    GQLconsultasGenerales.GET_TIPO_DOCUMENTO
  )

  const actionbodytemplate = (rowData) => {
    return (
      <div className="flex justify-center">
        <Button
          icon="pi pi-plus"
          className="p-button-info mr-1"
          tooltip="Guardar"
          tooltipOptions={{ position: 'top' }}
          onClick={() => {
            setActiveDialogInformacionDelEstudiante(true)
          }}
        />
        <Button
          icon="pi pi-minus-circle"
          className="p-button-danger"
          tooltipOptions={{ position: 'top' }}
          onClick={() => {
            setDialogConfirmEliminarFotoPerfil(true)
            setDataEliminarFotoPerfil(idImagenPerfil)
          }}
        />
      </div>
    )
  }

  return (
    <div>
      <DialogInformacionDelEstudiante
        activeDialogInformacionDelEstudiante={
          activeDialogInformacionDelEstudiante
        }
        setActiveDialogInformacionDelEstudiante={
          setActiveDialogInformacionDelEstudiante
        }
      />
      <div className="col-span-5 flex justify-between">
        <h1 className="text-3xl font-semibold text-white">
          Documentos 
        </h1>
      </div>
      <div className="col-span-5 grid grid-cols-4 gap-5 pt-2">
      <span className="p-float-label field">
              <InputText
                className="w-full"
                id="nombreDeViaLaboral"
                /* value={nombreDeViaLaboral} */
                onChange={(e) =>
                  setNombreDeViaLaboral(e.target.value.toUpperCase())
                }
                autoComplete="off"
              />
              <label htmlFor="nombreDeViaLaboral">Nombre Del Documento</label>
            </span>
        <span className="p-float-label field">
          <Dropdown
            className="w-full"
            id="tp_sede"
            showClear
            /* value={sede}
            onChange={(e) => setSedes(e.target.value)}
            options={sedes?.obtenerSedes.response} */
            optionLabel="nombre"
            optionValue="id"
          />
          <label htmlFor="tp_sede">Tipo De Carrera</label>
        </span>
        <span className="p-float-label field">
        <Button
          icon="pi pi-check"
          label={ 'Guardar' }
          /* onClick={() => setConfirmRegistrar(true)}
          disabled={evalToFormForPais} */
        />
        </span>
      </div>
      <div>
        <DataTable
          value={tiposDocumentos?.obtenerTipoDocumento.response}
          emptyMessage="No hay documentos registrados."
        >
          <Column field="id" header="ID" />
          <Column field="nombre" header="Nombre" />
          <Column field="tipocarrera" header="Tipo Carrera" />
          <Column body={actionbodytemplate} />
        </DataTable>
      </div>
    </div>
  )
}

export default ConfiguracionSistema
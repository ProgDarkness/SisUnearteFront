import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog'
import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import GQLregMallaCurricular from 'graphql/regMallaCurricular'
import GQLconsultasGenerales from 'graphql/consultasGenerales'
import useSWR from 'swr'
import { Button } from 'primereact/button'
import { useState } from 'react'

const DialogRegistrarSede = ({ dialogRegSede, setDialogRegSede }) => {
  const [estado, setEstado] = useState(null)
  const [municipio, setMunicipio] = useState(null)
  const [parroquia, setParroquia] = useState(null)
  const [tpvia, setTpvia] = useState(null)
  const [nombVia, setNombVia] = useState('')
  const [tpzona, setTpzona] = useState(null)
  const [nombZona, setNombZona] = useState(null)
  const [codPostal, setCodPostal] = useState('')
  const [codSede, setCodSede] = useState('')
  const [nombSede, setNombSede] = useState('')
  const [descDireccion, setDescDireccion] = useState('')

  const { data: sedes } = useSWR(GQLregMallaCurricular.GET_SEDES_CRUD)
  const { data: estados } = useSWR(GQLregMallaCurricular.GET_ESTADOS_CRUD)

  const { data: municipiosPorEstado } = useSWR(
    estado
      ? [
          GQLconsultasGenerales.GET_MUNICIPIOS_POR_ESTADO,
          {
            InputEstado: {
              estado: parseInt(estado.id)
            }
          }
        ]
      : null
  )

  const { data: ciudadesPorEstado } = useSWR(
    estado
      ? [
          GQLconsultasGenerales.GET_CIUDADES_POR_ESTADO,
          {
            InputEstado: {
              estado: parseInt(estado.id)
            }
          }
        ]
      : null
  )

  const { data: parroquiasPorMunicipio } = useSWR(
    municipio
      ? [
          GQLconsultasGenerales.GET_PARROQUIAS_POR_MUNICIPIO,
          {
            InputMunicipio: {
              municipio: parseInt(municipio.id)
            }
          }
        ]
      : null
  )

  const { data: zonasPorParroquias } = useSWR(
    parroquia
      ? [
          GQLconsultasGenerales.GET_ZONAS_POR_PARROQUIA,
          {
            InputParroquia: {
              parroquia: parseInt(parroquia.id)
            }
          }
        ]
      : null
  )

  const { data: tipoVias } = useSWR(GQLconsultasGenerales.GET_TIPO_VIAS)
  const { data: tipoZonas } = useSWR(GQLconsultasGenerales.GET_TIPO_ZONAS)

  const accionBodyTemplate = (rowData) => {
    return (
      <div className="flex justify-center">
        <Button
          icon="pi pi-pencil"
          className="p-button-help mr-1"
          tooltip="Modificar"
          /*   onClick={() => {
            setDatosEditarCarrera(rowData)
            setDialogEditarCarrera(true)
          }} */
          tooltipOptions={{ position: 'top' }}
        />

        <Button
          icon="pi pi-times"
          className="p-button-danger"
          tooltip="Eliminar"
          tooltipOptions={{ position: 'top' }}
          /* onClick={() => eliminarSede(rowData)} */
        />
      </div>
    )
  }

  return (
    <Dialog
      visible={dialogRegSede}
      onHide={() => {
        setDialogRegSede(false)
      }}
      header="Registrar Sedes"
      resizable={false}
      draggable={false}
      style={{ width: '800px' }}
    >
      <div className="grid grid-cols-4 gap-4 pt-3">
        <span className="p-float-label field">
          <InputText
            className="w-full"
            id="cod_carrera"
            /*   value={codCarrera}
            onChange={(e) => setCodCarrera(e.target.value.toUpperCase())} */
            autoComplete="off"
          />
          <label htmlFor="cod_carrera">Código de Sede</label>
        </span>
        <span className="p-float-label field col-span-2">
          <InputText
            className="w-full"
            id="cod_carrera"
            /*   value={codCarrera}
            onChange={(e) => setCodCarrera(e.target.value.toUpperCase())} */
            autoComplete="off"
          />
          <label htmlFor="cod_carrera">Nombre de Sede</label>
        </span>
        <span className="p-float-label field">
          <Dropdown
            className="w-full"
            id="tp_carrera"
            /*  value={sedeCarrera} */
            /* onChange={(e) => setSedeCarrera(e.target.value)} */
            /*   options={sedes?.obtenerSedes.response} */
            optionLabel="nombre"
            optionValue="id"
          />
          <label htmlFor="tp_carrera">Estado</label>
        </span>
        <span className="p-float-label field">
          <Dropdown
            className="w-full"
            id="tp_carrera"
            /*  value={sedeCarrera} */
            /* onChange={(e) => setSedeCarrera(e.target.value)} */
            /*   options={sedes?.obtenerSedes.response} */
            optionLabel="nombre"
            optionValue="id"
          />
          <label htmlFor="tp_carrera">Ciudad</label>
        </span>
        <span className="p-float-label field">
          <Dropdown
            className="w-full"
            id="tp_carrera"
            /*  value={sedeCarrera} */
            /* onChange={(e) => setSedeCarrera(e.target.value)} */
            /*   options={sedes?.obtenerSedes.response} */
            optionLabel="nombre"
            optionValue="id"
          />
          <label htmlFor="tp_carrera">Municipio</label>
        </span>
        <span className="p-float-label field">
          <Dropdown
            className="w-full"
            id="tp_carrera"
            /*  value={sedeCarrera} */
            /* onChange={(e) => setSedeCarrera(e.target.value)} */
            /*   options={sedes?.obtenerSedes.response} */
            optionLabel="nombre"
            optionValue="id"
          />
          <label htmlFor="tp_carrera">Parroquia</label>
        </span>
        <span className="p-float-label field">
          <Dropdown
            className="w-full"
            id="tp_carrera"
            /*  value={sedeCarrera} */
            /* onChange={(e) => setSedeCarrera(e.target.value)} */
            /*   options={sedes?.obtenerSedes.response} */
            optionLabel="nombre"
            optionValue="id"
          />
          <label htmlFor="tp_carrera">Tipo Via</label>
        </span>
        <span className="p-float-label field">
          <InputText
            className="w-full"
            id="cod_carrera"
            /*   value={codCarrera}
            onChange={(e) => setCodCarrera(e.target.value.toUpperCase())} */
            autoComplete="off"
          />
          <label htmlFor="cod_carrera">Nombre de Via</label>
        </span>
        <span className="p-float-label field">
          <Dropdown
            className="w-full"
            id="tp_carrera"
            /*  value={sedeCarrera} */
            /* onChange={(e) => setSedeCarrera(e.target.value)} */
            /*   options={sedes?.obtenerSedes.response} */
            optionLabel="nombre"
            optionValue="id"
          />
          <label htmlFor="tp_carrera">Tipo Zona</label>
        </span>
        <span className="p-float-label field">
          <Dropdown
            className="w-full"
            id="tp_carrera"
            /*  value={sedeCarrera} */
            /* onChange={(e) => setSedeCarrera(e.target.value)} */
            /*   options={sedes?.obtenerSedes.response} */
            optionLabel="nombre"
            optionValue="id"
          />
          <label htmlFor="tp_carrera">Nombre de Zona</label>
        </span>

        <span className="p-float-label field">
          <InputText
            className="w-full"
            id="cod_carrera"
            /*   value={codCarrera}
            onChange={(e) => setCodCarrera(e.target.value.toUpperCase())} */
            autoComplete="off"
          />
          <label htmlFor="cod_carrera">Codigo Postal</label>
        </span>
        <span className="p-float-label field col-span-2">
          <InputText
            className="w-full"
            id="cod_carrera"
            /*   value={codCarrera}
            onChange={(e) => setCodCarrera(e.target.value.toUpperCase())} */
            autoComplete="off"
          />
          <label htmlFor="cod_carrera">Descripcion de direccion</label>
        </span>
        <div className="col-span-4">
          <DataTable value={sedes?.obtenerCrudSede.response}>
            <Column field="co_sede" header="Codigo" />
            <Column field="nb_sede" header="Sede" />
            <Column field="estatus" header="Estatus" />
            <Column body={accionBodyTemplate} />
          </DataTable>
        </div>
      </div>
    </Dialog>
  )
}

export default DialogRegistrarSede

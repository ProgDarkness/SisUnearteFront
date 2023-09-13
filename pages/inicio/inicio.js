import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { DataTable } from 'primereact/datatable'
import { InputMask } from 'primereact/inputmask'
import { Divider } from 'primereact/divider'
import { useEffect, useState } from 'react'
import GQLpostulaciones from 'graphql/postulaciones'
import GQLUsuarios from 'graphql/usuarios'
import useSWR from 'swr'
import { useSesion } from 'hooks/useSesion'

const Inicio = () => {
  const { idUser } = useSesion()
  const [nacionalidad, setNacionalidad] = useState(null)
  const [cedula, setCedula] = useState('')
  const [primer_nombre, setPrimer_Nombre] = useState('')
  const [primer_apellido, setPrimer_Apellido] = useState('')
  const [segundo_nombre, setSegundo_Nombre] = useState('')
  const [segundo_apellido, setSegundo_Apellido] = useState('')
  const [correoElectronico, setCorreoElectronico] = useState('')
  const [fechanaci, setFechaNaci] = useState(null)
  const [sexo, setSexo] = useState(null)
  const [estadoCivil, setEstadoCivil] = useState(null)

  const { data: infoUser } = useSWR(
    idUser ? [GQLUsuarios.GET_INFO_USER_REG, { id_usuario: idUser }] : null
  )

  const { data: infoPostuUsu } = useSWR(
    idUser ? [GQLpostulaciones.GET_POSTULACION_USUARIO, { idUser }] : null
  )

  console.log(infoPostuUsu)

  useEffect(() => {
    if (infoUser?.getInfoUsuario.response) {
      setNacionalidad(infoUser?.getInfoUsuario.response.nacionalidad)
      setCedula(infoUser?.getInfoUsuario.response.ced_usuario)
      setPrimer_Nombre(infoUser?.getInfoUsuario.response.nb_usuario)
      setSegundo_Nombre(infoUser?.getInfoUsuario.response.nb2_usuario)
      setPrimer_Apellido(infoUser?.getInfoUsuario.response.ape_usuario)
      setSegundo_Apellido(infoUser?.getInfoUsuario.response.ape2_usuario)
      setCorreoElectronico(infoUser?.getInfoUsuario.response.correoElectronico)
      setSexo(infoUser?.getInfoUsuario.response.sexo)
      setCorreoElectronico(infoUser?.getInfoUsuario.response.correo_usuario)
      setFechaNaci(
        new Date(
          parseInt(infoUser?.getInfoUsuario.response.fe_nac_usuario)
        ).toLocaleDateString('es-ES', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        })
      )
      setEstadoCivil(infoUser?.getInfoUsuario.response.estadoCivil)
    }
  }, [infoUser])

  const accionBodyTemplate = (rowData) => {
    return (
      <div className="flex justify-center">
        <Button
          icon="pi pi-pencil"
          className="p-button-help mr-1"
          tooltip="Incribir"
          onClick={() => {
            /* setDatosEditarPersonal(rowData)
            setActiveDialogEditarPersonal(true) */
          }}
          tooltipOptions={{ position: 'top' }}
        />
      </div>
    )
  }

  return (
    <div className="m-2 -mt-2">
      <div className="w-full text-center">
        <h1 className="text-3xl font-semibold text-white text-center mr-32 mb-6 -mt-3">
          Postulaciones Activas
        </h1>

        <div className="grid grid-cols-5 gap-4 mt-4 p-4">
          <span className="p-float-label field">
            <Dropdown
              className="w-full"
              id="nacionalidad"
              /* options={data?.nacionalidades.obtenerNacionalidades.response} */
              value={nacionalidad}
              onChange={(e) => {
                setNacionalidad(e.value)
              }}
              optionLabel="codigo"
              disabled
            />
            <label htmlFor="nacionalidad">Nacionalidad</label>
          </span>
          <span className="p-float-label field">
            <InputText
              keyfilter={'num'}
              maxLength={9}
              className="w-full"
              id="cedula"
              value={cedula}
              onChange={(e) => setCedula(e.target.value)}
              autoComplete="off"
              disabled
            />
            <label htmlFor="cedula">Cédula</label>
          </span>
          <span className="p-float-label field">
            <InputText
              className="w-full"
              id="primer_Nombre"
              value={primer_nombre}
              onChange={(e) => setSegundo_Nombre(e.target.value.toUpperCase())}
              autoComplete="off"
              disabled
            />
            <label htmlFor="primer_nombre">Primer Nombre</label>
          </span>
          <span className="p-float-label field">
            <InputText
              className="w-full"
              id="primer_apellido"
              value={primer_apellido}
              onChange={(e) => setPrimer_Apellido(e.target.value.toUpperCase())}
              autoComplete="off"
              disabled
            />
            <label htmlFor="primer_apellido">Primer Apellido</label>
          </span>
          <span className="p-float-label field">
            <InputText
              className="w-full"
              id="segundo_Nombre"
              value={segundo_nombre}
              onChange={(e) => setSegundo_Nombre(e.target.value.toUpperCase())}
              autoComplete="off"
              disabled
            />
            <label htmlFor="segundo_Nombre">Segundo Nombre</label>
          </span>
          <span className="p-float-label field">
            <InputText
              className="w-full"
              id="segundo_Apellido"
              value={segundo_apellido}
              onChange={(e) =>
                setSegundo_Apellido(e.target.value.toUpperCase())
              }
              autoComplete="off"
              disabled
            />
            <label htmlFor="segundo_Apellido">Segundo Apellido</label>
          </span>
          <span className="p-float-label field">
            <InputText
              className="w-full"
              id="correoElectronico"
              value={correoElectronico}
              onChange={(e) => setCorreoElectronico(e.target.value)}
              autoComplete="off"
              disabled
            />
            <label htmlFor="correoElectronico">Correo Electronico</label>
          </span>
          <span className="p-float-label field">
            <InputMask
              mask="99/99/9999"
              className="w-full"
              id="fechanaci"
              value={fechanaci}
              onChange={(e) => {
                setFechaNaci(e.value)
              }}
              autoComplete="off"
              disabled
            />
            <label htmlFor="fechanaci">Fecha de nacimiento</label>
          </span>
          <span className="p-float-label field">
            <Dropdown
              className="w-full"
              id="sexo"
              /* options={data?.sexos.obtenerSexos.response} */
              value={sexo}
              onChange={(e) => {
                setSexo(e.value)
              }}
              optionLabel="nombre"
              disabled
            />
            <label htmlFor="sexo">Sexo</label>
          </span>
          <span className="p-float-label field">
            <Dropdown
              className="w-full"
              id="estadoCivil"
              /* options={data?.estados_civiles.obtenerEstadoCivil.response} */
              value={estadoCivil}
              onChange={(e) => {
                setEstadoCivil(e.value)
              }}
              optionLabel="nombre"
              disabled
            />
            <label htmlFor="estadoCivil">Estado Civil</label>
          </span>
        </div>
        <div className="grid grid-cols-5 gap-4">
          <Divider className="col-span-5" />
          <div className="col-span-5">
            <DataTable
              value={infoPostuUsu?.obtenerPostulacionUsuario.response}
              emptyMessage="No se encuentran trayectos registrados."
              filterDisplay="row"
            >
              <Column
                field="periodo"
                filterPlaceholder="Buscar"
                filter
                header="Periodo"
              />
              <Column field="carrera" filter header="Carrera" />
              <Column field="sede" filter header="Sede" />
              <Column field="estatus" filter header="Estatus" />
              <Column body={accionBodyTemplate} />
            </DataTable>
          </div>
        </div>
      </div>
      {/* eslint-disable-next-line react/no-unknown-property */}
      <style jsx global>{`
        .p-disabled,
        .p-component:disabled {
          opacity: 0.9;
        }
      `}</style>
    </div>
  )
}

export default Inicio

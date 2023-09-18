import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import { useEffect, useState } from 'react'
import { Dialog } from 'primereact/dialog'
import GQLconsultasGenerales from 'graphql/consultasGenerales'
import GQLusuarios from 'graphql/usuarios'
import useSWR from 'swr'

const DialogDatosEstudiantes = ({
  activeDialogVerDatosEstudiantes,
  setActiveDialogVerDatosEstudiantes,
  datosVerPostulado
}) => {
  const [nacionalidad, setNacionalidad] = useState(null)
  const [cedula, setCedula] = useState('')
  const [nombre, setNombre] = useState('')
  const [segundo_Nombre, setSegundo_Nombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [segundo_Apellido, setSegundo_Apellido] = useState('')
  const [sexo, setSexo] = useState(null)
  const [fechanaci, setFechaNaci] = useState(null)
  const [discapacidad, setDiscapacidad] = useState(null)
  const [paisNacimiento, setPaisNacimiento] = useState(null)
  const [ciudadNacimiento, setCiudadNacimiento] = useState('')
  const [estadoNacimiento, setEstadoNacimiento] = useState(null)
  const [estadoCivil, setEstadoCivil] = useState(null)
  const [correoElectronico, setCorreoElectronico] = useState('')
  const [tipoDeVia, setTipoDeVia] = useState(null)
  const [nombreDeVia, setNombreDeVia] = useState('')
  const [tipoDeZona, setTipoDeZona] = useState(null)
  const [nombreDeZona, setNombreDeZona] = useState('')
  const [tipoDeVivienda, setTipoDeVivienda] = useState(null)
  const [numeroDeVivienda, setNumeroDeVivienda] = useState('')
  const [paisHab, setPais] = useState(null)
  const [ciudadHab, setCiudad] = useState('')
  const [estadoHab, setEstado] = useState(null)
  const [municipioHab, setMunicipio] = useState(null)
  const [parroquiaHab, setParroquia] = useState(null)
  const [zonaPostal, setZonaPostal] = useState('')

  const { data: tiposNacionalidad } = useSWR(
    GQLconsultasGenerales.GET_NACIONALIDADES
  )
  const { data: tiposCivil } = useSWR(GQLconsultasGenerales.GET_ESTADOS_CIVILES)
  const { data: tiposSexo } = useSWR(GQLconsultasGenerales.GET_SEXO)
  const { data: tiposPaises } = useSWR(GQLconsultasGenerales.GET_PAISES)
  const { data: tiposEstados } = useSWR(GQLconsultasGenerales.GET_ESTADOS)
  const { data: tiposCiudades } = useSWR(GQLconsultasGenerales.GET_CIUDADES)
  const { data: tiposMunicipios } = useSWR(GQLconsultasGenerales.GET_MUNICIPIOS)
  const { data: tiposParroquias } = useSWR(GQLconsultasGenerales.GET_PARROQUIAS)
  const { data: tiposDiscapacidades } = useSWR(
    GQLconsultasGenerales.GET_DISCAPACIDADES
  )
  const { data: tiposVias } = useSWR(GQLconsultasGenerales.GET_TIPO_VIAS)
  const { data: tiposZonas } = useSWR(GQLconsultasGenerales.GET_TIPO_ZONAS)
  const { data: tiposViviendas } = useSWR(
    GQLconsultasGenerales.GET_TIPO_VIVIENDA
  )

  const { data: infoUsuario } = useSWR(
    datosVerPostulado?.idusuario
      ? [
          GQLusuarios.GET_INFO_USER_REG,
          { id_usuario: parseInt(datosVerPostulado?.idusuario) }
        ]
      : null
  )

  useEffect(() => {
    const objectInfoEstu = infoUsuario?.getInfoUsuario.response
    if (objectInfoEstu) {
      setNacionalidad(objectInfoEstu?.nacionalidad.id)
      setCedula(objectInfoEstu?.ced_usuario)
      setNombre(objectInfoEstu?.nb_usuario)
      setSegundo_Nombre(objectInfoEstu?.nb2_usuario)
      setApellido(objectInfoEstu?.ape_usuario)
      setSegundo_Apellido(objectInfoEstu?.ape2_usuario)
      setSexo(objectInfoEstu?.sexo.id)
      setEstadoCivil(objectInfoEstu?.estadoCivil.id)
      setCorreoElectronico(objectInfoEstu?.correo_usuario)
      setFechaNaci(
        new Date(parseInt(objectInfoEstu?.fe_nac_usuario)).toLocaleDateString(
          'es-ES',
          {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
          }
        )
      )
      setPaisNacimiento(objectInfoEstu?.paisNac.id)
      setCiudadNacimiento(objectInfoEstu?.ciudadNac.id)
      setEstadoNacimiento(objectInfoEstu?.estadoNac.id)
      setTipoDeVia(objectInfoEstu?.tpVia.id)
      setNombreDeVia(objectInfoEstu?.nb_via)
      setTipoDeZona(objectInfoEstu?.tpZona.id)
      setNombreDeZona(objectInfoEstu?.nombZona.nombre)
      setTipoDeVivienda(objectInfoEstu?.tpVivienda.id)
      setNumeroDeVivienda(objectInfoEstu?.nu_vivienda)
      setZonaPostal(objectInfoEstu?.nombZona.codigo_postal)
      setPais(objectInfoEstu?.pais.id)
      setCiudad(objectInfoEstu?.ciudad.id)
      setEstado(objectInfoEstu?.estado.id)
      setMunicipio(objectInfoEstu?.municipio.id)
      setParroquia(objectInfoEstu?.parroquia.id)
      setDiscapacidad(objectInfoEstu?.discapacidad.id)
    }
  }, [infoUsuario])

  return (
    <Dialog
      visible={activeDialogVerDatosEstudiantes}
      onHide={() => {
        setActiveDialogVerDatosEstudiantes(false)
      }}
      style={{ height: '57%' }}
      header="Datos del Postulado"
      resizable={false}
      draggable={false}
      className="m-2 -mt-2"
    >
      <div className="w-full text-center">
        <h1 className="text-3xl font-semibold text-white">
          Datos del Postulado
        </h1>
      </div>

      <div className="grid grid-cols-5 gap-4 mt-6">
        <span className="p-float-label field">
          <Dropdown
            className="w-full"
            id="nacionalidad"
            value={nacionalidad}
            options={tiposNacionalidad?.obtenerNacionalidades.response}
            onChange={(e) => setNacionalidad(e.value)}
            optionLabel="nombre"
            optionValue="id"
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
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            autoComplete="off"
            disabled
          />
          <label htmlFor="nombre">Primer Nombre</label>
        </span>
        <span className="p-float-label field">
          <InputText
            className="w-full"
            id="segundo_Nombre"
            value={segundo_Nombre}
            onChange={(e) => setSegundo_Nombre(e.target.value)}
            autoComplete="off"
            disabled
          />
          <label htmlFor="segundo_Nombre">Segundo Nombre</label>
        </span>
        <span className="p-float-label field">
          <InputText
            className="w-full"
            id="segundo_Apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            autoComplete="off"
            disabled
          />
          <label htmlFor="segundo_Apellido">Primer Apellido</label>
        </span>
        <span className="p-float-label field">
          <InputText
            className="w-full"
            id="nombre"
            value={segundo_Apellido}
            onChange={(e) => setSegundo_Apellido(e.target.value)}
            autoComplete="off"
            disabled
          />
          <label htmlFor="segundo_Apellido">Segundo Apellido</label>
        </span>
        <span className="p-float-label field">
          <Dropdown
            className="w-full"
            id="sexo"
            value={sexo}
            options={tiposSexo?.obtenerSexos.response}
            onChange={(e) => setSexo(e.value)}
            optionLabel="nombre"
            optionValue="id"
            disabled
          />
          <label htmlFor="sexo">Sexo</label>
        </span>
        <span className="p-float-label field">
          <Dropdown
            className="w-full"
            id="estadoCivil"
            value={estadoCivil}
            options={tiposCivil?.obtenerEstadoCivil.response}
            onChange={(e) => setEstadoCivil(e.value)}
            optionLabel="nombre"
            optionValue="id"
            disabled
          />
          <label htmlFor="estadoCivil">Estado Civil</label>
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
          <InputText
            className="w-full"
            id="fechanaci"
            value={fechanaci}
            onChange={(e) => setFechaNaci(e.target.value)}
            disabled
          />
          <label htmlFor="fechanaci">Fecha de Nacimiento</label>
        </span>
        <span className="p-float-label field">
          <Dropdown
            className="w-full"
            id="paisNacimiento"
            value={paisNacimiento}
            options={tiposPaises?.obtenerPaises.response}
            onChange={(e) => setPaisNacimiento(e.value)}
            optionLabel="nombre"
            optionValue="id"
            disabled
          />
          <label htmlFor="paisNacimiento">Pais Nacimiento</label>
        </span>
        <span className="p-float-label field">
          <Dropdown
            className="w-full"
            id="estadoNacimiento"
            value={estadoNacimiento}
            options={tiposEstados?.obtenerEstados.response}
            onChange={(e) => setEstadoNacimiento(e.value)}
            optionLabel="nombre"
            optionValue="id"
            disabled
          />
          <label htmlFor="estadoNacimiento">Estado Nacimiento</label>
        </span>
        <span className="p-float-label field">
          <Dropdown
            className="w-full"
            id="ciudadNacimiento"
            value={ciudadNacimiento}
            options={tiposCiudades?.obtenerCiudades.response}
            onChange={(e) => setCiudadNacimiento(e.value)}
            optionLabel="nombre"
            optionValue="id"
            disabled
          />
          <label htmlFor="ciudadNacimiento">Ciudad Nacimiento</label>
        </span>
        <span className="p-float-label field">
          <Dropdown
            className="w-full"
            id="discapacidad"
            value={discapacidad}
            options={tiposDiscapacidades?.obtenerDiscapacidades.response}
            onChange={(e) => setDiscapacidad(e.value)}
            optionLabel="nombre"
            optionValue="id"
            disabled
          />
          <label htmlFor="discapacidad">Discapacidad</label>
        </span>
        <span className="p-float-label field">
          <Dropdown
            className="w-full"
            id="tipoDeVia"
            value={tipoDeVia}
            options={tiposVias?.obtenerTipoVia.response}
            onChange={(e) => setTipoDeVia(e.value)}
            optionLabel="nombre"
            optionValue="id"
            disabled
          />
          <label htmlFor="tipoDeVia">Tipo de via</label>
        </span>
        <span className="p-float-label field">
          <InputText
            className="w-full"
            id="nombreDeVia"
            value={nombreDeVia}
            onChange={(e) => setNombreDeVia(e.target.value)}
            autoComplete="off"
            disabled
          />
          <label htmlFor="nombreDeVia">Nombre De Via</label>
        </span>
        <span className="p-float-label field">
          <Dropdown
            className="w-full"
            id="tipoDeZona"
            value={tipoDeZona}
            options={tiposZonas?.obtenerTipoZona.response}
            onChange={(e) => setTipoDeZona(e.value)}
            optionLabel="nombre"
            optionValue="id"
            disabled
          />
          <label htmlFor="tipoDeZona">Tipo De Zona</label>
        </span>
        <span className="p-float-label field">
          <InputText
            className="w-full"
            id="nombreDeZona"
            value={nombreDeZona}
            onChange={(e) => setNombreDeZona(e.target.value)}
            autoComplete="off"
            disabled
          />
          <label htmlFor="nombreDeZona">Nombre de Zona</label>
        </span>
        <span className="p-float-label field">
          <Dropdown
            className="w-full"
            id="tipoDeVivienda"
            value={tipoDeVivienda}
            options={tiposViviendas?.obtenerTipoVivienda.response}
            onChange={(e) => setTipoDeVivienda(e.value)}
            optionLabel="nombre"
            optionValue="id"
            disabled
          />
          <label htmlFor="tipoDeVivienda">Tipo De Vivienda</label>
        </span>
        <span className="p-float-label field">
          <InputText
            className="w-full"
            id="numeroDeVivienda"
            value={numeroDeVivienda}
            onChange={(e) => setNumeroDeVivienda(e.target.value)}
            autoComplete="off"
            disabled
          />
          <label htmlFor="numeroDeVivienda">Numero De Vivienda</label>
        </span>
        <span className="p-float-label field">
          <Dropdown
            className="w-full"
            id="paisHab"
            value={paisHab}
            options={tiposPaises?.obtenerPaises.response}
            onChange={(e) => setPais(e.value)}
            optionLabel="nombre"
            optionValue="id"
            disabled
          />
          <label htmlFor="paisHab">Pais de Habitación</label>
        </span>
        <span className="p-float-label field">
          <Dropdown
            className="w-full"
            id="ciudadHab"
            value={ciudadHab}
            options={tiposCiudades?.obtenerCiudades.response}
            onChange={(e) => setCiudad(e.value)}
            optionLabel="nombre"
            optionValue="id"
            disabled
          />
          <label htmlFor="ciudadHab">Ciudad de Habitación</label>
        </span>
        <span className="p-float-label field">
          <Dropdown
            className="w-full"
            id="estadoHab"
            value={estadoHab}
            options={tiposEstados?.obtenerEstados.response}
            onChange={(e) => setEstado(e.value)}
            optionLabel="nombre"
            optionValue="id"
            disabled
          />
          <label htmlFor="estadoHab">Estado de Habitación</label>
        </span>
        <span className="p-float-label field">
          <Dropdown
            className="w-full"
            id="municipioHab"
            value={municipioHab}
            options={tiposMunicipios?.obtenerMunicipios.response}
            onChange={(e) => setMunicipio(e.value)}
            optionLabel="nombre"
            optionValue="id"
            disabled
          />
          <label htmlFor="municipioHab">Municipio de Habitación</label>
        </span>
        <span className="p-float-label field">
          <Dropdown
            className="w-full"
            id="parroquiaHab"
            value={parroquiaHab}
            options={tiposParroquias?.obtenerParroquias.response}
            onChange={(e) => setParroquia(e.value)}
            optionLabel="nombre"
            optionValue="id"
            disabled
          />
          <label htmlFor="parroquiaHab">Parroquia de Habitación</label>
        </span>
        <span className="p-float-label field">
          <InputText
            className="w-full"
            id="zonaPostal"
            value={zonaPostal}
            onChange={(e) => setZonaPostal(e.target.value)}
            autoComplete="off"
            disabled
          />
          <label htmlFor="zonaPostal">Zona Postal</label>
        </span>
      </div>
      {/*  eslint-disable-next-line react/no-unknown-property */}
      <style jsx global>{`
        .p-button.p-button-text:enabled:active,
        .p-button.p-button-text:not(button):not(a):not(.p-disabled):active,
        .p-button.p-button-outlined:enabled:active,
        .p-button.p-button-outlined:not(button):not(a):not(.p-disabled):active {
          background: rgb(204 57 23/75%);
          color: white;
        }
        .p-button.p-button-text:enabled:hover,
        .p-button.p-button-text:not(button):not(a):not(.p-disabled):hover {
          background: #88250e;
          color: #fff;
          border-color: transparent;
        }
        .p-button.p-button-text {
          background-color: #3452b4;
          color: #ffffff;
          border-color: transparent;
        }
        .p-disabled,
        .p-component:disabled {
          opacity: 1;
        }
      `}</style>
    </Dialog>
  )
}
export default DialogDatosEstudiantes

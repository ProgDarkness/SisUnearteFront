import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import { Button } from 'primereact/button'
import { useEffect, useRef, useState } from 'react'
import { InputMask } from 'primereact/inputmask'
import { ConfirmDialog } from 'primereact/confirmdialog'
import { BlockUI } from 'primereact/blockui'
import { Divider } from 'primereact/divider'
import GQLConsultasGenerales from 'graphql/consultasGenerales'
import GQLUsuarios from 'graphql/usuarios'
import useSWR from 'swr'
import { useSesion } from 'hooks/useSesion'
import request from 'graphql-request'
import { Toast } from 'primereact/toast'

const RegistroPrevio = ({ data }) => {
  const { nacionalidadUser, cedUsuario, nbUsuario, apUsuario, idUser } =
    useSesion()
  const toast = useRef(null)

  const [nacionalidad, setNacionalidad] = useState(null)
  const [cedula, setCedula] = useState('')
  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [segundo_Nombre, setSegundo_Nombre] = useState('')
  const [segundo_Apellido, setSegundo_Apellido] = useState('')
  const [correoElectronico, setCorreoElectronico] = useState('')
  const [fechanaci, setFechaNaci] = useState(null)
  const [paisNacimiento, setPaisNacimiento] = useState(null)
  const [discapacidad, setDiscapacidad] = useState(null)
  const [etnia, setEtnia] = useState(null)
  const [sexo, setSexo] = useState(null)
  const [estadoCivil, setEstadoCivil] = useState(null)
  const [pais, setPais] = useState(null)
  const [estado, setEstado] = useState(null)
  const [municipio, setMunicipio] = useState(null)
  const [ciudad, setCiudad] = useState(null)
  const [parroquia, setParroquia] = useState(null)
  const [tipoDeZona, setTipoDeZona] = useState(null)
  const [nombreDeZona, setNombreDeZona] = useState('')
  const [tipoDeVia, setTipoDeVia] = useState(null)
  const [nombreDeVia, setNombreDeVia] = useState('')
  const [tipoDeVivienda, setTipoDeVivienda] = useState(null)
  const [numeroDeVivienda, setNumeroDeVivienda] = useState('')
  const [confirmRegistrar, setConfirmRegistrar] = useState(false)
  const [blockedPanel, setBlockedPanel] = useState(false)
  const [evalToFormForPais, setEvalToFormForPais] = useState(true)

  const { data: infoUser } = useSWR(
    idUser ? [GQLUsuarios.GET_INFO_USER_REG, { id_usuario: idUser }] : null
  )

  function isValidDate(date) {
    const [day, month, year] = date.split('/')
    const dateObject = new Date(year, month - 1, day)

    if (new Date(year, month, 0).getDate() < day) {
      return true
    }

    if (!(parseInt(month) <= 12)) {
      return true
    }

    if (dateObject.getFullYear() < 1910 || dateObject.getFullYear() > 2007) {
      return true
    }

    return false
  }

  function validateDate(fecha) {
    if (fecha) {
      if (isValidDate(fecha)) {
        toast.current.show({
          severity: 'error',
          summary: '¡ Atención !',
          detail: 'Fecha Invalida'
        })
        setFechaNaci(null)
      }
    }
  }

  useEffect(() => {
    if (infoUser?.getInfoUsuario.response) {
      setNacionalidad(infoUser?.getInfoUsuario.response.nacionalidad)
      setCedula(infoUser?.getInfoUsuario.response.ced_usuario)
      setNombre(infoUser?.getInfoUsuario.response.nb_usuario)
      setSegundo_Nombre(infoUser?.getInfoUsuario.response.nb2_usuario)
      setApellido(infoUser?.getInfoUsuario.response.ape_usuario)
      setSegundo_Apellido(infoUser?.getInfoUsuario.response.ape2_usuario)
      setCorreoElectronico(infoUser?.getInfoUsuario.response.correoElectronico)
      setSexo(infoUser?.getInfoUsuario.response.sexo)
      setPaisNacimiento(infoUser?.getInfoUsuario.response.paisNac)
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
      setPais(infoUser?.getInfoUsuario.response.pais)
      setEstado(infoUser?.getInfoUsuario.response.estado)
      setMunicipio(infoUser?.getInfoUsuario.response.municipio)
      setCiudad(infoUser?.getInfoUsuario.response.ciudad)
      setParroquia(infoUser?.getInfoUsuario.response.parroquia)
      setTipoDeZona(infoUser?.getInfoUsuario.response.tpZona)
      setTipoDeVia(infoUser?.getInfoUsuario.response.tpVia)
      setNombreDeVia(infoUser?.getInfoUsuario.response.nb_via)
      setNombreDeZona(infoUser?.getInfoUsuario.response.nombZona)
      setTipoDeVivienda(infoUser?.getInfoUsuario.response.tpVivienda)
      setNumeroDeVivienda(infoUser?.getInfoUsuario.response.nu_vivienda)
      setDiscapacidad(infoUser?.getInfoUsuario.response.discapacidad)
      setBlockedPanel(infoUser?.getInfoUsuario.response.bl_registro)
      setEtnia(infoUser?.getInfoUsuario.response.etnia)
    }
  }, [infoUser])

  useEffect(() => {
    if (nacionalidadUser && cedUsuario && nbUsuario && apUsuario) {
      setNacionalidad(nacionalidadUser)
      setCedula(cedUsuario)
      setNombre(nbUsuario)
      setApellido(apUsuario)
    }
  }, [
    nacionalidadUser,
    cedUsuario,
    nbUsuario,
    apUsuario,
    cedula,
    nombre,
    apellido,
    segundo_Nombre,
    segundo_Apellido,
    correoElectronico,
    fechanaci,
    paisNacimiento,
    paisNacimiento,
    discapacidad,
    sexo,
    estadoCivil,
    pais,
    estado,
    municipio,
    ciudad,
    parroquia,
    tipoDeZona,
    nombreDeZona,
    tipoDeVia,
    tipoDeVivienda,
    nombreDeVia,
    numeroDeVivienda
  ])

  useEffect(() => {
    const valueInVenezuela =
      !nacionalidad ||
      !cedula ||
      !nombre ||
      !segundo_Nombre ||
      !apellido ||
      !segundo_Apellido ||
      !sexo ||
      fechanaci.includes('_') ||
      !fechanaci ||
      !discapacidad ||
      !estadoCivil ||
      !pais ||
      !ciudad ||
      !estado ||
      !municipio ||
      !parroquia ||
      !nombreDeZona ||
      !tipoDeZona ||
      !tipoDeVia ||
      !nombreDeVia ||
      !tipoDeVivienda ||
      !numeroDeVivienda ||
      !etnia

    const valueNotInVenezuela =
      !nacionalidad ||
      !cedula ||
      !nombre ||
      !segundo_Nombre ||
      !apellido ||
      !segundo_Apellido ||
      !sexo ||
      fechanaci?.includes('_') ||
      !fechanaci ||
      !discapacidad ||
      !estadoCivil ||
      !pais ||
      !estado ||
      !tipoDeZona ||
      !tipoDeVia ||
      !nombreDeVia ||
      !tipoDeVivienda ||
      !numeroDeVivienda

    if (pais?.id === '239') {
      setEvalToFormForPais(valueInVenezuela)
    } else {
      setEvalToFormForPais(valueNotInVenezuela)
    }
  }, [
    nacionalidad,
    cedula,
    nombre,
    segundo_Nombre,
    apellido,
    segundo_Apellido,
    sexo,
    fechanaci,
    discapacidad,
    estadoCivil,
    pais,
    ciudad,
    estado,
    municipio,
    parroquia,
    nombreDeZona,
    tipoDeZona,
    tipoDeVia,
    nombreDeVia,
    tipoDeVivienda,
    numeroDeVivienda,
    etnia
  ])

  const savePerfilUser = (variables) => {
    return request(
      process.env.NEXT_PUBLIC_URL_BACKEND,
      GQLUsuarios.SAVE_PERFIL_USER,
      variables
    )
  }

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  function registra() {
    const InputActualizarUsuario = {
      idnacionalidad: parseInt(nacionalidad?.id),
      cedula,
      nombre,
      apellido,
      nombre2: segundo_Nombre,
      apellido2: segundo_Apellido,
      sexo: parseInt(sexo?.id),
      fenac: fechanaci,
      idpaisorigen: parseInt(paisNacimiento?.id),
      idcivil: parseInt(estadoCivil?.id),
      correo: correoElectronico,
      idtpvia: parseInt(tipoDeVia?.id),
      nbtpvia: nombreDeVia,
      idtpzona: parseInt(tipoDeZona?.id),
      nbzona: nombreDeZona?.nombre,
      idtpvivienda: parseInt(tipoDeVivienda?.id),
      nuvivienda: numeroDeVivienda,
      idciudad: parseInt(ciudad?.id),
      idestado: parseInt(estado?.id),
      idpais: parseInt(pais?.id),
      idmunicipio: parseInt(municipio?.id),
      idparroquia: parseInt(parroquia?.id),
      idpostal: parseInt(nombreDeZona?.codigo_postal),
      blregistro: true,
      idusuario: idUser,
      idZona: parseInt(nombreDeZona.id),
      idDiscapacidad: parseInt(discapacidad.id),
      idEtnia: parseInt(etnia.id)
    }

    setConfirmRegistrar(true)
    savePerfilUser({ InputActualizarUsuario }).then(
      ({ actualizarUsuario: { status, message, type } }) => {
        toast.current.show({
          severity: type,
          summary: '¡ Atención !',
          detail: message
        })
      }
    )
  }

  const { data: estadosPorPais } = useSWR(
    pais
      ? [
          GQLConsultasGenerales.GET_ESTADOS_POR_PAIS,
          {
            InputPais: {
              pais: parseInt(pais.id)
            }
          }
        ]
      : null
  )

  const { data: municipiosPorEstado } = useSWR(
    estado
      ? [
          GQLConsultasGenerales.GET_MUNICIPIOS_POR_ESTADO,
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
          GQLConsultasGenerales.GET_CIUDADES_POR_ESTADO,
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
          GQLConsultasGenerales.GET_PARROQUIAS_POR_MUNICIPIO,
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
          GQLConsultasGenerales.GET_ZONAS_POR_PARROQUIA,
          {
            InputParroquia: {
              parroquia: parseInt(parroquia.id)
            }
          }
        ]
      : null
  )

  const { data: tiposEtnias } = useSWR(GQLConsultasGenerales.GET_ETNIAS)

  const accept = () => {
    const evaluEmail = validateEmail(correoElectronico)

    if (evaluEmail) {
      setBlockedPanel(true)
      registra()
    } else {
      setCorreoElectronico('')
      toast.current.show({
        severity: 'error',
        summary: '¡ Atención !',
        detail: 'El correo debe ser una dirrecion de correo valida'
      })
    }
  }

  const reject = () => {
    setConfirmRegistrar(false)
  }

  return (
    <div className="m-2 -mt-2">
      <Toast ref={toast} />
      <div className="w-full text-center">
        <h1 className="text-3xl font-semibold text-white text-center mr-32 mb-6 -mt-3">
          Registro Previo
        </h1>
      </div>

      <BlockUI
        blocked={blockedPanel}
        template={
          <i
            className="pi pi-lock"
            style={{ fontSize: '3rem', color: '#ffffff40' }}
          />
        }
        className="rounded-lg"
      >
        <div className="grid grid-cols-5 gap-4 mt-4 p-4">
          <span className="p-float-label field">
            <Dropdown
              className="w-full"
              id="nacionalidad"
              options={data?.nacionalidades.obtenerNacionalidades.response}
              value={nacionalidad}
              onChange={(e) => {
                setNacionalidad(e.value)
              }}
              optionLabel="codigo"
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
            />
            <label htmlFor="cedula">Cédula</label>
          </span>
          <span className="p-float-label field">
            <InputText
              className="w-full"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value.toUpperCase())}
              autoComplete="off"
            />
            <label htmlFor="nombre">Nombre</label>
          </span>
          <span className="p-float-label field">
            <InputText
              className="w-full"
              id="apellido"
              value={apellido}
              onChange={(e) => setApellido(e.target.value.toUpperCase())}
              autoComplete="off"
            />
            <label htmlFor="apellido">Apellido</label>
          </span>
          <span className="p-float-label field">
            <InputText
              className="w-full"
              id="segundo_Nombre"
              value={segundo_Nombre}
              onChange={(e) => setSegundo_Nombre(e.target.value.toUpperCase())}
              autoComplete="off"
            />
            <label htmlFor="segundo_Nombre">Segundo Nombre</label>
          </span>
          <span className="p-float-label field">
            <InputText
              className="w-full"
              id="segundo_Apellido"
              value={segundo_Apellido}
              onChange={(e) =>
                setSegundo_Apellido(e.target.value.toUpperCase())
              }
              autoComplete="off"
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
              onBlur={() => validateDate(fechanaci)}
            />
            <label htmlFor="fechanaci">Fecha de nacimiento</label>
          </span>
          <span className="p-float-label field">
            <Dropdown
              className="w-full"
              id="paisNacimiento"
              options={data?.paises.obtenerPaises.response}
              value={paisNacimiento}
              onChange={(e) => {
                setPaisNacimiento(e.value)
              }}
              filter
              filterBy="nombre"
              optionLabel="nombre"
            />
            <label htmlFor="paisNacimiento">Pais Nacimiento</label>
          </span>
          <span className="p-float-label field">
            <Dropdown
              className="w-full"
              id="discapacidad"
              options={data?.discapacidades.obtenerDiscapacidades.response}
              value={discapacidad}
              onChange={(e) => setDiscapacidad(e.target.value)}
              optionLabel="nombre"
            />
            <label htmlFor="discapacidad">Discapacidad</label>
          </span>
          <span className="p-float-label field">
            <Dropdown
              className="w-full"
              id="sexo"
              options={data?.sexos.obtenerSexos.response}
              value={sexo}
              onChange={(e) => {
                setSexo(e.value)
              }}
              optionLabel="nombre"
            />
            <label htmlFor="sexo">Sexo</label>
          </span>
        </div>
      </BlockUI>
      <div className="grid grid-cols-5 gap-4">
        <Divider className="col-span-5" />
        <span className="p-float-label field">
          <Dropdown
            className="w-full"
            id="estadoCivil"
            options={data?.estados_civiles.obtenerEstadoCivil.response}
            value={estadoCivil}
            onChange={(e) => {
              setEstadoCivil(e.value)
            }}
            optionLabel="nombre"
          />
          <label htmlFor="estadoCivil">Estado Civil</label>
        </span>
        <span className="p-float-label field">
          <Dropdown
            className="w-full"
            id="pais"
            options={data?.paises.obtenerPaises.response}
            value={pais}
            onChange={(e) => {
              setPais(e.value)
              setEstado(null)
              setMunicipio(null)
              setCiudad(null)
              setParroquia(null)
              setNombreDeZona(null)
            }}
            filter
            filterBy="nombre"
            optionLabel="nombre"
          />
          <label htmlFor="pais">Pais</label>
        </span>
        <span className="p-float-label field">
          <Dropdown
            className="w-full"
            id="estado"
            options={estadosPorPais?.obtenerEstadosPorPais.response}
            value={estado}
            onChange={(e) => {
              setEstado(e.target.value)
              setMunicipio(null)
              setCiudad(null)
              setParroquia(null)
              setNombreDeZona(null)
            }}
            optionLabel="nombre"
            emptyMessage="Seleccione un pais"
          />
          <label htmlFor="estado">Estado</label>
        </span>
        {pais === null || parseInt(pais?.id) === 239 ? (
          <span className="p-float-label field">
            <Dropdown
              className="w-full"
              id="etnia"
              options={tiposEtnias?.obtenerEtnia.response}
              value={etnia}
              onChange={(e) => {
                setEtnia(e.target.value)
              }}
              optionLabel="nombre"
              emptyMessage="Seleccione un estado"
            />
            <label htmlFor="etnia">Etnia</label>
          </span>
        ) : (
          ''
        )}
        {pais === null || parseInt(pais?.id) === 239 ? (
          <span className="p-float-label field">
            <Dropdown
              className="w-full"
              id="municipio"
              options={municipiosPorEstado?.obtenerMunicipiosPorEstado.response}
              value={municipio}
              onChange={(e) => {
                setMunicipio(e.target.value)
                setCiudad(null)
                setParroquia(null)
                setNombreDeZona(null)
              }}
              optionLabel="nombre"
              emptyMessage="Seleccione un estado"
            />
            <label htmlFor="municipio">Municipio</label>
          </span>
        ) : (
          ''
        )}
        {pais === null || parseInt(pais?.id) === 239 ? (
          <span className="p-float-label field">
            <Dropdown
              className="w-full"
              id="ciudad"
              options={ciudadesPorEstado?.obtenerCiudadesPorEstado.response}
              value={ciudad}
              onChange={(e) => {
                setCiudad(e.target.value)
                setParroquia(null)
                setNombreDeZona(null)
              }}
              optionLabel="nombre"
              emptyMessage="Seleccione un estado"
            />
            <label htmlFor="ciudad">Ciudad</label>
          </span>
        ) : (
          ''
        )}
        {pais === null || parseInt(pais?.id) === 239 ? (
          <span className="p-float-label field">
            <Dropdown
              className="w-full"
              id="parroquia"
              options={
                parroquiasPorMunicipio?.obtenerParrquiasPorMunicipio.response
              }
              value={parroquia}
              onChange={(e) => {
                setParroquia(e.target.value)
                setNombreDeZona(null)
              }}
              optionLabel="nombre"
              emptyMessage="Seleccione un municipio"
            />
            <label htmlFor="parroquia">Parroquia</label>
          </span>
        ) : (
          ''
        )}
        <span className="p-float-label field">
          <Dropdown
            className="w-full"
            id="tipoDeZona"
            options={data?.tipos_zona.obtenerTipoZona.response}
            value={tipoDeZona}
            onChange={(e) => setTipoDeZona(e.target.value)}
            optionLabel="nombre"
          />
          <label htmlFor="tipoDeZona">Tipo De Zona</label>
        </span>
        {pais === null || parseInt(pais?.id) === 239 ? (
          <span className="p-float-label field">
            <Dropdown
              className="w-full"
              id="nombreDeZona"
              options={zonasPorParroquias?.obtenerZonasPorParroquias.response}
              value={nombreDeZona}
              onChange={(e) => setNombreDeZona(e.target.value)}
              optionLabel="nombre"
              emptyMessage="Seleccione una parroquia"
            />
            <label htmlFor="nombreDeZona">Nombre de Zona</label>
          </span>
        ) : (
          ''
        )}
        {pais === null || parseInt(pais?.id) === 239 ? (
          <span className="p-float-label field">
            <InputText
              className="w-full"
              id="zonaPostal"
              value={nombreDeZona?.codigo_postal || ''}
              autoComplete="off"
            />
            <label htmlFor="zonaPostal">Zona Postal</label>
          </span>
        ) : (
          ''
        )}
        <span className="p-float-label field">
          <Dropdown
            className="w-full"
            id="tipoDeVia"
            options={data?.tipos_via.obtenerTipoVia.response}
            value={tipoDeVia}
            onChange={(e) => setTipoDeVia(e.target.value)}
            optionLabel="nombre"
          />
          <label htmlFor="tipoDeVia">Tipo de via</label>
        </span>
        <span className="p-float-label field">
          <InputText
            className="w-full"
            id="nombreDeVia"
            value={nombreDeVia}
            onChange={(e) => setNombreDeVia(e.target.value.toUpperCase())}
            autoComplete="off"
          />
          <label htmlFor="nombreDeVia">Nombre De Via</label>
        </span>
        <span className="p-float-label field">
          <Dropdown
            className="w-full"
            id="tipoDeVivienda"
            options={data?.tipos_vivienda.obtenerTipoVivienda.response}
            value={tipoDeVivienda}
            onChange={(e) => setTipoDeVivienda(e.target.value)}
            optionLabel="nombre"
          />
          <label htmlFor="tipoDeVivienda">Tipo De Vivienda</label>
        </span>
        <span className="p-float-label field">
          <InputText
            className="w-full"
            id="numeroDeVivienda"
            value={numeroDeVivienda}
            keyfilter="pint"
            maxLength={4}
            onChange={(e) => setNumeroDeVivienda(e.target.value)}
            autoComplete="off"
          />
          <label htmlFor="numeroDeVivienda">Numero De Vivienda</label>
        </span>

        <ConfirmDialog
          draggable={false}
          resizable={false}
          className="bg-[#805e5e]"
          visible={confirmRegistrar}
          acceptLabel="Si"
          rejectLabel="No"
          onHide={() => setConfirmRegistrar(false)}
          message="Estas seguro que deseas confirmar la informacion ingresada?"
          header="Confirmar"
          icon="pi pi-exclamation-triangle"
          accept={accept}
          reject={reject}
        />

        <Button
          icon="pi pi-check"
          label={
            infoUser?.getInfoUsuario.response?.bl_registro
              ? 'Guardar'
              : 'Registrarse'
          }
          onClick={() => setConfirmRegistrar(true)}
          disabled={evalToFormForPais}
        />
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
      `}</style>
    </div>
  )
}

export default RegistroPrevio

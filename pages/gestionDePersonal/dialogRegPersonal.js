import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import { ConfirmDialog } from 'primereact/confirmdialog'
import Image from 'next/image'
import { Card } from 'primereact/card'
import { Divider } from 'primereact/divider'
import usuario from 'public/images/usuario.png'
import GQLconsultasGenerales from 'graphql/consultasGenerales'
import GQLpersonal from 'graphql/personal'
import useSWR from 'swr'
import { useEffect, useRef, useState } from 'react'
import request from 'graphql-request'
import { Toast } from 'primereact/toast'
import CryptoJS from 'crypto-js'
import GQLdocumentoFoto from 'graphql/documentoFoto'

const { Dialog } = require('primereact/dialog')

const DialogRegPersonal = ({
  activeDialogRegPersonal,
  setActiveDialogRegPersonal,
  mutatePersonal
}) => {
  const toast = useRef(null)
  const [disabledLoadImage, setDisabledLoadImage] = useState(true)
  const [idUser, setIdUserPesonal] = useState(null)
  const [tpNacionalidad, setTpNacionalidad] = useState(null)
  const [cedulaPersonal, setCedulaPersonal] = useState('')
  const [nombrePersonal, setNombrePersonal] = useState('')
  const [apellidoPersonal, setApellidoPersonal] = useState('')
  const [tlffijoPersonal, setTlffijoPersonal] = useState('')
  const [tlfmovilPersonal, setTlfmovilPersonal] = useState('')
  const [correoPersonal, setCorreoPersonal] = useState('')
  const [cargaPersonal, setCargaPersonal] = useState('')
  const [tpProfesion, setProfesiones] = useState(null)
  const [tpPersonal, setTpPersonal] = useState(null)
  const [tpSexo, setTpSexo] = useState(null)
  const [tpCivil, setTpCivil] = useState(null)
  const [tpDepartamento, setTpDepartamento] = useState(null)
  const [tpRol, setTpRol] = useState(null)
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
  const [imagenPerfil, setImagenPerfil] = useState(null)
  const [idImagenPerfil, setIdImagenPerfil] = useState(null)
  const [dialogConfirmEliminarFotoPerfil, setDialogConfirmEliminarFotoPerfil] =
    useState(false)

  const { data: tiposNacionalidad } = useSWR(
    GQLconsultasGenerales.GET_NACIONALIDADES
  )
  const { data: tiposProfesiones } = useSWR(
    GQLconsultasGenerales.GET_PROFESIONES
  )
  const { data: tiposPersonal } = useSWR(
    GQLconsultasGenerales.GET_TIPO_PERSONAL
  )
  const { data: tiposSexo } = useSWR(GQLconsultasGenerales.GET_SEXO)
  const { data: tiposCivil } = useSWR(GQLconsultasGenerales.GET_ESTADOS_CIVILES)
  const { data: tiposDepartamento } = useSWR(
    GQLconsultasGenerales.GET_DEPARTAMENTO
  )
  const { data: tiposRol } = useSWR(GQLconsultasGenerales.GET_ROLES)

  const { data: tiposZonas } = useSWR(GQLconsultasGenerales.GET_TIPO_ZONAS)

  const { data: tiposVias } = useSWR(GQLconsultasGenerales.GET_TIPO_VIAS)

  const { data: tiposViviendas } = useSWR(
    GQLconsultasGenerales.GET_TIPO_VIVIENDA
  )

  const crearPersonal = (variables) => {
    return request(
      process.env.NEXT_PUBLIC_URL_BACKEND,
      GQLpersonal.SAVE_PERSONAL,
      variables
    )
  }

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  function validate(correo) {
    const evaluEmail = validateEmail(correoPersonal)

    if (!evaluEmail) {
      setCorreoPersonal('')
      toast.current.show({
        severity: 'error',
        summary: '¡ Atención !',
        detail: 'El correo debe ser una dirrecion de correo valida'
      })
    }
  }

  const registrarPersonal = () => {
    const InputPersonal = {
      clave: CryptoJS.AES.encrypt(
        cedulaPersonal,
        process.env.NEXT_PUBLIC_SECRET_KEY
      ).toString(),
      username: nombrePersonal.toLowerCase(),
      rol: parseInt(tpRol),
      nacionalidad: parseInt(tpNacionalidad),
      cedula: parseInt(cedulaPersonal),
      nombre: nombrePersonal,
      apellido: apellidoPersonal,
      tlffijo: tlffijoPersonal,
      tlfmovil: tlfmovilPersonal,
      correo: correoPersonal,
      tipo: parseInt(tpPersonal),
      cargahoraria: parseInt(cargaPersonal),
      profesion: parseInt(tpProfesion),
      sexo: parseInt(tpSexo),
      civil: parseInt(tpCivil),
      departamento: parseInt(tpDepartamento),
      pais: parseInt(pais?.id) || null,
      estado: parseInt(estado?.id) || null,
      municipio: parseInt(municipio?.id) || null,
      parroquia: parseInt(parroquia?.id) || null,
      zona: parseInt(tipoDeZona?.id) || null,
      nbzona: nombreDeVia,
      zonapostal: parseInt(nombreDeZona?.codigo_postal) || null,
      via: parseInt(tipoDeVia?.id) || null,
      nbvia: nombreDeVia,
      vivienda: parseInt(tipoDeVivienda?.id) || null,
      nbvivienda: numeroDeVivienda,
      ciudad: parseInt(ciudad?.id) || null
    }
    crearPersonal({ InputPersonal }).then(
      ({ crearPersonal: { status, message, type, response } }) => {
        setIdUserPesonal(response)
        /* setTpNacionalidad('')
        setCedulaPersonal('')
        setNombrePersonal('')
        setApellidoPersonal('')
        setTlffijoPersonal('')
        setTlfmovilPersonal('')
        setCorreoPersonal('')
        setCargaPersonal('')
        setTpPersonal(null)
        setProfesiones(null)
        setTpSexo('')
        setTpCivil('')
        setTpDepartamento('')
        setTpRol(null) */
        toast.current.show({
          severity: type,
          summary: '¡ Atención !',
          detail: message
        })
        setTimeout(() => {
          toast.current.show({
            severity: 'warn',
            summary: '¡ Atención !',
            detail:
              'Debe Cargar la imagen del personal para finalizar el registro'
          })
          setTimeout(() => {
            setDisabledLoadImage(false)
            adjuntarArchivo()
          }, 1000)
        }, 1000)
        mutatePersonal()
      }
    )
  }

  const { data: paises } = useSWR(GQLconsultasGenerales.GET_PAISES)

  // DIRECCION DE HABITACION
  const { data: estadosPorPais } = useSWR(
    pais
      ? [
          GQLconsultasGenerales.GET_ESTADOS_POR_PAIS,
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

  const { data: fotoPerfil, mutate: mutateImage } = useSWR(
    idUser ? [GQLdocumentoFoto.GET_FOTO, { idUser }] : null
  )

  useEffect(() => {
    if (fotoPerfil?.obtenerFotoPerfilUsuario.response) {
      setImagenPerfil(fotoPerfil?.obtenerFotoPerfilUsuario.response.archivo)
      setIdImagenPerfil(fotoPerfil?.obtenerFotoPerfilUsuario.response.id)
    }
  }, [fotoPerfil])

  const eliminarFotoEstudiante = (variables) => {
    return request(
      process.env.NEXT_PUBLIC_URL_BACKEND,
      GQLdocumentoFoto.ELIMINAR_FOTO,
      variables
    )
  }

  const acceptEliminarFotoPerfil = () => {
    const InputEliminarFotoPerfilUsuario = {
      idFotoEstudiante: parseInt(idImagenPerfil)
    }

    eliminarFotoEstudiante({ InputEliminarFotoPerfilUsuario }).then(
      ({ eliminarFotoEstudiante: { message } }) => {
        setIdImagenPerfil(null)
        toast.current.show({
          severity: 'error',
          summary: '¡ Atención !',
          detail: message
        })

        setImagenPerfil(null)
        setTimeout(() => {
          mutateImage()
        }, 1000)
      }
    )
  }

  const rejectEliminarFotoPerfil = () => {
    setDialogConfirmEliminarFotoPerfil(false)
  }

  const onChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = handleReaderLoaded.bind(this)
      reader.readAsBinaryString(file)
    }
  }

  const handleReaderLoaded = (e) => {
    const binaryString = e.target.result
    const transImage = btoa(binaryString)
    /* setExtension(binaryString.type) */
    registraFoto(transImage)
  }

  function registraFoto(imagen) {
    const InputFotoEstudiante = {
      archivo: imagen,
      idUsuario: idUser
    }

    saveFotoPerfilUser({ InputFotoEstudiante }).then(
      ({ crearFotoEstudiante: { status, message, type } }) => {
        toast.current.show({
          severity: type,
          summary: '¡ Atención !',
          detail: message
        })
        setTimeout(() => {
          setActiveDialogRegPersonal(false)
          mutateImage()
        }, 1000)
      }
    )
  }

  const saveFotoPerfilUser = (imagen) => {
    return request(
      process.env.NEXT_PUBLIC_URL_BACKEND,
      GQLdocumentoFoto.SAVE_FOTO,
      imagen,
      idUser
    )
  }

  const header = (
    <>
      {imagenPerfil ? (
        <img
          src={`data:image/png;base64,${imagenPerfil}`}
          width={40}
          height={50}
        />
      ) : (
        <Image
          src={usuario}
          loading="eager"
          fill="true"
          sizes="(max-width: 10vw) 40%"
          priority={true}
          className="rounded-lg"
        />
      )}
    </>
  )

  const adjuntarArchivo = () => {
    document.querySelector('#file').click()
  }

  const footer = (
    <>
      <div
        className="inline-flex rounded-md shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
        role="group"
      >
        <Button
          icon="pi pi-minus-circle"
          className="p-button-danger"
          tooltipOptions={{ position: 'top' }}
          onClick={() => {
            setDialogConfirmEliminarFotoPerfil(true)
            setIdImagenPerfil(idImagenPerfil)
          }}
          disabled={disabledLoadImage}
        />
        <Button
          icon="pi pi-paperclip"
          tooltip="Adjuntar"
          tooltipOptions={{ position: 'top' }}
          onClick={() => adjuntarArchivo()}
          className="ml-2"
          disabled={disabledLoadImage}
        />
        <input
          type="file"
          name="image"
          id="file"
          accept=".jpg, .jpeg, .png"
          onChange={(e) => onChange(e)}
          style={{ display: 'none' }}
        />
      </div>
    </>
  )

  return (
    <>
      <Toast ref={toast} />
      <Dialog
        header="Registrar Personal"
        visible={activeDialogRegPersonal}
        onHide={() => setActiveDialogRegPersonal(false)}
        style={{ width: '80%' }}
      >
        <ConfirmDialog
          visible={dialogConfirmEliminarFotoPerfil}
          onHide={() => setDialogConfirmEliminarFotoPerfil(false)}
          message="¿Esta seguro que desea eliminar la foto?"
          header="Confirmación"
          icon="pi pi-exclamation-triangle"
          accept={acceptEliminarFotoPerfil}
          reject={rejectEliminarFotoPerfil}
          acceptLabel="SI"
          rejectLabel="NO"
        />
        <div className="flex flex-col">
          <div>
            <div className="flex flex-row">
              <div className="tab-content justify-center rounded-lg w-5/6 h-96 pr-3 pl-3 pt-4">
                <h1 className="text-3xl font-semibold text-white text-left mr-32 mb-6 -mt-3">
                  Datos Personales
                </h1>
                <Divider className="col-span-5" />
                <div className="text-white -mt-2">
                  <div className="flex">
                    <div className="grid grid-cols-4 gap-4 mt-4 p-4">
                      <span className="p-float-label field">
                        <Dropdown
                          className="w-full"
                          id="nacionalidad"
                          value={tpNacionalidad}
                          options={
                            tiposNacionalidad?.obtenerNacionalidades.response
                          }
                          onChange={(e) => setTpNacionalidad(e.value)}
                          optionLabel="nombre"
                          optionValue="id"
                        />
                        <label htmlFor="nacionalidad">Nacionalidad</label>
                      </span>
                      <span className="p-float-label field">
                        <InputText
                          className="w-full"
                          id="cedula"
                          value={cedulaPersonal}
                          onChange={(e) => setCedulaPersonal(e.target.value)}
                          autoComplete="off"
                          maxLength={8}
                          keyfilter="pint"
                        />
                        <label htmlFor="cedula">Cédula de Identidad</label>
                      </span>
                      <span className="p-float-label field">
                        <InputText
                          className="w-full"
                          id="nombre"
                          value={nombrePersonal}
                          onChange={(e) =>
                            setNombrePersonal(e.target.value.toUpperCase())
                          }
                          autoComplete="off"
                        />
                        <label htmlFor="nombre">Nombre</label>
                      </span>
                      <span className="p-float-label field">
                        <InputText
                          className="w-full"
                          id="apellido"
                          value={apellidoPersonal}
                          onChange={(e) =>
                            setApellidoPersonal(e.target.value.toUpperCase())
                          }
                          autoComplete="off"
                        />
                        <label htmlFor="apellido">Apellido</label>
                      </span>
                      <span className="p-float-label field">
                        <Dropdown
                          className="w-full"
                          id="sexo"
                          value={tpSexo}
                          options={tiposSexo?.obtenerSexos.response}
                          onChange={(e) => setTpSexo(e.value)}
                          optionLabel="nombre"
                          optionValue="id"
                        />
                        <label htmlFor="sexo">Sexo</label>
                      </span>
                      <span className="p-float-label field">
                        <Dropdown
                          className="w-full"
                          id="civil"
                          value={tpCivil}
                          options={tiposCivil?.obtenerEstadoCivil.response}
                          onChange={(e) => setTpCivil(e.value)}
                          optionLabel="nombre"
                          optionValue="id"
                        />
                        <label htmlFor="civil">Estado Civil</label>
                      </span>
                      <span className="p-float-label field">
                        <InputText
                          className="w-full"
                          id="tlffijo"
                          value={tlffijoPersonal}
                          onChange={(e) => setTlffijoPersonal(e.target.value)}
                          keyfilter="pint"
                          maxLength={11}
                        />
                        <label htmlFor="tlffijo">Teléfono Fijo</label>
                      </span>
                      <span className="p-float-label field">
                        <InputText
                          className="w-full"
                          id="tlfmovil"
                          value={tlfmovilPersonal}
                          onChange={(e) => setTlfmovilPersonal(e.target.value)}
                          keyfilter="pint"
                          maxLength={11}
                        />
                        <label htmlFor="tlfmovil">Teléfono Móvil</label>
                      </span>
                      <span className="p-float-label field">
                        <InputText
                          className="w-full"
                          id="correo"
                          value={correoPersonal}
                          onChange={(e) => setCorreoPersonal(e.target.value)}
                          onBlur={() => validate(correoPersonal)}
                        />
                        <label htmlFor="correo">Correo Electrónico</label>
                      </span>
                      <span className="p-float-label field">
                        <Dropdown
                          className="w-full"
                          id="tipo"
                          value={tpPersonal}
                          options={tiposPersonal?.obtenerTipoPersonal.response}
                          onChange={(e) => setTpPersonal(e.value)}
                          optionLabel="nombre"
                          optionValue="id"
                        />
                        <label htmlFor="tipo">Tipo de Personal</label>
                      </span>
                      <span className="p-float-label field">
                        <InputText
                          className="w-full"
                          id="cargahoraria"
                          value={cargaPersonal}
                          onChange={(e) => setCargaPersonal(e.target.value)}
                          keyfilter="pint"
                        />
                        <label htmlFor="cargahoraria">Carga Horaria</label>
                      </span>
                      <span className="p-float-label field">
                        <Dropdown
                          className="w-full"
                          id="departamento"
                          value={tpDepartamento}
                          options={
                            tiposDepartamento?.obtenerTipoDepartamento.response
                          }
                          onChange={(e) => setTpDepartamento(e.value)}
                          optionLabel="nombre"
                          optionValue="id"
                        />
                        <label htmlFor="departamento">Departamento</label>
                      </span>
                      <span className="p-float-label field">
                        <Dropdown
                          className="w-full"
                          id="tpRol"
                          value={tpRol}
                          options={tiposRol?.obtenerRoles.response}
                          onChange={(e) => setTpRol(e.value)}
                          optionLabel="nombre"
                          optionValue="id"
                        />
                        <label htmlFor="tpRol">Rol</label>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="justify-center py-1 px-3 w-1/4 h-80">
                <Card
                  style={{ width: '15em' }}
                  footer={footer}
                  header={header}
                ></Card>
              </div>
            </div>
          </div>
        </div>

        <h1 className="text-3xl font-semibold text-white text-left mr-32 mb-6 -mt-3">
          Datos Académicos
        </h1>
        <Divider className="col-span-5" />
        <div className="grid grid-cols-5 gap-4">
          <span className="p-float-label field col-span-2">
            <Dropdown
              className="w-full"
              id="profesion"
              value={tpProfesion}
              options={tiposProfesiones?.obtenerProfesion.response}
              onChange={(e) => setProfesiones(e.value)}
              optionLabel="nombre"
              optionValue="id"
            />
            <label htmlFor="profesion">Profesión</label>
          </span>
        </div>

        <h1 className="text-3xl font-semibold text-white text-left mr-32 mb-6 mt-3">
          Dirección de Habitación
        </h1>
        <Divider className="col-span-5" />
        <div className="grid grid-cols-5 gap-4">
          <span className="p-float-label field">
            <Dropdown
              className="w-full"
              id="pais"
              options={paises?.obtenerPaises.response}
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
                id="municipio"
                options={
                  municipiosPorEstado?.obtenerMunicipiosPorEstado.response
                }
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
              options={tiposZonas?.obtenerTipoZona.response}
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
              options={tiposVias?.obtenerTipoVia.response}
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
              options={tiposViviendas?.obtenerTipoVivienda.response}
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
          <span className="p-float-label field">
            <Button
              label="Registrar"
              icon="pi pi-plus"
              onClick={() => registrarPersonal()}
              disabled={
                !tpNacionalidad ||
                !cedulaPersonal ||
                !nombrePersonal ||
                !apellidoPersonal ||
                !tpSexo ||
                !tpCivil ||
                !tlffijoPersonal ||
                !tlfmovilPersonal ||
                !correoPersonal ||
                !tpPersonal ||
                !tpProfesion ||
                !cargaPersonal ||
                !tpDepartamento
              }
            />
          </span>
        </div>
      </Dialog>
    </>
  )
}

export default DialogRegPersonal

import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { useEffect, useRef, useState } from 'react'
import { Dialog } from 'primereact/dialog'
import GQLconsultasGenerales from 'graphql/consultasGenerales'
import GQLusuarios from 'graphql/usuarios'
import GQLpostulaciones from 'graphql/postulaciones'
import GQLdocumentoFoto from 'graphql/documentoFoto'
import useSWR from 'swr'
import { Divider } from 'primereact/divider'
import { Button } from 'primereact/button'
import request from 'graphql-request'
import { Toast } from 'primereact/toast'
import { useSesion } from 'hooks/useSesion'

const DialogDatosEstudiantes = ({
  activeDialogVerDatosEstudiantes,
  setActiveDialogVerDatosEstudiantes,
  datosVerPostulado
}) => {
  const toast = useRef(null)
  const [nacionalidad, setNacionalidad] = useState('')
  const [cedula, setCedula] = useState('')
  const [nombre, setNombre] = useState('')
  const [segundo_Nombre, setSegundo_Nombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [segundo_Apellido, setSegundo_Apellido] = useState('')
  const [sexo, setSexo] = useState('')
  const [fechanaci, setFechaNaci] = useState('')
  const [discapacidad, setDiscapacidad] = useState('')
  const [paisNacimiento, setPaisNacimiento] = useState('')
  const [ciudadNacimiento, setCiudadNacimiento] = useState('')
  const [estadoNacimiento, setEstadoNacimiento] = useState('')
  const [estadoCivil, setEstadoCivil] = useState('')
  const [correoElectronico, setCorreoElectronico] = useState('')
  const [tipoDeVia, setTipoDeVia] = useState('')
  const [nombreDeVia, setNombreDeVia] = useState('')
  const [tipoDeZona, setTipoDeZona] = useState('')
  const [nombreDeZona, setNombreDeZona] = useState('')
  const [tipoDeVivienda, setTipoDeVivienda] = useState('')
  const [numeroDeVivienda, setNumeroDeVivienda] = useState('')
  const [paisHab, setPais] = useState('')
  const [ciudadHab, setCiudad] = useState('')
  const [estadoHab, setEstado] = useState('')
  const [municipioHab, setMunicipio] = useState('')
  const [parroquiaHab, setParroquia] = useState('')
  const [zonaPostal, setZonaPostal] = useState('')
  const { userName, cedUsuario } = useSesion()
  const [objectDocumentos, setObjectDocumentos] = useState({
    cedula: null,
    rif: null,
    tituloBachiller: null,
    notasCertificadas: null,
    fondoNegro: null
  })

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

  const { data: docsEstudiante } = useSWR(
    datosVerPostulado?.idusuario
      ? [
          GQLpostulaciones.GET_DOCS_ESTUDIANTE,
          { idEstudiante: parseInt(datosVerPostulado?.idusuario) }
        ]
      : null
  )

  const { data: datosRequisitos, mutate } = useSWR(
    datosVerPostulado?.idusuario
      ? [
          GQLconsultasGenerales.GET_TIPO_DOCUMENTO,
          { id_usuario: parseInt(datosVerPostulado?.idusuario) }
        ]
      : null
  )

  useEffect(() => {
    setObjectDocumentos({ ...docsEstudiante?.obtenerDocsEstudiante.docs })
  }, [docsEstudiante])

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

  const guardarDocs = (variables) => {
    return request(
      process.env.NEXT_PUBLIC_URL_BACKEND,
      GQLpostulaciones.SAVE_DOCS_ESTUDIANTE,
      variables
    )
  }

  const guardarDocumentos = () => {
    const inputDocs = {
      idEstudiante: parseInt(datosVerPostulado.idusuario),
      jsonDocs: objectDocumentos
    }

    guardarDocs({ inputDocs }).then(
      ({ guardarDocs: { status, type, message } }) => {
        toast.current.show({
          severity: type,
          summary: '¡ Atención !',
          detail: message
        })
      }
    )
  }

  const aprobaArchivo = (variables) => {
    return request(
      process.env.NEXT_PUBLIC_URL_BACKEND,
      GQLdocumentoFoto.APROBAR_DOCUMENTO_USUARIO,
      variables
    )
  }

  const rechazaArchivo = (variables) => {
    return request(
      process.env.NEXT_PUBLIC_URL_BACKEND,
      GQLdocumentoFoto.RECHAZAR_DOCUMENTO_USUARIO,
      variables
    )
  }

  const buscarArchivo = (variables) => {
    return request(
      process.env.NEXT_PUBLIC_URL_BACKEND,
      GQLdocumentoFoto.BUSCAR_ARCHIVO_USUARIO,
      variables
    )
  }

  const aprobarArchivo = (rowData) => {
    const inputDatosArchivo = {
      idUser: parseInt(datosVerPostulado?.idusuario),
      id_tp_documento: parseInt(rowData.id)
    }
    aprobaArchivo({ inputDatosArchivo }).then(
      ({ aprobarArchivoUsuario: { message, status, type } }) => {
        toast.current.show({
          severity: type,
          summary: '¡ Atención !',
          detail: message,
          life: 3000
        })
        mutate()
      }
    )
  }

  const rechazarArchivo = (rowData) => {
    const inputDatosArchivo = {
      idUser: parseInt(datosVerPostulado?.idusuario),
      id_tp_documento: parseInt(rowData.id)
    }
    rechazaArchivo({ inputDatosArchivo }).then(
      ({ rechazarArchivoUsuario: { message, status, type } }) => {
        toast.current.show({
          severity: type,
          summary: '¡ Atención !',
          detail: message,
          life: 3000
        })
        mutate()
      }
    )
  }

  const dataURLtoBlob = (dataurl) => {
    const arr = dataurl.split(',')
    const mime = arr[0].match(/:(.*?);/)[1]
    const bstr = atob(arr[1])
    let n = bstr.length
    const u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    return new Blob([u8arr], { type: mime })
  }

  const verArchivo = (rowData) => {
    const inputDatosArchivo = {
      idUser: parseInt(datosVerPostulado?.idusuario),
      id_tp_documento: parseInt(rowData.id)
    }
    buscarArchivo({ inputDatosArchivo })
      .then(({ obtenerArchivoUsuario: { message, type, response } }) => {
        if (response !== null) {
          const documentoBase64 = response
          const nombreDocumento = `${userName}-${cedUsuario}_${rowData.id}`
          const documentoBlob = dataURLtoBlob(documentoBase64)
          const documento = URL.createObjectURL(documentoBlob)
          const htmlDocumento = `<iframe src="${documento}" width="70%" height="90%"/>`

          const ventana = window?.open()
          ventana.document.write(`
                          <html lang="es">
                              <head>
                                  <title>${nombreDocumento}</title>
                              </head>
                              <body style="text-align: center; height: 98%; width: 99%">
                                  <a download="${nombreDocumento}" href="${documento}" style="display: block;">Descargar ${nombreDocumento}</a><br/>
                                  ${htmlDocumento}
                              </body>
                          </html>`)
        } else {
          toast.current.show({
            severity: type,
            summary: '¡ Atención !',
            detail: message,
            life: 3000
          })
        }
      })
      .catch((e) => {
        if (e.toString()?.includes('TypeError')) {
          toast.current.show({
            severity: 'error',
            summary: '¡ Atención !',
            detail:
              'Error: El navegador no permite ventanas emergentes. Por favor otorgue permisos al sistema para ver Documentos.',
            life: 3000
          })
        } else {
          toast.current.show({
            severity: 'error',
            summary: '¡ Atención !',
            detail: 'Error: ' + e,
            life: 3000
          })
        }
      })
  }

  const accionBodyTemplate = (rowData) => {
    return (
      <div>
        <Button
          icon="pi pi-check"
          className="p-button-success mr-1"
          tooltip="Aprobar"
          onClick={() => aprobarArchivo(rowData)}
          tooltipOptions={{ position: 'top' }}
        />
        <Button
          icon="pi pi-minus-circle"
          className="p-button-danger ml-2 mr-2"
          tooltip="Rechazar"
          tooltipOptions={{ position: 'top' }}
          onClick={() => rechazarArchivo(rowData)}
        />
        <Button
          icon="pi pi-search"
          className="p-button-info mr-1"
          tooltip="Ver"
          tooltipOptions={{ position: 'top' }}
          onClick={() => verArchivo(rowData)}
        />
      </div>
    )
  }

  return (
    <Dialog
      visible={activeDialogVerDatosEstudiantes}
      onHide={() => {
        setActiveDialogVerDatosEstudiantes(false)
      }}
      style={{ height: '95%', width: '85%' }}
      header="Datos del Postulado"
      resizable={false}
      draggable={false}
      className="m-2 -mt-2"
    >
      <Toast ref={toast} />
      <div className="w-full text-center">
        <h1 className="text-3xl font-semibold text-white">
          Datos del Postulado
        </h1>
      </div>

      <div className="flex flex-row mt-4">
        <div className="grid grid-cols-3 gap-4 mt-6 basis-2/4">
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
        <Divider layout="vertical" />
        <div className="basis-2/4 content-start">
          <div className="col-span-3 text-center">
            <h1 className="text-2xl font-semibold text-white">
              Lista de Documentos
            </h1>
          </div>
          <DataTable
            value={datosRequisitos?.obtenerTipoDocumento.response}
            emptyMessage="No hay documentos habilitados."
          >
            <Column field="nombre" header="Tipo de Documento" />
            <Column field="nb_estatus_doc" header="Estatus" />
            <Column body={accionBodyTemplate} header="Acción" />
          </DataTable>
          <div className="flex justify-center col-span-3">
            <Button
              label="Guardar"
              icon="pi pi-plus"
              onClick={guardarDocumentos}
            />
          </div>
        </div>
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

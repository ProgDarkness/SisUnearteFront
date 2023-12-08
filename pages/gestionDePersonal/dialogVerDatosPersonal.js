import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import Image from 'next/image'
import { Card } from 'primereact/card'
import { Divider } from 'primereact/divider'
import usuario from 'public/images/usuario.png'
import { useEffect, useState } from 'react'
import GQLconsultasGenerales from 'graphql/consultasGenerales'
import GQLdocumentoFoto from 'graphql/documentoFoto'
import useSWR from 'swr'

const { Dialog } = require('primereact/dialog')

const DialogVerDatosPersonal = ({
  activeDialogVerDatosPersonal,
  setActiveDialogVerDatosPersonal,
  datosVerPersonal
}) => {
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
  const [idUser, setIdPersonal] = useState(null)
  const [imagenPerfil, setImagenPerfil] = useState(null)

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

  useEffect(() => {
    setTpNacionalidad(datosVerPersonal?.idnac.toString())
    setCedulaPersonal(datosVerPersonal?.cedula)
    setNombrePersonal(datosVerPersonal?.nombre)
    setApellidoPersonal(datosVerPersonal?.apellido)
    setCedulaPersonal(datosVerPersonal?.cedula)
    setTpSexo(datosVerPersonal?.idsexo.toString())
    setTpCivil(datosVerPersonal?.idcivil.toString())
    setTlffijoPersonal(datosVerPersonal?.tlffijo)
    setTlfmovilPersonal(datosVerPersonal?.tlfmovil)
    setCorreoPersonal(datosVerPersonal?.correo)
    setTpPersonal(datosVerPersonal?.idtipo.toString())
    setProfesiones(datosVerPersonal?.idprofesion.toString())
    setCargaPersonal(datosVerPersonal?.cargahoraria)
    setIdPersonal(parseInt(datosVerPersonal?.id_usuario))
  }, [datosVerPersonal])

  const { data: fotoPerfil } = useSWR(
    idUser ? [GQLdocumentoFoto.GET_FOTO, { idUser }] : null
  )

  useEffect(() => {
    if (fotoPerfil?.obtenerFotoPerfilUsuario.response) {
      setImagenPerfil(fotoPerfil?.obtenerFotoPerfilUsuario.response.archivo)
    }
  }, [fotoPerfil])

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

  return (
    <Dialog
      header="Datos del Personal"
      visible={activeDialogVerDatosPersonal}
      onHide={() => setActiveDialogVerDatosPersonal(false)}
    >
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
                        disabled
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
                        disabled
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
                        disabled
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
                        disabled
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
                        disabled
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
                        disabled
                      />
                      <label htmlFor="civil">Estado Civil</label>
                    </span>
                    <span className="p-float-label field">
                      <InputText
                        className="w-full"
                        id="tlffijo"
                        value={tlffijoPersonal}
                        onChange={(e) => setTlffijoPersonal(e.target.value)}
                        disabled
                      />
                      <label htmlFor="tlffijo">Teléfono Fijo</label>
                    </span>
                    <span className="p-float-label field">
                      <InputText
                        className="w-full"
                        id="tlfmovil"
                        value={tlfmovilPersonal}
                        onChange={(e) => setTlfmovilPersonal(e.target.value)}
                        disabled
                      />
                      <label htmlFor="tlfmovil">Teléfono Móvil</label>
                    </span>
                    <span className="p-float-label field">
                      <InputText
                        className="w-full"
                        id="correo"
                        value={correoPersonal}
                        onChange={(e) => setCorreoPersonal(e.target.value)}
                        disabled
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
                        disabled
                      />
                      <label htmlFor="tipo">Tipo de Personal</label>
                    </span>
                    <span className="p-float-label field col-span-2">
                      <Dropdown
                        className="w-full"
                        id="profesion"
                        value={tpProfesion}
                        options={tiposProfesiones?.obtenerProfesion.response}
                        onChange={(e) => setProfesiones(e.value)}
                        optionLabel="nombre"
                        optionValue="id"
                        disabled
                      />
                      <label htmlFor="profesion">Profesión</label>
                    </span>
                    <span className="p-float-label field">
                      <InputText
                        className="w-full"
                        id="cargahoraria"
                        value={cargaPersonal}
                        onChange={(e) => setCargaPersonal(e.target.value)}
                        disabled
                      />
                      <label htmlFor="cargahoraria">Carga Horaria</label>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="justify-center py-1 px-3 w-1/4 h-80">
              <Card style={{ width: '15em' }} header={header}></Card>
            </div>
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
    </Dialog>
  )
}

export default DialogVerDatosPersonal

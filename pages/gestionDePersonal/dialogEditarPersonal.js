import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { ConfirmDialog } from 'primereact/confirmdialog'
import { Card } from 'primereact/card'
import Image from 'next/image'
import { Divider } from 'primereact/divider'
import { Dropdown } from 'primereact/dropdown'
import GQLconsultasGenerales from 'graphql/consultasGenerales'
import GQLpersonal from 'graphql/personal'
import GQLdocumentoFoto from 'graphql/documentoFoto'
import { useEffect, useRef, useState } from 'react'
import useSWR from 'swr'
import { Toast } from 'primereact/toast'
import request from 'graphql-request'
import usuario from 'public/images/usuario.png'

const { Dialog } = require('primereact/dialog')

const DialogEditarPersonal = ({
  activeDialogEditarPersonal,
  setActiveDialogEditarPersonal,
  datosEditarPersonal,
  mutatePersonal
}) => {
  const toast = useRef(null)
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

  useEffect(() => {
    setTpNacionalidad(datosEditarPersonal?.idnac.toString())
    setCedulaPersonal(datosEditarPersonal?.cedula)
    setNombrePersonal(datosEditarPersonal?.nombre)
    setApellidoPersonal(datosEditarPersonal?.apellido)
    setCedulaPersonal(datosEditarPersonal?.cedula)
    setTpSexo(datosEditarPersonal?.idsexo.toString())
    setTpCivil(datosEditarPersonal?.idcivil.toString())
    setTlffijoPersonal(datosEditarPersonal?.tlffijo)
    setTlfmovilPersonal(datosEditarPersonal?.tlfmovil)
    setCorreoPersonal(datosEditarPersonal?.correo)
    setTpPersonal(datosEditarPersonal?.idtipo.toString())
    setProfesiones(datosEditarPersonal?.idprofesion.toString())
    setCargaPersonal(datosEditarPersonal?.cargahoraria)
    setIdPersonal(datosEditarPersonal?.id_usuario)
  }, [datosEditarPersonal])

  const actualizarPersonal = (variables) => {
    return request(
      process.env.NEXT_PUBLIC_URL_BACKEND,
      GQLpersonal.UPDATE_PERSONAL,
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

  const actualizaPersonal = () => {
    const InputActualizarPersonal = {
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
      estatus: 1,
      idpersonal: parseInt(datosEditarPersonal.id_personal)
    }
    actualizarPersonal({ InputActualizarPersonal }).then(
      ({ actualizarPersonal: { status, message, type } }) => {
        setTpNacionalidad('')
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
        toast.current.show({
          severity: type,
          summary: '¡ Atención !',
          detail: message
        })
        mutatePersonal()
        setTimeout(() => {
          setActiveDialogEditarPersonal(false)
        }, 500)
      }
    )
  }

  console.log(idUser)

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
        className="justify-center inline-flex rounded-md shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
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
        />
        <Button
          icon="pi pi-paperclip"
          tooltip="Adjuntar"
          tooltipOptions={{ position: 'top' }}
          onClick={() => adjuntarArchivo()}
          className="ml-2"
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
    <Dialog
      header="Editar Personal"
      visible={activeDialogEditarPersonal}
      onHide={() => setActiveDialogEditarPersonal(false)}
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
      <Toast ref={toast} />
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
                        keyfilter="pint"
                        maxLength={8}
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
                    <div className="flex my-auto col-span-4 justify-center">
                      <Button
                        label="Guardar"
                        icon="pi pi-plus"
                        onClick={() => actualizaPersonal()}
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
                          !cargaPersonal
                        }
                      />
                    </div>
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

export default DialogEditarPersonal

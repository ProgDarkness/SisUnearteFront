import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import GQLconsultasGenerales from 'graphql/consultasGenerales'
import GQLpersonal from 'graphql/personal'
import { useEffect, useRef, useState } from 'react'
import useSWR from 'swr'
import { Toast } from 'primereact/toast'
import request from 'graphql-request'

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
        setActiveDialogEditarPersonal(false)
      }
    )
  }

  return (
    <Dialog
      header="Editar Personal"
      visible={activeDialogEditarPersonal}
      onHide={() => setActiveDialogEditarPersonal(false)}
    >
      <div className="grid grid-cols-4 gap-4 pt-2">
        <Toast ref={toast} />
        <span className="p-float-label field">
          <Dropdown
            className="w-full"
            id="nacionalidad"
            value={tpNacionalidad}
            options={tiposNacionalidad?.obtenerNacionalidades.response}
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
            onChange={(e) => setNombrePersonal(e.target.value.toUpperCase())}
            autoComplete="off"
          />
          <label htmlFor="nombre">Nombre</label>
        </span>
        <span className="p-float-label field">
          <InputText
            className="w-full"
            id="apellido"
            value={apellidoPersonal}
            onChange={(e) => setApellidoPersonal(e.target.value.toUpperCase())}
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
    </Dialog>
  )
}

export default DialogEditarPersonal

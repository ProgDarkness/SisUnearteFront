import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import { useEffect, useState } from 'react'
import GQLconsultasGenerales from 'graphql/consultasGenerales'
import useSWR from 'swr'

const { Dialog } = require('primereact/dialog')

const DialogVerDatosPersonal = ({
  activeDialogVerDatosPersonal,
  setActiveDialogVerDatosPersonal,
  datosVerPersonal
}) => {
  console.log(datosVerPersonal)

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
  }, [datosVerPersonal])

  return (
    <Dialog
      header="Datos del Personal"
      visible={activeDialogVerDatosPersonal}
      onHide={() => setActiveDialogVerDatosPersonal(false)}
    >
      <div className="grid grid-cols-4 gap-4 pt-2">
        <span className="p-float-label field">
          <Dropdown
            className="w-full"
            id="nacionalidad"
            value={tpNacionalidad}
            options={tiposNacionalidad?.obtenerNacionalidades.response}
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
            onChange={(e) => setNombrePersonal(e.target.value.toUpperCase())}
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
            onChange={(e) => setApellidoPersonal(e.target.value.toUpperCase())}
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
        <span className="p-float-label field">
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
    </Dialog>
  )
}

export default DialogVerDatosPersonal

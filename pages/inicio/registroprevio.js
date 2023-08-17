import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import { Button } from 'primereact/button'
import { useEffect, useState } from 'react'
import { InputMask } from 'primereact/inputmask'
import { ConfirmDialog } from 'primereact/confirmdialog'
import { BlockUI } from 'primereact/blockui'
import DialogVerMalla from 'pages/CargaMallaCurricularComps/dialogVerMalla'
import { Divider } from 'primereact/divider'
import GQLConsultasGenerales from 'graphql/consultasGenerales'
import useSWR from 'swr'

const RegistroPrevio = ({ data }) => {
  const [nacionalidad, setNacionalidad] = useState(null)
  const [paisNacimiento, setPaisNacimiento] = useState(null)
  const [cedula, setCedula] = useState('')
  const [correoElectronico, setCorreoElectronico] = useState('')
  const [nombre, setNombre] = useState('')
  const [segundo_Nombre, setSegundo_Nombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [segundo_Apellido, setSegundo_Apellido] = useState('')
  const [sexo, setSexo] = useState(null)
  const [fechanaci, setFechaNaci] = useState(null)
  const [discapacidad, setDiscapacidad] = useState(null)
  const [ciudad, setCiudad] = useState('')
  const [estado, setEstado] = useState(null)
  const [municipio, setMunicipio] = useState(null)
  const [parroquia, setParroquia] = useState(null)
  const [confirmRegistrar, setConfirmRegistrar] = useState(false)
  const [blockedPanel, setBlockedPanel] = useState(false)
  const [activeDialogVerMalla, setActiveDialogVerMalla] = useState(false)
  const [datosVerMalla, setDatosVerMalla] = useState(null)
  const [confirmPostulacion, setConfirmPostulacion] = useState(false)
  const [estadoCivil, setEstadoCivil] = useState(null)
  const [tipoDeVia, setTipoDeVia] = useState(null)
  const [tipoDeZona, setTipoDeZona] = useState(null)
  const [nombreDeZona, setNombreDeZona] = useState('')
  const [tipoDeVivienda, setTipoDeVivienda] = useState(null)
  const [numeroDeVivienda, setNumeroDeVivienda] = useState('')
  const [pais, setPais] = useState(null)
  const [nombreDeVia, setNombreDeVia] = useState('')

  console.log(pais)

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  function registra() {
    const evaluEmail = validateEmail(correoElectronico)

    if (evaluEmail) {
      setConfirmRegistrar(true)
    } else {
      setCorreoElectronico('')
      alert('Debe registrar un correo valido')
    }
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

  const accept = () => {
    setBlockedPanel(true)
  }

  const reject = () => {
    setConfirmRegistrar(false)
  }

  const acceptPostu = () => {
    setConfirmPostulacion(true)
  }
  const rechazarPostu = () => {
    setConfirmPostulacion(false)
  }

  return (
    <div className="m-2 -mt-2">
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
              onChange={(e) => setNombre(e.target.value)}
              autoComplete="off"
            />
            <label htmlFor="nombre">Nombre</label>
          </span>
          <span className="p-float-label field">
            <InputText
              className="w-full"
              id="segundo_Nombre"
              value={segundo_Nombre}
              onChange={(e) => setSegundo_Nombre(e.target.value)}
              autoComplete="off"
            />
            <label htmlFor="segundo_Nombre">Segundo Nombre</label>
          </span>
          <span className="p-float-label field">
            <InputText
              className="w-full"
              id="apellido"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              autoComplete="off"
            />
            <label htmlFor="apellido">Apellido</label>
          </span>
          <span className="p-float-label field">
            <InputText
              className="w-full"
              id="segundo_Apellido"
              value={segundo_Apellido}
              onChange={(e) => setSegundo_Apellido(e.target.value)}
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
            onChange={(e) => setEstado(e.target.value)}
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
              options={municipiosPorEstado?.obtenerMunicipiosPorEstado.response}
              value={municipio}
              onChange={(e) => setMunicipio(e.target.value)}
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
              onChange={(e) => setCiudad(e.target.value)}
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
              onChange={(e) => setParroquia(e.target.value)}
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
            onChange={(e) => setNombreDeVia(e.target.value)}
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

        <ConfirmDialog
          draggable={false}
          resizable={false}
          className="bg-[#805e5e]"
          visible={confirmPostulacion}
          acceptLabel="Si"
          rejectLabel="No"
          onHide={() => setConfirmPostulacion(false)}
          message="Estas seguro que deseas confirmar la postulación?"
          header="Confirmar"
          icon="pi pi-exclamation-triangle"
          accept={acceptPostu}
          reject={rechazarPostu}
        />

        <Button
          icon="pi pi-check"
          label="Registrarse"
          onClick={registra} /* disabled={submitting} */
          disabled={
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
            !ciudad ||
            !estado ||
            !municipio ||
            !parroquia
          }
        />
      </div>

      <DialogVerMalla
        setActiveDialogVerMalla={setActiveDialogVerMalla}
        activeDialogVerMalla={activeDialogVerMalla}
        datosVerMalla={datosVerMalla}
        setDatosVerMalla={setDatosVerMalla}
      />
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

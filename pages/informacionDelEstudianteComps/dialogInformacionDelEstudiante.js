import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import { useEffect, useState } from 'react'
import { InputMask } from 'primereact/inputmask'
import { Dialog } from 'primereact/dialog'
import { Divider } from 'primereact/divider'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'

const DialogInformacionDelEstudiante = ({
  activeDialogInformacionDelEstudiante,
  setActiveDialogInformacionDelEstudiante
}) => {
  const [nacionalidad, setNacionalidad] = useState(null)
  const [cedula, setCedula] = useState('')
  const [optionsNacionalidad, setOptionsNacionalidad] = useState(null)
  const [nombre, setNombre] = useState('')
  const [segundo_Nombre, setSegundo_Nombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [segundo_Apellido, setSegundo_Apellido] = useState('')
  const [sexo, setSexo] = useState(null)
  const [fechanaci, setFechaNaci] = useState(null)
  const [discapacidad, setDiscapacidad] = useState(null)
  const [optionsDiscapacidad, setOptionsDiscapacidad] = useState(null)
  const [ciudad, setCiudad] = useState('')
  const [estado, setEstado] = useState(null)
  const [optionsEstado, setOptionsEstado] = useState(null)
  const [municipio, setMunicipio] = useState(null)
  const [optionsMunicipio, setOptionsMunicipio] = useState(null)
  const [parroquia, setParroquia] = useState(null)
  const [optionsParroquia, setOptionsParroquia] = useState(null)
  const [paisNacimiento, setPaisNacimiento] = useState(null)
  const [optionsPaisNacimiento, setOptionsPaisNacimiento] = useState(null)
  const [estadoCivil, setEstadoCivil] = useState(null)
  const [optionsEstadoCivil, setOptionsEstadoCivil] = useState(null)
  const [correoElectronico, setCorreoElectronico] = useState('')
  const [tipoDeVia, setTipoDeVia] = useState(null)
  const [optionsTipoDeVia, setOptionsTipoDeVia] = useState(null)
  const [nombreDeVia, setNombreDeVia] = useState('')
  const [tipoDeZona, setTipoDeZona] = useState(null)
  const [optionsTipoDeZona, setOptionsTipoDeZona] = useState(null)
  const [nombreDeZona, setNombreDeZona] = useState('')
  const [tipoDeVivienda, setTipoDeVivienda] = useState(null)
  const [optionsTipoDeVivienda, setOptionsTipoDeVivienda] = useState(null)
  const [numeroDeVivienda, setNumeroDeVivienda] = useState('')
  const [pais, setPais] = useState(null)
  const [optionsPais, setOptionsPais] = useState(null)
  const [zonaPostal, setZonaPostal] = useState('')
  const [datosEstudiantes, setDatosEstudiantes] = useState([])

  useEffect(() => {
    setNacionalidad({ name: 'V' })
    setCedula('12586742')
    setOptionsNacionalidad([{ name: 'V' }, { name: 'E' }])
    setNombre('Carlos')
    setSegundo_Nombre('Raul')
    setApellido('Salazar')
    setSegundo_Apellido('Gonzalez')
    setSexo({ id: '2', nombre: 'Masculino' })
    setDiscapacidad({ name: 'Paralitico' })
    setOptionsDiscapacidad([
      { name: 'No soy discapacitado' },
      { name: 'Paralitico' }
    ])
    setCiudad('Residencias Conjetura, Av. Angosta')
    setEstado({ name: 'Distrito Capital' })
    setOptionsEstado([
      { name: 'Distrito Capital' },
      { name: 'Carabobo' },
      { name: 'Miranda' }
    ])
    setMunicipio({ name: 'Libertador' })
    setOptionsMunicipio([
      { name: 'Libertador' },
      { name: 'Chacao' },
      { name: 'Baruta' },
      { name: 'Baruta' },
      { name: 'Sucre' }
    ])
    setParroquia({ name: 'San Juan' })
    setOptionsParroquia([
      { name: 'San Juan' },
      { name: 'Antímano' },
      { name: 'Caricuao' },
      { name: 'Macarao' },
      { name: 'La Pastora' }
    ])
    setFechaNaci('19/11/2023')

    setPaisNacimiento({ name: 'Venezuela' })
    setOptionsPaisNacimiento([
      { name: 'Venezuela' },
      { name: 'Colombia' },
      { name: 'Peru' },
      { name: 'Brasil' },
      { name: 'Chile' }
    ])

    setPais({ name: 'Venezuela' })
    setOptionsPais([
      { name: 'Venezuela' },
      { name: 'Colombia' },
      { name: 'Peru' },
      { name: 'Brasil' },
      { name: 'Chile' }
    ])

    setEstadoCivil({ name: 'Soltero' })
    setOptionsEstadoCivil([{ name: 'Soltero' }, { name: 'Casado' }])

    setCorreoElectronico('Carlos_raul@gmail.com')

    setTipoDeVia({ name: 'Avenida' })
    setOptionsTipoDeVia([{ name: 'Avenida' }, { name: 'Calle' }])

    setNombreDeVia('Avenida el amparo, 23 de enero')

    setTipoDeZona({ name: 'Barrio' })
    setOptionsTipoDeZona([{ name: 'Barrio' }, { name: 'Urbanizacion' }])

    setNombreDeZona('La Bombilla')

    setTipoDeVivienda({ name: 'Casa' })
    setOptionsTipoDeVivienda([
      { name: 'Casa' },
      { name: 'Apartamento' },
      { name: 'Quinta' }
    ])

    setNumeroDeVivienda('35')

    setZonaPostal('1010')
  }, [])

  useEffect(() => {
    setDatosEstudiantes([
      {
        codigoCarrera: 'ART-1',
        nombreCarrera: 'Artes Plasticas',
        trayecto: 'Trayecto 1',
        notas1: '03',
        notas2: '10',
        notas3: '08 ',
        notas4: 'Ina',
        notas5: '20',
        notas6: '18'
      }
    ])
  }, [])

  return (
    <Dialog
      visible={activeDialogInformacionDelEstudiante}
      onHide={() => {
        setActiveDialogInformacionDelEstudiante(false)
      }}
      style={{ height: '70%' }}
      header="Ver Estudiante"
      resizable={false}
      draggable={false}
      className="m-2 -mt-2"
    >
      <div className="w-full text-center">
        <h1 className="text-3xl font-semibold text-white">
          Registro del estudiante
        </h1>
      </div>

      <div className="grid grid-cols-5 gap-4 mt-3">
        <span className="p-float-label field">
          <Dropdown
            className="w-full"
            id="nacionalidad"
            options={optionsNacionalidad}
            value={nacionalidad}
            optionLabel="name"
          />
          <label htmlFor="nacionalidad">Nacionalidad</label>
        </span>
        <span className="p-float-label field">
          <Dropdown
            className="w-full"
            id="paisNacimiento"
            options={optionsPaisNacimiento}
            value={paisNacimiento}
            optionLabel="name"
          />
          <label htmlFor="paisNacimiento">Pais Nacimiento</label>
        </span>
        <span className="p-float-label field">
          <InputText
            keyfilter={'num'}
            maxLength={9}
            className="w-full"
            id="cedula"
            value={cedula}
          />
          <label htmlFor="cedula">Cédula</label>
        </span>
        <span className="p-float-label field">
          <InputText
            className="w-full"
            id="correoElectronico"
            value={correoElectronico}
          />
          <label htmlFor="correoElectronico">Correo Electronico</label>
        </span>
        <span className="p-float-label field">
          <InputText className="w-full" id="nombre" value={nombre} />
          <label htmlFor="nombre">Nombre</label>
        </span>
        <span className="p-float-label field">
          <InputText
            className="w-full"
            id="segundo_Nombre"
            value={segundo_Nombre}
          />
          <label htmlFor="segundo_Nombre">Segundo Nombre</label>
        </span>
        <span className="p-float-label field">
          <InputText className="w-full" id="apellido" value={apellido} />
          <label htmlFor="apellido">Apellido</label>
        </span>
        <span className="p-float-label field">
          <InputText
            className="w-full"
            id="segundo_Apellido"
            value={segundo_Apellido}
          />
          <label htmlFor="segundo_Apellido">Segundo Apellido</label>
        </span>

        <span className="p-float-label field">
          <InputMask
            mask="99/99/9999"
            className="w-full"
            id="fechanaci"
            value={fechanaci}
          />
          <label htmlFor="fechanaci">Fecha de nacimiento</label>
        </span>
        <span className="p-float-label field">
          <Dropdown
            className="w-full"
            id="discapacidad"
            options={optionsDiscapacidad}
            value={discapacidad}
            optionLabel="name"
          />
          <label htmlFor="discapacidad">Discapacidad</label>
        </span>
        <span className="p-float-label field">
          <Dropdown
            className="w-full"
            id="sexo"
            /*  options={data?.obtenerSexos.response} */
            value={sexo}
            optionLabel="nombre"
          />
          <label htmlFor="sexo">Sexo</label>
        </span>
        <span className="p-float-label field">
          <Dropdown
            className="w-full"
            id="estadoCivil"
            options={optionsEstadoCivil}
            value={estadoCivil}
            optionLabel="name"
          />
          <label htmlFor="estadoCivil">Estado Civil</label>
        </span>

        <span className="p-float-label field">
          <Dropdown
            className="w-full"
            id="pais"
            options={optionsPais}
            value={pais}
            optionLabel="name"
          />
          <label htmlFor="pais">Pais </label>
        </span>
        <span className="p-float-label field">
          <InputText className="w-full" id="ciudad" value={ciudad} />
          <label htmlFor="ciudad">Ciudad</label>
        </span>
        <span className="p-float-label field">
          <Dropdown
            className="w-full"
            id="tipoDeVia"
            options={optionsTipoDeVia}
            value={tipoDeVia}
            optionLabel="name"
          />
          <label htmlFor="tipoDeVia">Tipo de via</label>
        </span>
        <span className="p-float-label field">
          <InputText className="w-full" id="nombreDeVia" value={nombreDeVia} />
          <label htmlFor="nombreDeVia">Nombre De Via</label>
        </span>
        <span className="p-float-label field">
          <Dropdown
            className="w-full"
            id="tipoDeZona"
            options={optionsTipoDeZona}
            value={tipoDeZona}
            optionLabel="name"
          />
          <label htmlFor="tipoDeZona">Tipo De Zona</label>
        </span>
        <span className="p-float-label field">
          <InputText
            className="w-full"
            id="nombreDeZona"
            value={nombreDeZona}
          />
          <label htmlFor="nombreDeZona">Nombre de Zona</label>
        </span>
        <span className="p-float-label field">
          <Dropdown
            className="w-full"
            id="tipoDeVivienda"
            options={optionsTipoDeVivienda}
            value={tipoDeVivienda}
            optionLabel="name"
          />
          <label htmlFor="tipoDeVivienda">Tipo De Vivienda</label>
        </span>
        <span className="p-float-label field">
          <InputText
            className="w-full"
            id="numeroDeVivienda"
            value={numeroDeVivienda}
          />
          <label htmlFor="numeroDeVivienda">Numero De Vivienda</label>
        </span>
        <span className="p-float-label field">
          <Dropdown
            className="w-full"
            id="estado"
            options={optionsEstado}
            value={estado}
            optionLabel="name"
          />
          <label htmlFor="estado">Estado</label>
        </span>
        <span className="p-float-label field">
          <Dropdown
            className="w-full"
            id="municipio"
            options={optionsMunicipio}
            value={municipio}
            optionLabel="name"
          />
          <label htmlFor="municipio">Municipio</label>
        </span>
        <span className="p-float-label field">
          <Dropdown
            className="w-full"
            id="parroquia"
            options={optionsParroquia}
            value={parroquia}
            optionLabel="name"
          />
          <label htmlFor="parroquia">Parroquia</label>
        </span>
        <span className="p-float-label field">
          <InputText className="w-full" id="zonaPostal" value={zonaPostal} />
          <label htmlFor="zonaPostal">Zona Postal</label>
        </span>
      </div>
      <Divider />
      <div>
        <DataTable
          value={datosEstudiantes}
          emptyMessage="No hay estudiantes registrados."
        >
          <Column field="codigoCarrera" header="Cod. Carrera" />
          <Column field="nombreCarrera" header="Nombre de la carrera" />
          <Column field="trayecto" header="Trayecto" />
          <Column field="notas1" header="Notas" />
          <Column field="notas2" header="Notas " />
          <Column field="notas3" header="Notas" />
          <Column field="notas4" header="Notas" />
          <Column field="notas5" header="Notas" />
          <Column field="notas6" header="Notas" />
        </DataTable>
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
    </Dialog>
  )
}
export default DialogInformacionDelEstudiante

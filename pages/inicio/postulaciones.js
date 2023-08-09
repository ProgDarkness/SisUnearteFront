import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import { Button } from 'primereact/button'
import { useEffect, useState } from 'react'
import { InputMask } from 'primereact/inputmask'
import { ConfirmDialog } from 'primereact/confirmdialog'
import { BlockUI } from 'primereact/blockui'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Dialog } from 'primereact/dialog'

const Postulaciones = () => {
  const [nacionalidad, setNacionalidad] = useState(null)
  const [cedula, setCedula] = useState('')
  const [optionsNacionalidad, setOptionsNacionalidad] = useState(null)
  const [nombre, setNombre] = useState('')
  const [segundo_Nombre, setSegundo_Nombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [segundo_Apellido, setSegundo_Apellido] = useState('')
  const [sexo, setSexo] = useState(null)
  const [optionsSexo, setOptionsSexo] = useState(null)
  const [fechanaci, setFechaNaci] = useState('')
  const [discapacidad, setDiscapacidad] = useState(null)
  const [optionsDiscapacidad, setOptionsDiscapacidad] = useState(null)
  const [direccion, setDireccion] = useState('')
  const [estado, setEstado] = useState(null)
  const [optionsEstado, setOptionsEstado] = useState(null)
  const [municipio, setMunicipio] = useState(null)
  const [optionsMunicipio, setOptionsMunicipio] = useState(null)
  const [parroquia, setParroquia] = useState(null)
  const [optionsParroquia, setOptionsParroquia] = useState(null)
  const [confirmRegistrar, setConfirmRegistrar] = useState(false)
  const [ofertas, setOfertas] = useState(null)
  const [verOferta, setDialogVerOferta] = useState(false)
  const [editarOferta, setDialogEditarOferta] = useState(false)
  const [datosEditarOferta, setDatosEditarOferta] = useState(null)
  const [opcionStatusOferta, setOpcionStatusOferta] = useState(null)
  const [blockedPanel, setBlockedPanel] = useState(false)
  const accept = () => {
    setBlockedPanel(true)
  }

  const reject = () => {
    setConfirmRegistrar(false)
  }

  useEffect(() => {
    setOfertas([
      {
        carrera: 'Artes Plasticas',
        status_carrera: 'Habilitada',
        cant_cupos: 100
      },
      { carrera: 'Museologia', status_carrera: 'Habilitada', cant_cupos: 100 },
      {
        carrera: 'Dibujo Artistico',
        status_carrera: 'Deshabilitada',
        cant_cupos: 0
      }
    ])
    setOpcionStatusOferta([{ name: 'Habilitada' }, { name: 'Desahabilitar' }])
  }, [])

  useEffect(() => {
    setNacionalidad({ name: 'V' })
    setCedula('12586742')
    setOptionsNacionalidad([{ name: 'V' }, { name: 'E' }])
    setNombre('Carlos')
    setSegundo_Nombre('Raul')
    setApellido('Salazar')
    setSegundo_Apellido('Gonzalez')
    setSexo({ name: 'Masculino' })
    setOptionsSexo([{ name: 'Masculino' }, { name: 'Femenino' }])
    setDiscapacidad({ name: 'Paralitico' })
    setOptionsDiscapacidad([
      { name: 'No soy discapacitado' },
      { name: 'Paralitico' }
    ])
    setDireccion('Residencias Conjetura, Av. Angosta')
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
  }, [])

  const DialogVerOferta = () => {
    return (
      <Dialog
        visible={verOferta}
        onHide={() => setDialogVerOferta(false)}
        header="Trayectos"
        resizable={false}
        draggable={false}
      >
        <div className="grid grid-cols-3 gap-4 m-2">
          <span className="p-float-label field">
            <InputText
              className="w-full"
              id="cod_carrera"
              /* value={datosEstudiante?.cedula} */
              autoComplete="off"
            />
            <label htmlFor="cod_carrera">Nombre de Trayecto</label>
          </span>
          <span className="p-float-label field">
            <InputText
              className="w-full"
              id="cod_carrera"
              /* value={datosEstudiante?.cedula} */
              autoComplete="off"
            />
            <label htmlFor="cod_carrera">Nombre de Semestre</label>
          </span>
        </div>
      </Dialog>
    )
  }

  const DialogEditarOferta = () => {
    return (
      <Dialog
        visible={editarOferta}
        onHide={() => setDialogEditarOferta(false)}
        header="Trayectos"
        resizable={false}
        draggable={false}
      >
        <div className="grid grid-cols-3 gap-4 m-2">
          <span className="p-float-label field">
            <InputText
              className="w-full"
              id="cod_carrera_ed"
              value={datosEditarOferta?.carrera}
              autoComplete="off"
            />
            <label htmlFor="cod_carrera_ed">Carrera</label>
          </span>
          <span className="p-float-label field">
            <Dropdown
              options={opcionStatusOferta}
              className="w-full"
              optionLabel="name"
              optionValue="name"
              id="status_oferta"
              value={datosEditarOferta?.status_carrera}
              onChange={(e) =>
                setDatosEditarOferta({
                  ...datosEditarOferta,
                  status_carrera: e.value
                })
              }
              autoComplete="off"
            />
            <label htmlFor="status_oferta">Estatus</label>
          </span>
          <span className="p-float-label field">
            <InputText
              className="w-full"
              id="cant_cupos"
              value={datosEditarOferta?.cant_cupos}
              autoComplete="off"
            />
            <label htmlFor="cant_cupos">Cant. Cupos</label>
          </span>
          <div className="col-span-3 flex justify-center">
            <Button
              label="Modificar"
              icon="pi pi-plus"
              onClick={() => setDialogEditarOferta(false)}
            />
          </div>
        </div>
      </Dialog>
    )
  }

  const accionBodyTemplate = (rowData) => {
    return (
      <div className="flex justify-center">
        <Button
          icon="pi pi-pencil"
          className="p-button-help mr-1"
          tooltip="Postularse"
          onClick={() => {
            setDatosEditarOferta(rowData)
            setDialogEditarOferta(true)
          }}
          tooltipOptions={{ position: 'top' }}
        />
      </div>
    )
  }
  return (
    <div className="m-2 -mt-2">
      <div className="w-full text-center">
        <h1 className="text-3xl font-semibold text-white">Postulaciones</h1>
      </div>
      <div className="w-full mb-4">
        <h2 className="text-2xl font-semibold text-white">Registro Previo</h2>
      </div>
      <BlockUI
        blocked={blockedPanel}
        onHide={() => setBlockedPanel(false)}
        template={
          <i
            className="pi pi-lock"
            style={{ fontSize: '3rem', color: '#ffffff40' }}
          />
        }
        className=" rounded-lg"
      >
        <div className="p-3">
          <div className="grid grid-cols-5 gap-4">
            <span className="p-float-label field">
              <Dropdown
                className="w-full"
                id="nacionalidad"
                options={optionsNacionalidad}
                value={nacionalidad}
                onChange={(e) => {
                  setNacionalidad(e.value)
                }}
                optionLabel="name"
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
              <Dropdown
                className="w-full"
                id="sexo"
                options={optionsSexo}
                value={sexo}
                onChange={(e) => {
                  setSexo(e.value)
                }}
                optionLabel="name"
              />
              <label htmlFor="sexo">Sexo</label>
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
                id="discapacidad"
                options={optionsDiscapacidad}
                value={discapacidad}
                onChange={(e) => setDiscapacidad(e.target.value)}
                optionLabel="name"
              />
              <label htmlFor="discapacidad">Discapacidad</label>
            </span>
            <span className="p-float-label field">
              <InputText
                className="w-full"
                id="direccion"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                autoComplete="off"
              />
              <label htmlFor="direccion">Dirección</label>
            </span>
            <span className="p-float-label field">
              <Dropdown
                className="w-full"
                id="estado"
                options={optionsEstado}
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
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
                onChange={(e) => setMunicipio(e.target.value)}
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
                onChange={(e) => setParroquia(e.target.value)}
                optionLabel="name"
              />
              <label htmlFor="parroquia">Parroquia</label>
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
              onClick={() => setConfirmRegistrar(true)}
              icon="pi pi-check"
              label="Registrarse" /* onClick={registra} */ /* disabled={submitting} */
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
                !direccion ||
                !estado ||
                !municipio ||
                !parroquia
              }
            />
          </div>
        </div>
      </BlockUI>

      <DialogVerOferta />
      <DialogEditarOferta />
      {blockedPanel &&
        <div className="mt-3">
          <div className="col-span-5">
            <DataTable
              value={ofertas}
              emptyMessage="No hay carreras registradas."
            >
              <Column field="carrera" header="Carrera" />
              <Column field="cant_cupos" header="Cant. Cupos" />
              <Column body={accionBodyTemplate} />
            </DataTable>
          </div>
        </div>
      }

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
        .p-dialog .p-dialog-footer {
          border-top: 0 none;
          background: #805e5e;
          color: rgb(255 255 255);
          padding: 0.75rem 1.25rem;
          text-align: right;
          border-bottom-right-radius: 4px;
          border-bottom-left-radius: 4px;
        }
        .p-dialog .p-dialog-content {
          background: #805e5e;
          color: rgb(255 255 255);
          padding: 0 1.25rem 1.25rem 1.25rem;
        }
        .p-dialog .p-dialog-header {
          border-bottom: 0 none;
          background: #805e5e;
          color: rgb(255 251 251);
          padding: 1.25rem;
          border-top-right-radius: 4px;
          border-top-left-radius: 4px;
        }
        .p-float-label input:focus ~ label,
        .p-float-label .p-inputwrapper-focus ~ label {
          color: #ffffff;
        }

        .p-float-label input:focus ~ label,
        .p-float-label input.p-filled ~ label,
        .p-float-label textarea:focus ~ label,
        .p-float-label textarea.p-filled ~ label,
        .p-float-label .p-inputwrapper-focus ~ label,
        .p-float-label .p-inputwrapper-filled ~ label {
          top: -0.5rem !important;
          border-radius: 1rem;
          background-color: #3f51b5;
          padding: 2px 4px;
          margin-left: -4px;
          margin-top: 0;
        }

        .p-float-label input:focus ~ label,
        .p-float-label input.p-filled ~ label,
        .p-float-label textarea:focus ~ label,
        .p-float-label textarea.p-filled ~ label,
        .p-float-label .p-inputwrapper-focus ~ label,
        .p-float-label .p-inputwrapper-filled ~ label {
          top: -0.5rem !important;
          -webkit-border-radius: 1rem;
          -moz-border-radius: 1rem;
          border-radius: 1rem;
          background-color: #3f51b5;
          padding: 2px 4px;
          margin-left: -4px;
          margin-top: 0;
          color: white;
        }

        .p-divider.p-divider-horizontal:before {
          border-top: solid 1px rgb(255 255 255);
        }
      `}</style>
    </div>
  )
}

export default Postulaciones

import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { useEffect, useState } from 'react'
import DialogRegPersonal from './dialogRegPersonal'
import DialogVerDatosPersonal from './dialogVerDatosPersonal'
import DialogEditarPersonal from './dialogEditarPersonal'
import { ConfirmDialog } from 'primereact/confirmdialog'

const GestionDePersonal = () => {
  const [personal, setPersonal] = useState(null)
  const [activeDialogRegPersonal, setActiveDialogRegPersonal] = useState(false)
  const [activeDialogVerDatosPersonal, setActiveDialogVerDatosPersonal] =
    useState(false)
  const [activeDialogEditarPersonal, setActiveDialogEditarPersonal] =
    useState(false)
  const [dialogConfirmElminarPersonal, setDialogConfirmElminarPersonal] =
    useState(false)
  const [datosEditarPersonal, setDatosEditarPersonal] = useState(null)
  const [datosVerPersonal, setDatosVerPersonal] = useState(null)
  const [dataEliminarPersonal, setDataEliminarPersonal] = useState(null)

  console.log(dataEliminarPersonal)

  useEffect(() => {
    setPersonal([
      {
        tp_personal: 'Profesor',
        tp_nacionalidad: 'V',
        nu_cedula: '16785893',
        nombre: 'Jose',
        apellido: 'Perez',
        estatus: 'Activo'
      }
    ])
  }, [])

  const HeaderPersonal = () => {
    return (
      <div className="h-8 flex justify-end bg-[#ae8e8e] mt-3">
        <Button
          label="Registrar Personal"
          icon="pi pi-plus"
          onClick={() => setActiveDialogRegPersonal(true)}
        />
      </div>
    )
  }

  const accionBodyTemplate = (rowData) => {
    return (
      <div className="flex justify-center">
        <Button
          icon="pi pi-search"
          className="p-button-info mr-1"
          tooltip="Ver"
          tooltipOptions={{ position: 'top' }}
          onClick={() => {
            setDatosVerPersonal(rowData)
            setActiveDialogVerDatosPersonal(true)
          }}
        />
        <Button
          icon="pi pi-pencil"
          className="p-button-help mr-1"
          tooltip="Modificar"
          onClick={() => {
            setDatosEditarPersonal(rowData)
            setActiveDialogEditarPersonal(true)
          }}
          tooltipOptions={{ position: 'top' }}
        />
        <Button
          icon="pi pi-times"
          className="p-button-danger"
          tooltip="Eliminar"
          tooltipOptions={{ position: 'top' }}
          onClick={() => {
            setDialogConfirmElminarPersonal(true)
            setDataEliminarPersonal(rowData)
          }}
        />
      </div>
    )
  }

  const acceptEliminarPersonal = () => {
    console.log('SI')
  }

  const rejectEliminarPersonal = () => {
    console.log('NO')
  }

  return (
    <div>
      <DialogRegPersonal
        activeDialogRegPersonal={activeDialogRegPersonal}
        setActiveDialogRegPersonal={setActiveDialogRegPersonal}
      />
      <DialogVerDatosPersonal
        activeDialogVerDatosPersonal={activeDialogVerDatosPersonal}
        setActiveDialogVerDatosPersonal={setActiveDialogVerDatosPersonal}
        datosVerPersonal={datosVerPersonal}
      />
      <DialogEditarPersonal
        activeDialogEditarPersonal={activeDialogEditarPersonal}
        setActiveDialogEditarPersonal={setActiveDialogEditarPersonal}
        datosEditarPersonal={datosEditarPersonal}
      />
      <ConfirmDialog
        visible={dialogConfirmElminarPersonal}
        onHide={() => setDialogConfirmElminarPersonal(false)}
        message="¿Esta seguro que desea eliminar el Personal?"
        header="Confirmacion"
        icon="pi pi-exclamation-triangle"
        accept={acceptEliminarPersonal}
        reject={rejectEliminarPersonal}
        acceptLabel="SI"
        rejectLabel="NO"
      />
      <div className="flex justify-center">
        <h1 className="text-3xl font-semibold text-white">
          Gestion de Personal
        </h1>
      </div>
      <HeaderPersonal />
      <DataTable value={personal}>
        <Column field="tp_personal" header="Tipo Personal" />
        <Column field="tp_nacionalidad" header="Nacionalidad" />
        <Column field="nu_cedula" header="Cedula" />
        <Column field="nombre" header="Nombre" />
        <Column field="apellido" header="Apellido" />
        <Column field="estatus" header="Estatus" />
        <Column body={accionBodyTemplate} />
      </DataTable>
    </div>
  )
}

export default GestionDePersonal

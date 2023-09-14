import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { ConfirmDialog } from 'primereact/confirmdialog'
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { useRef, useState } from 'react'
import useSWR from 'swr'
import GQLregMallaCurricular from 'graphql/regMallaCurricular'
import GQLregOfertaAcademica from 'graphql/regOfertaAcademica'
import { Dropdown } from 'primereact/dropdown'
import { Toast } from 'primereact/toast'
import request from 'graphql-request'
/* import DialogCargarHorario from './segunDialogCagarHorario' */

const DialogRegOferta = ({
  dialogRegOferta,
  setDialogRegOferta,
  mutateOfertas
}) => {
  const toast = useRef(null)
  const [codOferta, setCodOferta] = useState('')
  const [cantidadCupos, setCantidadCupos] = useState('')
  const [carreraOferta, setCarreraOferta] = useState(null)
  const [sedeOferta, setSedeOferta] = useState(null)
  const [periodoOfer, setPeriodoOfer] = useState(null)
  const [dataAsigProf, setDataAsigProf] = useState(null)
  const [dataAggMateria, setDataAggMateria] = useState(null)
  const [dataEliminarMateriaOfer, setDataEliminarMateriaOfer] = useState(null)
  const [dialogConfirmElminarMateria, setDialogConfirmElminarMateria] =
    useState(false)
  const [dialogConfirmRegistrarOfert, setDialogConfirmRegistrarOfert] =
    useState(false)
  const [dialogAgregarMateria, setDialogAgregarMateria] = useState(false)
  const [dialogAgregarprofesor, setDialogAgregarprofesor] = useState(false)
  /* const [activeDialogCargarHorario, setActiveDialogCargarHorario] =
    useState(false) */

  /* 16883642 */

  const { data: mallas } = useSWR(GQLregMallaCurricular.GET_MALLAS)
  const { data: sedes } = useSWR(
    carreraOferta?.id
      ? [
          GQLregMallaCurricular.GET_SEDE_CARRERA_MATERIA,
          { carrera: parseInt(carreraOferta?.id) }
        ]
      : null
  )

  const { data: periodos } = useSWR(GQLregOfertaAcademica.GET_PERIODOS_OFER)
  const { data: profesores } = useSWR(GQLregOfertaAcademica.GET_PROFESORES)
  const { data: materias } = useSWR(
    dataAggMateria?.idtrayectocarrera && carreraOferta?.id
      ? [
          GQLregOfertaAcademica.MATERIAS_MALLA_OFERTA,
          {
            carrera: parseInt(carreraOferta.id),
            trayecto: parseInt(dataAggMateria.idtrayectocarrera)
          }
        ]
      : null
  )

  const { data: detallesMallas, mutate } = useSWR(
    [
      GQLregOfertaAcademica.DETALLES_MALLAS_CARRERA,
      { carrera: parseInt(carreraOferta?.id) }
    ],
    { refreshInterval: 1000 }
  )

  const regOferta = (variables) => {
    return request(
      process.env.NEXT_PUBLIC_URL_BACKEND,
      GQLregOfertaAcademica.SAVE_OFERTA_ACADEMICA,
      variables
    )
  }

  const acceptRegistrarOfert = () => {
    let validacionPersonal = false

    for (
      let i = 0;
      i < detallesMallas?.obtenerDetalleMalla.response.length;
      i++
    ) {
      for (const key in detallesMallas?.obtenerDetalleMalla.response[i]) {
        if (
          key === 'id_personal' &&
          detallesMallas?.obtenerDetalleMalla.response[i][key] === null
        ) {
          validacionPersonal = true
        }
      }
    }

    if (validacionPersonal) {
      toast.current.show({
        severity: 'warn',
        summary: '¡ Atención !',
        detail: 'Cada Materia debe poseer un docente asignado'
      })
    } else {
      if (
        codOferta === '' ||
        cantidadCupos === '' ||
        !carreraOferta ||
        !periodoOfer ||
        !sedeOferta
      ) {
        toast.current.show({
          severity: 'error',
          summary: '¡ Atención !',
          detail: 'Todos los campos deben ser completados'
        })
      } else {
        const InputOferta = {
          codOferta,
          sedeOferta: parseInt(sedeOferta.id),
          cantidadCupos: parseInt(cantidadCupos),
          idCarrera: parseInt(carreraOferta.id),
          periodoOfer: parseInt(periodoOfer.id),
          objectOferta: detallesMallas?.obtenerDetalleMalla.response
        }

        regOferta({ InputOferta }).then(
          ({ crearOferta: { status, message, type } }) => {
            toast.current.show({
              severity: type,
              summary: '¡ Atención !',
              detail: message
            })
            setDataEliminarMateriaOfer(null)
            setDataAggMateria(null)
            setDataAsigProf(null)
            setPeriodoOfer(null)
            setSedeOferta(null)
            setCarreraOferta(null)
            setCantidadCupos('')
            setCodOferta('')
            mutateOfertas()
          }
        )
      }
    }
  }

  const rejectRegistrarOfert = () => {
    setDialogConfirmRegistrarOfert(false)
  }

  function eliminarMateria() {
    const objetoOferta = detallesMallas?.obtenerDetalleMalla.response
    let countTrayectoMateria = 0

    for (let i = 0; i < objetoOferta.length; i++) {
      for (const key in objetoOferta[i]) {
        if (
          key === 'idtrayectocarrera' &&
          objetoOferta[i][key] === dataEliminarMateriaOfer?.idtrayectocarrera
        ) {
          countTrayectoMateria += 1
        }
      }
    }

    if (countTrayectoMateria > 1) {
      for (let i = 0; i < objetoOferta.length; i++) {
        for (const key in objetoOferta[i]) {
          if (
            key === 'id_materia' &&
            objetoOferta[i][key] === dataEliminarMateriaOfer?.id_materia
          ) {
            detallesMallas.obtenerDetalleMalla.response =
              detallesMallas?.obtenerDetalleMalla.response.filter(
                (_, index) => index !== i
              )
          }
        }
      }
    } else {
      toast.current.show({
        severity: 'warn',
        summary: '¡ Atención !',
        detail: 'El trayecto debe tener al menos una materia asignada'
      })
    }
  }

  const acceptEliminarMateria = () => {
    eliminarMateria()
  }

  const rejectEliminarMateria = () => {
    setDataEliminarMateriaOfer(null)
  }

  function aggMateriaOferta(materia) {
    let validateInsert = false

    for (
      let i = 0;
      i < detallesMallas?.obtenerDetalleMalla.response.length;
      i++
    ) {
      for (const key in detallesMallas?.obtenerDetalleMalla.response[i]) {
        if (
          key === 'id_materia' &&
          detallesMallas?.obtenerDetalleMalla.response[i][key] ===
            materia.id_materia
        ) {
          validateInsert = true
        }
      }
    }

    if (validateInsert) {
      toast.current.show({
        severity: 'warn',
        summary: '¡ Atención !',
        detail: 'La Materia ya se encuentra en la oferta'
      })
    } else {
      detallesMallas?.obtenerDetalleMalla.response.push(materia)
      let objetoOferta = detallesMallas?.obtenerDetalleMalla.response

      const trayecto0 = objetoOferta.filter(
        (t) => t.nb_trayecto === 'Trayecto Inicial'
      )
      const trayecto1 = objetoOferta.filter(
        (t) => t.nb_trayecto === 'Trayecto I'
      )
      const trayecto2 = objetoOferta.filter(
        (t) => t.nb_trayecto === 'Trayecto II'
      )
      const trayecto3 = objetoOferta.filter(
        (t) => t.nb_trayecto === 'Trayecto III'
      )
      const trayecto4 = objetoOferta.filter(
        (t) => t.nb_trayecto === 'Trayecto IV'
      )

      objetoOferta = trayecto0
        .concat(trayecto1)
        .concat(trayecto2)
        .concat(trayecto3)
        .concat(trayecto4)

      detallesMallas.obtenerDetalleMalla.response = objetoOferta
    }
  }

  const DialogAgregarMateria = () => {
    const [materia, setMateria] = useState(null)

    return (
      <Dialog
        visible={dialogAgregarMateria}
        onHide={() => {
          setDialogAgregarMateria(false)
          setDialogRegOferta(true)
          setDataAggMateria(null)
          setMateria(null)
        }}
        header="Agregar Materia"
        resizable={false}
        draggable={false}
      >
        <div className="grid grid-cols-3 gap-4 m-2">
          <span className="p-float-label field">
            <InputText
              className="w-full"
              id="carrera_materia"
              value={carreraOferta?.nombre}
            />
            <label htmlFor="carrera_materia">Carrera</label>
          </span>
          <span className="p-float-label field">
            <InputText
              className="w-full"
              id="trayecto_materia"
              value={dataAggMateria?.nb_trayecto}
              autoComplete="off"
            />
            <label htmlFor="trayecto_materia">Trayecto</label>
          </span>
          <span className="p-float-label field">
            <Dropdown
              className="w-full"
              id="nb_materia"
              options={materias?.obtenerMateriasMalla.response}
              value={materia}
              onChange={(e) => setMateria(e.value)}
              optionLabel="nb_materia"
            />
            <label htmlFor="nb_materia">Nombre de la Materia</label>
          </span>
          <div className="my-auto col-span-3 flex justify-center">
            <Button
              label="Agregar"
              icon="pi pi-plus"
              onClick={() => {
                aggMateriaOferta(materia)
                setDialogAgregarMateria(false)
                setDialogRegOferta(true)
                setMateria(null)
              }}
            />
          </div>
        </div>
      </Dialog>
    )
  }

  function asignarProfesor(personal) {
    const objetoOferta = detallesMallas?.obtenerDetalleMalla.response

    for (let i = 0; i < objetoOferta.length; i++) {
      for (const key in objetoOferta[i]) {
        if (
          key === 'id_materia' &&
          objetoOferta[i][key] === dataAsigProf?.id_materia
        ) {
          detallesMallas.obtenerDetalleMalla.response[i].id_personal =
            personal?.id
          detallesMallas.obtenerDetalleMalla.response[i].personal =
            personal?.nombre
        }
      }
    }
  }

  const DialogAgregarProfesor = () => {
    const [personal, setPersonal] = useState(null)

    return (
      <Dialog
        visible={dialogAgregarprofesor}
        onHide={() => {
          setDialogAgregarprofesor(false)
          setDialogRegOferta(true)
          setDataAsigProf(null)
          setPersonal(null)
        }}
        header="Agregar profesor"
        resizable={false}
        draggable={false}
      >
        <div className="grid grid-cols-4 gap-4 m-2">
          <span className="p-float-label field">
            <InputText
              className="w-full"
              id="carrera_profesor"
              value={carreraOferta?.nombre}
              autoComplete="off"
            />
            <label htmlFor="carrera_profesor">Carrera</label>
          </span>
          <span className="p-float-label field">
            <InputText
              className="w-full"
              id="trayecto_profesor"
              value={dataAsigProf?.nb_trayecto}
              autoComplete="off"
            />
            <label htmlFor="trayecto_profesor">Trayecto</label>
          </span>
          <span className="p-float-label field">
            <InputText
              className="w-full"
              id="nb_materia"
              value={dataAsigProf?.nb_materia}
              autoComplete="off"
            />
            <label htmlFor="nb_materia">Materia</label>
          </span>
          <span className="p-float-label field">
            <Dropdown
              className="w-full"
              id="nb_profesor"
              value={personal}
              options={profesores?.obtenerPersonalOferta.response}
              onChange={(e) => setPersonal(e.value)}
              optionLabel="nombre"
            />
            <label htmlFor="nb_profesor">Profesor</label>
          </span>
          <div className="my-auto col-span-4 flex justify-center">
            <Button
              label="Agregar"
              icon="pi pi-plus"
              onClick={() => {
                asignarProfesor(personal)
                setDialogAgregarprofesor(false)
                setDialogRegOferta(true)
                setPersonal(null)
              }}
            />
          </div>
        </div>
      </Dialog>
    )
  }

  const actionBodyTemplateMateria = (rowData) => {
    return (
      <div className="flex justify-center">
        <Button
          tooltip="Asignar Profesor"
          icon="pi pi-plus"
          iconPos="left"
          className="p-button-info p-1"
          onClick={() => {
            setDataAsigProf(rowData)
            setDialogAgregarprofesor(true)
          }}
        />
        <Button
          tooltip="Eliminar Materia"
          icon="pi pi-times"
          iconPos="left"
          className="p-button-danger p-1 ml-2"
          onClick={() => {
            setDataEliminarMateriaOfer(rowData)
            setDialogConfirmElminarMateria(true)
          }}
        />
      </div>
    )
  }

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex flex-col justify-center">
        {/* <Button
          label="Agregar Horario"
          icon="pi pi-plus"
          iconPos="left"
          className="p-button-info text-sm p-1"
          onClick={() => {
            setActiveDialogCargarHorario(true)
          }}
        /> */}
        <Button
          label="Agregar Materia"
          icon="pi pi-plus"
          iconPos="left"
          className="p-button-help text-sm p-1 mt-2"
          onClick={() => {
            setDataAggMateria(rowData)
            setDialogAgregarMateria(true)
          }}
        />
      </div>
    )
  }

  return (
    <>
      <Toast ref={toast} />
      <DialogAgregarMateria />
      <DialogAgregarProfesor />
      <ConfirmDialog
        visible={dialogConfirmElminarMateria}
        onHide={() => setDialogConfirmElminarMateria(false)}
        message="¿Esta seguro que desea eliminar la materia?"
        header="Confirmación"
        icon="pi pi-exclamation-triangle"
        accept={acceptEliminarMateria}
        reject={rejectEliminarMateria}
        acceptLabel="SI"
        rejectLabel="NO"
      />
      <ConfirmDialog
        visible={dialogConfirmRegistrarOfert}
        onHide={() => setDialogConfirmRegistrarOfert(false)}
        message="¿Esta seguro que desea registrar la oferta?"
        header="Confirmación"
        icon="pi pi-exclamation-triangle"
        accept={acceptRegistrarOfert}
        reject={rejectRegistrarOfert}
        acceptLabel="SI"
        rejectLabel="NO"
      />
      {/* <DialogCargarHorario
        activeDialogCargarHorario={activeDialogCargarHorario}
        setActiveDialogCargarHorario={setActiveDialogCargarHorario}
      /> */}

      <Dialog
        visible={dialogRegOferta}
        onHide={() => {
          setDialogRegOferta(false)
          setDataEliminarMateriaOfer(null)
          setDataAggMateria(null)
          setDataAsigProf(null)
          setPeriodoOfer(null)
          setSedeOferta(null)
          setCarreraOferta(null)
          setCantidadCupos('')
          setCodOferta('')
          mutate()
        }}
        header="Registro de la Oferta"
        resizable={false}
        draggable={false}
      >
        <div className="grid grid-cols-5 gap-4 m-2">
          <span className="p-float-label field">
            <InputText
              className="w-full"
              id="new_cod_carrera"
              value={codOferta}
              onChange={(e) => setCodOferta(e.target.value.toUpperCase())}
              autoComplete="off"
            />
            <label htmlFor="new_cod_carrera">Código de la Oferta</label>
          </span>
          <span className="p-float-label field">
            <Dropdown
              className="w-full"
              id="new_carrera_Oferta"
              value={carreraOferta}
              options={mallas?.obtenerTodasMallas.response.mallas}
              onChange={(e) => setCarreraOferta(e.value)}
              optionLabel="nombre"
            />
            <label htmlFor="new_carrera_Oferta">Carrera de la Oferta</label>
          </span>
          <span className="p-float-label field">
            <Dropdown
              className="w-full"
              id="new_sede_Oferta"
              value={sedeOferta}
              options={sedes?.obtenerSedesPorCarrera.response}
              onChange={(e) => setSedeOferta(e.value)}
              optionLabel="nombre"
            />
            <label htmlFor="new_sede_Oferta">Sede de la Oferta</label>
          </span>
          <span className="p-float-label field">
            <InputText
              className="w-full"
              id="new_tec_carrera"
              value={cantidadCupos}
              onChange={(e) => setCantidadCupos(e.target.value)}
              autoComplete="off"
              keyfilter="pint"
              maxLength={3}
            />
            <label htmlFor="new_tec_carrera">Cant. Cupos</label>
          </span>
          <span className="p-float-label field">
            <Dropdown
              className="w-full"
              id="new_tec_carrera"
              options={periodos?.obtenerPeridosOferta.response}
              value={periodoOfer}
              onChange={(e) => setPeriodoOfer(e.value)}
              optionLabel="nombre"
            />
            <label htmlFor="new_tec_carrera">Periodo</label>
          </span>
          <div className="flex align-middle">
            <Button
              label="Registrar"
              icon="pi pi-plus"
              onClick={() => setDialogConfirmRegistrarOfert(true)}
            />
          </div>
        </div>
        <div className="col-span-5">
          <DataTable
            value={detallesMallas?.obtenerDetalleMalla.response}
            emptyMessage="No se encuentran trayectos registrados."
            rowGroupMode="rowspan"
            groupRowsBy={['nb_trayecto']}
          >
            <Column field="nb_trayecto" header="Trayectos" />
            <Column field="nb_materia" header="Materias" />
            <Column field="personal" header="Profesor" />
            <Column
              field="materia"
              body={actionBodyTemplateMateria}
              style={{ width: '8rem' }}
            />
            <Column
              field="trayecto"
              body={actionBodyTemplate}
              style={{ width: '8rem' }}
            />
          </DataTable>
        </div>
      </Dialog>
    </>
  )
}

export default DialogRegOferta

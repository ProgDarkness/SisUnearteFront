import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { useState } from 'react'

const CargarOferta = ({ cambioVista }) => {
  const [ofertas, setOfertas] = useState([])
  return (
    <div className="grid grid-cols-5 gap-4 m-2 -mt-2">
      <div className="col-span-5 flex justify-between">
        <div />
        <h1 className="text-3xl font-semibold text-white">
          Carga de Oferta Academica
        </h1>
        <Button
          label="Registrar Carrera"
          onClick={() => {
            const newVistas = {
              [`registrarCarrera`]: true
            }
            cambioVista((prevState) => ({
              ...prevState,
              ...newVistas,
              ...Object.keys(prevState).reduce((acc, key) => {
                if (key !== 'registrarCarrera') acc[key] = false
                return acc
              }, {})
            }))
          }}
        />
      </div>
      <h1 className="col-span-5 text-2xl font-semibold text-white ml-5 -mb-3">
        Carreras
      </h1>
      <div className="col-span-5">
        <DataTable value={ofertas} emptyMessage="No hay carreras registradas.">
          <Column field="code" header="Periodo" />
          <Column field="name" header="Horario" />
          <Column field="category" header="Cant. Cupos" />
          <Column field="quantity" header="Cant. Secciones" />
          <Column />
        </DataTable>
      </div>
    </div>
  )
}

export default CargarOferta

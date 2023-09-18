import Import from './import'
import Export from './export'
import { useState } from 'react'

const PruebasImportExport = () => {
  const vistasInternas = {
    import: true,
    export: false
  }
  const [cambioVista, setCambioVista] = useState(vistasInternas)

  return (
    <div>
      {cambioVista.import && <Import cambioVista={setCambioVista} />}
      {cambioVista.export && <Export cambioVista={setCambioVista} />}
    </div>
  )
}

export default PruebasImportExport

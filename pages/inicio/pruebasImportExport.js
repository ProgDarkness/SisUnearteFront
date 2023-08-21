import Import from '../importExport/import'
import Export from '../importExport/export'
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

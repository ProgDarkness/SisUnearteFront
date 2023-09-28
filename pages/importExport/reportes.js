import Import from './import'
import Export from './exportPostulados'
import { useState } from 'react'
import ExportInscritos from './exportInscrito'

const ReportesData = () => {
  const vistasInternas = {
    import: true,
    export: false,
    exportInscrito: false
  }

  const [cambioVista, setCambioVista] = useState(vistasInternas)

  return (
    <div>
      {cambioVista.import && <Import cambioVista={setCambioVista} />}
      {cambioVista.export && <Export cambioVista={setCambioVista} />}
      {cambioVista.exportInscrito && (
        <ExportInscritos cambioVista={setCambioVista} />
      )}
    </div>
  )
}

export default ReportesData

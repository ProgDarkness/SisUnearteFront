import { Button } from 'primereact/button'

const Export = ({ cambioVista }) => {
  return (
    <div className="grid col-span-5 gap-4 mt-2">
      <div className="col-span-5 flex justify-between">
        <div />
        <h1 className="text-3xl font-semibold text-white">Export de Data</h1>
        <Button
          label="Ir a Import"
          onClick={() => {
            const newVistas = {
              [`import`]: true
            }
            cambioVista((prevState) => ({
              ...prevState,
              ...newVistas,
              ...Object.keys(prevState).reduce((acc, key) => {
                if (key !== 'import') acc[key] = false
                return acc
              }, {})
            }))
          }}
        />
      </div>
    </div>
  )
}

export default Export

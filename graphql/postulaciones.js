import { gql } from 'graphql-request'

export default {
  SAVE_POSTULACION: gql`
    mutation crearPostulacion($InputPostulacion: InputPostulacion!) {
      crearPostulacion(input: $InputPostulacion) {
        status
        message
        type
      }
    }
  `
}

import { gql } from 'graphql-request'

export default {
  SAVE_PERSONAL: gql`
    mutation crearPersonal($InputPersonal: InputPersonal!) {
      crearPersonal(input: $InputPersonal) {
        status
        message
        type
      }
    }
  `,
  GET_PERSONAL: gql`
    query obtenerPersonal {
      obtenerPersonal {
        response {
          id
          nacionalidad
          cedula
          nombre
          apellido
          sexo
          civil
          tlffijo
          tlfmovil
          correo
          estatus
          tipo
          cargahoraria
          profesion
        }
      }
    }
  `
}

import { gql } from 'graphql-request'

export default {
  SAVE_CARRERA: gql`
    mutation crearCarrera($InputCrearCarrera: InputCrearCarrera!) {
      crearCarrera(input: $InputCrearCarrera) {
        status
        message
        type
      }
    }
  `,
  GET_CARRERAS: gql`
    query todascarreras {
      obtenerTodasCarreras {
        response {
          id
          codigo
          nombre
          tipo
          ciclo
          estatus
          titulo
        }
      }
    }
  `
}

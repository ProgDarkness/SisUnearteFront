import { gql } from 'graphql-request'

export default {
  SAVE_CARRERA: gql`
    mutation crearCarrera($InputCrearCarrera: InputCrearCarrera!) {
      crearCarrera(input: $InputCrearCarrera) {
        message
      }
    }
  `
}

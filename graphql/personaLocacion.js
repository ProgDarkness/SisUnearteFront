import { gql } from 'graphql-request'

export default {
  SAVE_PERSONA_LOCACION: gql`
    mutation savePersonasLocacion(
      $cedula: Int!
      $nombre: String!
      $apellido: String!
      $ciudad: String!
    ) {
      savePersonasLocacion(
        cedula: $cedula
        nombre: $nombre
        apellido: $apellido
        ciudad: $ciudad
      ) {
        status
        type
        message
      }
    }
  `
}

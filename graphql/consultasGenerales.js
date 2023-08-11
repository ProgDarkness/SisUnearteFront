import { gql } from 'graphql-request'

export default {
  GET_SEXO: gql`
    query sexos {
      obtenerSexos {
        response {
          id
          nombre
        }
      }
    }
  `
}

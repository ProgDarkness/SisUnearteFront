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
  `,
  GET_NACIONALIDADES: gql`
    query nacionalidades {
      obtenerNacionalidades {
        response {
          id
          codigo
          nombre
        }
      }
    }
  `
}

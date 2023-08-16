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
  `,
  GET_DISCAPACIDADES: gql`
    query discapacidades {
      obtenerDiscapacidades {
        response {
          id
          nombre
        }
      }
    }
  `,
  GET_PAISES: gql`
    query paises {
      obtenerPaises {
        response {
          id
          nombre
        }
      }
    }
  `,
  GET_ESTADOS_CIVILES: gql`
    query obtenerEstadoCivil {
      obtenerEstadoCivil {
        status
        message
        type
        response {
          id
          nombre
        }
      }
    }
  `
}

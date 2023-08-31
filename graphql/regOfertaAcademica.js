import { gql } from 'graphql-request'

export default {
  GET_TODOS_PERIODOS: gql`
    query obtenerPeriodos {
      obtenerPeriodos {
        status
        message
        type
        response {
          id
          codigo
          periodo
          anio
          mesi
          mesf
          semana
          personal
          mensaje
          fei
          fef
          feacta
          fedoc
          fepregrado
          feretiro
          femodificacion
          feipre
          fefpre
          feinsc
          fefinsc
          feioferta
          fefoferta
          feiretiro
          fefretiro
          feinota
          fefnota
          estatus
        }
      }
    }
  `,
  SAVE_PERIODO: gql`
    mutation crearPeriodo($InputPeriodo: InputPeriodo!) {
      crearPeriodo(input: $InputPeriodo) {
        status
        message
        type
      }
    }
  `,
  UPDATE_PERIODO: gql`
    mutation actualizarPeriodo(
      $InputActualizarPeriodo: InputActualizarPeriodo!
    ) {
      actualizarPeriodo(input: $InputActualizarPeriodo) {
        status
        message
        type
      }
    }
  `,
  DELETE_PERIODO: gql`
    mutation eliminarPeriodo($InputEliminarPeriodo: InputEliminarPeriodo!) {
      eliminarPeriodo(input: $InputEliminarPeriodo) {
        status
        message
        type
      }
    }
  `,
  ELMINAR_PERIODO: gql`
    mutation eliminarPeriodo($InputEliminarPeriodo: InputEliminarPeriodo!) {
      eliminarPeriodo(input: $InputEliminarPeriodo) {
        status
        message
        type
      }
    }
  `
}

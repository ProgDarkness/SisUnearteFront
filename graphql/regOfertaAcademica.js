import { gql } from 'graphql-request'

export default {
  GET_PERIODOS_OFER: gql`
    query obtenerPeridosOferta {
      obtenerPeridosOferta {
        status
        message
        type
        response {
          id
          nombre
        }
      }
    }
  `,
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
          idperiodo
          anio
          mesi
          idmesi
          mesf
          idmesf
          semana
          mensaje
          fei
          fef
          feacta
          fedoc
          fepregrado
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
          feipostulacion
          fefpostulacion
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
  `,
  OBTENER_OFERTAS: gql`
    query obtenerOfertaAcademica {
      obtenerOfertaAcademica {
        status
        message
        type
        response {
          id_oferta
          co_oferta
          tx_mensaje
          id_carrera
          nb_carrera
          nb_tp_carrera
          nb_ciclo
          nu_cupos
          nu_seccion
          id_sede
          nb_sede
          id_estatus_oferta
          nb_estatus_oferta
        }
      }
    }
  `,
  ELIMINAR_OFERTA: gql`
    mutation eliminarOferta($idOferta: Int!) {
      eliminarOferta(idOferta: $idOferta) {
        status
        message
        type
      }
    }
  `,
  DETALLES_MALLAS_CARRERA: gql`
    query obtenerDetalleMalla($carrera: Int!) {
      obtenerDetalleMalla(carrera: $carrera) {
        status
        message
        type
        response {
          id_carrema
          idTrayectoCarrera
          nb_trayecto
          id_materia
          nb_materia
          id_personal
          personal
        }
      }
    }
  `
}

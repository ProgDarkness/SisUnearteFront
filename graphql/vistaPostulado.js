import { gql } from 'graphql-request'

export default {
  QUERY_LISTA_REPORTE: gql`
    query postulados {
      obtenerListadoPostuladoCarrera {
        response {
          id
          nacionalidad
          cedula
          nombre
          apellido
          fepostulacion
          carrera
          periodo
          tperiodo
          estatus
        }
      }
    }
  `
}

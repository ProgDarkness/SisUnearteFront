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
          observacion
          estatus
          periodo
          tperiodo
          carrera
          sede
          estado
        }
      }
    }
  `,
  INSERT_ESTUDIANTES: gql`
    mutation insertarEstudiante(
      $InputInsertarEstudiante: InputInsertarEstudiante!
    ) {
      insertarEstudiante(input: $InputInsertarEstudiante) {
        status
        message
        type
      }
    }
  `
}

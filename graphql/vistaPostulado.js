import { gql } from 'graphql-request'

export default {
  QUERY_LISTA_REPORTE: gql`
    query obtenerListadoPostuladoCarrera($input: InputFiltroPostu) {
      obtenerListadoPostuladoCarrera(input: $input) {
        response {
          id
          idusuario
          nacionalidad
          cedula
          nombre
          apellido
          fepostulacion
          observacion
          estatus
          idperiodo
          periodo
          tperiodo
          idcarrera
          carrera
          sede
          estado
        }
      }
    }
  `,
  QUERY_LISTA_POSTULADOS: gql`
    query obtenerListadoPostulado {
      obtenerListadoPostulado {
        response {
          id
          idusuario
          nacionalidad
          cedula
          nombre
          apellido
          fepostulacion
          observacion
          estatus
          idperiodo
          periodo
          tperiodo
          idcarrera
          carrera
          idsede
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

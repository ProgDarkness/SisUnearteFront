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

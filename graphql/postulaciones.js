import { gql } from 'graphql-request'

export default {
  GET_DOCS_ESTUDIANTE: gql`
    query obtenerDocsEstudiante($idEstudiante: Int!) {
      obtenerDocsEstudiante(idEstudiante: $idEstudiante) {
        docs {
          cedula
          rif
          tituloBachiller
          notasCertificadas
          fondoNegro
        }
      }
    }
  `,
  SAVE_DOCS_ESTUDIANTE: gql`
    mutation guardarDocs($inputDocs: inputDocs!) {
      guardarDocs(inputDocs: $inputDocs) {
        status
        type
        message
      }
    }
  `,
  GET_POSTULADOS: gql`
    query obtenerListadoPostuladoCarrera {
      obtenerListadoPostuladoCarrera {
        response {
          id_personal
          idnac
          nacionalidad
          cedula
          nombre
          apellido
          idsexo
          sexo
          idcivil
          civil
          tlffijo
          tlfmovil
          correo
          idestatus
          estatus
          idtipo
          tipo
          cargahoraria
          idprofesion
          profesion
        }
      }
    }
  `,
  SAVE_POSTULACION: gql`
    mutation crearPostulacion($InputPostulacion: InputPostulacion!) {
      crearPostulacion(input: $InputPostulacion) {
        status
        message
        type
      }
    }
  `,
  RECHAZAR_POSTULACION: gql`
    mutation rechazarPostulacion(
      $InputRechazarPostulacion: InputRechazarPostulacion!
    ) {
      rechazarPostulacion(input: $InputRechazarPostulacion) {
        status
        message
        type
      }
    }
  `,
  APROBAR_POSTULACION: gql`
    mutation aprobarPostulacion(
      $InputAprobarPostulacion: InputAprobarPostulacion!
    ) {
      aprobarPostulacion(input: $InputAprobarPostulacion) {
        status
        message
        type
      }
    }
  `,
  GET_OFERTAS_ACADEMICAS: gql`
    query obtenerOfertaPostu {
      obtenerOfertaPostu {
        status
        message
        type
        response {
          id_oferta
          id_carrera
          nb_carrera
          id_sede
          nb_sede
          id_seccion
        }
      }
    }
  `,
  GET_PERMISO_POSTULACION: gql`
    query obtenerPermisoPostulacion($idUser: Int!) {
      obtenerPermisoPostulacion(idUser: $idUser) {
        status
        message
        type
        response
      }
    }
  `,
  GET_POSTULACION_USUARIO: gql`
    query obtenerPostulacionUsuario($idUser: Int!) {
      obtenerPostulacionUsuario(idUser: $idUser) {
        status
        message
        type
        response {
          id
          usuario
          carrera
          periodo
          estatus
          sede
        }
      }
    }
  `
}

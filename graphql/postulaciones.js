import { gql } from 'graphql-request'

export default {
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
        }
      }
    }
  `
}

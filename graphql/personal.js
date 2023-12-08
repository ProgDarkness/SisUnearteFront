import { gql } from 'graphql-request'

export default {
  SAVE_PERSONAL: gql`
    mutation crearPersonal($InputPersonal: InputPersonal!) {
      crearPersonal(input: $InputPersonal) {
        status
        message
        type
        response
      }
    }
  `,
  UPDATE_PERSONAL: gql`
    mutation actualizarPersonal(
      $InputActualizarPersonal: InputActualizarPersonal!
    ) {
      actualizarPersonal(input: $InputActualizarPersonal) {
        status
        message
        type
      }
    }
  `,
  DELETE_PERSONAL: gql`
    mutation eliminarPersonal($InputEliminarPersonal: InputEliminarPersonal!) {
      eliminarPersonal(input: $InputEliminarPersonal) {
        status
        message
        type
      }
    }
  `,
  GET_PERSONAL: gql`
    query obtenerPersonal {
      obtenerPersonal {
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
  GET_INFO_PERSONAL: gql`
    query getInfoPersonal {
      getInfoPersonal {
        response {
          id
          nacionalidad
          cedula
          nombre
          apellido
          sexo
          estadoCivil
          tlffijo
          tlfmovil
          correo
          estatusPersonal
          tipo
          cargahoraria
          profesion
        }
      }
    }
  `
}

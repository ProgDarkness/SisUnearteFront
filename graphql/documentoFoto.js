import { gql } from 'graphql-request'

export default {
  ELIMINAR_DOCUMENTO_USUARIO: gql`
    mutation eliminarArchivoUsuario($inputDatosArchivo: inputDatosArchivo!) {
      eliminarArchivoUsuario(inputDatosArchivo: $inputDatosArchivo) {
        message
        status
        type
      }
    }
  `,
  APROBAR_DOCUMENTO_USUARIO: gql`
    mutation aprobarArchivoUsuario($inputDatosArchivo: inputDatosArchivo!) {
      aprobarArchivoUsuario(inputDatosArchivo: $inputDatosArchivo) {
        message
        status
        type
      }
    }
  `,
  RECHAZAR_DOCUMENTO_USUARIO: gql`
    mutation rechazarArchivoUsuario(
      $inputRechazarArchivo: inputRechazarArchivo!
    ) {
      rechazarArchivoUsuario(inputRechazarArchivo: $inputRechazarArchivo) {
        message
        status
        type
      }
    }
  `,
  BUSCAR_ARCHIVO_USUARIO: gql`
    mutation obtenerArchivoUsuario($inputDatosArchivo: inputDatosArchivo!) {
      obtenerArchivoUsuario(inputDatosArchivo: $inputDatosArchivo) {
        message
        status
        type
        response
      }
    }
  `,
  CREAR_DOCUMENTO_POSTULACION: gql`
    mutation crearDocumentoPostulacion(
      $InputDocPostulacion: InputDocPostulacion!
    ) {
      crearDocumentoPostulacion(input: $InputDocPostulacion) {
        message
        status
        type
      }
    }
  `,
  GET_FOTO: gql`
    mutation obtenerFotoPerfilUsuario($idUser: Int!) {
      obtenerFotoPerfilUsuario(idUser: $idUser) {
        response {
          id
          archivo
        }
      }
    }
  `,
  SAVE_FOTO: gql`
    mutation crearFotoEstudiante($InputFotoEstudiante: InputFotoEstudiante!) {
      crearFotoEstudiante(input: $InputFotoEstudiante) {
        message
        status
        type
      }
    }
  `,
  ELIMINAR_FOTO: gql`
    mutation eliminarFotoEstudiante(
      $InputEliminarFotoPerfilUsuario: InputEliminarFotoPerfilUsuario!
    ) {
      eliminarFotoEstudiante(input: $InputEliminarFotoPerfilUsuario) {
        status
        message
        type
      }
    }
  `
}

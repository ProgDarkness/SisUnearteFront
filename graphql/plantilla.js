import { gql } from 'graphql-request'

export default {
  GET_USUARIOS: gql`
    query getUsuarios {
      getUsuarios {
        id_usuario
        user_name
        bl_status
        rol
        ced_usuario
        nb_usuario
        ape_usuario
        created_at
        updated_at
      }
    }
  `,
  SAVE_USUARIO: gql`
    mutation saveUsuario($input: InputSaveUser!) {
      saveUsuario(input: $input) {
        status
        type
        message
      }
    }
  `,
  GET_ROLES: gql`
    query getRoles {
      getRoles {
        id_rol
        nb_rol
      }
    }
  `,
  DELETE_USUARIOS: gql`
    mutation deleteUsuario($input: InputDeleteUser) {
      deleteUsuario(input: $input) {
        status
        type
        message
      }
    }
  `,
  CAMBIAR_ESTATUS: gql`
    mutation cambiarEstatus($input: InputDeleteUser) {
      cambiarEstatus(input: $input) {
        status
        type
        message
      }
    }
  `,
  OBTENER_USUARIO_REGISTRADO: gql`
    mutation obtenerUsuarioRecuperaCuenta($input: InputDatoUsuario) {
      obtenerUsuarioRecuperaCuenta(input: $input) {
        status
        type
        message
        response {
          id
          cedula
          primer_nombre
          segundo_nombre
          primer_apellido
          segundo_apellido
          correo
        }
      }
    }
  `,
  SAVE_RECUPERA_CUENTA: gql`
    mutation recuperarCuenta($input: InputRecuperaUser!) {
      recuperarCuenta(input: $input) {
        status
        type
        message
      }
    }
  `
}

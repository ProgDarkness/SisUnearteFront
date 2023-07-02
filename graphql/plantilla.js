import { gql } from 'graphql-request'

export default {
  GET_PERSONAS: gql`
    query GetPersonas {
      personas: getPersonas {
        id_persona
        nb_persona
        grupo
        id_grupo
        telefono
      }
    }
  `,
  GET_USUARIOS: gql`
    query getUsuarios {
      getUsuarios {
        id_usuario
        user_name
        bl_status
        rol
        ced_usuario
        nomb_usuario
        ape_usuario
        created_at
        updated_at
      }
    }
  `,
  GET_GRUPOS: gql`
    query GetGrupos {
      grupos: getGrupos {
        id_grupo
        grupo
      }
    }
  `,
  SAVE_PERSONA: gql`
    mutation SavePersona($input: InputPersona!) {
      savePersona(input: $input)
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
  DELETE_PERSONA: gql`
    mutation DeletePersona($id: ID!) {
      deletePersona(id: $id)
    }
  `,
  DELETE_PERSONAS: gql`
    mutation DeletePersonas($ids: [ID]!) {
      deletePersonas(ids: $ids)
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
  `
}

import { gql } from 'graphql-request'

export default {
  GET_ASIG_ELECTIVAS: gql`
    query {
      getElectivasAsignadas {
        status
        message
        type
        response {
          id_carrelec
          id_carrera
          nb_carrera
          id_electiva
          co_electiva
          nu_credito
          hr_semanal
          nb_electiva
          id_trayecto
          nb_trayecto
          id_personal
          nb_personal
          id_sede
          nb_sede
        }
      }
    }
  `,
  GET_ELECTIVAS_DROPDOWN: gql`
    query {
      getTodasElectivasDropDown {
        status
        message
        type
        response {
          id
          nombre
        }
      }
    }
  `,
  GET_ELECTIVA: gql`
    query {
      getTodasElectivas {
        status
        message
        type
        response {
          id_electiva
          co_electiva
          nb_electiva
          nu_credito
          hr_semanal
        }
      }
    }
  `,
  SAVE_ELECTIVA: gql`
    mutation saveElectiva($inputSaveElectiva: inputSaveElectiva!) {
      saveElectiva(inputSaveElectiva: $inputSaveElectiva) {
        status
        message
        type
      }
    }
  `,
  DELETE_ELECTIVA: gql`
    mutation deleteElectiva($idElectiva: Int!) {
      deleteElectiva(idElectiva: $idElectiva) {
        status
        message
        type
      }
    }
  `,
  UPDATE_ELECTIVA: gql`
    mutation updateElectiva($inputSaveElectiva: inputSaveElectiva!) {
      updateElectiva(inputSaveElectiva: $inputSaveElectiva) {
        status
        message
        type
      }
    }
  `,
  ASIGNAR_ELECTIVA: gql`
    mutation asignarElectiva($inputAsigElectiva: inputAsigElectiva!) {
      asignarElectiva(inputAsigElectiva: $inputAsigElectiva) {
        status
        message
        type
      }
    }
  `,
  DELETE_ASIG_ELECTIVA: gql`
    mutation deleteAsignarElectiva($idAsigElectiva: Int!) {
      deleteAsignarElectiva(idAsigElectiva: $idAsigElectiva) {
        status
        message
        type
      }
    }
  `
}

import { gql } from 'graphql-request'

export default {
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
  `
}

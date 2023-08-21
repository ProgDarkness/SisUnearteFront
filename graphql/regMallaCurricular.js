import { gql } from 'graphql-request'

export default {
  SAVE_CARRERA: gql`
    mutation crearCarrera($InputCrearCarrera: InputCrearCarrera!) {
      crearCarrera(input: $InputCrearCarrera) {
        status
        message
        type
      }
    }
  `,
  GET_CARRERAS: gql`
    query todascarreras {
      obtenerTodasCarreras {
        response {
          id
          codigo
          nombre
          tipo
          ciclo
          estatus
          titulo
        }
      }
    }
  `,
  GET_SEDE_CARRERA_MATERIA: gql`
    query obtenerSedesPorCarrera($carrera: Int!) {
      obtenerSedesPorCarrera(carrera: $carrera) {
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
  GET_MATERIAS: gql`
    query obtenertodasmaterias {
      obtenerTodasMaterias {
        response {
          id
          codigo
          nombre
          credito
          hora
          estatus
        }
      }
    }
  `
}

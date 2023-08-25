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
          sede
        }
      }
    }
  `,
  GET_MALLAS: gql`
    query obtenerTodasMallas {
      obtenerTodasMallas {
        response {
          id
          codigo
          nombre
          tipo
          ciclo
          estatus
          titulo
          sede
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
          tipo
          carrera
        }
      }
    }
  `,
  SAVE_MATERIA: gql`
    mutation crearmateria($InputCrearMateria: InputCrearMateria!) {
      crearMateria(input: $InputCrearMateria) {
        message
      }
    }
  `,
  DELETE_CARRERA: gql`
    mutation eliminarcarrera($InputEliminarCarrera: InputEliminarCarrera!) {
      eliminarCarrera(input: $InputEliminarCarrera) {
        message
      }
    }
  `,
  DELETE_MATERIA: gql`
    mutation eliminarmateria($InputEliminarMateria: InputEliminarMateria!) {
      eliminarMateria(input: $InputEliminarMateria) {
        message
      }
    }
  `,
  VER_DETALLE_CARRERA: gql`
    query obtenerDetalleCarrera($InputCarrera: InputCarrera!) {
      obtenerDetalleCarrera(input: $InputCarrera) {
        status
        message
        type
        response {
          id_carrema
          idTrayectoCarrera
          nb_trayecto
          id_materia
          nb_materia
        }
      }
    }
  `,
  GET_CARRERAS_POR_MATERIA: gql`
    query obtenerMateriasPorCarrera($carrera: Int!) {
      obtenerMateriasPorCarrera(carrera: $carrera) {
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
  GET_TRAYECTOS_POR_CARRERA: gql`
    query obtenerTrayectosPorCarrera($carrera: Int!) {
      obtenerTrayectosPorCarrera(carrera: $carrera) {
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
  ASIGNAR_TRAYECTO: gql`
    mutation asignarTrayectoMateria(
      $idCarrema: Int!
      $idTrayecto: Int!
      $idMateria: Int!
    ) {
      asignarTrayectoMateria(
        idCarrema: $idCarrema
        idTrayecto: $idTrayecto
        idMateria: $idMateria
      ) {
        status
        message
        type
      }
    }
  `,
  DESASIGNAR_TRAYECTO: gql`
    mutation desasignarTrayectoMateria($idCarrema: Int!, $idMateria: Int!) {
      desasignarTrayectoMateria(idCarrema: $idCarrema, idMateria: $idMateria) {
        status
        message
        type
      }
    }
  `,
  ACTUALIZAR_ESTATUS_CARRERA: gql`
    mutation actualizarestatuscarrera(
      $InputEstatusCarrera: InputEstatusCarrera!
    ) {
      actualizarEstatusCarrera(input: $InputEstatusCarrera) {
        status
        message
        type
      }
    }
  `
}

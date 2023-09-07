import { gql } from 'graphql-request'

export default {
  GET_ESTADOS_CRUD: gql`
    query obtenerCrudEstados {
      obtenerCrudEstados {
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
  GET_SEDES_CRUD: gql`
    query obtenerCrudSede {
      obtenerCrudSede {
        status
        message
        type
        response {
          id_sede
          co_sede
          nb_sede
          id_geografico_sede
          id_estatus
          estatus
        }
      }
    }
  `,
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
          idtipo
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
      $idCarrera: Int!
      $idTrayecto: Int!
      $idMateria: Int!
    ) {
      asignarTrayectoMateria(
        idCarrera: $idCarrera
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
    mutation desasignarTrayectoMateria($idCarrema: Int!) {
      desasignarTrayectoMateria(idCarrema: $idCarrema) {
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
  `,
  ASIGNAR_SEDE_CARRERA: gql`
    mutation asignarSedeCarrera($idCarrera: Int!, $idSede: Int!) {
      asignarSedeCarrera(idCarrera: $idCarrera, idSede: $idSede) {
        status
        message
        type
      }
    }
  `,
  GET_SEDES_CARRERAS: gql`
    query obtenerSedeCarreras {
      obtenerSedeCarreras {
        id_scarrera
        id_sede
        nb_sede
        id_carrera
        nb_carrera
      }
    }
  `,
  ELIMINAR_SEDE_CARRERA: gql`
    mutation eliminarSedeCarrera($idSedeCarrera: Int!, $idCarrera: Int!) {
      eliminarSedeCarrera(
        idSedeCarrera: $idSedeCarrera
        idCarrera: $idCarrera
      ) {
        status
        message
        type
      }
    }
  `,
  ACTUALIZAR_MATERIA: gql`
    mutation actualizarMateria(
      $InputActualizarMateria: InputActualizarMateria!
    ) {
      actualizarMateria(input: $InputActualizarMateria) {
        status
        message
        type
      }
    }
  `,
  TRASPASAR_MATERIA: gql`
    mutation traspasarMateria(
      $idCarrera: Int!
      $idMateria: Int!
      $horasSemanales: Int!
    ) {
      traspasarMateria(
        idCarrera: $idCarrera
        idMateria: $idMateria
        horasSemanales: $horasSemanales
      ) {
        status
        message
        type
      }
    }
  `,
  ELIMINAR_TRASPASO: gql`
    mutation eliminarTraspaso($idcarrema: Int!) {
      eliminarTraspaso(idcarrema: $idcarrema) {
        status
        message
        type
      }
    }
  `,
  GET_SEDES_CARRERA: gql`
    mutation obtenerSedeCarrera($idCarrera: Int!) {
      obtenerSedeCarrera(idCarrera: $idCarrera) {
        status
        message
        type
      }
    }
  `
}

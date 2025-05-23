import { gql } from 'graphql-request'

export default {
  CREAR_CLAVE: gql`
    mutation CrearClave($input: InputCrearClave!) {
      crearClave(input: $input) {
        status
        message
        type
      }
    }
  `,
  SAVE_PERFIL_USER: gql`
    mutation actualizarusuario(
      $InputActualizarUsuario: InputActualizarUsuario!
    ) {
      actualizarUsuario(input: $InputActualizarUsuario) {
        status
        message
        type
      }
    }
  `,
  GET_INFO_USER_REG: gql`
    query getInfoUsuario($id_usuario: Int!) {
      getInfoUsuario(id_usuario: $id_usuario) {
        status
        type
        message
        response {
          nacionalidad {
            id
            codigo
            nombre
          }
          ced_usuario
          nb_usuario
          ape_usuario
          sexo {
            id
            nombre
          }
          fe_nac_usuario
          paisNac {
            id
            nombre
          }
          pais {
            id
            nombre
          }
          estadoCivil {
            id
            nombre
          }
          correo_usuario
          tpVia {
            id
            nombre
          }
          nb_via
          tpZona {
            id
            nombre
          }
          nombZona {
            id
            nombre
            codigo_postal
          }
          tpVivienda {
            id
            nombre
          }
          nu_vivienda
          ciudad {
            id
            nombre
          }
          estado {
            id
            nombre
          }
          municipio {
            id
            nombre
          }
          parroquia {
            id
            nombre
          }
          bl_registro
          nb2_usuario
          ape2_usuario
          discapacidad {
            id
            nombre
          }
          etnia {
            id
            nombre
          }
          estadoNac {
            id
            nombre
          }
          ciudadNac {
            id
            nombre
          }
          dir_trabajo,
          telefono_trabajo,
          bl_trabajo
        }
      }
    }
  `
}

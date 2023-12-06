import { gql } from 'graphql-request'

export default {
  GET_SEXO: gql`
    query sexos {
      obtenerSexos {
        response {
          id
          nombre
        }
      }
    }
  `,
  GET_NACIONALIDADES: gql`
    query nacionalidades {
      obtenerNacionalidades {
        response {
          id
          codigo
          nombre
        }
      }
    }
  `,
  GET_DISCAPACIDADES: gql`
    query discapacidades {
      obtenerDiscapacidades {
        response {
          id
          nombre
        }
      }
    }
  `,
  GET_PAISES: gql`
    query paises {
      obtenerPaises {
        response {
          id
          nombre
        }
      }
    }
  `,
  GET_ESTADOS: gql`
    query estados {
      obtenerEstados {
        response {
          id
          nombre
        }
      }
    }
  `,
  GET_CIUDADES: gql`
    query ciudades {
      obtenerCiudades {
        response {
          id
          nombre
        }
      }
    }
  `,
  GET_MUNICIPIOS: gql`
    query municipios {
      obtenerMunicipios {
        response {
          id
          nombre
        }
      }
    }
  `,
  GET_PARROQUIAS: gql`
    query parroquias {
      obtenerParroquias {
        response {
          id
          nombre
        }
      }
    }
  `,
  GET_ESTADOS_CIVILES: gql`
    query obtenerEstadoCivil {
      obtenerEstadoCivil {
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
  GET_ESTADOS_POR_PAIS: gql`
    mutation estadospaises($InputPais: InputPais!) {
      obtenerEstadosPorPais(input: $InputPais) {
        response {
          id
          nombre
        }
      }
    }
  `,
  GET_MUNICIPIOS_POR_ESTADO: gql`
    mutation obtenerMunicipiosPorEstado($InputEstado: InputEstado!) {
      obtenerMunicipiosPorEstado(input: $InputEstado) {
        response {
          id
          nombre
        }
      }
    }
  `,
  GET_CIUDADES_POR_ESTADO: gql`
    mutation obtenerCiudadesPorEstado($InputEstado: InputEstado!) {
      obtenerCiudadesPorEstado(input: $InputEstado) {
        response {
          id
          nombre
        }
      }
    }
  `,
  GET_PARROQUIAS_POR_MUNICIPIO: gql`
    mutation obtenerParrquiasPorMunicipio($InputMunicipio: InputMunicipio!) {
      obtenerParrquiasPorMunicipio(input: $InputMunicipio) {
        response {
          id
          nombre
        }
      }
    }
  `,
  GET_TIPO_ZONAS: gql`
    query obtenerTipoZona {
      obtenerTipoZona {
        response {
          id
          nombre
        }
      }
    }
  `,
  GET_ZONAS_POR_PARROQUIA: gql`
    mutation obtenerZonasPorParroquias($InputParroquia: InputParroquia!) {
      obtenerZonasPorParroquias(input: $InputParroquia) {
        status
        message
        type
        response {
          id
          nombre
          codigo_postal
        }
      }
    }
  `,
  GET_TIPO_VIAS: gql`
    query obtenerTipoVia {
      obtenerTipoVia {
        response {
          id
          nombre
        }
      }
    }
  `,
  GET_TIPO_VIVIENDA: gql`
    query obtenerTipoVivienda {
      obtenerTipoVivienda {
        response {
          id
          nombre
        }
      }
    }
  `,
  GET_TIPO_CARRERA: gql`
    query tiposcarreras {
      obtenerTipoCarrera {
        response {
          id
          nombre
        }
      }
    }
  `,
  GET_TIPO_CICLOS: gql`
    query obtenerCiclos {
      obtenerCiclos {
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
  GET_TIPO_MATERIA: gql`
    query obtenerTipoMateria {
      obtenerTipoMateria {
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
  GET_SEDES: gql`
    query obtenerSedes {
      obtenerSedes {
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
  GET_TIPO_TITULO: gql`
    query obtenertipotitulos {
      obtenerTipoTitulo {
        response {
          id
          nombre
        }
      }
    }
  `,
  GET_ETNIAS: gql`
    query obtenerEtnia {
      obtenerEtnia {
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
  GET_CARRERAS: gql`
    query obtenerCarreras {
      obtenerCarreras {
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
  GET_MESES: gql`
    query obtenermeses {
      obtenerMes {
        response {
          id
          nombre
        }
      }
    }
  `,
  GET_MATERIAS_ONE: gql`
    query obtenermaterias {
      obtenerMaterias {
        response {
          id
          nombre
        }
      }
    }
  `,
  GET_PROFESIONES: gql`
    query obtenerProfesion {
      obtenerProfesion {
        response {
          id
          nombre
        }
      }
    }
  `,
  GET_TIPO_PERSONAL: gql`
    query obtenerTipoPersonal {
      obtenerTipoPersonal {
        response {
          id
          nombre
        }
      }
    }
  `,
  GET_DEPARTAMENTO: gql`
    query obtenerTipoDepartamento {
      obtenerTipoDepartamento {
        response {
          id
          nombre
        }
      }
    }
  `,
  GET_ROLES: gql`
    query obtenerRoles {
      obtenerRoles {
        response {
          id
          nombre
        }
      }
    }
  `,
  GET_TIPO_DOCUMENTO: gql`
  query obtenerTipoDocumento {
    obtenerTipoDocumento {
      response {
        id
        nombre
        tipocarrera
      }
    }
  }
  `
}

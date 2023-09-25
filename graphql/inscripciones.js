import { gql } from 'graphql-request'

export default {
  QUERY_LISTA_INSCRITOS: gql`
    query inscritos {
      obtenerListadoInscrito {
        response {
          idest
          idnac
          cedest
          nb1est
          ape1est
          nb2est
          ape2est
          idtpsexo
          idcivil
          fenacest
          idpaishab
          correoest
          idtpvia
          viahab
          idtpzona
          nbzona
          idzona
          codpostal
          idtpvivienda
          idparroquia
          blregistro
          idtpdisc
          idetnia
          idmunicipio
          nuvivienda
          idcdadhab
          idedohab
          idpaisnac
          idcdadnac
          idedonac
          idtpingreso
          idestatus
          conac
          nbnac
          nbsexo
          nbpaishab
          paisnac
          cdadnac
          edonac
          nbcivil
          nbvia
          nbtpzona
          nbtpvivienda
          nbcdadhab
          nbedohab
          nbmunhab
          nbparrhab
          nbdisc
          nbetnia
          nbtpingreso
          nbestatus
          idperiodo
          coperiodo
          anioperiodo
          feingreso
        }
      }
    }
  `
}

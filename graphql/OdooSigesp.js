import { gql } from 'graphql-request'

export default {
  GET_ORDENES_COMPRA: gql`
    query getOrdenesCompra($rif_pro: String!) {
      ordenes: getOrdenesCompra(rif_pro: $rif_pro) {
        name
        code
        fecha
      }
    }
  `,
  GET_PRODUCTOS_ODOO: gql`
    query {
      productos: getProductosODOO {
        name
        code
      }
    }
  `,
  GET_PROVEEDORES_SIGESP: gql`
    query {
      getProveedoresSIGESP {
        code
        name
        name_prov
      }
    }
  `,
  GET_ENTITY_PRODUCTS: gql`
    query getEntityProducts($code: String!) {
      getEntityProducts(code: $code) {
        entity {
          nu_oc
          fecha
          rif
          nb_proveedor
        }
        products {
          cod_articulo
          desc_articulo
          cant_articulo
          cant_arti_mov
        }
      }
    }
  `,
  GET_ALMACENES_ODOO: gql`
    query {
      getAlmacenesOdoo {
        code
        name
      }
    }
  `,
  GET_MOVIMIENTOS_ARTICULO: gql`
    query getMovimientosArticuloAlmacen($codArticulo: String!) {
      getMovimientosArticuloAlmacen(codArticulo: $codArticulo) {
        id_movimiento
        desc_almacen
        cant_arti_mov
        created_at
      }
    }
  `,
  SAVE_MOVIMIENTO_ARTICULO: gql`
    mutation saveMovimientoArticulo($input: variablesSaveData!) {
      saveMovimientoArticulo(input: $input) {
        status
        type
        message
      }
    }
  `,
  DELETE_MOVIMIENTO_ARTICULO: gql`
    mutation deleteMovimientoArticulo($idMov: Int!) {
      deleteMovimientoArticulo(idMov: $idMov) {
        status
        type
        message
      }
    }
  `,
  GET_STATUS_DISTRIBUCION: gql`
    query getStatusDistArticulo($code: String!) {
      getStatusDistArticulo(code: $code) {
        id_movimiento
        name_status
        porcentaje_neto_dist
        status_distribucion_ord_comp
      }
    }
  `,
  FINALIZAR_DIST_ORD_COMP: gql`
    mutation finalizarDistOC($idMov: Int!) {
      finalizarDistOC(idMov: $idMov) {
        status
        type
        message
      }
    }
  `
}

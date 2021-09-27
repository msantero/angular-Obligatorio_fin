export interface Venta {
  idVenta: number; //devuelve al crear
  idVendedor: number;
  nombreCliente: string;
  idPaquete: number;
  cantidadMayores: number;
  cantidadMenores: number;
  mensaje: string; //devuelve
  codigo: number; //devuelve
}

export interface VentaResponse {
  id: number;
  vendedor_id: number;
  nombre_cliente: string;
  id_paquete: number;
  cantidad_mayores: number;
  cantidad_menores: number;
}

export interface VentaPaquete {
  idPaquete: number;
  nombrePaquete: string;
  precioPaquete: number;
  nombreCliente: string;
  cantidad_mayores: number;
  cantidad_menores: number;
}

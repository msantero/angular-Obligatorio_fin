export interface Paquete {
  id: number;
  nombre: string;
  foto: string;
  precio_mayor: number;
  precio_menor: number;
  /*
  constructor(private id_: number, private nombre_: string) {
     this.id = id_;
     this.nombre = nombre_;
  }
  */
}

export interface PaqueteCantPersonas {
  id_paquete: number;
  nombre: string;
  cantidad: number;
  /*
  constructor(private id_: number, private nombre_: string) {
     this.id = id_;
     this.nombre = nombre_;
  }
  */
}
//export const paquetes = [];

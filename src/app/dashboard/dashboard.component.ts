import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { Paquete, PaqueteCantPersonas } from '../paquetes';
import { Venta, VentaPaquete, VentaResponse } from '../ventas';

import { UserService } from '../user.service';
import { PaqueteService } from '../paquetes.service';
import { VentaService } from '../ventas.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  nombre_vendedor = this.userService.getUserNombre();
  cant: Number;
  msg: string;
  cantPaquetesPersonas: number;

  //el primero es el que carga el combo select para que no quede vacío
  paquete: Paquete = { id: 0 } as Paquete;
  paquetes: Paquete[] = [{ id: 0, nombre: 'Choose one' } as Paquete];

  venta: Venta | undefined;
  ventas: VentaResponse[] = [];
  Paquetes_Vendedor: VentaPaquete[] = [];
  PaqueteCantPersonas: PaqueteCantPersonas[] = [];

  venderGroup: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private paqueteService: PaqueteService,
    private ventaService: VentaService,
    private router: Router
  ) {
    this.venderGroup = this.formBuilder.group({
      cliente: '',
      adultos: 0,
      ninos: 0,
    });
  }

  ngOnInit() {
    this.obtener_paquetes();
    this.obtener_ventas(this.userService.getUserId());
    //this.obtener_PaquetesyVentas_Vendedor(this.ventas, this.paquetes);
  }

  obtener_paquetes() {
    console.log('Obtengo paquetes...');
    this.paqueteService.getpaquetes(this.userService.getApiKey()).subscribe(
      (paquets) => {
        /*
        this.paqueteService.setPaquetes(<Paquete[]>paquetes);
        this.paquetes = this.paqueteService.paquetes;
        //console.log('Nombre primer paquete: ' + this.paquetes[0].nombre);
        //console.log('Paquetes: ' + this.paquetes);
        */
        this.paqueteService.setPaquetes(<Paquete[]>paquets);
        this.paquetes = this.paquetes.concat(this.paqueteService.paquetes);
      }
      /*
      ({ error: { mensaje } }) => {
        this.msg = mensaje;
        console.log('Mensaje de error al obtener paquetes: ' + this.msg);
      }
      */
    );
  }

  obtener_ventas(idVendedor: number) {
    console.log('Obtengo todas las ventas...');
    this.ventaService
      .getVentas(this.userService.getApiKey(), idVendedor)
      .subscribe(
        (ventas) => {
          this.ventaService.setVentas(<VentaResponse[]>ventas);
          this.ventas = this.ventaService.ventas;
          //cargo datos del dashboard
          this.obtener_PaquetesyVentas_Vendedor(this.ventas, this.paquetes);
          //this.cantidad_paquetes(this.Paquetes_Vendedor);
          this.obtener_personas_destino(this.paquetes, this.ventas);
        },
        ({ error: { mensaje } }) => {
          this.msg = mensaje;
          console.log('Mensaje de error al obtener paquetes: ' + this.msg);
        }
      );
  }

  vender() {
    console.log(this.userService.user?.apiKey);
    //const { cliente, adultos, ninos  } = this.venderGroup.value;
    const paqueteAvender = {
      ...this.venderGroup.value,
      paqueteId: this.paquete.id,
    };

    const valido_cantidad = () => {
      this.cant = +paqueteAvender.adultos + +paqueteAvender.ninos;
      return this.cant <= 10 && this.cant != 0 ? true : false; //tip: parseInt(adultos) es igual a  +adultos
    };

    if (valido_cantidad() == false) {
      this.msg =
        'Debe ingresar como máximo 10 personas. ' +
        'Cantidad ingresada: ' +
        this.cant;
    } else if (paqueteAvender?.cliente == '') {
      this.msg = 'Debe ingresar cliente' + paqueteAvender?.cliente;
    } else if (!this?.paquete) {
      this.msg = 'Debe seleccionar un paquete';
    } else {
      this.msg = 'Vendiendo...';

      //creo y cargo objeto para mandar al REST
      //let venta =  Venta;

      this.venta = {
        idVenta: 0,
        idVendedor: this.userService.getUserId(),
        nombreCliente: paqueteAvender?.cliente,
        idPaquete: +paqueteAvender?.paqueteId,
        cantidadMayores: +paqueteAvender?.adultos,
        cantidadMenores: +paqueteAvender?.ninos,
        mensaje: '',
        codigo: 404,
      };

      this.ventaService
        .vender(this.userService.getApiKey(), this.venta)
        .subscribe(
          (vent) => {
            this.ventaService.setVenta(<Venta>vent);
            //this.ventaService.user.usuario = usuario
            this.msg =
              'Venta ingresada con id: ' + this.ventaService.getIdVenta();
          },
          ({ error: { mensaje } }) => {
            this.msg = mensaje;
            console.log('Mensaje de error:' + this.msg);
          }
        );

      this.obtener_ventas(this.userService.getUserId());
    }

    console.log(
      this.msg +
        ' vendedor_id: ' +
        this.userService.getUserId() +
        ' cliente: ' +
        paqueteAvender?.cliente +
        ' adultos: ' +
        paqueteAvender?.adultos +
        ' ninos: ' +
        paqueteAvender?.ninos +
        ' idpaquete: ' +
        paqueteAvender?.paqueteId
    );
  }

  //paquetes.forEach((paq, pos)=> console.log(`${paq} en posición ${pos}`));
  //vecPersonas.map(per => per.nombre + "   " + per.apellido)
  //let descriptivo = this.ventas.map((jug)=> {});
  //vec5.forEach(elem => console.log(elem))
  // paquetes.filter((paq) => paq.Id >= 8);

  obtener_PaquetesyVentas_Vendedor(
    ventas: VentaResponse[],
    paquetes: Paquete[]
  ) {
    console.log('Obtengo ventas...');
    let ventapaquete: VentaPaquete;
    this.Paquetes_Vendedor = [];

    paquetes.forEach((paquete) => {
      let frs = ventas.filter((ven) => paquete.id == ven.id_paquete);
      frs.forEach((venta) => {
        ventapaquete = {
          idPaquete: paquete.id,
          nombrePaquete: paquete.nombre,
          precioPaquete:
            paquete.precio_mayor * venta.cantidad_mayores +
            paquete.precio_menor * venta.cantidad_menores,
          nombreCliente: venta.nombre_cliente,
          cantidad_mayores: venta.cantidad_mayores,
          cantidad_menores: venta.cantidad_menores,
        };
        this.Paquetes_Vendedor.push(ventapaquete);
        //console.log(JSON.stringify(this.Paquetes_Vendedor));
      });
    });
  }

  cantidad_paquetes(ventas: VentaPaquete[]) {
    console.log('Obtengo cantidad paquetes vendidos...');
    //let groupedVentas = this.groupArrayOfObjects(ventas, 'idPaquete');
    //Array.from(groupedVentas.entries())
    let idpaquetes: number[];
    ventas.forEach((venta) => {
      idpaquetes.forEach((paq) => {
        venta.idPaquete != paq ? idpaquetes.push(venta.idPaquete) : '';
      });
    });
    return idpaquetes.length;
  }

  obtener_personas_destino(paquetes: Paquete[], ventas: VentaResponse[]) {
    console.log('Obtengo paquetes con cantidad personas...');
    //let pdventas = [];

    paquetes.forEach((paq) => {
      let frs = ventas.filter((element) => element.id_paquete === paq.id);
      var cantidad = 0;

      frs.forEach((element) => {
        cantidad += element.cantidad_mayores + element.cantidad_menores;
      });

      let ventapaquete = {
        id_paquete: paq.id,
        cantidad: cantidad,
        nombre: paq.nombre,
      };

      paq.id != 0 ? this.PaqueteCantPersonas.push(ventapaquete) : ''; //porque el primero es choose one
    });
    //return pdventas;
    //console.log('ventas  por paquete: ' + JSON.stringify(pdventas));
  }

  parseData(data) {
    if (!data) return {};
    if (typeof data === 'object') return data;
    if (typeof data === 'string') return JSON.parse(data);

    return {};
  }

  groupArrayOfObjects(list: VentaPaquete[], key: string) {
    return list.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  }
}

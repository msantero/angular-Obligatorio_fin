import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { UserService } from './user.service';
import { Observable } from 'rxjs';

import { Paquete } from './paquetes';

@Injectable({
  providedIn: 'root',
})
export class PaqueteService {
  paquetes: Paquete[] = []; //Array<Paquete>;
  private router: Router;
  constructor(private http: HttpClient, private userService: UserService) {}

  getpaquetes(apiKey: string): Observable<Paquete[]> {
    const headers = {
      'Content-type': 'application/json',
      apiKey: apiKey,
    };

    //const body = JSON.stringify({ usuario, password });
    return this.http.get<Paquete[]>(
      'https://destinos.develotion.com/paquetes.php',
      {
        headers,
        responseType: 'json',
      }
    );
  }

  setPaquetes(paque: any) {
    this.paquetes = <Paquete[]>paque.destinos;

    //JSON.parse(JSON.stringify(paque.destinos));
    // this.paquetes = (Array<Paquete>) JSON.stringify(paquetes.destinos);

    /*
    for (let element of paque.destinos) {
      this.paquetes.push(new Paquete(element.id, element.nombre));
    }*/
  }
}

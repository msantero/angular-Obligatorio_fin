import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Input } from '@angular/core';
import { Usuario } from '../usuarios';

@Component({
  selector: 'app-usuario-alerts',
  templateUrl: './usuario-alerts.component.html',
  styleUrls: ['./usuario-alerts.component.css'],
})
export class UsuarioAlertsComponent implements OnInit {
  @Input() usuario!: Usuario;
  @Output() notify = new EventEmitter();
  constructor() {}

  ngOnInit() {}
}

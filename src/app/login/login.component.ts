import { Component, OnInit } from '@angular/core';
import { UsuarioAlertsComponent } from '../usuario-alerts/usuario-alerts.component';
import { Usuario } from '../usuarios';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  msg: string;

  loginGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.loginGroup = this.formBuilder.group({
      usuario: '',
      password: '',
    });
  }

  ngOnInit() {}

  login() {
    this.msg = 'Ingresando...';
    const { usuario, password } = this.loginGroup.value;
    if (!usuario || !password) {
      this.msg = 'Debe ingresar el nombre y password';
    } else {
      this.userService.login(usuario, password).subscribe(
        (user) => {
          this.userService.setUser(<Usuario>user);
          this.userService.user.usuario = usuario;
          /*
          console.log('User: ' + this.userService.getUserNombre());
          console.log('Id: ' + this.userService.getUserId());
          console.log('Token: ' + this.userService.getApiKey());
          */
          this.router.navigate(['/dashboard'], {
            queryParams: { UserId: this.userService.getUserId() },
          });
        },
        ({ error: { mensaje } }) => {
          this.msg = mensaje;
          console.log('Mensaje de error:' + this.msg);
        }
      );
    }

    console.log(this.msg + 'usu: ' + usuario + ' pass: ' + password);
  }

  onNotify() {
    window.alert('We notify you');
  }

  //si existe el usuario:
  //<app-usuario-alerts [usuario]="usuario" (notify)="onNotify()">
  //</app-usuario-alerts>
}

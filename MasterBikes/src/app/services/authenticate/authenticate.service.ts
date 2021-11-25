import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  datosGuardados;
  response;
  errorMessage = '';

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private router: Router
  ) { }

  loginUser(credentials) {
    return new Promise((accept, reject) => {
      const apiURL = `http://localhost:8000/api/users/${credentials.username}/${credentials.password}/`;
      this.http.get(apiURL).subscribe(
        (data) => {
          this.datosGuardados = data;
          if (this.datosGuardados.verification_state == 'true') {
            accept(this.datosGuardados);
          } else {
            reject(this.errorMessage = "Credenciales incorrectas.")
          }
        },
        (error) => {
          console.log(error);
        }
      )
    })
  }

  logout(): void {
    this.storage.remove('userData');
    this.storage.set('isUserLoggedIn', false);
    this.router.navigate(['login']);
  }
}

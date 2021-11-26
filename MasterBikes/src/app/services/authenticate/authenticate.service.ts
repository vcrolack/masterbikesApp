import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  datosGuardados;
  datosEnviados;
  response;
  errorMessage = '';
  bikes

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

  logOut(): void {
    this.storage.remove('userData');
    this.storage.set('isUserLoggedIn', false);
    this.router.navigate(['login']);
  }

  registerUser(credentials) {
    return new Promise((accept, reject) => {
      let data = {
        "name": credentials.name,
        "lastname": credentials.lastname,
        "username": credentials.username,
        "email": credentials.email,
        "password": credentials.password
      }
      //const apiURL = `http://localhost:8000/api/users/${credentials.name}/${credentials.lastname}/${credentials.email}/${credentials.password}/${credentials.username}/`;
      const apiURL = `http://localhost:8000/api/users/`;
      this.http.post(apiURL, credentials).subscribe(
        (data) => {
          accept(console.log("enviados..."))
        },
        (error) => {
          console.log(error)
        }
      )
    })
  }
}

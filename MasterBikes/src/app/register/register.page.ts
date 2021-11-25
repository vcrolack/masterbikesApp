import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {LoadingController, NavController} from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AuthenticateService } from '../services/authenticate/authenticate.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;
  errorMessage: string = '';

  validation_messages = {
    username: [
      {type: "required", message: "El nombre de usuario es obligatorio."},
      {type: "minLength", message: "El nombre de usuario es de mínimo 5 letras."},
      {type: "maxLength", message: "El nombre de usuario es de máximo 30 letras."}
    ],
    password: [
      {type: "required", message: "La contraseña es obligatoria."},
      {type:"minLength", message: "La contraseña es de mínimo 5 caracteres."},
      {type: "maxLength", message: "La contraseña es de máxiomo 30 caracteres."}
    ],
    name: [
      {type: "required", message: "El nombre es obligatorio."},
      {type: "minLength", message: "El nombre es de mínimo de 3 letras."},
      {type: "maxLength", message: "El nombre es de máximo 30 letras."}
    ],
    lastname: [
      {type: "required", message: "El apellido es obligatorio."},
      {type: "minLength", message: "El apellido es de mínimo de 3 letras."},
      {type: "maxLength", message: "El apellido es de máximo 30 letras."}
    ],
    email: [
      {type: "required", message: "El correo electrónico es obligatorio."},
      {type: "email", message: "Debe ser un correo electrónico válido."},
    ]
  };



  constructor(
    private formBuilder: FormBuilder,
    private navController: NavController,
    private storage: Storage,
    private loadingController: LoadingController,
    private authService: AuthenticateService
  ) { 
    this.storage.create();
    this.registerForm = this.formBuilder.group({
      name: new FormControl("", Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30)
      ])
      ),
      lastname: new FormControl("", Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30)
      ])
      ),
      email: new FormControl("", Validators.compose([
        Validators.required,
        Validators.email
      ])
      ),
      password: new FormControl("", Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30)     
      ])
      ),
      username: new FormControl("", Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30)
      ]))
    })
  }

  ngOnInit() {
  }

  registerUser(credentials) {
    this.authService.registerUser(credentials)
    .then(res => {
      this.errorMessage = "";
      this.navController.navigateForward("login");
    })
    .catch( err => {
      this.errorMessage = err;
      console.log(err);
    })
  }

}

import { LoginUsuario } from './../Modelos/JWT/login-usuario';
import { AuthService } from './../Services/JWT/auth.service';

import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { User } from "app/Modelos/User";
import { TokenService } from 'app/Services/JWT/token.service';
import { UsuarioService } from 'app/Services/usuario.service';
import Swal from 'sweetalert2';
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  user: User = new User();


  isLogged = false;
  isLoginFail = false;
  loginUsuario: LoginUsuario;
  name: string = '';
  email: string = '';
  username: string;
  password: string;
  roles: any[] = [];
  errMsj: String[];
  showRegisterForm: boolean = false;
  newUsername: string = '';
  newPassword: string = '';


  constructor( private router: Router, private userService: UsuarioService,
    private tokenService: TokenService, private authService: AuthService) {

  }

  ngOnInit() {

    // console.log(this.User);
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.tokenService.getAuthorities();

    }

  }
  aut: string[];
  onLogin(): void {
    this.loginUsuario = new LoginUsuario(this.username, this.password);
    this.authService.login(this.loginUsuario).subscribe(
      data => {
        this.isLogged = true;
        this.isLoginFail = false;

        this.tokenService.setToken(data.token);
        this.tokenService.setUserName(this.username);
        // console.log(this.usern ame);
        // console.log(data.authorities);
 
        this.tokenService.setAuthorities(data.authorities);
         this.tokenService.getAuthorities();
         console.log(this.tokenService.getAuthorities());

         const roles = this.tokenService.getAuthorities();
 
          for(let element of roles){

            if(element.authority==='ROLE_ADMIN'){
              sessionStorage.setItem("rol_", "ROLE_ADMIN");
             }
          }

 

          this.router.navigate(['/dashboard']);
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Sesion Iniciada',
            showConfirmButton: false,
            timer: 1500
          })
       
        
      },
      err => {
        this.isLogged = false;
        this.isLoginFail = true;
        this.errMsj = err.error.mensaje;
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'Datos no validos',
          showConfirmButton: false,
          timer: 1500
        })
      }
    );

  }
  onRegister(): void {
    console.log(this.name);
    this.user.name=this.name;
    this.user.password=this.password;
    this.user.username=this.username;
    this.user.mail=this.email;
   
    // alert(this.user.idRol);
    this.userService.addUser(this.user).subscribe( (data: any) => {
        
        this.user = data ;
        console.log(data)
          Swal.fire("Register Success!", "Registrado correctamente", "success");
          this.onLogin();
      },
      (error) => Swal.fire("Register Failed!", "Ha ocurrido un error", "warning"),
      () => console.log("Complete")
    )
   
    this.showRegisterForm = false;
  }
  toggleRegisterForm(): void {
    this.showRegisterForm = !this.showRegisterForm;
  }





}

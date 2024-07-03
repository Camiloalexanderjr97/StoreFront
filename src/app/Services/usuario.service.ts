import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../Modelos/User";
import { Router } from "@angular/router";
import {urlUser } from "../../environments/environment";
import { TokenService } from "./JWT/token.service";

@Injectable({
  providedIn: "root",
})
export class UsuarioService {
  private url = `${urlUser}/auth`;
  private headers = new HttpHeaders({ 
    'Content-Type': 'application/json',
    'Authorization': 'Bearer' + this.tokenService.getToken()
 });

  constructor(private http: HttpClient, private router: Router,  private tokenService: TokenService,) {}

  //getUsuarios
  getUsers(): Observable<User[]> {
   console.log(this.tokenService.getToken());
    return this.http.get<User[]>(this.url+"/users?page=0&size=10",{ headers: this.headers });
  }

  //get un User
  getUserById(id: string): Observable<any> {
    return this.http.get<any>(this.url + "/users/buscar/" + id,{ headers: this.headers });
  }


  //agregar un User
  addUser(User: User) {
    return this.http.post(this.url + "/new", User);
  }

  //eliminar
  deleteUser(id: string): Observable<any> {
    // console.log("eliminar" + id);
    return this.http.delete<any>(this.url + "/eliminar/" + id,{ headers: this.headers });
  }

  login(User: User): Observable<boolean> {
    return this.http.post<any>(`${this.url}/login`, User);
  }

  //modificar un User
  updateUser(user: User) {
    return this.http.post(this.url + "/users/editar/"+user.id, user,{ headers: this.headers });
  }
}

import { TokenService } from 'app/Services/JWT/token.service';
import { Router } from '@angular/router';
import { UsuarioService } from './../Services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'app/Modelos/User';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user: User = new User();
  selectedUser: User = new User();
  users: User[] = [];
  filteredUsers: User[] = [];
  searchText: string = '';
  isLogged: boolean = false;
  showCreate: boolean = false;
  showUpdate: boolean = false;

  constructor(private tokenService: TokenService, private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit() {
    this.checkLogin();
    this.loadUsers();
  }

  checkLogin() {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
      this.router.navigate(['/login']);
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'No tienes Acceso',
        showConfirmButton: false,
        timer: 1500
      });
    }
  }

  loadUsers() {
    this.usuarioService.getUsers().subscribe(
      (data: User[]) => {
        this.users = data;
        this.filteredUsers = this.users;
      },
      (error) => {
        Swal.fire("Error!", "Failed to load users", "error");
      }
    );
  }

  filterUsers() {
    this.filteredUsers = this.users.filter(user =>
      user.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
      user.username.toLowerCase().includes(this.searchText.toLowerCase()) ||
      user.mail.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  showCreateForm() {
    this.showCreate = true;
    this.showUpdate = false;
  }

  register() {
    this.usuarioService.addUser(this.user).subscribe(
      (data: any) => {
        this.user = data;
        Swal.fire("Register Success!", "Registrado correctamente", "success");
        this.loadUsers();
        this.showCreate = false;
      },
      (error) => Swal.fire("Register Failed!", "Ha ocurrido un error", "warning"),
    );
  }

  editUser(user: User) {
    this.selectedUser = { ...user };
    this.showUpdate = true;
    this.showCreate = false;
  }

  updateUser() {
    this.usuarioService.updateUser(this.selectedUser).subscribe(
      (data: any) => {
        Swal.fire("Update Success!", "Actualizado correctamente", "success");
        this.loadUsers();
        this.showUpdate = false;
      },
      (error) => Swal.fire("Update Failed!", "Ha ocurrido un error", "warning"),
    );
  }
}

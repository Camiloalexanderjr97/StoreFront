import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { Photo } from 'app/Modelos/Photo';
import * as $ from 'jquery'; // Import jQuery

import { PhotoService } from 'app/Services/photo.service';
import { isEmpty } from 'rxjs-compat/operator/isEmpty';
import Swal from 'sweetalert2';


@Component({
  selector: 'menu-start',
  templateUrl: './menu-start.component.html',
  styleUrls: ['./menu-start.component.css']
})
export class MenuStartComponent implements OnInit {

  
  constructor(
    private photoService: PhotoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,

  ) { }


  photos: any[] = [];
  mostrarListado = true;
  mostrarSelect = false;
  mostrarUpload = false;
  nPhoto: any = null;
  type: string = '';
  selectedPhoto: any = null;


  ngOnInit(): void {
    this.mostrarAllProducts();
  }


  mostrarList(category: any) {
    this.type = category;
    var genderSelected = '';

    this.photoService.getPhotos()
      .subscribe(
        res => {
          this.photos = [];
          if (this.type.length != 0 && this.type != "All") {

            Swal.fire({
              title: 'Gender Articles?',
              showDenyButton: true,
              showCancelButton: false,
              confirmButtonText: 'Male',
              denyButtonText: `Female`,

            }).then((result) => {
              /* Read more about isConfirmed, isDenied below */
              if (result.isConfirmed) {
                genderSelected = "Male";

              } else if (result.isDenied) {
                genderSelected = "Female";

              } else if (result.isDismissed) {
                genderSelected = "ALL";
                this.type = '';

              }
              this.edithParemeters(res, genderSelected, this.type);

            })
          }



        },
        err => console.log(err)
      )


  }












  comprar(photo: any, event?: MouseEvent): void {
    if (event) {
      event.stopPropagation(); // Prevent triggering the card click event
    }
    if (this.isLoggedIn()) {
      // lógica para comprar el producto
    } else {
      this.router.navigate(['/login']);
    }
  }

  isLoggedIn(): boolean {
    // lógica para verificar si el usuario está autenticado
    // por ejemplo, podría verificar si hay un token en localStorage
    return !!localStorage.getItem('authToken');
  }

  openModal(photo: any): void {
    this.selectedPhoto = photo;
    ($('#photoModal') as any).modal('show');
  }


  mostrarAllProducts() {

    this.mostrarListado = true;

    this.photoService.getPhotos()
      .subscribe(
        res => {
          this.photos = [];
          for (let photo of res) {
            if (photo.stock == "0") {
              photo.stock = "Avaliable"
            } else {
              photo.stock = "Unavailable"
            }
            if (photo.gender == "0") {
              photo.gender = "Male"
            } else if (photo.gender == "1") {
              photo.gender = "Female"
            }
            this.photos.push(photo);
          }
        },
        err => console.log(err)
      )
  }

  edithParemeters(res: Photo[], genderSelected: any, type: any) {
    for (let photo of res) {
      if (photo.stock == "0") {
        photo.stock = "Avaliable"
      } else {
        photo.stock = "Unavailable"
      }
      if (photo.gender == "0") {
        photo.gender = "Male"
      } else if (photo.gender == "1") {
        photo.gender = "Female"
      }
      console.log(photo)
      if (type.length != 0 && type != "All" && genderSelected != "All") {
        console.log("entra")
        if (photo.category == type && photo.gender == genderSelected) {
          console.log("entra1")


          this.photos.push(photo)
        }
      } else {
        console.log("entra2")
        this.photos.push(photo)
        this.type = "All";
      }

    }


  }
}
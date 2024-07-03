import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { Photo } from 'app/Modelos/Photo';

import { PhotoService } from 'app/Services/photo.service';
import { isEmpty } from 'rxjs-compat/operator/isEmpty';
import Swal from 'sweetalert2';

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}


@Component({
  selector: 'photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit {

  photoSelected: string | ArrayBuffer | null = null;;
  
  file: File;


  photos: Photo[] = [];
  id: string;
  photo: Photo;
  name: string;
  description: string;
  price: string;
  category: string;
  stock: string;
  amount: string;
  type: string;
  gender: string;

  mostrarListado: Boolean = true;
  mostrarSelect: Boolean = false;
  mostrarUpdate: Boolean = false;
  mostrarUpload: Boolean = false;
  filteredPhotos: any[] = [];
  searchText: string = '';
  isAdmin:boolean=false;
  selectedPhoto: any = null;

  constructor(
    private photoService: PhotoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,

  ) { }

  ngOnInit() {
    this.mostrarAllProducts();
    this.loadCart();
    this.type="All";
    const rol = sessionStorage.getItem("rol_");
    if(rol==='ROLE_ADMIN'){
      this.isAdmin=true;

    }else{
      this.isAdmin=false;
    }  
  }

  mostrarList(types: any) {
    this.mostrarListado = true;
    this.mostrarUpdate = false;
    this.mostrarSelect = false;
    this.mostrarUpload = false;

    this.listarProductosFilter(types);
  }

  mostrarLoadId() {
    this.mostrarUpload = true;

    this.mostrarListado = false;
    this.mostrarUpdate = false;
    this.mostrarSelect = false;
  }

  mostrarUpdateId() {
    this.mostrarListado = false;
    this.mostrarUpdate = true;
    this.mostrarSelect = false;
    this.mostrarUpload = false;

  }
  mostrarSelects() {
    this.mostrarListado = false;
    this.mostrarUpdate = false;
    this.mostrarSelect = true;
    this.mostrarUpload = false;

  }



  newPhoto: Photo[] = [];

  listarProductosFilter(types: any) {
    this.type = types;
    var genderSelected = '';

    this.photoService.getPhotos()
      .subscribe(
        res => {
          this.photos = [];
          this.filteredPhotos=[];
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

  mostrarAllProducts() {

    this.mostrarListado = true;
    this.mostrarUpdate = false;
    this.mostrarSelect = false;
    this.mostrarUpload = false;

    this.photoService.getPhotos()
      .subscribe(
        res => {
          this.photos = [];
          this.filteredPhotos=[];
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
            this.filteredPhotos.push(photo); // Inicialmente mostramos todas las fotos

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
        if (photo.category == type && photo.gender == genderSelected) {
          this.photos.push(photo)
        }
      } else {
        this.photos.push(photo)
        this.type = "All";
      }
      this.filteredPhotos = this.photos; // Inicialmente mostramos todas las fotos

    }


  }
  nPhoto: Photo;
  
  selectedCard(id: string) {
    this.nPhoto = null;
    this.photo = null;
  
    this.activatedRoute.params.subscribe(params => {
      this.photoService.getPhoto(id).subscribe(
        res => {
          // Crear una copia del objeto res para nPhoto
          this.nPhoto = { ...res };
  
          // Actualizar valores específicos en this.photo
          this.photo = { ...res };
          if (this.photo.stock == "0") {
            this.photo.stock = "Available";
          } else {
            this.photo.stock = "Unavailable";
          }
          if (this.photo.gender == "0") {
            this.photo.gender = "Male";
          } else if (this.photo.gender == "1") {
            this.photo.gender = "Female";
          }
  
          // Asignar los valores de res directamente a las propiedades de nPhoto
          this.nPhoto.name = res.name;
          this.nPhoto.description = res.description;
          this.nPhoto.price = res.price;
          this.nPhoto.category = res.category;
          this.nPhoto.stock = res.stock;
          this.nPhoto.amount = res.amount;
          this.nPhoto.gender = res.gender;
  
        },
        err => console.log(err)
      );
    });
  
    this.mostrarSelects();
  }
  
  deletePhoto(id: string) {
    this.photoService.deletePhoto(id)
      .subscribe(res => {
        console.log(res)
        window.location.reload();

      })
  }

  updatePhoto(): boolean {


    this.photoService.updatePhoto(this.photo._id, this.nPhoto.name, this.nPhoto.description,
      this.nPhoto.price, this.nPhoto.category, this.nPhoto.stock, this.nPhoto.amount, this.nPhoto.gender)

      .subscribe(res => {
        console.log(res);
      });

      window.location.reload();
      this.mostrarList('');

    return false;
  }


  onPhotoSelected(event: HtmlInputEvent): void {
    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];
      // image preview
      const reader = new FileReader();
      reader.onload = e => this.photoSelected = reader.result;
      reader.readAsDataURL(this.file);
    }
  }

  uploadPhoto() {

    this.photoService
      .createPhoto(this.name, this.description, this.price, this.category, this.stock, this.amount, this.gender, this.file)
      .subscribe(
        res => {
          console.log(res);
          window.location.reload();
          this.mostrarList('');
          //  this.router.navigate(['/photos'])
        },
        err => console.log(err)
      );
    return false;
  }

  filterPhotos(): void {
    this.filteredPhotos = this.photos.filter(photo => 
      photo.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  photoList: Photo[] = [];
  async comprar(photo: any, event?: MouseEvent): Promise<void> {
  if (event) {
    event.stopPropagation(); // Prevent triggering the card click event
  }
  const { value: amountStr } = await Swal.fire({
    title: "Input Amount",
    input: "number",
    inputLabel: "Amount to buy",
    inputValidator: (value) => {
      const amount = Number(amountStr);  // Convertir a número
      if (!value || amount <= 0) {
        return 'You need to enter a positive number!'
      }
    },
    preConfirm: (value) => {
      return new Promise((resolve) => {
        if (value <= 0) {
          Swal.showValidationMessage(
            'Amount must be a positive number!'
          );
        } else {
          resolve(value);
        }
      });
    }
  });

  if (amountStr) {
    const amount = Number(amountStr);  // Convertir a número
    Swal.fire(`Amount Selected: ${amount}`);
    photo.amount = amount;
    photo.total = photo.price * amount;
    this.photoList.push(photo);
    this.saveCart();
  }
}


saveCart(): void {
  localStorage.setItem("carrito", JSON.stringify(this.photoList));
}
  openModal(photo: any): void {
    this.selectedPhoto = photo;
    ($('#photoModal') as any).modal('show');
  }

  


  loadCart(): void {
    const cartJson = localStorage.getItem("carrito");
    console.log(cartJson);
    if (cartJson) {
      this.photoList = JSON.parse(cartJson);
    }
  }


}


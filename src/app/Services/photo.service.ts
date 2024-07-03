import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Photo } from 'app/Modelos/Photo';
import { Observable } from "rxjs";
import { urlPhoto } from 'environments/environment';



@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  private URI = `${urlPhoto}`;

  constructor(private http: HttpClient) { }

  createPhoto(name: string, description: string,   price: string,    
    category: string,stock: string,amount: string, gender: string,photo: File) {
    const fd = new FormData();
    fd.append('name', name);
    fd.append('description', description);
    fd.append('price',price);
    fd.append('category',category);
    fd.append('stock',stock);
    fd.append('amount',amount);
    fd.append('gender',gender);
    fd.append('image', photo);
    return this.http.post(this.URI, fd);
  }


  getPhotos(): Observable<Photo[]> {
    return this.http.get<Photo[]>(this.URI);
  }


  getPhoto(id: string){
   return this.http.get<Photo>(`${this.URI}/find/${id}`);
  }

  deletePhoto(id: string): Observable<any> {
    return this.http.delete(`${this.URI}/find/${id}`);
  }

  updatePhoto(id: string, name: string, description: string,    price: string,    category: string,stock: string,  amount: string, gender: string) {
    return this.http.put(`${this.URI}/find/${id}`, {name, description, price, category, stock, amount, gender});
  }
}

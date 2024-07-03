import { Component, OnInit } from '@angular/core';
import { Photo } from 'app/Modelos/Photo';
import Swal from 'sweetalert2';

@Component({
  selector: 'shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  photos: any[] = []; // Tu lista de fotos
  cart: any[] = []; // Lista para almacenar productos seleccionados
  
  constructor() { }

  ngOnInit(): void {
    this.loadCart();
  }
  pagar(): void {
    Swal.fire({
      title: "Good job!",
      text: "You did it!",
      icon: "success"
    });
    this.cart.forEach(product => {
      // Lógica para procesar cada producto
      console.log("Comprando producto:", product);
      // Aquí puedes hacer la lógica para enviar el producto al backend
    });

    // Limpiar el carrito después de la compra
    this.cart = [];
    this.saveCart(); // Actualiza el localStorage
  }


  loadCart(): void {
    const cartJson = localStorage.getItem("carrito");
    console.log(cartJson);
    if (cartJson) {
      this.cart = JSON.parse(cartJson);
    }
  }
  saveCart(): void {
    localStorage.setItem("carrito", JSON.stringify(this.cart));
  }
  eliminarItem(index: number): void {
    this.cart.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(this.cart));
  }
  calcularTotal(): number {
    return this.cart.reduce((sum, item) => sum + item.total, 0);
  }

  actualizarCantidad(index: number, cantidad: number): void {
    if (cantidad > 0) {
      this.cart[index].amount = cantidad;
      this.cart[index].total = this.cart[index].price * cantidad;
      localStorage.setItem('carrito', JSON.stringify(this.cart));
    }
  }
}
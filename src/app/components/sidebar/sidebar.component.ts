import { TokenService } from 'app/Services/JWT/token.service';
import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTESAdmin: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/user-profile', title: 'User Profile',  icon:'person', class: '' },    
    { path: '/ProductoComponent', title: 'products',  icon:'storefront', class: '' },
    { path: '/PhotoListComponent', title: 'Photo Products',  icon:'shopping_bag', class: '' },
    { path: '/Shopping-cart', title: 'Shopping-cart',  icon:'shopping_cart', class: '' }
    
];

export const ROUTESUser: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    
    // { path: '/ProductoComponent', title: 'products',  icon:'content_paste', class: '' },
    { path: '/PhotoListComponent', title: 'Photo Products',  icon:'storefront', class: '' },
    { path: '/Shopping-cart', title: 'Shopping-cart',  icon:'shopping_cart', class: '' },

];
 
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(private tokenService: TokenService) { }



  ngOnInit() {
    const roles = sessionStorage.getItem("rol_");
    if(roles==='ROLE_ADMIN'){

    this.menuItems = ROUTESAdmin.filter(menuItem => menuItem);
    }else{
      this.menuItems = ROUTESUser.filter(menuItem => menuItem);
    }
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}

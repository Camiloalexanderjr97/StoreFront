import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { ProductoComponent } from 'app/producto/producto.component';


import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';

import { ProdGuardService as guard } from 'guards/pro-guard.service';
import { PhotoListComponent } from 'app/components/photo-list/photo-list.component';
import { ShoppingCartComponent } from 'app/components/shopping-cart/shopping-cart.component';
export const AdminLayoutRoutes: Routes = [
    //         component: UpgradeComponent
    //     }]
    // }
    { path: 'dashboard',      component: DashboardComponent, canActivate: [guard], data: { expectedRol:['admin', 'user']} },
    { path: 'user-profile',   component: UserProfileComponent ,canActivate: [guard], data: { expectedRol:['admin']} },
    { path: 'ProductoComponent', component: ProductoComponent,canActivate: [guard], data: { expectedRol:['admin','user']} },
    { path: 'PhotoListComponent', component: PhotoListComponent,canActivate: [guard], data: { expectedRol:['admin','user']}},
    { path: 'Shopping-cart', component: ShoppingCartComponent,canActivate: [guard], data: { expectedRol:['admin','user']},
 }
];

import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';
import { SidebarComponent} from './components/sidebar/sidebar.component'
import { MenuStartComponent } from './components/menu-start/menu-start.component';

const routes: Routes =[
 
  {path:"login", component:LoginComponent},
  {path:"menu-start", component:MenuStartComponent},
  {path:"SidebarComponent", component: SidebarComponent},
  // {path:"LibrosComponent", component:LibrosComponent},
  {
    path: '',
    redirectTo: 'menu-start',
    pathMatch: 'full',
  }, {
    path: '',
    component: AdminLayoutComponent,
    children: [{
      path: '',
      loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
    }]
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
       useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }

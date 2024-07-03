// import { ProgramasAcademicosComponent } from './../../components/programas-academicos/programas-academicos.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { ProductoComponent } from 'app/producto/producto.component';

import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MaterialModule } from 'app/material-module';
import { PhotoListComponent } from 'app/components/photo-list/photo-list.component';
import { NavigationComponent } from 'app/components/navigation/navigation.component';
import { ShoppingCartComponent } from 'app/components/shopping-cart/shopping-cart.component';
// MatTableModule



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatProgressBarModule,
    MaterialModule,
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    ProductoComponent,
    PhotoListComponent,
    NavigationComponent,
    ShoppingCartComponent
    
  ]
})

export class AdminLayoutModule {}

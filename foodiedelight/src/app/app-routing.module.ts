import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';
import { RestaurantDetailComponent } from './restaurant-detail/restaurant-detail.component';
import { RestaurantFormComponent } from './restaurant-form/restaurant-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/restaurants', pathMatch: 'full' },
  { path: 'restaurants', component: RestaurantListComponent },
  { path: 'restaurants/new', component: RestaurantFormComponent },
  { path: 'restaurants/edit/:id', component: RestaurantFormComponent },
  { path: 'restaurants/:id', component: RestaurantDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

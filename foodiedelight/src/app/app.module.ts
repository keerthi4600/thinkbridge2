import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';
import { RestaurantDetailComponent } from './restaurant-detail/restaurant-detail.component';
import { RestaurantFormComponent } from './restaurant-form/restaurant-form.component';
import { HttpClientModule } from '@angular/common/http';
import { RestaurantService } from './restaurant.service'; 


@NgModule({
  declarations: [
    AppComponent,
    RestaurantListComponent,
    RestaurantDetailComponent,
    RestaurantFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [RestaurantService],
  bootstrap: [AppComponent]
})
export class AppModule { }

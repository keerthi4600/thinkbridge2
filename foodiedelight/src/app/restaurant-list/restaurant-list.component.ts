import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../restaurant.model';
import { RestaurantService } from '../restaurant.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.scss']
})
export class RestaurantListComponent implements OnInit {
  restaurants: Restaurant[] = [];

  constructor(private restaurantService: RestaurantService, private router: Router) { }

  ngOnInit(): void {
    this.loadRestaurants();
  }

  loadRestaurants() {
    this.restaurantService.getRestaurants().subscribe(
      (data: Restaurant[]) => {
        this.restaurants = data;
      },
      (error) => {
        console.error('Error loading restaurants', error);
      }
    );
  }

  viewRestaurant(id : string | undefined){
    this.router.navigate(['/restaurants',id]);
  }

  editRestaurant(id: string | undefined) {
    if (id !== undefined) {
      this.router.navigate(['/restaurants/edit', id]);
    } else {
      console.error('Invalid restaurant ID');
    }
  }

  deleteRestaurant(id: string | undefined) {
    if (id !== undefined) {
      if (confirm('Are you sure you want to delete this restaurant?')) {
        this.restaurantService.deleteRestaurant(id).subscribe(
          () => {
            this.restaurants = this.restaurants.filter(r => r.id !== id);
          },
          error => {
            console.error('Error deleting restaurant', error);
          }
        );
      }
    } else {
      console.error('Invalid restaurant ID');
    }
  }
}

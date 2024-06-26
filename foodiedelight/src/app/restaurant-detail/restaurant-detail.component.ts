import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantService } from '../restaurant.service';
import { Restaurant } from '../restaurant.model';

@Component({
  selector: 'app-restaurant-detail',
  templateUrl: './restaurant-detail.component.html',
  styleUrls: ['./restaurant-detail.component.scss']
})
export class RestaurantDetailComponent implements OnInit {
  restaurant: Restaurant | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private restaurantService: RestaurantService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.restaurantService.getRestaurant(id).subscribe(
        restaurant => {
          this.restaurant = restaurant;
        },
        error => {
          console.error('Error fetching restaurant', error);
        }
      );
    }
  }

  goBack(): void {
    this.router.navigate(['/restaurants']);
  }
}

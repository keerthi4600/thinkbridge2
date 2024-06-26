import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantService } from '../restaurant.service';
import { Restaurant } from '../restaurant.model';

@Component({
  selector: 'app-restaurant-form',
  templateUrl: './restaurant-form.component.html',
  styleUrls: ['./restaurant-form.component.scss']
})
export class RestaurantFormComponent implements OnInit {
  restaurant: Restaurant = { name: '', description: '', location: '' };
  isEditMode = false;
  locations: string[] = ['Location A', 'Location B', 'Location C', 'Location D'];

  constructor(
    private restaurantService: RestaurantService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.restaurantService.getRestaurant(id).subscribe(
        restaurant => this.restaurant = restaurant,
        error => console.error('Error fetching restaurant', error)
      );
      console.log(this.restaurant);
        
    }
  }

  onSubmit(): void {
    if(!Object.values(this.restaurant).every(value => !!value)) {
      return;
    }
    if (this.isEditMode) {
      this.restaurantService.updateRestaurant(this.restaurant.id!, this.restaurant).subscribe(
        () => this.router.navigate(['/restaurants']),
        error => console.error('Error updating restaurant', error)
      );
    } else {
      this.restaurantService.addRestaurant(this.restaurant).subscribe(
        () => this.router.navigate(['/restaurants']),
        error => console.error('Error adding restaurant', error)
      );
    }
  }
}

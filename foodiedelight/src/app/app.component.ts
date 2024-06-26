import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'FOODIEDELIGHT';
  constructor(private router: Router) {}

  navigateToListRestaurants() {
    this.router.navigate(['/restaurants']);
  }

  navigateToAddRestaurant() {
    this.router.navigate(['/restaurants/new']);
  }
}

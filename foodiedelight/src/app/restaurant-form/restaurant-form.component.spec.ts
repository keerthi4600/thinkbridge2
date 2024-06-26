import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { RestaurantFormComponent } from './restaurant-form.component';
import { RestaurantService } from '../restaurant.service';
import { of } from 'rxjs';
import { AppRoutingModule } from '../app-routing.module'; // Adjust path as per your application

describe('RestaurantFormComponent', () => {
  let component: RestaurantFormComponent;
  let fixture: ComponentFixture<RestaurantFormComponent>;
  let restaurantService: jasmine.SpyObj<RestaurantService>;

  beforeEach(async () => {
    const restaurantServiceSpy = jasmine.createSpyObj('RestaurantService', ['addRestaurant', 'updateRestaurant']);
    
    await TestBed.configureTestingModule({
      declarations: [RestaurantFormComponent],
      imports: [FormsModule, RouterTestingModule.withRoutes([]),AppRoutingModule],
      providers: [
        { provide: RestaurantService, useValue: restaurantServiceSpy }
      ]
    }).compileComponents();

    restaurantService = TestBed.inject(RestaurantService) as jasmine.SpyObj<RestaurantService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should add a new restaurant', () => {
    const restaurant = { id: '3', name: 'New Restaurant', description: 'New Description', location: 'New Location', imageUrl: 'url' };
    restaurantService.addRestaurant.and.returnValue(of(restaurant));

    component.restaurant = restaurant;
    component.onSubmit();

    expect(restaurantService.addRestaurant).toHaveBeenCalledWith(restaurant);
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RestaurantListComponent } from './restaurant-list.component';
import { RestaurantService } from '../restaurant.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('RestaurantListComponent', () => {
  let component: RestaurantListComponent;
  let fixture: ComponentFixture<RestaurantListComponent>;
  let service: RestaurantService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantListComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [RestaurantService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantListComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(RestaurantService);

    spyOn(service, 'getRestaurants').and.returnValue(of([
      { id: '1', name: 'Test Restaurant 1', description: 'Description 1', location: 'Location 1', imageUrl: 'url1' },
      { id: '2', name: 'Test Restaurant 2', description: 'Description 2', location: 'Location 2', imageUrl: 'url2' }
    ]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render restaurant list', () => {
    const restaurantCards = fixture.debugElement.queryAll(By.css('.restaurant-card'));
    expect(restaurantCards.length).toBe(2);
  });

  it('should display restaurant details', () => {
    const restaurantCard = fixture.debugElement.query(By.css('.restaurant-card'));
    const name = restaurantCard.query(By.css('h3')).nativeElement;
    const description = restaurantCard.query(By.css('p')).nativeElement;
    expect(name.textContent).toContain('Test Restaurant 1');
    expect(description.textContent).toContain('Description 1');
  });

  it('should call editRestaurant when Edit button is clicked', () => {
    spyOn(component, 'editRestaurant');
    const editButton = fixture.debugElement.query(By.css('.restaurant-card button')).nativeElement;
    editButton.click();
    expect(component.editRestaurant).toHaveBeenCalledWith('1');
  });

  it('should call deleteRestaurant when Delete button is clicked', () => {
    spyOn(component, 'deleteRestaurant');
    const deleteButton = fixture.debugElement.queryAll(By.css('.restaurant-card button'))[1].nativeElement;
    deleteButton.click();
    expect(component.deleteRestaurant).toHaveBeenCalledWith('1');
  });
});

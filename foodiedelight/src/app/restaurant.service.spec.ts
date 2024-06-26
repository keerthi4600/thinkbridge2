import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RestaurantService } from './restaurant.service';
import { Restaurant } from './restaurant.model';

describe('RestaurantService', () => {
  let service: RestaurantService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RestaurantService]
    });
    service = TestBed.inject(RestaurantService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch restaurants', () => {
    const dummyRestaurants: Restaurant[] = [
      { id: '1', name: 'Test Restaurant 1', description: 'Description 1', location: 'Location 1', imageUrl: 'url1' },
      { id: '2', name: 'Test Restaurant 2', description: 'Description 2', location: 'Location 2', imageUrl: 'url2' }
    ];

    service.getRestaurants().subscribe(restaurants => {
      expect(restaurants.length).toBe(2);
      expect(restaurants).toEqual(dummyRestaurants);
    });

    const req = httpMock.expectOne(`${service.apiUrl}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyRestaurants);
  });

  it('should add a restaurant', () => {
    const newRestaurant: Restaurant = { id:'3', name: 'Test Restaurant 3', description: 'Description 3', location: 'Location 3', imageUrl: 'url3' };

    service.addRestaurant(newRestaurant).subscribe(restaurant => {
      expect(restaurant).toEqual(newRestaurant);
    });

    const req = httpMock.expectOne(`${service.apiUrl}`);
    expect(req.request.method).toBe('POST');
    req.flush(newRestaurant);
  });

  it('should delete a restaurant', () => {
    const restaurantId = '1';

    service.deleteRestaurant(restaurantId).subscribe();

    const req = httpMock.expectOne(`${service.apiUrl}/${restaurantId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should update a restaurant', () => {
    const updatedRestaurant = { id: '1', name: 'Updated Restaurant', description: 'Updated Description', location: 'Updated Location', imageUrl: 'url' };

    service.updateRestaurant(updatedRestaurant.id,updatedRestaurant).subscribe(restaurant => {
      expect(restaurant).toEqual(updatedRestaurant);
    });

    const req = httpMock.expectOne(`${service.apiUrl}/${updatedRestaurant.id}`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedRestaurant);
  });
});

import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RestaurantDetailComponent } from './restaurant-detail.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RestaurantDetailComponent', () => {
  let component: RestaurantDetailComponent;
  let fixture: ComponentFixture<RestaurantDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RestaurantDetailComponent],
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({ id: '96a8' })
            }
          }
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display restaurant details when restaurant is defined', fakeAsync(() => {
    component.restaurant = {
      name: 'Test Restaurant',
      description: 'Test Description',
      location: 'Test Location',
      imageUrl: 'test-image-url.jpg'
    };

    fixture.detectChanges(); // Trigger change detection

    tick();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('Restaurant Detail');
    expect(compiled.querySelector('h3').textContent).toContain('Test Restaurant');
    expect(compiled.querySelector('p').textContent).toContain('Test Description');
    expect(compiled.querySelectorAll('p')[1].textContent).toContain('Test Location');
    expect(compiled.querySelector('img').getAttribute('src')).toContain('test-image-url.jpg');
  }));



  it('should not display restaurant details if restaurant is undefined', () => {
    component.restaurant = undefined;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('Restaurant Detail');
    expect(compiled.querySelector('h3')).toBeNull();
    expect(compiled.querySelector('p')).toBeNull();
    expect(compiled.querySelector('img')).toBeNull();
  });

  it('should call goBack method when back button is clicked', () => {
    spyOn(component, 'goBack');
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    expect(component.goBack).toHaveBeenCalled();
  });

});
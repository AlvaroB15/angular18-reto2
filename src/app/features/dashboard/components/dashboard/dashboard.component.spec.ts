import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { DashboardService } from '../../services/dashboard.service';
import { of, throwError } from 'rxjs';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let dashboardService: jasmine.SpyObj<DashboardService>;

  // Mock de datos que esperamos de la API
  const mockUserData = {
    user: [
      {
        "id": "6772b4daf39ec1212899796f",
        "fullName": "User 1",
        "email": "user1@gmail.com"
      },
      {
        "id": "6772b4daf39ec1212899796g",
        "fullName": "User 2",
        "email": "user2@gmail.com"
      },
    ]
  };

  beforeEach(async () => {
    // Crear un spy del servicio
    const serviceSpy = jasmine.createSpyObj('DashboardService', ['getData']);

    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [
        { provide: DashboardService, useValue: serviceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    dashboardService = TestBed.inject(DashboardService) as jasmine.SpyObj<DashboardService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with loading state', () => {
    expect(component.loading).toBeTruthy();
    expect(component.data).toEqual([]);
    expect(component.error).toBe('');
  });

  it('should load and display user data successfully', fakeAsync(() => {
    // Configurar el spy para devolver datos mock
    dashboardService.getData.and.returnValue(of(mockUserData));

    // Iniciar el componente
    fixture.detectChanges(); // Dispara ngOnInit
    tick(); // Espera a que se complete la llamada asíncrona
    fixture.detectChanges(); // Actualiza la vista

    // Verificar que los datos se cargaron correctamente
    expect(component.data).toEqual(mockUserData.user);
    expect(component.loading).toBeFalse();
    expect(component.error).toBe('');
  }));

  it('should handle error when loading data fails', fakeAsync(() => {
    const errorMessage = 'Network error';
    // Configurar el spy para simular un error
    dashboardService.getData.and.returnValue(throwError(() => errorMessage));

    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    expect(component.error).toBe(`Error al cargar los datos - ${errorMessage}`);
    expect(component.loading).toBeFalse();
    expect(component.data).toEqual([]);
  }));

  it('should call loadData on init', () => {
    // Espiar el método loadData
    spyOn(component, 'loadData');

    fixture.detectChanges(); // Dispara ngOnInit

    expect(component.loadData).toHaveBeenCalled();
  });

});

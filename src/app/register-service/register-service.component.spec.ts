import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RegisterServiceComponent } from './register-service.component';
import { NavComponent } from '../nav/nav.component';

describe('RegisterServiceComponent', () => {
  let component: RegisterServiceComponent;
  let fixture: ComponentFixture<RegisterServiceComponent>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      declarations: [RegisterServiceComponent, NavComponent],
       imports: [ReactiveFormsModule, FormsModule]
    }).compileComponents();
  });
beforeEach(() => {
    fixture = TestBed.createComponent(RegisterServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

   it('debe crear el formulario con todos los controles requeridos', () => {
    const form = component.servicioForm;

    expect(form.contains('nombre')).toBeTrue();
    expect(form.contains('rut')).toBeTrue();
    expect(form.contains('contacto')).toBeTrue();
    expect(form.contains('tipoServicio')).toBeTrue();
    expect(form.contains('tipoDispositivo')).toBeTrue();
    expect(form.contains('fechaIngreso')).toBeTrue();
    expect(form.contains('valor')).toBeTrue();
    expect(form.contains('detalles')).toBeTrue();
  });

  it('debe avanzar al siguiente paso al hacer clic en "Siguiente"', () => {
    component.pasoActual = 1;

    component.siguientePaso();
    expect(component.pasoActual).toBe(2);

    component.siguientePaso();
    expect(component.pasoActual).toBe(3);
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
   let routerSpy: any;
  let alertSpy: any;

  beforeEach(async () => {
    routerSpy = { navigate: jasmine.createSpy('navigate') };

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule],
      providers: [{ provide: Router, useValue: routerSpy }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // Espía el alert
    alertSpy = spyOn(window, 'alert');
  });

  it('Creacion de formulario, con dos controles', () => {
    expect(component.formularioLogin.contains('usuario')).toBeTrue();
    expect(component.formularioLogin.contains('contraseña')).toBeTrue();
  });

  it('Simulacion de credenciales correctas', () => {
    // Simular datos registrados en localStorage
    const usuarioRegistrado = {
      email: 'test@example.com',
      contraseña: 'Test1234%'
    };
    localStorage.setItem('usuarioRegistrado', JSON.stringify(usuarioRegistrado));

    // Llenado del formulario con datos válidos
    component.formularioLogin.setValue({
      usuario: 'test@example.com',
      contraseña: 'Test1234%'
    });

    component.submitForm();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/registrar-servicio']);
    expect(alertSpy).not.toHaveBeenCalled();
  });

  it('Creacion de alerta en caso de credenciales incorrectas', () => {
    const usuarioRegistrado = {
      email: 'test@example.com',
      contraseña: '12345678'
    };
    localStorage.setItem('usuarioRegistrado', JSON.stringify(usuarioRegistrado));

    // Datos incorrectos
    component.formularioLogin.setValue({
      usuario: 'wrong@example.com',
      contraseña: 'errorpass'
    });

    component.submitForm();

    expect(routerSpy.navigate).not.toHaveBeenCalled();
    expect(alertSpy).toHaveBeenCalledWith('Credenciales incorrectas');
  });

  afterEach(() => {
    localStorage.clear();
  });
});

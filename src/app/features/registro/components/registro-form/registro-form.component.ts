import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { RegistroService } from '../../services/registro.service';
import { Usuario } from '../../models/usuario.model';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registro-form',
  templateUrl: './registro-form.component.html',
  styleUrls: ['./registro-form.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistroFormComponent implements OnInit {
  showPassword = false;
  registroForm: FormGroup;
  submitted = false;
  errorMessage = '';
  successMessage = '';
  loading = false;
  urlLogin = '';

  constructor(
    private formBuilder: FormBuilder,
    private registroService: RegistroService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {
    this.urlLogin = ''
    this.registroForm = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[A-Z])(?=.*\d).*$/)
      ]],
      telefono: ['', [
        Validators.maxLength(20),
        Validators.pattern(/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/)
      ]]
    });
  }

  ngOnInit(): void {}

  get f() { return this.registroForm.controls; }

  onSubmit(): void {
    this.submitted = true;
    this.errorMessage = '';
    this.successMessage = '';

    if (this.registroForm.invalid) {
      return;
    }

    this.loading = true;
    const userData: Usuario = this.registroForm.value;

    this.registroService.registrarUsuario(userData)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.loading = false;
          if (response.success) {
            console.log('ENTRE AL IGx');
            this.successMessage = 'Registro exitoso';
            this.registroForm.reset();
            this.submitted = false;
            this.onReset();
            console.log('ANTES DEL TIMEOUT');
            setTimeout(() => {
              this.router.navigate(['/login']).then(()=>true);
            }, 2500);
            console.log('LUEGO DEL TIMEOUT');
          }
        },
        error: (error) => {
          console.log({error});
          this.loading = false;
          this.errorMessage = error.error?.message || 'Error en el registro';
          this.onReset()
        }
      });
  }

  onReset( _removeError = false ): void {
    this.submitted = false;
    this.registroForm.reset();
    if( _removeError ) {
      this.errorMessage = '';
      this.successMessage = '';
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
    this.cdr.detectChanges(); // Forzar la detección de cambios
  }

  async goToLogin() : Promise<void> {
    await this.router.navigate(['/login']);
  }
}

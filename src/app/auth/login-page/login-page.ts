import { Component, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // necesario para @if

const USER = {
  email: 'usuario@ups.edu.ec',
  password: '123456'
};

@Component({
  selector: 'app-login-page',
  standalone: true,
  templateUrl: './login-page.html',
  imports: [ReactiveFormsModule, CommonModule], // Agregamos CommonModule
})
export class LoginPage {

  error = signal('');
  form: any;

  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  login() {
    const { email, password } = this.form.value;

    if (email === USER.email && password === USER.password) {
      this.error.set('');
      this.router.navigate(['/home-page']);
    } else {
      this.error.set('Credenciales incorrectas');
    }
  }
}

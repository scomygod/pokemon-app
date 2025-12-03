import { Component, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';

const USER = {
  email: 'usuario@ups.edu.ec',
  password: '123456'
};

@Component({
  selector: 'app-login-page',
  standalone: true,
  templateUrl: './login-page.html',
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
})
export class LoginPage {

  error = signal('');
  form: any;

  constructor(private fb: FormBuilder, private router: Router, private title: Title, private meta: Meta) {
    this.title.setTitle('Iniciar sesión – Pokedex');
    this.meta.updateTag({ name: 'description', content: 'Accede a tu cuenta para gestionar tu Pokédex.' });
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

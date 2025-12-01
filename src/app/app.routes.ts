import { Routes } from '@angular/router';
import { LoginPage } from './auth/login-page/login-page';
import { HomePage } from './auth/home-page/home-page';

export const routes: Routes = [
  {
    path: '',
    component: LoginPage,
  },
  {
    path: 'home-page',
    component: HomePage
  }
];

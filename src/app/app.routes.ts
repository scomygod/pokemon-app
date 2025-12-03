import { Routes } from '@angular/router';
import { LoginPage } from './auth/login-page/login-page';
import { HomePage } from './auth/home-page/home-page';
import { PokemonDetailPage } from './pokemon/pokemon-detail-page/pokemon-detail-page';

export const routes: Routes = [
  {
    path: '',
    component: LoginPage,
  },
  {
    path: 'home-page',
    component: HomePage,
  },
  {
    path: 'pokemon/:id',
    component: PokemonDetailPage,
  },
];

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, catchError } from 'rxjs';
import { PokemonListResponse, PokemonDetail } from '../../models/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private http = inject(HttpClient);
  private readonly API_URL = 'https://pokeapi.co/api/v2/pokemon';

  getPokemons(offset: number = 0, limit: number = 20): Observable<PokemonListResponse> {
    return this.http.get<PokemonListResponse>(`${this.API_URL}?offset=${offset}&limit=${limit}`).pipe(
      catchError(err => {
        console.error('Error al obtener Pokémon', err);
        return of({ count: 0, next: null, previous: null, results: [] });
      })
    );
  }

  getPokemonByUrl(url: string): Observable<PokemonDetail | null> {
    return this.http.get<PokemonDetail>(url).pipe(
      catchError(err => {
        console.error('Error al obtener detalles del Pokémon', err);
        return of(null);
      })
    );
  }

  getPokemonById(id: number): Observable<PokemonDetail | null> {
    return this.http.get<PokemonDetail>(`${this.API_URL}/${id}`).pipe(
      catchError(err => {
        console.error('Pokémon no encontrado', err);
        return of(null);
      })
    );
  }
}

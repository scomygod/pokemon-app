import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { PokemonService } from '../../pokemon/services/pokemon.service';
import { PokemonListResponse, PokemonSummary } from '../../models/pokemon.model';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.html',
  imports: [TitleCasePipe],
})
export class HomePage {
  private pokemonService = inject(PokemonService);

  // Señal reactiva que carga los Pokémon
  pokemonsResource = toSignal<PokemonListResponse | null>(this.pokemonService.getPokemons(0, 20), {
    initialValue: null,
  });

  // Método para ver detalles de un Pokémon
  viewDetails(pokemon: PokemonSummary) {
    this.pokemonService.getPokemonByUrl(pokemon.url).subscribe((detail) => {
      if (detail) {
        alert(
          `Nombre: ${detail.name}\nAltura: ${detail.height}\nPeso: ${
            detail.weight
          }\nTipos: ${detail.types.map((t) => t.type.name).join(', ')}`
        );
      }
    });
  }
}

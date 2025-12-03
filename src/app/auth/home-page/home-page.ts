import { Component, inject, effect, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { PokemonService } from '../../pokemon/services/pokemon.service';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TitleCasePipe } from '@angular/common';
import { PaginationService } from '../../pokemon/services/pagination.service';
import { PaginationComponent } from '../../shared/pagination/pagination.component';
import { HeroPokemonComponent } from '../../shared/hero/hero-component';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, RouterModule, TitleCasePipe, PaginationComponent, HeroPokemonComponent],
  templateUrl: './home-page.html',
})
export class HomePage {
  private pokemonService = inject(PokemonService);
  paginationService = inject(PaginationService);
  private router = inject(Router);

  readonly limit = 20;

  // total de páginas
  totalPages = signal(0);

  // rxResource de pokemons
  pokemonsResource = rxResource({
    params: () => ({
      offset: (this.paginationService.currentPage() - 1) * this.limit,
      limit: this.limit,
    }),

    stream: ({ params }) => this.pokemonService.getPokemons(params.offset, params.limit),
  });

  constructor(private title: Title, private meta: Meta) {
    this.title.setTitle('Pokedex – Inicio');
    this.meta.updateTag({
      name: 'description',
      content: 'Bienvenido a la Pokedex completa en Angular.',
    });
    this.meta.updateTag({ name: 'keywords', content: 'pokedex, angular, pokemon' });
    const link: HTMLLinkElement =
      document.querySelector("link[rel='icon']") || document.createElement('link');

    link.rel = 'icon';
    link.type = 'image/png';
    link.href = 'https://img.icons8.com/color/512/pokeball--v1.png';

    document.head.appendChild(link);

    effect(() => {
      if (this.pokemonsResource.hasValue()) {
        const count = this.pokemonsResource.value().count;
        this.totalPages.set(Math.ceil(count / this.limit));
      }
    });
  }

  extractId(url: string): number {
    const parts = url.split('/').filter(Boolean);
    return +parts.at(-1)!;
  }

  viewDetails(pokemon: { url: string }) {
    const id = this.extractId(pokemon.url);
    this.router.navigate(['/pokemon', id]);
  }

  get currentPage() {
    return this.paginationService.currentPage();
  }
}

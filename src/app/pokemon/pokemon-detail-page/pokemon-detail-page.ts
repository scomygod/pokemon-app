import { Component, inject, ChangeDetectionStrategy, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { PokemonService } from '../../pokemon/services/pokemon.service';
import { PokemonDetail } from '../../models/pokemon.model';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pokemon-detail-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './pokemon-detail-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonDetailPage {
  private route = inject(ActivatedRoute);
  private pokemonService = inject(PokemonService);

  personaje = rxResource({
    params: () => ({
      id: Number(this.route.snapshot.paramMap.get('id')),
    }),
    stream: ({ params }) => this.pokemonService.getPokemonById(params.id),
  });

  constructor(private titleService: Title) {
    effect(() => {
      const p = this.personaje.value();
      if (!p) return;

      // Convertir nombre con primera letra mayúscula
      const formattedName = p.name.charAt(0).toUpperCase() + p.name.slice(1);

      // Título con formato "Pokemon #25 – Pikachu"
      this.titleService.setTitle(`Pokemon #${p.id} – ${formattedName}`);

      // Cambiar el favicon dinámicamente
      const link = document.querySelector("link[rel='icon']") || document.createElement('link');

      link.setAttribute('rel', 'icon');
      link.setAttribute('type', 'image/png');

      link.setAttribute(
        'href',
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
          p.id
        }.png?v=${Date.now()}`
      );

      document.head.appendChild(link);
    });
  }

  get numberOfTypes() {
    return this.personaje.value()?.types.length ?? 0;
  }

  get types() {
    return (
      this.personaje
        .value()
        ?.types.map((t) => t.type.name)
        .join(', ') ?? ''
    );
  }

  get height() {
    return this.personaje.value()?.height ?? null;
  }

  get weight() {
    return this.personaje.value()?.weight ?? null;
  }

  get id() {
    return this.personaje.value()?.id ?? null;
  }

  get name() {
    return this.personaje.value()?.name ?? '';
  }
}

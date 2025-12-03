import { Component, input } from "@angular/core";

@Component({
  selector: "app-hero-pokemon",
  standalone: true,
  templateUrl: "./hero-component.html",
})
export class HeroPokemonComponent {
  pokemonCount = input.required<number>();
  totalPages = input.required<number>();
}

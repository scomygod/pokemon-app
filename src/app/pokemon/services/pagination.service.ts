// src/app/shared/pagination.service.ts
import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PaginationService {
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  // Convierte los parámetros de la URL (?page=2) en una señal reactiva
  currentPage = toSignal(
    this.activatedRoute.queryParamMap.pipe(
      map((params) => (params.get('page') ? +params.get('page')! : 1)),
      map((page) => (isNaN(page) ? 1 : page))
    ),
    { initialValue: 1 }
  );

  // Helper para navegar a una página (actualiza la query param `page`)
  goToPage(page: number) {
    const safePage = page < 1 ? 1 : page;
    // Mantener otros queryParams: usamos merge
    this.router.navigate([], {
      queryParams: { page: safePage },
      queryParamsHandling: 'merge',
    });
  }

  nextPage() {
    this.goToPage(this.currentPage() + 1);
  }

  prevPage() {
    this.goToPage(Math.max(1, this.currentPage() - 1));
  }
}

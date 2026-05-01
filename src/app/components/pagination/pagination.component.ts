import { Component, computed, input, model } from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent {
  totalCount = input.required<number>();
  pageSize = input.required<number>();
  pageIndex = model.required<number>();

  totalPages = computed(() => Math.ceil(this.totalCount() / this.pageSize()));

  pages = computed(() => {
    const total = this.totalPages();
    return Array.from({ length: total }, (_, i) => i + 1);
  });
}

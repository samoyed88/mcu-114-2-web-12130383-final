import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent {
  placeholder = input<string>('輸入關鍵字查詢');
  search = output<string>();
}

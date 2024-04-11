import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
@Component({
  selector: 'app-search-input',
  standalone: true,
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss'
})
export default class SearchInputComponent {
  @ViewChild('inputValue') inputValue: ElementRef | undefined;
  @Output() searchValue = new EventEmitter<HTMLInputElement>();

  constructor() { }

  public handlerOnSearch() {
    const value = this.inputValue?.nativeElement.value;

    this.searchValue.emit(value)
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'common-input-field',
  templateUrl: './common-input-field.component.html',
  styleUrl: './common-input-field.component.scss',
})
export class CommonInputFieldComponent {
  inputValue: string = '';
  @Output() inputEvent = new EventEmitter<string>();
  @Input() fieldName: string = '';

  //Function to add new item
  inputEntred() {
    this.inputEvent.emit(this.inputValue);
  }
}

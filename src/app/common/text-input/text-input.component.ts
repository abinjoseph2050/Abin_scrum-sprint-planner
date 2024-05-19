import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'text-input',
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.scss',
})
export class TextInputComponent {
  inputValue: string = '';
  @Output() inputEvent = new EventEmitter<string>();
  @Input() fieldName: string = '';

  //Function to add new item
  inputEntred() {
    this.inputEvent.emit(this.inputValue);
  }
}

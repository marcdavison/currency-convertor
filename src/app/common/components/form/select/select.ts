import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-select',
  imports: [],
  templateUrl: './select.html',
  styleUrl: './select.scss',
})
export class SelectEl {
  @Input() label!: string;
  @Input() value!: string;
  @Input() options: string[] = [];
  @Input() errors: any[] | null = null;
  @Input() touched!: boolean;

  @Output() valueChange = new EventEmitter<string>();

  onChange(event: any) {
    this.valueChange.emit(event.target.value);
  }

}

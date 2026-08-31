import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input',
  imports: [],
  templateUrl: './input.html',
  styleUrl: './input.scss',
})
export class InputEl {
  @Input() label!: string;
  @Input() value!: string;
  @Input() errors: any[] | null = null;
  @Input() touched!: boolean;

  @Output() valueChange = new EventEmitter<string>();
  @Output() keyDown = new EventEmitter<any>();
  @Output() blur = new EventEmitter<void>();


}

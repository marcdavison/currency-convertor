import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class ButtonEl {
  @Input() disabled = false;
  @Input() loading = false;
  @Input() loadingText = "";
  @Input() valueText = "";
  @Input() type = "";
}

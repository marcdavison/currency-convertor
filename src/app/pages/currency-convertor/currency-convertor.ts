import { Component, signal, inject, OnInit } from '@angular/core';
import {form, required, validate, FormField } from '@angular/forms/signals';
import { CurrencyService } from './services/currency';
import { SelectEl } from '../../common/components/form/select/select';
import { InputEl } from '../../common/components/form/input/input';

interface Currency {
  from: string;
  to: string;
  amount: string;
}

@Component({
  selector: 'app-currency-convertor',
  templateUrl: './currency-convertor.html',
  styleUrl: './currency-convertor.scss',
  imports: [SelectEl, InputEl]
})

export class CurrencyConvertor implements OnInit {
  // declare signals
  currencyModel = signal<Currency>({
    from: "",
    to: "",
    amount: ""
  });

  public convertedAmount = signal(null);
  public isSubmitting = signal(false);
  public currencies = signal<any>([]);

    // inject service
  private service = inject(CurrencyService);

  // declare the form bindings
  currencyForm = form(this.currencyModel, entries => {
    required(entries.from, { message: "You must select a currency to convert from"}),
    required(entries.to, { message: "You must select a currency to convert to"}),
    required(entries.amount, { message: "You must enter an amount to convert"}),
    validate(entries.from, ({value, valueOf}) => {
      if ((value() === valueOf(entries.to) && valueOf(entries.to) !== "Select a currency")) {
        console.log("value is ..", valueOf(entries.to));
        return {
          kind: "Value check",
          message: "Your currencies must be different"
        }
      }
      return null;
    })
  });

  ngOnInit(): void {
    this.callInCurrency();
  }

  /*
    Function to pull in the currencys for the drop down fields
    @Input: void, @Output: void
  */
  private callInCurrency() {
    this.service.getAllCurrencies().subscribe(res => {
      this.currencies.set(Object.values(res));
    });
  }

  /*
    Function to handle the form submission
    @Input: Form submission event; @Output: void
  */
  public onSubmit(event: Event) {
    event.preventDefault();
  }

  public handleChange(target: any, e: string) {
    this.currencyModel.update(m => ({ ...m, [target]: e }))
  }

  /*
    Function to avoid none non numeric numbers being entered
    @Input: Keyboard event; @Output Void
  */
  public onAmountKeyDown($event: any) {
    const allowed = ["Backspace", "Delete", "Tab", "Escape", "Enter", "ArrowLeft", "ArrowRight"];
    if (allowed.includes($event.key)) {
      return;
    }

    if (!/^[0-9]/.test($event.key)) {
      $event.preventDefault();
    }
  }
}

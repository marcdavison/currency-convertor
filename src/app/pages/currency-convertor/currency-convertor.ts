import { Component, signal, inject } from '@angular/core';
import {form, required, validate } from '@angular/forms/signals';

interface Currency {
  from: string;
  to: string;
  amount: string;
}

@Component({
  selector: 'app-currency-convertor',
  templateUrl: './currency-convertor.html',
  styleUrl: './currency-convertor.scss',
})

export class CurrencyConvertor {
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
}

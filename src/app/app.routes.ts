import { Routes } from '@angular/router';
import { CurrencyConvertor } from './pages/currency-convertor/currency-convertor';

export const routes: Routes = [
    {   path: "**", component: CurrencyConvertor    }
];

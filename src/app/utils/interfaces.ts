export interface Currency {
    code: string;
    decimal_mark: string;
    id: number;
    name: string;
    precision: number;
    short_code: string;
    subunit: number;
    symbol: string;
    symbol_first: boolean;
    thousands_separator: string;
}

export interface AllCurrencies {
    [key: string]: Currency
}

export interface ConvertResponse {
    from: string;
    to: string;
    amount: number;
    value: number;
}
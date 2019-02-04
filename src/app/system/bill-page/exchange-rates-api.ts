export interface ExchangeRatesApi {
  date: string;
  rates: {
    USD: string;
    EUR: string;
  };
  base: string;
}

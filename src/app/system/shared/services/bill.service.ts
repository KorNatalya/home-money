import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Bill} from '../models/bill.model';
import {BaseApi} from '../../../shared/core/base-api';
import {ExchangeRatesApi} from '../../bill-page/exchange-rates-api';
// import {map} from 'rxjs/operators';

@Injectable()

export class BillService extends BaseApi {
  constructor(public http: HttpClient) {
    super(http);
  }

  getBill(): Observable<Bill> {
    return this.get('bill');
  }

  updateBill(bill: Bill): Observable<Bill> {
    return this.put('bill', bill);
  }

  getCurrency(base: string = 'RUB'): Observable<ExchangeRatesApi> {
    return this.http.get<ExchangeRatesApi>(`https://api.exchangeratesapi.io/latest?base=${base}&symbols=USD,EUR`);
  }
}

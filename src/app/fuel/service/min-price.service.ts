import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IFuelMinPrice, IFuelMinPriceUpdateReq } from '../model/IFuelMinPrice';

const MIN_PRICE_CONTROLLER_PATH = 'gas/min-price';

@Injectable({
  providedIn: 'root'
})
export class MinPriceService {

  constructor(
    private http: HttpClient
  ) {
  }


  getMinPrices(): Observable<IFuelMinPrice[]> {
    return this.http.get<IFuelMinPrice[]>(environment.apiBaseUrl + MIN_PRICE_CONTROLLER_PATH);
  }

  updatePrices(request: IFuelMinPriceUpdateReq[]): Observable<void> {
    return this.http.patch<void>(environment.apiBaseUrl + MIN_PRICE_CONTROLLER_PATH, request);
  }

}

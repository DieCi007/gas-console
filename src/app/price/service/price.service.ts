import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IPaginatedRequest } from '../../shared/model/IPaginatedRequest';
import { Observable } from 'rxjs';
import { IPaginatedResponse } from '../../shared/model/IPaginatedResponse';
import { environment } from '../../../environments/environment';
import { IPriceAnalyticsResponse } from '../model/IPriceAnalyticsResponse';
import { IDeletePriceRequest } from '../model/IDeletePriceRequest';
import { map } from 'rxjs/operators';

const PRICE_CONTROLLER_PATH = 'gas/price';

@Injectable({
  providedIn: 'root'
})
export class PriceService {

  constructor(
    private http: HttpClient
  ) {
  }

  getPrices(request: IPaginatedRequest): Observable<IPaginatedResponse<IPriceAnalyticsResponse>> {
    let params = new HttpParams();
    Object.keys(request).forEach(k => {
      if ((typeof request[k] === 'string' && request[k]) ||
        (typeof request[k] === 'number' && request[k] !== null)) {
        params = params.set(k, request[k]);
      }
    });

    return this.http.get<IPaginatedResponse<IPriceAnalyticsResponse>>
    (environment.apiBaseUrl + PRICE_CONTROLLER_PATH + '/analytics', {params}).pipe(
      map(res => ({
        ...res,
        values: res.values.map(v => ({
          ...v,
          readDate: new Date(v.readDate)
        }))
      }))
    );
  }

  deletePrice(request: IDeletePriceRequest): Observable<void> {
    const params = new HttpParams().set('price', String(request.price))
      .set('description', request.description)
      .set('readDate', request.readDate.toISOString())
      .set('stationId', String(request.stationId))
      .set('isSelf', String(request.isSelf));
    return this.http.delete<void>(environment.apiBaseUrl + PRICE_CONTROLLER_PATH, {params});
  }

}

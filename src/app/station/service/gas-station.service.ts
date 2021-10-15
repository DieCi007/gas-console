import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { IPaginatedResponse } from '../../shared/model/IPaginatedResponse';
import { IGasStationAnalyticsResponse } from '../model/IGasStationAnalyticsResponse';
import { IPaginatedRequest } from '../../shared/model/IPaginatedRequest';
import { environment } from '../../../environments/environment';
import { IGasStation } from '../model/IGasStation';

const STATION_CONTROLLER_PATH = 'gas/station';

@Injectable({
  providedIn: 'root'
})
export class GasStationService {
  stationsUpdatedSubject = new Subject<void>();
  stationsUpdated$ = this.stationsUpdatedSubject.asObservable();

  constructor(
    private http: HttpClient
  ) {
  }

  getStations(request: IPaginatedRequest): Observable<IPaginatedResponse<IGasStationAnalyticsResponse>> {
    let params = new HttpParams();
    Object.keys(request).forEach(k => {
      if ((typeof request[k] === 'string' && request[k]) ||
        (typeof request[k] === 'number' && request[k] !== null)) {
        params = params.set(k, request[k]);
      }
    });

    return this.http.get<IPaginatedResponse<IGasStationAnalyticsResponse>>
    (environment.apiBaseUrl + STATION_CONTROLLER_PATH + '/analytics', {params});
  }

  updateStation(station: IGasStationAnalyticsResponse): Observable<IGasStationAnalyticsResponse> {
    return this.http.patch<IGasStationAnalyticsResponse>(environment.apiBaseUrl + STATION_CONTROLLER_PATH, station);
  }

  createStation(station: IGasStation): Observable<void> {
    return this.http.post<void>(environment.apiBaseUrl + STATION_CONTROLLER_PATH, station);
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUnresolvedStationResponse } from '../model/IUnresolvedStationResponse';
import { environment } from '../../../environments/environment';
import { IChangeUnresolvedStationStatus } from '../model/IChangeUnresolvedStationStatus';

const CONTROLLER_PATH = 'gas/unresolved-station';

@Injectable({
  providedIn: 'root'
})
export class UnresolvedStationService {

  constructor(
    private http: HttpClient
  ) {
  }

  getAllStations(): Observable<IUnresolvedStationResponse[]> {
    return this.http.get<IUnresolvedStationResponse[]>(environment.apiBaseUrl + CONTROLLER_PATH);
  }

  changeStationStatus(stationId: number, request: IChangeUnresolvedStationStatus): Observable<void> {
    return this.http.patch<void>(environment.apiBaseUrl + CONTROLLER_PATH + `/${stationId}/status`, request);
  }
}

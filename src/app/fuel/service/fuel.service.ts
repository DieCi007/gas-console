import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IExplicitFuel } from '../model/IExplicitFuel';
import { environment } from '../../../environments/environment';

const FUEL_CONTROLLER_PATH = 'gas/explicit-fuel';

@Injectable({
  providedIn: 'root'
})
export class FuelService {

  constructor(
    private http: HttpClient
  ) {
  }

  getExplicitFuels(): Observable<IExplicitFuel[]> {
    return this.http.get<IExplicitFuel[]>(environment.apiBaseUrl + FUEL_CONTROLLER_PATH);
  }

}

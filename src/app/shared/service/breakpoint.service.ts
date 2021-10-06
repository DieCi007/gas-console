import { Injectable } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';

const MOBILE_LANDSCAPE = 812;
const MOBILE_PORTRAIT = 812;

@Injectable({
  providedIn: 'root'
})
export class BreakpointService {

  constructor(
    private observer: BreakpointObserver
  ) {
  }

  mobile(): Observable<BreakpointState> {
    return this.observer.observe([`(max-width: ${MOBILE_LANDSCAPE}px)`]);
  }

  mobilePortrait(): Observable<BreakpointState> {
    return this.observer.observe([`(max-width: ${MOBILE_PORTRAIT}px)`]);
  }

  customMaxWidth(pixels: number): Observable<BreakpointState> {
    return this.observer.observe([`(max-width: ${pixels}px)`]);
  }

}

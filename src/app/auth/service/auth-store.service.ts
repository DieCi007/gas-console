import { Injectable } from '@angular/core';
import { Store } from '../../shared/service/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface IAuthState {
  user: IUserState;
}

export interface IUserState {
  username: string;
}

const DEFAULT_STATE: IAuthState = {
  user: null
};

@Injectable({
  providedIn: 'root'
})
export class AuthStoreService extends Store<any> {

  constructor() {
    super(DEFAULT_STATE);
  }

  get me$(): Observable<IUserState> {
    return this.state$.pipe(map(s => s.user));
  }

  get me(): IUserState {
    return this.state.user;
  }

  setMe(state: IUserState): void {
    this.setState({...this.state, user: state});
  }

  clearState(): void {
    this.setState({...this.state, user: null});
  }
}

import { Store } from './store';

interface User {
  name: string;
}
const initialState = {
  name: 'diego'
};

class Example extends Store<User> {
  constructor() {
    super(initialState);
  }
}

describe('Store', () => {
  it('should create instance', () => {
    expect(new Example()).toBeTruthy();
  });

  it('should return initial state', () => {
    const store = new Example();
    expect(store.state).toEqual(initialState);
    return store.state$.subscribe(s => expect(s).toEqual(initialState));
  });

  it('should update state', () => {
    const store = new Example();
    const newState: User = { ...store.state};
    store.setState(newState);
    expect(store.state).toEqual(newState);
    return store.state$.subscribe(s => expect(s).toEqual(newState));
  });
});

import { observable, computed, action } from 'mobx';

import { auth, authProviders } from 'services';

class AuthStore {
  @observable uiConfig;
  @observable user;

  @computed 
  get isSignedIn() {
    return !!this.user;
  }

  constructor() {
    this.uiConfig = {
      signInFlow: 'popup',
      signInOptions: authProviders,
      callbacks: {
        signInSuccessWithAuthResult: () => false
      }
    }
    auth.onAuthStateChanged(user => {
      console.log('authStateChanged -> user', user)
      this.user = user;
    });
  }

  @action
  signOut() {
    auth.signOut();
  }

  firebaseAuth = () => auth;
}

export default new AuthStore();
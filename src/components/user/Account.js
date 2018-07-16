import React, { Component } from 'react';

import { observer, inject } from 'mobx-react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

@inject('authStore')
@observer
class Account extends Component {
  render() {
    const { authStore } = this.props;
    const { isSignedIn, uiConfig, firebaseAuth, signOut } = authStore;
    if (isSignedIn) {
      return (
        <div style={{ textAlign: 'center' }}>
          <DefaultButton
            primary={true}
            text="Sign Out"
            onClick={() => signOut()}
            className="sign-out"
          />
        </div>
      )
    }

    return (
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebaseAuth()} />
    );
  }
}

export default Account;

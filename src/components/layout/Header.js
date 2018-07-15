import React, { Component } from 'react';

import { observer, inject } from 'mobx-react';
import { Link } from 'react-router-dom';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Persona, PersonaSize } from 'office-ui-fabric-react/lib/Persona';

import { pubsub } from 'services';

@inject('layoutStore', 'authStore')
@observer
class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: ''
    }
  }

  componentDidMount() {
    pubsub.subscribe('title_changed', (_msg, title) => this.setState({ title: title }));
  }

  renderAccount() {
    const { authStore } = this.props;

    let component;
    if (!authStore.isSignedIn) {
      component = (
        <DefaultButton
          primary={true}
          text="Sign In"
          style={{ marginRight: 10 }}
        />
      )
    } else {
      const persona = {
        imageUrl: authStore.user.photoURL,
        imageAlt: 'Omg'
      };

      component = (
        <Persona
          {...persona}
          size={PersonaSize.size32}
          style={{ cursor: 'pointer' }}
        />
      )
    }

    return (
      <Link to={'/account'} style={{ textDecoration: 'none' }}>
        {component}
      </Link>
    )
  }

  render() {
    const { layoutStore, currentRoute } = this.props;
    const sideNavWidth = layoutStore.sideNavWidth;
    const headerHeight = layoutStore.headerHeight;
    const routeName = currentRoute ? currentRoute.name : this.state.title || `¯\\_(ツ)_/¯`;

    return (
      <div className="header-container" style={{ left: sideNavWidth, height: headerHeight }}>
        <div className="header-title">{routeName}</div>
        <div />
        {this.renderAccount()}
      </div>
    )
  }
}

export default Header;
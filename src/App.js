import React, { Component } from 'react';

import { Route, Switch } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { initializeIcons } from '@uifabric/icons';

import {
  Header,
  SideNav,
  Content,
  FormDialog,
  routes,
  getCurrentRoute
} from 'components';

initializeIcons();

@inject('formStore')
@observer
class App extends Component {
  renderFormDialog = (formStore) => {
    const { formDialog, hideFormDialog, submitForm } = formStore;
    const { toggled, formType } = formDialog;
    if (!toggled) {
      return null;
    }

    return (
      <FormDialog
        formType={formType}
        onClose={() => hideFormDialog()}
        onSubmit={form => submitForm(form, formType)}
      />
    )
  }

  render() {
    const { formStore,  location } = this.props;

    return (
      <div className="App">
        <Header currentRoute={getCurrentRoute(location)} />
        <SideNav location={location} routes={routes} />
        <Content>
          <Switch>
            {
              routes.map((route, _index) => {
                return (
                  <Route
                    key={route.path}
                    exact={route.exact}
                    path={route.path}
                    component={route.component}
                  />
                )
              })
            }
            <Route component={() => <div>Nada</div>} />
          </Switch>
          {this.renderFormDialog(formStore)}
        </Content>
      </div>
    );
  }
}

export default App;

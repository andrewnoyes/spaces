import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Route } from 'react-router-dom';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';

import { SpaceList, Space } from './';

@inject('spacesStore')
@observer
class SpaceRoutes extends Component {
  render() {
    const { spacesStore } = this.props;
    const { loading } = spacesStore;
    if (loading) {
      return <Spinner size={SpinnerSize.medium} style={{ marginTop: 20 }} />;
    }
    
    return (
      <div>
        <Route exact path='/spaces' component={SpaceList} />
        <Route path='/spaces/:id' component={Space} />
      </div>
    )
  }
}

export default SpaceRoutes;
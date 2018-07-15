import React, { Component } from 'react';

import { observer, inject } from 'mobx-react';
import { NavLink } from 'react-router-dom';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { TooltipHost, TooltipOverflowMode } from 'office-ui-fabric-react/lib/Tooltip';

@inject('spacesStore', 'layoutStore')
@observer
class SpaceList extends Component {
  componentDidMount() {
    this.props.spacesStore.loadSpaces();
  }

  render() {
    const { spacesStore, layoutStore, location, sideNav } = this.props;
    if (!layoutStore.sideNavToggled && sideNav) {
      return null; // not enough room!
    }

    const { spacesList, loading } = spacesStore;
    if (loading) {
      return <Spinner size={SpinnerSize.medium} />;
    }

    const listItem = `list-item${sideNav ? '-side' : ''}`;
    return (
      <div>
        <div className="list-container">
          {
            spacesList.map((space, _index) => {
              const path = `/spaces/${space.id}`;
              const isActive = location.pathname && location.pathname === path;
              const className = isActive ? `${listItem} ${listItem}-selected` : listItem;
              return (
                <NavLink to={path} key={space.id} className={className}>
                  <TooltipHost content={space.name} overflowMode={TooltipOverflowMode.Parent}>
                    {space.name}
                  </TooltipHost>
                </NavLink>
              )
            })
          }
        </div>
      </div>
    )
  }
}

export default SpaceList;
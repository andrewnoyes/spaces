import React, { Component } from 'react';

import { observer, inject } from 'mobx-react';
import { Link } from 'react-router-dom';
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import { TooltipHost } from 'office-ui-fabric-react/lib/Tooltip';

@inject('layoutStore', 'formStore')
@observer
export default class SideNav extends Component {
  onAdd = (name) => {
    this.props.formStore.showFormDialog(name);
  }

  render() {
    const { layoutStore, location, routes } = this.props;
    const { sideNavWidth, sideNavToggled, headerHeight } = layoutStore;

    return (
      <div className="nav-container" style={{ width: sideNavWidth }}>
        <div className="nav-header" style={{ height: headerHeight - 20 }}>
          <TooltipHost content="Toggle menu">
            <IconButton
              onClick={() => layoutStore.toggleSideNav()}
              iconProps={{ iconName: 'GlobalNavButton' }}
            />
          </TooltipHost>
        </div>

        <div className="menu-item-list" style={{ maxHeight: `calc(100% - ${headerHeight}px - 20px`, paddingBottom: 20 }}>
          {
            routes.map((route, _index) => {
              const selected = location.pathname === route.path;
              return (
                <div key={route.path}>
                  <div className="menu-item-container">
                    <Link to={route.path} className="menu-item-link">
                      <div className={`menu-item${selected ? '-selected' : ''}`}>
                        <div className="menu-item-title">
                          <IconButton title={route.name} iconProps={{ iconName: route.iconName }} />
                          {sideNavToggled ? <span style={{ marginLeft: 10 }}>{route.name}</span> : null}
                        </div>
                      </div>
                    </Link>
                    {
                      route.addTooltip && sideNavToggled
                        ?
                        <TooltipHost content={route.addTooltip}>
                          <IconButton
                            iconProps={{ iconName: 'AddTo' }}
                            onClick={() => this.onAdd(route.name.toLowerCase())}
                          />
                        </TooltipHost>
                        : null
                    }
                  </div>
                  {
                    route.child ? <route.child sideNav={true} location={location} /> : null
                  }
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

@inject('layoutStore')
@observer
export default class Content extends Component {
  render() {
    const { layoutStore } = this.props;
    const headerHeight = layoutStore.headerHeight;
    const sideNavWidth = layoutStore.sideNavWidth;

    return (
      <div className="content-container" style={{ left: sideNavWidth, top: headerHeight, }}>
        {this.props.children}
      </div>
    )
  }
}
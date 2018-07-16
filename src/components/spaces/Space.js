import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';

import { GridLayout, controlFactory } from 'components';
import { getCommandBarItems } from './getCommandBarItems';

@inject('spacesStore')
@observer
class Space extends Component {
  componentDidMount() {
    this.loadSpace();
  }

  componentWillUnmount() {
    this.clearSpace();
  }

  componentDidUpdate(_prevProps) {
    this.loadSpace();
  }

  loadSpace = () => {
    const { match, spacesStore } = this.props;
    spacesStore.loadSpace(match.params.id);
  }

  clearSpace = () => {
    this.props.spacesStore.clearSpace();
  }

  onAddItem = type => {
    const { spacesStore } = this.props;
    spacesStore.addGridItem(type);
  }

  onDeleteItem = gridItem => {
    const { spacesStore } = this.props;
    spacesStore.deleteGridItem(gridItem);
  }

  onGridLayoutsChange = layouts => {
    const { spacesStore } = this.props;
    const { gridLayouts } = spacesStore.activeSpace;

    if (JSON.stringify(gridLayouts) !== JSON.stringify(layouts)) {
      spacesStore.updateActiveSpace({ gridLayouts: layouts });
    }
  }

  renderGridItem = (gridItem) => {
    return controlFactory(gridItem.itemType, gridItem.itemProps);
  }

  render() {
    const { spacesStore } = this.props;
    const { activeSpace, editMode, toggleEditMode } = spacesStore;

    if (!activeSpace) {
      return (
        <h1 style={{ textAlign: 'center' }}>No space found ¯\_(ツ)_/¯</h1>
      )
    }

    const commandItems = getCommandBarItems(this.onAddItem, editMode, toggleEditMode);
    const { gridItems, gridLayouts } = activeSpace;

    return (
      <div>
        <CommandBar items={commandItems} />
        <GridLayout
          gridItems={gridItems || []}
          gridLayouts={gridLayouts || {}}
          canEdit={editMode}
          renderComponent={this.renderGridItem}
          onGridLayoutsChange={this.onGridLayoutsChange}
          onDeleteGridItem={this.onDeleteItem}
        />
      </div>
    )
  }
}

export default Space;
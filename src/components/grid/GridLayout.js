import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import { Responsive, WidthProvider } from 'react-grid-layout';
const ResponsiveGridLayout = WidthProvider(Responsive);

class GridLayout extends Component {
  onDelete = (e, gridItem) => {
    // e.stopPropagation();
    this.props.onDeleteGridItem(gridItem);
  }

  renderEditControls(gridItem) {
    return (
      <IconButton
        iconProps={{ iconName: 'Delete' }}
        title="Delete"
        ariaLabel="Delete"
        className="grid-item-delete"
        onClick={e => this.onDelete(e, gridItem)}
      />
    )
  }

  render() {
    const {
      gridLayouts,
      gridItems,
      onGridLayoutsChange,
      renderComponent,
      canEdit
    } = this.props;

    const itemStyle = canEdit ? {} : { boxShadow: 'none' };

    return (
      <ResponsiveGridLayout
        // autoSize={false}
        // margin={[20, 20]}
        // rowHeight={this.rowHeight}
        isDraggable={canEdit}
        isResizable={canEdit}
        onLayoutChange={(_layout, layouts) => onGridLayoutsChange(layouts)}
        layouts={gridLayouts || {}}
      >
        {
          gridItems && gridItems.map((gridItem, _index) => {
            return (
              <div key={gridItem.i} data-grid={gridItem} style={itemStyle}>
                {canEdit ? this.renderEditControls(gridItem) : null}
                {renderComponent(gridItem)}
              </div>
            )
          })
        }
      </ResponsiveGridLayout>
    )
  }
}

GridLayout.propTypes = {
  gridLayouts: PropTypes.object,
  gridItems: PropTypes.array,
  onGridLayoutsChange: PropTypes.func,
  renderComponent: PropTypes.func,
  canEdit: PropTypes.bool
}

export default GridLayout;
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import {
  Shimmer,
  ShimmerElementsGroup,
  ShimmerElementType as ElemType
} from 'office-ui-fabric-react/lib/Shimmer';

import { PhotoSourceInput } from './';

@inject('photosStore')
@observer
export default class PhotoViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  async componentDidMount() {
    const { photosStore, id } = this.props;
    try {
      await photosStore.loadPhoto(id)
      this.setState({ loading: false });
    } catch (err) {
      this.onError('didMount', err);
    }
  }

  onSetSource = async source => {
    const { photosStore, id } = this.props;
    try {
      this.setState({ loading: true });
      await photosStore.updatePhoto(id, { photoSource: source });
      this.setState({ loading: false });
    } catch (err) {
      this.onError('onSetSource', err)
    }
  }

  onError = (source, err) => {
    console.log(source, err);
    if (this.state.loading) {
      this.setState({ loading: false });
    }
  }

  renderContent() {
    if (this.state.loading) {
      return null;
    }

    const { photosStore, id } = this.props;
    const { photos } = photosStore;

    const photo = photos[id];
    const photoSource = photo.photoSource;

    if (!photoSource) {
      return (
        <PhotoSourceInput onSetSource={this.onSetSource} />
      )
    }

    return (
      <img
        className="photo"
        src={photoSource}
        alt=""
        style={{ pointerEvents: 'none' }}
      />
    )
  }

  render() {
    return (
      <Shimmer
        isDataLoaded={!this.state.loading}
        ariaLabel="Loading content"
        customElementsGroup={<ShimmerElementsGroup shimmerElements={[{ type: ElemType.line }]} />}
      >
        {this.renderContent()}
      </Shimmer>
    )
  }
}
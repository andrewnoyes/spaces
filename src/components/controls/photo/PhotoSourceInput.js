import React, { Component } from 'react';
import { PrimaryButton, TextField } from 'office-ui-fabric-react';


export default class PhotoSourceInput extends Component {
  constructor(props) {
    super(props);
    this.state = { source: "" };
  }

  onSourceChange = newValue => {
    this.setState({ source: newValue });
  }

  onSetSource = () => {
    this.props.onSetSource(this.state.source);
  }

  render() {
    return (
      <div className="input-container">
        <TextField
          value={this.state.source}
          placeholder="Enter URL"
          onChanged={this.onSourceChange}
          onMouseDown={e => e.stopPropagation()}
        />
        <div className="set-source">
          <PrimaryButton text="Set Source" onClick={this.onSetSource} />
        </div>
      </div>
    )
  }
}
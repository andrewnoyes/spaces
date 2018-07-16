import React, { Component } from 'react';
// import 'emoji-mart/css/emoji-mart.css';
// import { Picker } from 'emoji-mart';
// import { Overlay } from 'office-ui-fabric-react/lib/Overlay';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { IconButton } from 'office-ui-fabric-react/lib/Button';

class ChatInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      emojiHover: false,
      emojiPicker: false,
      message: ''
    }
  }

  onChange = e => {
    console.log(e)
  }

  onSubmit = e => {
    e.preventDefault();
    this.props.onSubmitComment(this.state.message);
    this.setState({ message: '' });
  }

  render() {
    return (
      <form className="chat-input-container" onSubmit={this.onSubmit}>
        <div className="chat-input-controls">
          <IconButton iconProps={{ iconName: 'Add' }} />
        </div>
        <TextField
          // multiline
          borderless
          placeholder="Message @"
          className="chat-input-textfield"
          inputClassName="chat-input-textarea"
          onMouseDown={e => e.stopPropagation()}
          value={this.state.message}
          onChanged={val => this.setState({ message: val })}
        />
        <div className="chat-input-controls">
          <IconButton
            iconProps={{ iconName: 'Accounts' }}
          />
          <IconButton
            iconProps={{ iconName: this.state.emojiHover ? 'Emoji' : 'Emoji2' }}
            onMouseEnter={() => this.setState({ emojiHover: true })}
            onMouseLeave={() => this.setState({ emojiHover: false })}
            onClick={() => this.setState({ emojiPicker: !this.state.emojiPicker })}
          />
        </div>
        {/* {
          this.state.emojiPicker &&
          <Overlay onClick={() => this.setState({ emojiPicker: false })}>
            <Picker />
          </Overlay>
        } */}
      </form>
    )
  }
}

export default ChatInput;
import React, { Component } from 'react';

import { ChatInput, ChatFeed } from './';

export default class ChatRoom extends Component {
  render() {
    return (
      <div>
        <ChatFeed />
        <ChatInput />
      </div>
    )
  }
}
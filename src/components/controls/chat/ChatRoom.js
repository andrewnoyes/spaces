import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { ChatInput, ChatFeed } from './';

const testComments = [
  { id: 1, username: 'androo', createdAt: new Date().toLocaleTimeString(), value: 'herro comment pls' },
  { id: 2, username: 'androo', createdAt: new Date().toLocaleTimeString(), value: 'herro comment pls' },
  { id: 3, username: 'androo', createdAt: new Date().toLocaleTimeString(), value: 'herro comment pls' },
  { id: 4, username: 'androo', createdAt: new Date().toLocaleTimeString(), value: 'herro comment pls' },
  { id: 5, username: 'androo', createdAt: new Date().toLocaleTimeString(), value: 'herro comment pls' },
  { id: 6, username: 'androo', createdAt: new Date().toLocaleTimeString(), value: 'herro comment pls' },
];

@inject('authStore')
@observer
export default class ChatRoom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comments: testComments
    }
  }

  onCommentAdded = comment => {
    const { authStore } = this.props;
    if (!authStore.isSignedIn) {
      return;
    }

    const user = authStore.user;
    const comments = this.state.comments.slice();
    comments.push({
      id: comments.length + 1,
      username: user.displayName,
      createdAt: new Date().toLocaleTimeString(),
      value: comment
    });

    this.setState({ comments: comments });
  }

  render() {
    return (
      <div>
        <ChatFeed comments={this.state.comments} />
        <ChatInput onSubmitComment={this.onCommentAdded} />
      </div>
    )
  }
}
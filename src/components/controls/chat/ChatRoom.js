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

@inject('authStore', 'chatStore')
@observer
export default class ChatRoom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comments: testComments
    }

    // props.chatStore.loadRoom(props.id);
  }

  componentDidMount() {
    this.props.chatStore.loadRoom(this.props.id);
  }

  onCommentAdded = value => {
    const { authStore, chatStore, id } = this.props;
    if (!authStore.isSignedIn) {
      return;
    }
    // const comment = {
    //   username: user.displayName,
    //   createdAt: new Date().toLocaleTimeString(),
    //   value: comment
    // }
    const user = authStore.user;
    chatStore.addComment(id, user.displayName, user.uid, value);

    // const comments = this.state.comments.slice();
    // comments.push({
    //   id: comments.length + 1,
    //   username: user.displayName,
    //   createdAt: new Date().toLocaleTimeString(),
    //   value: comment
    // });

    // this.setState({ comments: comments });
  }

  render() {
    const { chatStore, id } = this.props;
    if (chatStore.loadingRooms[id] || !chatStore.hasRoom(id)) {
      return (
        <div>
          loading... :)
        </div>
      )
    }

    const room = chatStore.rooms[id];
    const { comments } = room;

    return (
      <div>
        <ChatFeed comments={comments} />
        <ChatInput onSubmitComment={this.onCommentAdded} />
      </div>
    )
  }
}
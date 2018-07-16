import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';

import { ChatInput, ChatFeed } from './';

@inject('authStore', 'chatStore')
@observer
export default class ChatRoom extends Component {
  constructor(props) {
    super(props);

    props.chatStore.loadRoom(props.id);
  }

  onCommentAdded = value => {
    const { authStore, chatStore, id } = this.props;
    if (!authStore.isSignedIn) {
      return;
    }

    const user = authStore.user;
    chatStore.addComment(id, user.displayName, user.uid, value);
  }

  render() {
    const { chatStore, id } = this.props;
    const loading = chatStore.loadingRooms[id] || !chatStore.hasRoom(id)

    if (loading) {
      return <Spinner size={SpinnerSize.small} style={{ marginTop: 10 }} />;
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
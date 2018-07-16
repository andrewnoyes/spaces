import React, { Component } from 'react';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { ActivityItem } from 'office-ui-fabric-react/lib/ActivityItem';


class ChatFeed extends Component {
  componentDidUpdate(prevProps, prevState) {
    this.scrollToBottom();
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    if (this._chatFeed) {
      this._chatFeed.scrollTop = this._chatFeed.scrollHeight;
    }
  }

  render() {
    const { comments } = this.props;
    const activityItems = [];
    comments.forEach(comment => {
      activityItems.push({
        key: comment.id,
        activityDescription: [
          <Link key={1}>{comment.username}</Link>,
          <span key={2} className="chat-comment-createdAt">{new Date(comment.createdAt).toLocaleTimeString()}</span>
        ],
        comments: [
          <span key={1}>{comment.value}</span>
        ]
      })
    })

    return (
      <div className="chat-feed-container" ref={ele => this._chatFeed = ele}>
        {
          activityItems.map((item, index) => {
            return (
              <ActivityItem {...item} key={index} style={{ padding: 10, borderBottom: '1px solid #eee' }} />
            )
          })
        }
      </div>
    )
  }
}

export default ChatFeed;
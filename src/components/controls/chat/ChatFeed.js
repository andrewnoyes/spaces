import React, { Component } from 'react';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { ActivityItem } from 'office-ui-fabric-react/lib/ActivityItem';


class ChatFeed extends Component {
  render() {
    const { comments } = this.props;
    const activityItems = [];
    comments.forEach(comment => {
      activityItems.push({
        key: comment.id,
        activityDescription: [
          <Link key={1}>{comment.username}</Link>,
          <span key={2} className="chat-comment-createdAt">{comment.createdAt}</span>
        ],
        comments: [
          <span key={1}>{comment.value}</span>
        ]
      })
    })

    return (
      <div className="chat-feed-container">
        {
          activityItems.map((item, index) => {
            return (
              <ActivityItem {...item} key={index} style={{ marginBottom: 10 }} />
            )
          })
        }
      </div>
    )
  }
}

export default ChatFeed;
import React from 'react';

import {
  ChatRoom,
  Notebook,
  VideoPlayer,
  PhotoViewer
} from 'components';

const controlFactory = (type, props) => {
  switch (type) {
    case 'video':
      return <VideoPlayer {...props} />;
    case 'notes':
      return <Notebook {...props} />;
    case 'photos':
      return <PhotoViewer {...props} />;
    case 'chat':
    default:
      return <ChatRoom {...props} />;
  }
}

export default controlFactory;
export const getCommandBarItems = (onItemClick, editMode, toggleEditMode) => {
  return  [
    {
      key: 'addItem',
      name: 'Add',
      cacheKey: 'addCacheKey',
      iconProps: {
        iconName: 'Add'
      },
      ariaLabel: 'Add. Use left and right arrow keys to navigate',
      subMenuProps: {
        items: [
          {
            key: 'chat',
            name: 'Chat',
            iconProps: {
              iconName: 'Chat'
            },
            onClick: () => onItemClick('chat')
          },
          {
            key: 'video',
            name: 'Video player',
            iconProps: {
              iconName: 'Video'
            },
            onClick: () => onItemClick('video')
          },
          {
            key: 'notes',
            name: 'Notes',
            iconProps: {
              iconName: 'DocumentSet'
            },
            onClick: () => onItemClick('notes')
          },
          {
            key: 'photos',
            name: 'Photo Viewer',
            iconProps: {
              iconName: 'Photo2'
            },
            onClick: () => onItemClick('photos')
          }
        ]
      }
    },
    {
      key: 'editMode',
      name: editMode ? 'Done' : 'Edit',
      cacheKey: 'editCacheKey',
      iconProps: {
        iconName: editMode ? 'Accept' : 'Edit'
      },
      onClick: toggleEditMode
    }
  ]
}
import { observable, action, computed } from 'mobx';
import { pubsub, db } from 'services';
import { generateId } from 'utils';

class SpacesStore {
  @observable spaces;
  @observable activeSpaceId;
  @observable editMode;
  @observable loading;
  @observable loaded;

  constructor() {
    this.spaces = {};
    this.activeSpaceId = null;
    this.editMode = false;
    this.loading = false;
    this.loaded = false;

    pubsub.subscribe('spaces_created', (_msg, data) => this.onSpaceCreated(data));

    this.spacesCollection = db.collection('spaces');
    this.spacesCollection.onSnapshot(this.loadFromSnapshot, err => console.log('snapshot err', err));
  }

  get activeSpace() {
    return this.activeSpaceId ? this.spaces[this.activeSpaceId] : null;
  }

  @computed
  get spacesList() {
    const ids = Object.keys(this.spaces);
    const spacesList = [];
    ids.forEach(id => {
      const space = Object.assign({}, { id }, this.spaces[id]);
      spacesList.push(space);
    });

    return spacesList;
  }

  @action
  loadSpaces = async () => {
    if (this.loaded) {
      return;
    }

    this.loading = true;
    try {
      await this.spacesCollection.get();
    } catch (err) {
      console.log('load spaces', err);
    } finally {
      this.loading = false;
      this.loaded = true;
    }
  }

  @action
  loadSpace = id => {
    if (this.loading || !this.spaces[id] || this.activeSpaceId === id) return;

    this.activeSpaceId = id;
    this.editMode = false; // reset on new load
    pubsub.publish('title_changed', this.activeSpace.name);
  }

  @action
  toggleEditMode = () => this.editMode = !this.editMode;

  @action
  addGridItem = itemType => {
    if (!this.activeSpace) {
      return;
    }

    const gridItems = (this.activeSpace.gridItems || []).slice();
    const itemId = itemType + generateId();
    const itemProps = {
      id: itemId,
      spaceId: this.activeSpaceId,
    };

    const gridItem = {
      i: itemId,
      w: 1,
      h: 1,
      x: 0,
      y: 0,
      isDraggable: true,
      isResizable: true,
      maxH: 12,
      maxW: 12,
      minH: 1,
      minW: 1,
      moved: false,
      static: false,
      itemType,
      itemProps
    }

    pubsub.publish(`${itemType}_created`, itemProps);

    gridItems.push(gridItem);
    this.updateActiveSpace({ gridItems });
  }

  @action
  deleteGridItem = gridItem => {
    if (!this.activeSpace) {
      return;
    }

    const gridItems = (this.activeSpace.gridItems || []).slice();
    const itemIndex = gridItems.indexOf(gridItem);
    if (itemIndex < 0) {
      return;
    }

    gridItems.splice(itemIndex, 1);
    this.updateActiveSpace({ gridItems });

    if (gridItem.itemType && gridItem.itemProps) {
      pubsub.publish(`${gridItem.itemType}_deleted`, { id: gridItem.itemProps.id });
    }
  }

  @action
  updateActiveSpace = (space) => {
    if (!this.activeSpaceId || typeof space !== 'object') {
      return;
    }

    const current = Object.assign({}, this.spaces[this.activeSpaceId], space);
    this.spacesCollection.doc(this.activeSpaceId).set(current);
  }

  @action
  clearSpace = () => {
    this.activeSpaceId = null;
    this.editMode = false;
  }

  @action
  loadFromSnapshot = (snapshot) => {
    snapshot.docChanges().forEach(change => {
      const doc = change.doc;
      if (change.type === 'removed') {
        this.spaces[doc.id] = null;
        delete this.spaces[doc.id];
      } else {
        this.spaces[doc.id] = doc.data();
      }
    })
  }

  @action
  createSpace = space => {
    this.onSpaceCreated(space);
  }

  @action
  onSpaceCreated = async space => {
    try {
      await this.spacesCollection.add(space);
    } catch (err) {
      console.log(err)
    }
  }
}

export default new SpacesStore();
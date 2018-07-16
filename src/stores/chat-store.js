import { observable, action } from 'mobx';
import { db, pubsub } from 'services';

class ChatStore {
  @observable rooms;
  @observable loadingRooms;

  constructor() {
    this.rooms = {};
    this.loadingRooms = {};

    this.roomsCollection = db.collection('chat-rooms');

    // pubsub.subscribe('chat_created', this.onChatCreated);
    // pubsub.subscribe('chat_deleted', this.onChatDeleted);
  }

  hasRoom = id => !!this.rooms[id];

  @action
  loadRoom = async (id) => {
    console.log('load chat room', id);
    if (this.rooms[id]) {
      return;
    }

    this.loadingRooms[id] = true;
    this.roomsCollection.doc(id).onSnapshot(this.onSnapshot);
    this.roomsCollection.doc(id).get();
  }

  @action
  addComment = async (roomId, username, userId, value) => {
    if (!this.hasRoom(roomId) || !!this.loadingRooms[roomId]) {
      return;
    }


  }

  onChatCreated = async (_msg, { id, spaceId }) => {
    try {
      await this.roomsCollection.doc(id).set({
        spaceId,
        name: '',
        messages: []
      })
    } catch (err) {
      console.log('onChatCreated', err);
    }
  }

  onChatDeleted = async (_msg, { id }) => {
    try {
      await this.roomsCollection.doc(id).delete();
    } catch (err) {
      console.log('onChatDeleted', err);
    }
  }

  @action
  onSnapshot = doc => {
    const id = doc.id;
    if (doc.exists) {
      this.rooms[id] = doc.data();
    } else {
      this.onChatCreated(Object.assign({}, {id: doc.id}, doc.data()))
      console.log('!doc.exists not implemented -> onSnapshot chat-store');
    }

    if (this.loadingRooms[id]) {
      this.loadingRooms[id] = false;
    }
  }
}

export default new ChatStore();
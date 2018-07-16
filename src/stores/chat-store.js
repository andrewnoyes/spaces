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

  @action
  hasRoom = id => !!this.getRoom(id);

  @action
  getRoom = id => this.rooms[id];

  @action
  loadRoom = id => {
    console.log('load chat room', id);
    if (this.rooms[id]) {
      console.log('local has chat room', id);
      return;
    }

    this.loadingRooms[id] = true;
    this.roomsCollection.doc(id).onSnapshot(this.onSnapshot);
    this.roomsCollection.doc(id).get();
  }

  @action
  loadComments = id => {
    return new Promise(
      (resolve, reject) => {
        const commentsCollection = this.roomsCollection.doc(id).collection('comments');
        commentsCollection.orderBy('createdAt').get()
          .then(docs => {
            const comments = (this.rooms[id].comments || []).slice();
            docs.forEach(doc => {
              const data = doc.exists ? doc.data() : {}
              const comment = Object.assign({}, doc.id, data)
              comments.push(comment);
            })

            this.rooms[id].comments = comments;
            resolve();
          })
          .catch(err => reject(err));
      }
    )
  }

  @action
  addComment = async (roomId, username, userId, value) => {
    if (!this.hasRoom(roomId) || this.loadingRooms[roomId]) {
      return;
    }

    const comment = { username, userId, value, createdAt: new Date().toISOString() };
    this.roomsCollection.doc(roomId).collection('comments')
      .add(comment)
      .then(doc => {
        comment.id = doc.id;
        const comments = (this.rooms[roomId].comments || []).slice();
        comments.push(comment);

        this.rooms[roomId].comments = comments;
      })
      .catch(err => {
        console.log('err', err);
      })
  }

  onChatCreated = async (_msg, data) => {
    try {
      const { id } = data;
      await this.roomsCollection.doc(id).set({ name: '' })
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
      const data = doc.data();
      this.rooms[id] = data;
    } else if (this.hasRoom(id)) {
      this.rooms[id] = null;
      delete this.rooms[id];
    } else {
      this.onChatCreated(null, { id });
      return;
    }

    if (this.loadingRooms[id]) {
      this.loadComments(id)
        .then(() => {
          this.loadingRooms[id] = false;
        })
        .catch(err => {
          console.log('loadComments', err);
        });
    }
  }
}

export default new ChatStore();
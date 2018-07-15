import { observable, action } from 'mobx';
import { db, pubsub } from 'services';

class PhotosStore {
  @observable photos;

  constructor() {
    this.photos = {};

    this.photosCollection = db.collection('photos');

    pubsub.subscribe('photos_created', this.onPhotoCreated);
    pubsub.subscribe('photos_deleted', this.onPhotoDeleted);
  }

  hasPhoto = id => !!this.photos[id];

  @action
  loadPhoto = async (id) => {
    console.log('loadPhoto', id)
    return new Promise(
      (resolve, reject) => {
        if (this.hasPhoto(id)) {
          console.log('local has photo', id);
          resolve();
        } else {
          // attach listener to doc on load
          this.photosCollection.doc(id).onSnapshot(this.onSnapshot);
          this.photosCollection.doc(id).get()
            .then(_doc => resolve())
            .catch(err => {
              console.log('loadPhoto', err);
              reject(err);
            })
        }
      }
    )
  }

  @action
  updatePhoto = (id, record) => {
    return new Promise(
      (resolve, reject) => {
        if (!this.hasPhoto(id)) {
          return reject(`${id} not found`);
        }

        const photo = Object.assign({}, this.photos[id], record);
        this.photosCollection.doc(id)
          .set(photo)
          .then(_doc => resolve())
          .catch(err => {
            console.log('updatePhoto', err);
            reject(err)
          });
      }
    )
  }

  onPhotoCreated = async (_msg, { id, spaceId }) => {
    try {
      await this.photosCollection.doc(id).set({ spaceId });
    } catch (err) {
      console.log('onPhotoCreated', err);
    }
  }

  onPhotoDeleted = async (_msg, { id }) => {
    try {
      await this.photosCollection.doc(id).delete();
    } catch (err) {
      console.log('onPhotoDeleted', err);
    }
  }

  @action
  onSnapshot = doc => {
    if (doc.exists) {
      this.photos[doc.id] = doc.data();
    } else {
      this.photos[doc.id] = null;
      delete this.photos[doc.id];
    }
  }
}

export default new PhotosStore();

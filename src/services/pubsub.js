import PubSub from 'pubsub-js';

const subscribe = (topic, cb) => {
  console.log(`subscribing to topic: ${topic}`);
  return PubSub.subscribe(topic, cb)
}

const unsubscribe = PubSub.unsubscribe;

const publish = (topic, data) => {
  console.log(`publishing to topic: ${topic}`);
  return PubSub.publish(topic, data);
}

const unsubscribeAll = PubSub.unsubscribeAll;

const pubsub = {
  publish,
  subscribe,
  unsubscribe,
  unsubscribeAll
}

export default pubsub;
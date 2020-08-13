const handle = Meteor.subscribe('testing');
Tracker.autorun(() => {
  const isReady = handle.ready();
  console.log(`Handle is ${isReady ? 'ready' : 'not ready'}`);
  console.log(handle);
  console.log(Papers.find().fetch())
});
const Papers = new Mongo.Collection('papers');

/*var PaperLocations = {
   key1: "[abstract]0.txt",
   key2: "[abstract]1.txt",
   key3: "[abstract]2.txt",
   key4: "[abstract]3.txt",
   key5: "[abstract]4.txt"
}*/

//Papers.insert(PaperLocations);

var findCollection = Papers.find().fetch();
Papers.update({ _id: '9BgEFHEvN7CmskHiF' }, { key1:"TESTING" });
console.log(findCollection);

if(Meteor.isServer){
Meteor.publish('testing', function() {
   return Papers.find();
 });
}

if(Meteor.isClient){
const handle = Meteor.subscribe('testing');
Tracker.autorun(() => {
  const isReady = handle.ready();
  console.log(`Handle is ${isReady ? 'ready' : 'not ready'}`);
  console.log(handle);
  console.log(Papers.find().fetch())
});
}
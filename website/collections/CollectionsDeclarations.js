import { EJSON } from 'meteor/ejson'

const Papers = new Mongo.Collection('papers');
/*var PaperLocations = {
   key1: "[abstract]0.txt",
   key2: "[abstract]1.txt",
   key3: "[abstract]2.txt",
   key4: "[abstract]3.txt",
   key5: "[abstract]4.txt"
}*/

//Papers.insert(PaperLocations);
 
if(Meteor.isServer){
  Meteor.publish('generalInfo', function() {
    Papers.update("SKKH53LaGYgsF3Bc5",{
      hitID: 5,
      paper1: 1,
      paper2: 8
    });
    return Papers.find();
  });
}


if(Meteor.isClient){
  const handle = Meteor.subscribe('generalInfo');
  Tracker.autorun(() => {
    const isReady = handle.ready();
    if(isReady){
      var paper1 = Papers.findOne("SKKH53LaGYgsF3Bc5").paper1;
      var paper2 = Papers.findOne("SKKH53LaGYgsF3Bc5").paper2;
      sessionStorage['paper1'] = paper1;
      sessionStorage['paper2'] = paper2;
    }
  });
}
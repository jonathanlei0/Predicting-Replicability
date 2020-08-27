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
    Papers.update("gWZweFSXpe4aHRArR",{
      p0: 0,
      p1: 0,
      p2: 0,
      p3: 0,
      p4: 0,
      p5: 0,
      p6: 0,
      p7: 0,
      p8: 0,
      p9: 0
    });
    console.log(Papers.find().fetch());
    return Papers.find();
  });
}


if(Meteor.isClient){
  const handle = Meteor.subscribe('generalInfo');
  Tracker.autorun(() => {
    const isReady = handle.ready();
    if(isReady){
      var p0 = Papers.findOne("gWZweFSXpe4aHRArR").p0;
      var p1 = Papers.findOne("gWZweFSXpe4aHRArR").p1;
      var p2 = Papers.findOne("gWZweFSXpe4aHRArR").p2;
      var p3 = Papers.findOne("gWZweFSXpe4aHRArR").p3;
      var p4 = Papers.findOne("gWZweFSXpe4aHRArR").p4;
      var p5 = Papers.findOne("gWZweFSXpe4aHRArR").p5;
      var p6 = Papers.findOne("gWZweFSXpe4aHRArR").p6;
      var p7 = Papers.findOne("gWZweFSXpe4aHRArR").p7;
      var p8 = Papers.findOne("gWZweFSXpe4aHRArR").p8;
      var p9 = Papers.findOne("gWZweFSXpe4aHRArR").p9;
      sessionStorage['p0'] = p0;
      sessionStorage['p1'] = p1;
      sessionStorage['p2'] = p2;
      sessionStorage['p3'] = p3;
      sessionStorage['p4'] = p4;
      sessionStorage['p5'] = p5;
      sessionStorage['p6'] = p6;
      sessionStorage['p7'] = p7;
      sessionStorage['p8'] = p8;
      sessionStorage['p9'] = p9;


      sessionStorage['sesP1'] = 4;
      sessionStorage['sesP2'] = 3;
    }
  });
}
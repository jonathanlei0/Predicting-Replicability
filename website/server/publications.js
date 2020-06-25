Meteor.publish('answers', function(){
  return Answers.find({});
});

Meteor.publish('enterredWorkers',function(){
	return EnterredWorkers.find({});
});

Meteor.publish('finishedWorkers',function(){
	return FinishedWorkers.find({});
});

Meteor.publish('historicalWorkers',function(){
	return HistoricalWorkers.find({});
});

Meteor.publish('states',function(){
	return States.find({});
});


/*
Meteor.publish('enterredWorkers',function(){
	return Workers.find({}, {fields:{
									assignmentId: false,
									hitId: false,
									group: false,
									time: false,
								}});
});
*/

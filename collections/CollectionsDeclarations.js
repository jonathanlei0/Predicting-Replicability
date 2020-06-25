Answers = new Meteor.Collection('answers');
EnterredWorkers = new Meteor.Collection('enterredWorkers');
FinishedWorkers = new Meteor.Collection('finishedWorkers');
HistoricalWorkers = new Meteor.Collection('historicalWorkers');
Logs = new Meteor.Collection('logs');
States = new Meteor.Collection('states');
/*
RealTasks = new Meteor.Collection('realTasks');

RealTasks.allow({
  insert: function(){ return false; },
  update: function(){ return false; },
  remove: function(){ return false; }
});

RealTasks.deny({
  insert: function(){ return true; },
  update: function(){ return true; },
  remove: function(){ return true; }
});
*/
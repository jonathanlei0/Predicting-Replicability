import { Meteor } from 'meteor/meteor'

console.log("collection.js")

clcPaper = new Mongo.Collection('paper');
clcHyperparameter = new Mongo.Collection('hyperparameter');
clcUserHistory = new Mongo.Collection('userHistory');
clcUserActivity = new Mongo.Collection('userActivity');
clcMainResponse = new Mongo.Collection('mainResponse');
clcExitSurvey = new Mongo.Collection('exitSurvey');

// Database publish
if (Meteor.isServer) {

    Meteor.publish('paper', function() {
        return clcPaper.find({});
    });

    Meteor.publish('userHistory', function(workerId) {
        return clcUserHistory.find({ "workerId": workerId });
    });

    Meteor.publish('hyperparameter', function() {
        return clcHyperparameter.find({});
    });
}

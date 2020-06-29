/*
A url example:
https://raven.eecs.harvard.edu/?assignmentId=35K3O9HUACQ7YKYSY9HY632UBKTFE8&hitId=3W9XHF7WGK8IH5A9ZDSPXIZKBDYTKG&workerId=AX8LP3MI6LWSJ&turkSubmitTo=https%3A%2F%2Fworkersandbox.mturk.com

http://localhost:3000/?assignmentId=35K3O9HUACQ7YKYSY9HY632UBKTFE8&hitId=3W9XHF7WGK8IH5A9ZDSPXIZKBDYTKG&workerId=AX8LP3MI6LWSJ&turkSubmitTo=https%3A%2F%2Fworkersandbox.mturk.com
*/
import '../../imports/global_methods.js'

// Experiment parameters
basePayment = "0.4";
apprBonus = "0.75";
totalPoints = 25;
eventsPerRound = 5;
exampleTaskList = [{num: '1', question: "Will Amazon stock price go up next week?"}]; 

// Assignment attributes
workerId = '';
assignmentId = '';
hitId = '';
urls = '';
treatment = '';
timeSeries = [];


// Database subscription
Meteor.subscribe('historicalWorkers');
Meteor.subscribe('finishedWorkers');
Meteor.subscribe('enterredWorkers');
Meteor.subscribe('states');
Meteor.subscribe('answers');

displayRemainPoints = function(color) {
    var points = document.getElementsByClassName('betBox');
    var sum = 0;
    for (var i = 0; i < points.length; i++) {
        sum += parseInt(points[i].value) || 0;
    }
    var remainPoints = totalPoints - sum;
    var remainBoxes = document.getElementsByClassName('remain');
    var remainStr = '&nbsp;&nbsp;&nbsp;' + remainPoints + ' points left';
    if (remainPoints < 0) {
        remainStr = 'exceeding by ' + (-remainPoints) + ' points!';
    }
    /*else if (remainPoints == 0) {
           remainStr = 'All points allocated!'
       }*/
    if (color != null) {
        remainStr = '<span style="color: ' + color + ';">' + remainStr + '</span>';
    }
    console.log(remainStr);
    for (var i = 0; i < remainBoxes.length; i++) {
        remainBoxes[i].innerHTML = remainStr;
    }
    return remainPoints;
};

log = function(workerId, eventDescription) {
    var timestamp = Date.now();
    timeSeries.push(timestamp + ' ' + eventDescription);    
    Logs.insert({'workerId': workerId, 'event': eventDescription, 'timestamp': timestamp});
    console.log('Insert Log: ' + workerId + ' ' + eventDescription + ' ' + timestamp);
    console.log('Timeseries: ' + timeSeries);
    console.log('treatment: ' + treatment);
}

// Parse worker information from Amazon Turk url
gup = function(path, name) {
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(path);
    if (results == null)
        return "";
    else
        return results[1];
};


Router.route('/', function() {
    if (BrowserDetection() == "IE") {
        this.layout('MainLayout');
        this.render('BrowserError');
        return false;
    }
    path = window.location.href;
    workerId = gup(path, 'workerId');
    if (workerId == "") workerId = Math.random().toString(36).substring(7);
    assignmentId = gup(path, 'assignmentId');
    //assignmentId = "ASSIGNMENT_ID_NOT_AVAILABLE";
    hitId = gup(path, 'hitId');
    
    sessionStorage.setItem('workerId', Math.random().toString(7));
    sessionStorage.setItem('assignmentId', gup(path, 'assignmentId'));
    sessionStorage.setItem('hitId', gup(path, 'hitId'));

    console.log('Show entering url: ' + path);
    console.log('Show workerId: ' + workerId);

    this.layout('MainLayout');
    this.render('WelcomeForAll');
});

//Common************************************************
Router.route('/WelcomeForAll', function() {
    this.layout('MainLayout');
    this.render('WelcomeForAll');
});






//Brier*************************************************
Router.route('/WelcomeBrier', function() {
    this.layout('MainLayout');
    this.render('WelcomeBrier');
});

Router.route('/Consent', function() {
    this.layout('MainLayout');
    this.render('Consent');
});


Router.route('/SurveyInstruction', function() {
    this.layout('MainLayout');
    this.render('SurveyInstruction');
});





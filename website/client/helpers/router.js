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

Router.route('/ConsentBrier', function() {
    this.layout('MainLayout');
    this.render('ConsentBrier');
});

Router.route('/ExampleBrier', function() {
    this.layout('MainLayout');
    this.render('ExampleBrier');
});

Router.route('/MechanismBrier', function() {
    this.layout('MainLayout');
    this.render('MechanismBrier');
});

Router.route('/CalculatorBrier', function() {
    this.layout('MainLayout');
    this.render('CalculatorBrier');
});

Router.route('/EndTutorialBrier', function() {
    this.layout('MainLayout');
    this.render('EndTutorialBrier');
});

Router.route('/RealTaskBrier', function() {
    this.layout('MainLayout');
    this.render('RealTaskBrier');
});


//BrierConfidence****************************************
Router.route('/WelcomeBC', function() {
    this.layout('MainLayout');
    this.render('WelcomeBC');
});

Router.route('/ConsentBC', function() {
    this.layout('MainLayout');
    this.render('ConsentBC');
});

Router.route('/ExampleBC', function() {
    this.layout('MainLayout');
    this.render('ExampleBC');
});

Router.route('/MechanismBC', function() {
    this.layout('MainLayout');
    this.render('MechanismBC');
});

Router.route('/CalculatorBC', function() {
    this.layout('MainLayout');
    this.render('CalculatorBC');
});

Router.route('/EndTutorialBC', function() {
    this.layout('MainLayout');
    this.render('EndTutorialBC');
});

Router.route('/RealTaskBC', function() {
    this.layout('MainLayout');
    this.render('RealTaskBC');
});

//BrierConfidenceWeighted****************************************
Router.route('/WelcomeBCW', function() {
    this.layout('MainLayout');
    this.render('WelcomeBCW');
});

Router.route('/ConsentBCW', function() {
    this.layout('MainLayout');
    this.render('ConsentBCW');
});

Router.route('/ExampleBCW', function() {
    this.layout('MainLayout');
    this.render('ExampleBCW');
});

Router.route('/MechanismBCW', function() {
    this.layout('MainLayout');
    this.render('MechanismBCW');
});

Router.route('/CalculatorBCW', function() {
    this.layout('MainLayout');
    this.render('CalculatorBCW');
});

Router.route('/EndTutorialBCW', function() {
    this.layout('MainLayout');
    this.render('EndTutorialBCW');
});

Router.route('/RealTaskBCW', function() {
    this.layout('MainLayout');
    this.render('RealTaskBCW');
});

//NAWM********************************************************
Router.route('/ConsentNAWM', function() {
    this.layout('MainLayout');
    this.render('ConsentNAWM');
});

Router.route('/ExampleNAWM', function() {
    this.layout('MainLayout');
    this.render('ExampleNAWM');
});

Router.route('/MechanismNAWM', function() {
    this.layout('MainLayout');
    this.render('MechanismNAWM');
});

Router.route('/CalculatorNAWM', function() {
    this.layout('MainLayout');
    this.render('CalculatorNAWM');
});

Router.route('/EndTutorialNAWM', function() {
    this.layout('MainLayout');
    this.render('EndTutorialNAWM');
});

Router.route('/RealTaskNAWM', function() {
    this.layout('MainLayout');
    this.render('RealTaskNAWM');
});


//WSWM********************************************************
Router.route('/ConsentWSWM', function() {
    this.layout('MainLayout');
    this.render('ConsentWSWM');
});

Router.route('/ExampleWSWM', function() {
    this.layout('MainLayout');
    this.render('ExampleWSWM');
});

Router.route('/MechanismWSWM', function() {
    this.layout('MainLayout');
    this.render('MechanismWSWM');
});

Router.route('/CalculatorWSWM', function() {
    this.layout('MainLayout');
    this.render('CalculatorWSWM');
});

Router.route('/EndTutorialWSWM', function() {
    this.layout('MainLayout');
    this.render('EndTutorialWSWM');
});

Router.route('/RealTaskWSWM', function() {
    this.layout('MainLayout');
    this.render('RealTaskWSWM');
});



Router.route('/calculator', function() {
    this.layout('MainLayout');
    this.render('calculator');
});

Router.route('/consent', function() {
    this.layout('MainLayout');
    this.render('consent');
});

Router.route('/end', function() {
    this.layout('MainLayout');
    this.render('end');
});

Router.route('/endTutorial', function() {
    this.layout('MainLayout');
    this.render('endTutorial');
});

Router.route('/error', function() {
    this.layout('MainLayout');
    this.render('error');
});

Router.route('/example', function() {
    this.layout('MainLayout');
    this.render('example');
});

Router.route('/NAWMTutorial', function() {
    this.layout('MainLayout');
    this.render('NAWMTutorial');
});

Router.route('/payment', function() {
    this.layout('MainLayout');
    this.render('payment');
});

Router.route('/preview', function() {
    this.layout('MainLayout');
    this.render('preview');
});

Router.route('/RealTask', function() {
    this.layout('MainLayout');
    this.render('RealTask');
});

Router.route('/welcome', function() {
    this.layout('MainLayout');
    this.render('welcome');
});

/*
A url example:
https://raven.eecs.harvard.edu/?assignmentId=35K3O9HUACQ7YKYSY9HY632UBKTFE8&hitId=3W9XHF7WGK8IH5A9ZDSPXIZKBDYTKG&workerId=AX8LP3MI6LWSJ&turkSubmitTo=https%3A%2F%2Fworkersandbox.mturk.com

http://localhost:3000/?assignmentId=35K3O9HUACQ7YKYSY9HY632UBKTFE8&hitId=3W9XHF7WGK8IH5A9ZDSPXIZKBDYTKG&workerId=AX8LP3MI6LWSJ&turkSubmitTo=https%3A%2F%2Fworkersandbox.mturk.com
*/

// Assignment attributes
workerId = '';
assignmentId = '';
hitId = '';
urls = '';
treatment = '';



// Database subscription
Meteor.subscribe('papers');

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
    // if (BrowserDetection() == "IE") {
    //     this.layout('MainLayout');
    //     this.render('BrowserError');
    //     return false;
    // }
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


Router.route('/Consent', function() {
    this.layout('MainLayout');
    this.render('Consent');
});


Router.route('/SurveyInstruction', function() {
    this.layout('MainLayout');
    this.render('SurveyInstruction');
});


Router.route('/Error', function() {
    this.layout('MainLayout');
    this.render('Error');
});

//Paper1************************************************
Router.route('/Paper1Page1', function() {
    this.layout('MainLayout');
    this.render('Paper1Page1');
});


Router.route('/Paper1Page2', function() {
    this.layout('MainLayout');
    this.render('Paper1Page2');
});


Router.route('/Paper1Page3', function() {
    this.layout('MainLayout');
    this.render('Paper1Page3');
});

//Paper2************************************************
Router.route('/Paper2Page1', function() {
    this.layout('MainLayout');
    this.render('Paper2Page1');
});


Router.route('/Paper2Page2', function() {
    this.layout('MainLayout');
    this.render('Paper2Page2');
});


Router.route('/Paper2Page3', function() {
    this.layout('MainLayout');
    this.render('Paper2Page3');
});

//Pair1************************************************
Router.route('/Pair1Page1', function() {
    this.layout('MainLayout');
    this.render('Pair1Page1');
});


Router.route('/Pair1Page2', function() {
    this.layout('MainLayout');
    this.render('Pair1Page2');
});

//End************************************************
Router.route('/ExitSurvey', function() {
    this.layout('MainLayout');
    this.render('ExitSurvey');
});


Router.route('/ExperimentEnd', function() {
    this.layout('MainLayout');
    this.render('ExperimentEnd');
});
console.log("router.js");


Router.route('/', function() {
    // if (BrowserDetection() == "IE") {
    //     this.layout('MainLayout');
    //     this.render('BrowserError');
    //     return false;
    // }

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



//Error************************************************
Router.route('/PaperAssignmentError', function() {
    this.layout('MainLayout');
    this.render('PaperAssignmentError');
});
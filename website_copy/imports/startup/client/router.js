console.log("router.js");

checkBrowserLevelNav = function(routerHandle) {
    var path = window.location.href
    if (path.includes('#')) return true;
    var currPage = getCurrPage()
    if (currPage.includes("WelcomeForAll")) {
        enterpoint = "WelcomeForAll"
    } else {
        if (typeof enterpoint === "undefined") {
            routerHandle.layout('MainLayout');
            routerHandle.render('ErrorByRefresh');
            return false
        }
    }
    return true
}


Router.route('/', function() {
    // if (BrowserDetection() == "IE") {
    //     this.layout('MainLayout');
    //     this.render('BrowserError');
    //     return false;
    // }
    if (!checkBrowserLevelNav(this)) return false;
    this.layout('MainLayout');
    this.render('WelcomeForAll');
});

//Common************************************************
Router.route('/WelcomeForAll', function() {
    if (!checkBrowserLevelNav(this)) return false;
    this.layout('MainLayout');
    this.render('WelcomeForAll');
});


Router.route('/Consent', function() {
    if (!checkBrowserLevelNav(this)) return false;
    this.layout('MainLayout');
    this.render('Consent');
});


Router.route('/SurveyInstruction', function() {
    if (!checkBrowserLevelNav(this)) return false;
    this.layout('MainLayout');
    this.render('SurveyInstruction');
});


Router.route('/Error', function() {
    if (!checkBrowserLevelNav(this)) return false;
    this.layout('MainLayout');
    this.render('Error');
});

//Paper1************************************************
Router.route('/Paper1Page1', function() {
    if (!checkBrowserLevelNav(this)) return false;
    this.layout('MainLayout');
    this.render('Paper1Page1');
});


Router.route('/Paper1Page2', function() {
    if (!checkBrowserLevelNav(this)) return false;
    this.layout('MainLayout');
    this.render('Paper1Page2');
});


Router.route('/Paper1Page3', function() {
    if (!checkBrowserLevelNav(this)) return false;
    console.log(checkBrowserLevelNav());
    this.layout('MainLayout');
    this.render('Paper1Page3');
});

//Pair1************************************************
Router.route('/Pair1Page1', function() {
    if (!checkBrowserLevelNav(this)) return false;
    this.layout('MainLayout');
    this.render('Pair1Page1');
});


Router.route('/Pair1Page2', function() {
    if (!checkBrowserLevelNav(this)) return false;
    this.layout('MainLayout');
    this.render('Pair1Page2');
});

//End************************************************
Router.route('/ExitSurvey', function() {
    if (!checkBrowserLevelNav(this)) return false;
    this.layout('MainLayout');
    this.render('ExitSurvey');
});


Router.route('/ExperimentEnd', function() {
    if (!checkBrowserLevelNav(this)) return false;
    this.layout('MainLayout');
    this.render('ExperimentEnd');
});



//Error************************************************
Router.route('/PaperAssignmentError', function() {
    if (!checkBrowserLevelNav(this)) return false;
    this.layout('MainLayout');
    this.render('PaperAssignmentError');
});
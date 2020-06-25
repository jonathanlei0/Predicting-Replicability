Template.WelcomeForAll.events = {
    'click #nextBtn': function(event, template) {
        event.preventDefault();
        if (assignmentId == "ASSIGNMENT_ID_NOT_AVAILABLE") {
            return false;
        }
        var existedWorker = (
            HistoricalWorkers.findOne({ "workerId": workerId }) ||
            FinishedWorkers.findOne({ "workerId": workerId })
        );
        if (existedWorker != null) {
            Router.go('/error');
        } else {
            var enterredWorker = EnterredWorkers.findOne({ "workerId": workerId });
            if (enterredWorker != null) {
                treatment = enterredWorker.treatment;
                console.log('Enterred worker');
            } else {
                var cnt = States.findOne({}).treatmentCount;
                console.log("New worker");
                console.log(cnt);
                var total = 0;
                var i, total = 0,
                    min = 10000;
                for (i = 0; i < cnt.length; i++) {
                    total += cnt[i];
                    if (cnt[i] <= min) {
                        min = cnt[i];
                        treatment = i + 1;
                    }
                }
                if (treatment == '5' && cnt[3] == cnt[4]) treatment = '4';
                if (total <= 50) {
                    treatment = parseInt((Math.random() * 5 + 1)).toFixed(0);
                }
                EnterredWorkers.insert({ 'workerId': workerId, 'assignmentId': assignmentId, 'hitId': hitId, 'treatment': treatment, 'timestamp': Date.now() });
            }
            console.log("treatment: " + treatment);
            sessionStorage.setItem('treatment', treatment);
            if (treatment == '1') {
                Router.go('ConsentBrier');
            } else if (treatment == '2') {
                Router.go('ConsentBC');
            } else if (treatment == '3') {
                Router.go('ConsentBCW');
            } else if (treatment == '5') {
                Router.go('ConsentWSWM');
            } else Router.go('ConsentNAWM');
        }
    }
};

Template.WelcomeForAll.helpers({
    basePayment: function() { return basePayment; },
    apprBonus: function() { return apprBonus; }
});

Template.WelcomeForAll.rendered = function() {
    $('html,body').scrollTop(0);
    if (assignmentId == "ASSIGNMENT_ID_NOT_AVAILABLE") {
        document.getElementById("nextBtn").innerHTML = "Accept HIT to start!";
        return;
    }
    log(workerId, 'Welcome');
};
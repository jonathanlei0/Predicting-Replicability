getRadioValue = function(name) {
    var radios = document.getElementsByName(name);
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked)
            return radios[i].value;
    }
}

Template.end.events = {
    'click #submit': function(event, instance) {
        //event.preventDefault();
        var form = document.getElementById('feedbackForm');
        var val = form.checkValidity();
        if (!val) {
            return true;
        }
        var enjoyGame = getRadioValue('enjoyGame') || 0;
        var trainClear = getRadioValue('trainClear') || 0;
        //var trainTime = getRadioValue('trainTime') || 0;
        var bestTrainPart = getRadioValue('bestTrainPart') || 0;
        var predMethod = getRadioValue('predMethod') || 0;
        var otherPredMethod = document.getElementById("otherPredMethod");
        if (otherPredMethod != null) {
            otherPredMethod = otherPredMethod.value;
        } else {
            otherPredMethod = "";
        }
        var allocateMethod = document.getElementById("allocateMethod");
        if (allocateMethod != null) {
            allocateMethod = allocateMethod.value;
        } else {
            allocateMethod = "";
        }
        var comments = document.getElementById("comment").value;
        var submitDate = new Date();
        FinishedWorkers.insert({ workerId: workerId, assignmentId: assignmentId, hitId: hitId, treatment: treatment, enjoyGame: enjoyGame, tutClear: trainClear, bestTutPart: bestTrainPart, predMeth: predMethod, othPredMeth: otherPredMethod, allocMeth: allocateMethod, comment: comments, timeSeries: timeSeries, submitTime: submitDate.toString() });
        var currState = States.findOne({});
        console.log(currState);
        var newCnt = currState.treatmentCount;
        newCnt[parseInt(sessionStorage.getItem('treatment')) - 1] += 1; 
        console.log(newCnt);
        var updated = States.update(
            { _id: currState._id }, 
            { 'treatmentCount': newCnt }
        );
        console.log(updated);
        var str = "https://www.mturk.com/mturk/externalSubmit?assignmentId=" + assignmentId.toString() + "&Finished=Submit";
        Meteor.setTimeout(function() { window.location.href = str; }, 1000);
    }
};

Template.end.rendered = function() {
    $('html,body').scrollTop(0);
    if (treatment=="1") {
        //var element = document.getElementById("trainPartLi");
        //element.parentNode.removeChild(element);
        var element = document.getElementById("allocateLi");
        element.parentNode.removeChild(element);
    }
    log(workerId, 'End');
};
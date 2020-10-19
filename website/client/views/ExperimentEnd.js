Template.ExperimentEnd.events({
    "click #HITSubmitButton": function() {
        //var str = "https://www.mturk.com/mturk/externalSubmit?assignmentId=" + assignmentId + "&Finished=Submit";
        var str = "https://workersandbox.mturk.com/mturk/externalSubmit?assignmentId=" + assignmentId + "&Finished=Submit";
        Meteor.setTimeout(function() { window.location.href = str; }, 800);
    }
})
/*Template.Consent.events = {
    'click #nextBtn': function(event, template) {
        if (!document.getElementById('consentBox').checked) {
            alert("If you agree to take part in this experiment, please check the box above!");
        }
    },
    'click #consentBox': function(event, template) {
        Template.instance().nextDisable.set(
            !document.getElementById('consentBox').checked
        )
    }
};*/

Template.Consent.helpers({
    basePayment: function() { return basePayment; },
    nextDisable: function() {
        return Template.instance().nextDisable.get();
    }
});

Template.Consent.rendered = function() {
    $('html,body').scrollTop(0);
    log(workerId, 'Consent');
    /*Template.instance().nextDisable.set(
        !document.getElementById('consentBox').checked
    );*/
};

/*Template.Consent.created = function() {
    this.nextDisable = new ReactiveVar(true);
};*/
const scale = 6.66667

Template.CalculatorGadgetBrier.events = {
    'input #calPred': function(event, instance) {
        var pred = document.getElementById('calPred').value;
        Template.instance().netGain1.set((1 - (1 - pred) * (1 - pred)) * scale);
        Template.instance().netGain2.set((1 - pred * pred) * scale);
    }
};

Template.CalculatorGadgetBrier.helpers({
    netGain1: function() {
        return Template.instance().netGain1.get().toFixed(2);
    },
    netGain2: function() {
        return Template.instance().netGain2.get().toFixed(2);
    }
});


Template.CalculatorGadgetBrier.created = function() {
    this.netGain1 = new ReactiveVar((1 - (1 - 0.5) * (1 - 0.5)) * scale);
    this.netGain2 = new ReactiveVar((1 - 0.5 * 0.5) * scale);
};
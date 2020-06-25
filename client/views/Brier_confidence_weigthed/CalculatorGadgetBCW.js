const scale = 1.33333

Template.CalculatorGadgetBCW.events = {
    'input #CalculatorForm': function(event, instance) {
        var pred = document.getElementById('calPred').value;
        var points = document.getElementById('calPoint').value;
        Template.instance().netGain1.set((1 - (1 - pred) * (1 - pred)) * scale * points);
        Template.instance().netGain2.set((1 - pred * pred) * scale * points);
    }
};

Template.CalculatorGadgetBCW.helpers({
    netGain1: function() {
        return Template.instance().netGain1.get().toFixed(2);
    },
    netGain2: function() {
        return Template.instance().netGain2.get().toFixed(2);
    }
});


Template.CalculatorGadgetBCW.created = function() {
    this.netGain1 = new ReactiveVar((1 - (1 - 0.5) * (1 - 0.5)) * scale * 0);
    this.netGain2 = new ReactiveVar((1 - 0.5 * 0.5) * scale * 0);
};
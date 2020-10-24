Template.PopupWarning.events({
    'click .close': function(event, instance) {
        reactivatePage();
        if (this.exitTo) {
            location.href = "#";
            location.href = this.exitTo;

        }
    }
});
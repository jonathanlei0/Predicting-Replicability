Template.BidirectNavigation.events = {
    'click #prevBtn': function(event, template) {
        Router.go('/' + this.prevPage);
    },
    'click #nextBtn': function(event, template) {
        if (!this.nextDisable) {
            Router.go('/' + this.nextPage);
        }
    }
};
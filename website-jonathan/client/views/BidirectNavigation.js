Template.BidirectNavigation.events = {

    'click #prevBtn': function(event, template) {
        Router.go('/' + this.prevPage);
    },

    'click #nextBtn': function(event, template) {
        //form = document.getElementById("submissionForm");
        var form = document.querySelector('form');
        if (form==null) {
            Router.go('/' + this.nextPage);
        }else{
            console.log(form.checkValidity());
            if(form.checkValidity()){
                form.action=this.nextPage;        
            }
        }
    }    
};
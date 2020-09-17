Template.BidirectNavigation.events({

    'click #prevBtn': function(event, template) {
        Router.go('/' + this.prevPage);
    },

    'click #nextBtn': function(event, template) {
        //form = document.getElementById("submissionForm");

        var form = document.querySelector('form');
        var formValid = false
        var sum = 0;

        if (form == null) {
            Router.go('/' + this.nextPage);
        } else {
            formValid = form.checkValidity()
            if (!formValid) return;
            //console.log(form.checkValidity());
            //if(form.checkValidity()){
            //    form.action=this.nextPage;        
            //}
        }

        event.preventDefault();

        if (bar_status == "default") {
            location.href = "#";
            location.href = "#popup-warning-moving-bar";
            return;
        }

        if (customized_question_complete_status != undefined) {

            for (var i = 0; i < customized_question_complete_status.length; i++) {
                sum += customized_question_complete_status[i];
            }
            if (sum != 0) {
                location.href = "#";
                location.href = "#BidirectNavigation-popup";
                // var alertElement = document.getElementById('BidirectNavigation-alert');
                // alertElement.style.display = "none";
                // setTimeout(function() {
                //     alertElement.style.display = "block"
                // }, 250);
                return;
            }
        }

        if (sum == 0 && formValid) {
            console.log("Valid to go next page!");
            if (currPage == "Paper1Page3" && mySessionStorage.get('task_id') < MAX_TASK_NUM) {
                console.log("Go /Paper1Page1");
                Router.go('/' + "Paper1Page1");
                return;
            }
            console.log("Go /"+this.nextPage);
            Router.go('/' + this.nextPage);
        }
    }
});
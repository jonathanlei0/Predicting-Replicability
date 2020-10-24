Template.BidirectNavigation.events({

    'click #prevBtn': function(event, template) {
        Router.go('/' + this.prevPage + url_tail);
    },

    'click #nextBtn': function(event, template) {
        //form = document.getElementById("submissionForm");

        if (assignmentId == "ASSIGNMENT_ID_NOT_AVAILABLE") {
            document.getElementById('nextBtn').innerHTML = "This is a preview. Please accept the HIT to start!";
            return false;
        }

        var form = document.querySelector('form');
        var formValid = false
        var sum = 0;

        var currPage = getCurrPage();

        if (form == null) {
            // No form page
            // WelcomeForAll; Consent; Paper1Page1; Pair1Page1; ExperimentEnd;
            recordUserNavigation(currPage);
            if (currPage.includes("WelcomeForAll")) {
                var valid = checkUserHistory();
                if (!valid) {
                    console.log("Go /PaperAssignmentError");
                    Router.go('/PaperAssignmentError' + url_tail);
                    return true;
                }
            }
            console.log("Go /" + this.nextPage);
            Router.go('/' + this.nextPage + url_tail);
            return true;
        } else {
            // page with form
            // SurveyInstruction; Paper1Page2; Paper1Page3; Pair1Page2; ExitSurvey
            formValid = form.checkValidity()
            if (!formValid) return;

            event.preventDefault();


            if (bar_status == "default") {
                location.href = "#";
                location.href = "#popup-warning-moving-bar";
                return;
            }

            if ((selection_complete_status != undefined) &&
                (selection_complete_status != 0)) {

                location.href = "#";
                location.href = "#BidirectNavigation-popup";
                return false;
            }


            if (selection_complete_status == 0 && formValid) {
                console.log("Valid to go next page!");
                // Record to database
                recordUserNavigation(currPage);
                if (currPage.includes("SurveyInstruction")) {
                    var success = paperPairwiseAssignmentAndRecord();
                    if (!success) {
                        console.log("Go /PaperAssignmentError");
                        Router.go('/PaperAssignmentError' + url_tail);
                        return true;
                    }
                } else if (currPage.includes("Pair1Page2")) {
                    recordPairwisePageResponse();
                    recordPairwisePaperCompletion();
                } else if (currPage.includes("Paper1Page3")) {
                    recordMethodPageResponse();
                    recordIndividualPaperCompletion();
                } else if (currPage.includes("Paper1Page2")) {
                    recordAbstractPageResponse();
                } else if (currPage.includes("ExitSurvey")) {
                    recordExistSurveyResponse();
                }


                // Nevigation webpage
                if (currPage.includes("Paper1Page3") && glob.taskId < glob.const.maxTaskNum) {
                    console.log("Go /Paper1Page1");
                    Router.go('/' + "Paper1Page1" + url_tail);
                    return true;
                }
                console.log("Go /" + this.nextPage);
                Router.go('/' + this.nextPage + url_tail);
                return true;
            }
        }
    },
});
Template.Paper1Page3.onCreated(function() {
    pageLevelVariablesRefresh();
    customized_question_complete_status = [1, 1];
    bar_status = "default"
});

Template.Paper1Page3.onRendered(function() {
    var id = glob.currPaperExpIdList[nonNeg(glob.taskId-1)];

    document.getElementById("studyTitle").innerHTML =
        "<b>Title: </b><em>" + httpGet("/paper_data/title/[title]" + id + ".txt") + "</em>";

    document.getElementById("methodText").innerHTML =
        "" + httpGet("/paper_data/method/[method]" + id + ".txt")

    var abstractText = httpGet("/paper_data/abstract/[abstract]" + id + ".txt");
    abstractText = abstractText.replaceAll('"sentence"', '""');
    document.getElementById("abstractText").innerHTML = "<b>Abstract: </b>" + abstractText;

    document.getElementById('method-q-main-claim-display').innerHTML = METHOD_INSTRUCTION_TYPE1;
    document.getElementById('method-q-main-step-display').innerHTML = METHOD_INSTRUCTION_TYPE1;
});


Template.Paper1Page3.events({

    'click #method-q-main-claim-switch': function(event, instance) {
        event.preventDefault();

        var element = event.target;
        console.log(element);
        if (element.innerHTML.includes('tart')) {
            if (customized_question_complete_status[1] >= 2) {
                location.href = "#";
                location.href = "#popup-warning-5";
                return;
            }

            document.getElementById('method-q-main-claim-display').style.display = "block";
            selection_type = METHOD_SELECTION_TYPE1;
            highlight_color = METHOD_HIGHLIGHT_COLOR1;
            location.href = "#";
            location.href = "#studyTitle";
            document.getElementById('method-q-main-claim-feedback').style.visibility = "hidden";
            customized_question_complete_status[0] = 2;
            element.innerHTML = 'Confirm selection';
            element.className = element.className.replace('btn-primary', 'btn-warning');
        } else { // "Confirm" on the button
            // Judge whether the selection meets the requirements
            var scopeElement = document.getElementById("methodText");
            var highlightClass = "highlight1";
            var elementList = scopeElement.getElementsByClassName(highlightClass);
            if (elementList.length == 1) {
                // The requirements are met!
                customized_question_complete_status[0] = 0;
                selection_type = null;
                document.getElementById('method-q-main-claim-feedback').style.visibility = "visible";
                setTimeout(function() {
                    element.innerHTML = 'Restart selection';
                    element.className = element.className.replace('btn-warning', 'btn-primary');
                }, 100)
            } else if (elementList.length == 0) {
                location.href = "#";
                location.href = "#popup-warning-1";
                return;
            } else {
                location.href = "#";
                location.href = "#popup-warning-2";
            }
        }
    },

    'click #method-q-main-claim-start-button': function(event, instance) {
        event.preventDefault();

        if (customized_question_complete_status[1] >= 2) {
            // If the other selection problem is ongoing
            location.href = "#";
            location.href = "#popup-warning-5";
            return;
        }

        document.getElementById('method-q-main-claim-display').style.display = "block";
        selection_type = METHOD_SELECTION_TYPE1;
        highlight_color = METHOD_HIGHLIGHT_COLOR1;
        location.href = "#";
        location.href = "#studyTitle";
        document.getElementById('method-q-main-claim-feedback').style.visibility = "hidden";
        customized_question_complete_status[0] = 2;

        var confirmButton = document.getElementById('method-q-main-claim-confirm-button');
        confirmButton.classList.remove('disabled');
        confirmButton.ariaDisabled = false;

        var startButton = document.getElementById('method-q-main-claim-start-button');
        startButton.classList.add('disabled');
        startButton.ariaDisabled = true;
        startButton.innerHTML = "Restart selection";
    },

    'click #method-q-main-claim-confirm-button': function(event, instance) {
        event.preventDefault();

        // Judge whether the selection meets the requirements
        var scopeElement = document.getElementById("methodText");
        var highlightClass = "highlight1";
        var elementList = scopeElement.getElementsByClassName(highlightClass);
        if (elementList.length == 1) {
            // The requirements are met!
            customized_question_complete_status[0] = 0;
            selection_type = null;
            document.getElementById('method-q-main-claim-feedback').style.visibility = "visible";
            var confirmButton = document.getElementById('method-q-main-claim-confirm-button');
            confirmButton.classList.add('disabled');
            confirmButton.ariaDisabled = true;

            var startButton = document.getElementById('method-q-main-claim-start-button');
            startButton.classList.remove('disabled');
            startButton.ariaDisabled = false;
        } else if (elementList.length == 0) {
            location.href = "#";
            location.href = "#popup-warning-1";
            return;
        } else {
            location.href = "#";
            location.href = "#popup-warning-2";
        }
    },

    'click #method-q-main-step-switch': function(event, instance) {
        event.preventDefault();

        var element = event.target;
        console.log(element);
        if (element.innerHTML.includes('tart')) {
            if (customized_question_complete_status[0] >= 2) {
                location.href = "#";
                location.href = "#popup-warning-4";
                return;
            }

            document.getElementById('method-q-main-step-display').style.display = "block"
            selection_type = METHOD_SELECTION_TYPE2;
            highlight_color = METHOD_HIGHLIGHT_COLOR2;
            location.href = "#";
            location.href = "#studyTitle";
            document.getElementById('method-q-main-step-feedback').style.visibility = "hidden";
            customized_question_complete_status[1] = 2;
            element.innerHTML = 'Confirm selection';
            element.className = element.className.replace('btn-primary', 'btn-warning');
        } else { // "Confirm" on the button
            // Judge whether the selection meets the requirements
            var scopeElement = document.getElementById("methodText");
            var highlightClass = "highlight2";
            var elementList = scopeElement.getElementsByClassName(highlightClass);
            if (elementList.length == METHOD_SELECTION_NUM_TYPE2) {
                // The requirements are met!
                customized_question_complete_status[1] = 0;
                selection_type = null;
                document.getElementById('method-q-main-step-feedback').style.visibility = "visible";
                setTimeout(function() {
                    element.innerHTML = 'Restart selection';
                    element.className = element.className.replace('btn-warning', 'btn-primary');
                }, 100)
            } else if (elementList.length == 0) {
                location.href = "#";
                location.href = "#popup-warning-1";
                return;
            } else {
                location.href = "#";
                location.href = "#popup-warning-2";
            }
        }
    },

    'click #method-q-main-step-start-button': function(event, instance) {
        event.preventDefault();

        if (customized_question_complete_status[0] >= 2) {
            location.href = "#";
            location.href = "#popup-warning-4";
            return;
        }

        document.getElementById('method-q-main-step-display').style.display = "block"
        selection_type = METHOD_SELECTION_TYPE2;
        highlight_color = METHOD_HIGHLIGHT_COLOR2;
        location.href = "#";
        location.href = "#studyTitle";
        document.getElementById('method-q-main-step-feedback').style.visibility = "hidden";
        customized_question_complete_status[1] = 2;

        var confirmButton = document.getElementById('method-q-main-step-confirm-button');
        confirmButton.classList.remove('disabled');
        confirmButton.ariaDisabled = false;

        var startButton = document.getElementById('method-q-main-step-start-button');
        startButton.classList.add('disabled');
        startButton.ariaDisabled = true;
        startButton.innerHTML = "Restart selection";
    },

    'click #method-q-main-step-confirm-button': function(event, instance) {
        // Judge whether the selection meets the requirements
        var scopeElement = document.getElementById("methodText");
        var highlightClass = "highlight2";
        var elementList = scopeElement.getElementsByClassName(highlightClass);
        if (elementList.length == METHOD_SELECTION_NUM_TYPE2) {
            // The requirements are met!
            customized_question_complete_status[1] = 0;
            selection_type = null;
            document.getElementById('method-q-main-step-feedback').style.visibility = "visible";
            var confirmButton = document.getElementById('method-q-main-step-confirm-button');
            confirmButton.classList.add('disabled');
            confirmButton.ariaDisabled = true;

            var startButton = document.getElementById('method-q-main-step-start-button');
            startButton.classList.remove('disabled');
            startButton.ariaDisabled = false;
        } else if (elementList.length == 0) {
            location.href = "#";
            location.href = "#popup-warning-1";
            return;
        } else {
            location.href = "#";
            location.href = "#popup-warning-2";
        }
    },


    'change #begining-paragraph-NOT-exists': function(event, instance) {
        if (document.getElementById('begining-paragraph-NOT-exists').checked) {

            var confirmButton = document.getElementById('method-q-main-claim-confirm-button');
            confirmButton.classList.add('disabled');
            confirmButton.ariaDisabled = true;

            var startButton = document.getElementById('method-q-main-claim-start-button');
            startButton.classList.add('disabled');
            startButton.ariaDisabled = true;
            startButton.setAttribute("recorded-status", customized_question_complete_status[0]);

            customized_question_complete_status[0] = 0;
        } else {
            var startButton = document.getElementById('method-q-main-claim-start-button');
            var confirmButton = document.getElementById('method-q-main-claim-confirm-button');

            var recordedStatus = parseInt(startButton.getAttribute("recorded-status"), 10);
            customized_question_complete_status[0] = recordedStatus;
            if (recordedStatus <= 1) {
                confirmButton.classList.add('disabled');
                confirmButton.ariaDisabled = true;
                startButton.classList.remove('disabled');
                startButton.ariaDisabled = false;
            } else if (recordedStatus == 2) {
                confirmButton.classList.remove('disabled');
                confirmButton.ariaDisabled = false;
                startButton.classList.add('disabled');
                startButton.ariaDisabled = true;
            }
        }
    },

    // 'change #begining-paragraph-exists': function(event, instance) {
    //     if (document.getElementById('begining-paragraph-exists').checked) {
    //         var startButton = document.getElementById('method-q-main-claim-start-button');
    //         var confirmButton = document.getElementById('method-q-main-claim-confirm-button');

    //         var recordedStatus = parseInt(startButton.getAttribute("recorded-status"), 10);
    //         customized_question_complete_status[0] = recordedStatus;
    //         if (recordedStatus <= 1) {
    //             confirmButton.classList.add('disabled');
    //             confirmButton.ariaDisabled = true;
    //             startButton.classList.remove('disabled');
    //             startButton.ariaDisabled = false;
    //         } else if (recordedStatus == 2) {
    //             confirmButton.classList.remove('disabled');
    //             confirmButton.ariaDisabled = false;
    //             startButton.classList.add('disabled');
    //             startButton.ariaDisabled = true;
    //         }
    //         // var element = document.getElementById('method-q-main-claim-switch');
    //         // var buttomText = element.innerHTML.toLowerCase();
    //         // if (buttomText.includes('restart')) {
    //         //     customized_question_complete_status[0] = 0;
    //         // } else if (buttomText.includes('confirm')) {
    //         //     customized_question_complete_status[0] = 2;
    //         // } else customized_question_complete_status[0] = 1;
    //         // element.disabled = false;
    //     }
    // },


    'click #show-abstract-button': function(event, instance) {
        event.preventDefault();
        var button = document.getElementById('show-abstract-button');
        var element = document.getElementById('show-abstract');
        if (button.innerHTML.toLowerCase().includes('show')) {
            element.style.maxHeight = element.scrollHeight + 'px';
            button.innerHTML = "Hide abstract";
        } else {
            element.style.maxHeight = null;
            button.innerHTML = "Show abstract";
        }

    },
})
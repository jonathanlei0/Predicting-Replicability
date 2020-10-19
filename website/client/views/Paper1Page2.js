Template.Paper1Page2.onCreated(function() {
    pageLevelVariablesRefresh();
    //localStorage.curr_paper_id = Math.floor(Math.random() * 25);
    customized_question_complete_status = [1];
});

Template.Paper1Page2.onRendered(function() {
    var id = glob.currPaperExpIdList[nonNeg(glob.taskId-1)];

    document.getElementById("studyTitle").innerHTML =
        "<b>Title: </b><em>" + httpGet("/paper_data/title/[title]" + id + ".txt") + "</em>";

    document.getElementById("abstractText").innerHTML =
        "<b>Abstract: </b>" + httpGet("/paper_data/abstract/[abstract]" + id + ".txt");

    document.getElementById('abstract-q3-display').innerHTML = ABSTRACT_INSTRUCTION_TYPE1;
});


Template.Paper1Page2.events({

    'click #abstract-q3-start': function(event, instance) {
        event.preventDefault();

        var element = event.target;
        document.getElementById('mainClaimSelectionTextarea').style.display = "block"
        console.log(element);
        element.innerHTML = 'Please confirm ->';
        element.disabled = true;

        var linkedElement = document.getElementById('abstract-q3-confirm')
        linkedElement.innerHTML = 'Confirm selection'
        linkedElement.disabled = false;
    },

    'click #abstract-q3-confirm': function(event, instance) {
        event.preventDefault();

        var element = event.target;
        document.getElementById('mainClaimSelectionTextarea').style.display = "block"
        console.log(element);
        element.innerHTML = 'Confirmed!';
        element.disabled = true;

        var linkedElement = document.getElementById('abstract-q3-start')
        linkedElement.innerHTML = 'Restart selection'
        linkedElement.disabled = false;
    },

    'click #abstract-q3-switch': function(event, instance) {
        event.preventDefault();

        var element = event.target;
        document.getElementById('abstract-q3-display').style.display = "block"
        if (element.innerHTML.includes('tart')) {
            selection_type = ABSTRACT_SELECTION_TYPE1;
            highlight_color = ABSTRACT_HIGHLIGHT_COLOR1;
            location.href = "#";
            location.href = "#studyTitle";
            document.getElementById('abstract-q3-feedback').style.visibility = "hidden";
            customized_question_complete_status[0] = 2;
            element.innerHTML = 'Confirm selection';
            element.className = element.className.replace('btn-primary', 'btn-warning');
        } else { // "Confirm" on the button
            // Judge whether the selection meets the requirements
            var scopeElement = document.getElementById("abstractText");
            var highlightClass = "highlight1";
            var elementList = scopeElement.getElementsByClassName(highlightClass);
            if (elementList.length == 1) {
                // The requirements are met!
                customized_question_complete_status[0] = 0;
                selection_type = null;
                document.getElementById('abstract-q3-feedback').style.visibility = 'visible';
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
    'click #abstract-q3-start-button': function(event, instance) {
        event.preventDefault();

        document.getElementById('abstract-q3-display').style.display = "block"
        selection_type = ABSTRACT_SELECTION_TYPE1;
        highlight_color = ABSTRACT_HIGHLIGHT_COLOR1;
        location.href = "#";
        location.href = "#studyTitle";
        document.getElementById('abstract-q3-feedback').style.visibility = "hidden";
        customized_question_complete_status[0] = 2;

        var confirmButton = document.getElementById('abstract-q3-confirm-button');
        confirmButton.classList.remove('disabled')
        confirmButton.ariaDisabled = false;

        var startButton = document.getElementById('abstract-q3-start-button');
        startButton.classList.add('disabled')
        startButton.ariaDisabled = true;
        startButton.innerHTML = "Restart selection"
    },
    'click #abstract-q3-confirm-button': function(event, instance) {
        event.preventDefault();

        var scopeElement = document.getElementById("abstractText");
        var highlightClass = "highlight1";
        var elementList = scopeElement.getElementsByClassName(highlightClass);
        if (elementList.length == 1) {
            // The requirements are met!
            customized_question_complete_status[0] = 0;
            selection_type = null;
            document.getElementById('abstract-q3-feedback').style.visibility = 'visible';

            var confirmButton = document.getElementById('abstract-q3-confirm-button');
            confirmButton.classList.add('disabled')
            confirmButton.ariaDisabled = true;

            var startButton = document.getElementById('abstract-q3-start-button');
            startButton.classList.remove('disabled')
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
    // 'keypress form': function(event, instance) {
    //     //Enter key
    //     if (event.which == 13) {
    //         return false;
    //     }
    // }
})
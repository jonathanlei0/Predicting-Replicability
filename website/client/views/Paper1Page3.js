Template.Paper1Page3.onCreated(function() {
    pageLevelVariablesRefresh();
    selection_complete_status = 1; //waited to start selection
    bar_status = "default"
});

Template.Paper1Page3.onRendered(function() {
    var id = glob.currPaperExpIdList[nonNeg(glob.taskId - 1)];

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

    'click #method-selection-start-button': function(event, instance) {
        event.preventDefault();

        document.getElementById('method-q-main-step-display').style.display = "block"
        selection_type = METHOD_SELECTION_TYPE1;
        //highlight_color = METHOD_HIGHLIGHT_COLOR2;
        // location.href = "#";
        // location.href = "#studyTitle";
        document.getElementById('method-selection-feedback').style.visibility = "hidden";
        selection_complete_status = 2;

        var confirmButton = document.getElementById('method-selection-confirm-button');
        confirmButton.classList.remove('disabled');
        confirmButton.ariaDisabled = false;

        var startButton = document.getElementById('method-selection-start-button');
        startButton.classList.add('disabled');
        startButton.ariaDisabled = true;
        startButton.innerHTML = "Resume selection";

        document.getElementById('begining-paragraph-NOT-exists').disabled=false;
    },

    'click #method-selection-confirm-button': function(event, instance) {
        // Judge whether the selection meets the requirements
        var scopeElement = document.getElementById("methodText");

        if (!document.getElementById('begining-paragraph-NOT-exists').checked) {

            var highlightClass = "highlight1";
            var elementList = scopeElement.getElementsByClassName(highlightClass);
            if (elementList.length <= 0) {
                location.href = "#";
                location.href = "#method-popup-warning-Q7-1";
                return false;
            } else if (elementList.length > 1) {
                location.href = "#";
                location.href = "#method-popup-warning-Q7-2";
                return false;
            }
        }

        var highlightClass = "highlight2";
        var elementList = scopeElement.getElementsByClassName(highlightClass);
        if (elementList.length <= 2) {
            location.href = "#";
            location.href = "#method-popup-warning-Q8-1";
            return false;
        } else if (elementList.length > 3) {
            location.href = "#";
            location.href = "#method-popup-warning-Q8-2";
            return false;
        }


        selection_type = null;
        document.getElementById('method-selection-feedback').style.visibility = "visible";
        var confirmButton = document.getElementById('method-selection-confirm-button');
        confirmButton.classList.add('disabled');
        confirmButton.ariaDisabled = true;

        var startButton = document.getElementById('method-selection-start-button');
        startButton.classList.remove('disabled');
        startButton.ariaDisabled = false;
        selection_complete_status = 0;

        document.getElementById('begining-paragraph-NOT-exists').disabled=true;
    },

    'change #begining-paragraph-NOT-exists': function(event, instance) {
        if (document.getElementById('begining-paragraph-NOT-exists').checked) {
            var highlightClass = "highlight" + METHOD_HIGHLIGHT_COLOR1;
            var scopeElement = document.getElementById("methodText");
            var elementList = scopeElement.getElementsByClassName(highlightClass);
            if (elementList) {
                [...elementList].forEach(item => { item.classList.remove(highlightClass)});
            }
            document.getElementById('method-q-main-claim-display').innerHTML =
                'You indicated that there was NO such a sentence.'
        } else {
            if (selection_complete_status==0) {
                location.href = "#";
                location.href = "#method-popup-warning-checkbox-2";
            }
            refreshMethodMainClaimSelectionDisplay(METHOD_HIGHLIGHT_COLOR1);
        }
    },


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
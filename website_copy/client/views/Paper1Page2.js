Template.Paper1Page2.onCreated(function() {
    pageLevelVariablesRefresh();
    //localStorage.curr_paper_id = Math.floor(Math.random() * 25);
    selection_complete_status = 1; //status waited to start selection
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

    'click #abstract-q3-start-button': function(event, instance) {
        event.preventDefault();

        document.getElementById('abstract-q3-display').style.display = "block"
        selection_type = ABSTRACT_SELECTION_TYPE1;
        highlight_color = ABSTRACT_HIGHLIGHT_COLOR1;
        location.href = "#";
        location.href = "#studyTitle";
        document.getElementById('abstract-q3-feedback').style.visibility = "hidden";
        selection_complete_status = 2;

        var confirmButton = document.getElementById('abstract-q3-confirm-button');
        confirmButton.classList.remove('disabled')
        confirmButton.ariaDisabled = false;

        var startButton = document.getElementById('abstract-q3-start-button');
        startButton.classList.add('disabled')
        startButton.ariaDisabled = true;
        startButton.innerHTML = "Resume selection"
    },
    'click #abstract-q3-confirm-button': function(event, instance) {
        event.preventDefault();

        var scopeElement = document.getElementById("abstractText");
        var highlightClass = "highlight1";
        var elementList = scopeElement.getElementsByClassName(highlightClass);
        if (elementList.length == 1) {
            // The requirements are met!
            selection_complete_status = 0;
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
            location.href = "#abstract-popup-warning-1";
            return;
        } else {
            location.href = "#";
            location.href = "#abstract-popup-warning-2";
        }
    }
})
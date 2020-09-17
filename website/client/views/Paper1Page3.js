Template.Paper1Page3.onCreated(function() {
    pageLevelVariablesRefresh();
    customized_question_complete_status = [1, 1];
    bar_status = "default"
    currPage = "Paper1Page3"
});

Template.Paper1Page3.onRendered(function() {
    var id = mySessionStorage.get('curr_paper_id');

    document.getElementById("studyTitle").innerHTML =
        "<b>Title: </b><em>" + httpGet("/paper_data/title/[title]" + id + ".txt")+"</em>";

    document.getElementById("methodText").innerHTML =
        "" + httpGet("/paper_data/method/[method]" + id + ".txt")

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
            document.getElementById('method-q-main-claim-feedback').style.visibility = "hidden";
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
})
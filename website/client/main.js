Template.MainLayout.onCreated(function() {
    //sessionStorage.clear();
    websiteLevelVariablesRefresh();
    pageLevelVariablesRefresh();
});


Template.MainLayout.events({

    'click .sentence': function(event, instance) {
        if (selection_type == null) return;
        if (document.getElementById("selectedSentence") != null) {
            document.getElementById("selectedSentence").id = "";
        }
        event.target.id = "selectedSentence";
        location.href = "#";
        location.href = "#selection-overlay"
        document.getElementById("highlightBox").style.top = event.clientY + "px";
        document.getElementById("highlightBox").style.left = event.clientX + "px";
    },

    'mouseenter .sentence': function(event, instance) {
        var hoveredSentence = document.getElementById("hoverSentence")
        if (hoveredSentence != null) {
            hoveredSentence.id = "";
        }
        if (event.target.id != "selectedSentence") {
            event.target.id = "hoverSentence";
        }
    },

    'click #toggleButton': function(event, instance) {
        var currHighlightColor = "highlight" + highlight_color.toString();
        var currElementClassName = document.getElementById("selectedSentence").className;
        var toggled = false;
        reactivatePage();
        if (currElementClassName.includes(currHighlightColor)) {
            // The selected sentence has been already highlighted
            document.getElementById("selectedSentence").className = "sentence";
            toggled = true;
        } else if (currElementClassName.includes("highlight")) {
            // The selected sentence has been highlighted in another color
            location.href = "#";
            location.href = "#popup-warning-3";
        } else {
            // The selected sentence has NOT been highlighted
            document.getElementById("selectedSentence").className = currHighlightColor + " " + currElementClassName;
            toggled = true;
        }
        //document.getElementById("highlightBox").style.display = "none";
        document.getElementById("selectedSentence").id = "";
        if (toggled) {
            refreshAbstractSelectionDisplay(ABSTRACT_HIGHLIGHT_COLOR1);
            refreshMethodMainClaimSelectionDisplay(METHOD_HIGHLIGHT_COLOR1);
            refreshMethodMainStepSelectionDisplay(METHOD_HIGHLIGHT_COLOR2);
        }
    },

    'click #closeToggleButton': function(event, instance) {
        //document.getElementById("highlightBox").style.display = "none";
        document.getElementById("selectedSentence").id = "";
        reactivatePage();
    },

    'click .close': function(event, instance) {
        console.log(event);
        reactivatePage();
        var closeId = event.target.id;
        if (closeId == "popup-warning-1-close" || closeId == "popup-warning-2-close") {
            location.href = "#";
            location.href = "#studyTitle";
        }
    },
});

refreshAbstractSelectionDisplay = function(color_type) {
    var scopeElement = document.getElementById("abstractText");
    if (scopeElement == null) return;
    if (selection_type != ABSTRACT_SELECTION_TYPE1) return;

    var selectedSentenceList = scopeElement.getElementsByClassName("highlight" + color_type);
    if (selectedSentenceList.length == 0) {
        document.getElementById("abstract-q3-display").innerHTML = ABSTRACT_INSTRUCTION_TYPE1;
    } else {
        var parentElement = document.getElementById("abstract-q3-display");
        parentElement.innerHTML = "";
        for (var i = 0; i < selectedSentenceList.length; i++) {
            var newElement = selectedSentenceList[i].cloneNode(true);
            newElement.className = "";
            parentElement.innerHTML += "<span>" + (i + 1).toString() + ". </span>";
            parentElement.appendChild(newElement);
            parentElement.innerHTML += "<br /><br />";
        }
    }

};

refreshMethodMainClaimSelectionDisplay = function(color_type) {
    var scopeElement = document.getElementById("methodText");
    if (scopeElement == null) return;
    if (selection_type != METHOD_SELECTION_TYPE1) return;

    var selectedSentenceList = scopeElement.getElementsByClassName("highlight" + color_type);
    if (selectedSentenceList.length == 0) {
        document.getElementById("method-q-main-claim-display").innerHTML = METHOD_INSTRUCTION_TYPE1;
    } else {
        var parentElement = document.getElementById("method-q-main-claim-display");
        parentElement.innerHTML = "";
        for (var i = 0; i < selectedSentenceList.length; i++) {
            var newElement = selectedSentenceList[i].cloneNode(true);
            newElement.className = "";
            parentElement.innerHTML += "<span>" + (i + 1).toString() + ". </span>";
            parentElement.appendChild(newElement);
            parentElement.innerHTML += "<br /><br />";
        }
    }
};

refreshMethodMainStepSelectionDisplay = function(color_type) {
    var scopeElement = document.getElementById("methodText");
    if (scopeElement == null) return;
    if (selection_type != METHOD_SELECTION_TYPE2) return;

    var selectedSentenceList = scopeElement.getElementsByClassName("highlight" + color_type);
    if (selectedSentenceList.length == 0) {
        document.getElementById("method-q-main-step-display").innerHTML = METHOD_INSTRUCTION_TYPE1;
    } else {
        var parentElement = document.getElementById("method-q-main-step-display");
        parentElement.innerHTML = "";
        for (var i = 0; i < selectedSentenceList.length; i++) {
            var newElement = selectedSentenceList[i].cloneNode(true);
            newElement.className = "";
            parentElement.innerHTML += "<span>" + (i + 1).toString() + ". </span>";
            parentElement.appendChild(newElement);
            parentElement.innerHTML += "<br /><br />";
        }
    }
};
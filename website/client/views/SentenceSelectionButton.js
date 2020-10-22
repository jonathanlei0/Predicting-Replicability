Template.SentenceSelectionButton.events({

    'click a': function(event, template) {
        var currHighlightColor = "highlight" + this.highlight;
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
});